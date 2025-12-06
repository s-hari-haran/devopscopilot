import os
import json
import requests
from openai import OpenAI
from urllib.parse import quote_plus
from bs4 import BeautifulSoup

# Initialize MegaLLM client
api_key = os.environ.get("MEGALLM_API_KEY")
if not api_key:
    raise ValueError("MEGALLM_API_KEY environment variable not set")
client = OpenAI(
    base_url="https://ai.megallm.io/v1",
    api_key=api_key
)

def search_web(query):
    """
    Perform a web search using DuckDuckGo HTML scraping for better results
    """
    try:
        # Use DuckDuckGo HTML search (more reliable than API)
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        encoded_query = quote_plus(query)
        url = f"https://html.duckduckgo.com/html/?q={encoded_query}"
        
        response = requests.get(url, headers=headers, timeout=15)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        results = []
        
        # Parse search results
        result_divs = soup.find_all('div', class_='result')
        
        for div in result_divs[:8]:  # Get top 8 results
            try:
                # Extract title
                title_elem = div.find('a', class_='result__a')
                title = title_elem.get_text(strip=True) if title_elem else ''
                
                # Extract URL
                link = title_elem.get('href', '') if title_elem else ''
                
                # Extract snippet
                snippet_elem = div.find('a', class_='result__snippet')
                snippet = snippet_elem.get_text(strip=True) if snippet_elem else ''
                
                if title and snippet:
                    results.append({
                        'title': title,
                        'snippet': snippet,
                        'url': link
                    })
            except Exception as e:
                continue
        
        if not results:
            # Fallback to API if HTML parsing fails
            return search_web_api_fallback(query)
        
        return results
    
    except Exception as e:
        print(f"Search error: {str(e)}")
        return search_web_api_fallback(query)

def search_web_api_fallback(query):
    """
    Fallback to DuckDuckGo API if HTML scraping fails
    """
    try:
        url = f"https://api.duckduckgo.com/?q={query}&format=json&no_html=1&skip_disambig=1"
        response = requests.get(url, timeout=10)
        data = response.json()
        
        results = []
        
        if data.get('Abstract'):
            results.append({
                'title': data.get('Heading', 'Summary'),
                'snippet': data.get('Abstract'),
                'url': data.get('AbstractURL', '')
            })
        
        for topic in data.get('RelatedTopics', [])[:5]:
            if isinstance(topic, dict) and 'Text' in topic:
                results.append({
                    'title': topic.get('Text', '')[:100],
                    'snippet': topic.get('Text', ''),
                    'url': topic.get('FirstURL', '')
                })
        
        return results if results else [{"title": "No results", "snippet": "Search returned no results", "url": ""}]
    
    except Exception as e:
        return [{"title": "Search Error", "snippet": f"Failed to search: {str(e)}", "url": ""}]

def chat_with_search(user_message, conversation_history):
    """
    Chat with the model, providing search capabilities
    """
    # Determine if we need to search
    search_keywords = ["search", "look up", "find", "what is", "who is", "current", "latest", "news", "weather"]
    needs_search = any(keyword in user_message.lower() for keyword in search_keywords) or "?" in user_message
    
    search_results_text = ""
    if needs_search:
        print(f"\n🔍 Searching the web...")
        search_results = search_web(user_message)
        
        # Format search results
        search_results_text = "\n\n[Search Results]\n"
        for i, result in enumerate(search_results, 1):
            search_results_text += f"{i}. {result['title']}\n"
            search_results_text += f"   {result['snippet']}\n"
            if result['url']:
                search_results_text += f"   Source: {result['url']}\n"
            search_results_text += "\n"
    
    # Add user message with search results
    conversation_history.append({
        "role": "user",
        "content": user_message + search_results_text
    })
    
    # Call the model
    response = client.chat.completions.create(
        model="minimaxai/minimax-m2",
        messages=conversation_history,
        temperature=0.7
    )
    
    assistant_message = response.choices[0].message.content
    
    # Add assistant response to history
    conversation_history.append({
        "role": "assistant",
        "content": assistant_message
    })
    
    return assistant_message

def main():
    """
    Interactive chat with search capabilities
    """
    print("=" * 60)
    print("MegaLLM Interactive Chat with Internet Search")
    print("=" * 60)
    print("\nType your questions (type 'quit', 'exit', or 'q' to end)")
    print("Questions will automatically trigger web search when needed")
    print("=" * 60 + "\n")
    
    # Initialize conversation with system message
    conversation_history = [
        {
            "role": "system",
            "content": """You are a helpful AI assistant with internet search capabilities. 
When the user asks questions, you may receive web search results to provide accurate, 
up-to-date information. Use these results to give informed responses. Be concise and helpful."""
        }
    ]
    
    while True:
        # Get user input
        try:
            user_input = input("You: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\n\nGoodbye!")
            break
        
        # Check for exit commands
        if user_input.lower() in ['quit', 'exit', 'q', '']:
            print("\nGoodbye!")
            break
        
        # Get response
        print()  # New line for better formatting
        response = chat_with_search(user_input, conversation_history)
        
        # Clean up the response (remove <think> tags if present)
        if '<think>' in response:
            # Extract only the final response after thinking
            parts = response.split('</think>')
            if len(parts) > 1:
                response = parts[-1].strip()
        
        print(f"\nAssistant: {response}\n")
        print("-" * 60 + "\n")

if __name__ == "__main__":
    main()
