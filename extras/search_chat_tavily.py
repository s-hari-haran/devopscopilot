import os
import json
import requests
from openai import OpenAI

# Initialize MegaLLM client
api_key = os.environ.get("MEGALLM_API_KEY")
if not api_key:
    raise ValueError("MEGALLM_API_KEY environment variable not set")
client = OpenAI(
    base_url="https://ai.megallm.io/v1",
    api_key=api_key
)

# Tavily API key (get free at https://tavily.com - NO PAYMENT INFO NEEDED)
TAVILY_API_KEY = os.environ.get("TAVILY_API_KEY", "")

def search_tavily(query):
    """
    Search using Tavily AI - Built for AI/LLM use cases
    Sign up at https://tavily.com (No payment info required)
    Free tier: 1,000 searches/month
    """
    if not TAVILY_API_KEY:
        return [{
            "title": "API Key Required",
            "snippet": "Get FREE API key at https://tavily.com (no payment info needed). Then: export TAVILY_API_KEY='your-key'",
            "url": ""
        }]
    
    try:
        url = "https://api.tavily.com/search"
        
        payload = {
            "api_key": TAVILY_API_KEY,
            "query": query,
            "search_depth": "basic",
            "include_answer": True,
            "include_images": False,
            "include_raw_content": False,
            "max_results": 8
        }
        
        response = requests.post(url, json=payload, timeout=15)
        
        if response.status_code == 200:
            data = response.json()
            results = []
            
            # Add the AI-generated answer if available
            if data.get('answer'):
                results.append({
                    'title': 'AI Summary',
                    'snippet': data['answer'],
                    'url': ''
                })
            
            # Add search results
            for item in data.get('results', []):
                results.append({
                    'title': item.get('title', ''),
                    'snippet': item.get('content', ''),
                    'url': item.get('url', '')
                })
            
            return results if results else [{"title": "No results", "snippet": "No results found", "url": ""}]
        else:
            return [{
                "title": "Search Error",
                "snippet": f"API error: {response.status_code} - {response.text}",
                "url": ""
            }]
    
    except Exception as e:
        return [{"title": "Search Error", "snippet": f"Failed: {str(e)}", "url": ""}]

def chat_with_search(user_message, conversation_history):
    """
    Chat with the model using Tavily search
    """
    # Determine if we need to search
    search_keywords = ["who", "what", "when", "where", "why", "how", "is", "are", "latest", "current", "news"]
    needs_search = any(keyword in user_message.lower() for keyword in search_keywords) or "?" in user_message
    
    search_results_text = ""
    if needs_search:
        print(f"\n🔍 Searching with Tavily AI...")
        search_results = search_tavily(user_message)
        
        # Format search results
        search_results_text = "\n\n[Web Search Results - Real-time Information]\n"
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
    Interactive chat with Tavily AI search
    """
    print("=" * 60)
    print("MegaLLM Chat with Tavily AI Search")
    print("=" * 60)
    
    if not TAVILY_API_KEY:
        print("\n⚠️  TAVILY_API_KEY not set!")
        print("\n📝 Get FREE API key (NO PAYMENT INFO):")
        print("   1. Visit: https://tavily.com")
        print("   2. Sign up with email")
        print("   3. Copy your API key")
        print("   4. Run: export TAVILY_API_KEY='tvly-xxxxx'")
        print("\nContinuing without search...\n")
    else:
        print("\n✓ Tavily AI Search configured")
        print("✓ Free tier: 1,000 searches/month\n")
    
    print("Type your questions (type 'quit', 'exit', or 'q' to end)")
    print("=" * 60 + "\n")
    
    # Initialize conversation
    conversation_history = [
        {
            "role": "system",
            "content": """You are a helpful AI assistant with real-time web search via Tavily AI. 
When provided with search results, use them to give accurate, current information. 
Be concise and cite sources when mentioning facts."""
        }
    ]
    
    while True:
        try:
            user_input = input("You: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\n\nGoodbye!")
            break
        
        if user_input.lower() in ['quit', 'exit', 'q', '']:
            print("\nGoodbye!")
            break
        
        print()
        response = chat_with_search(user_input, conversation_history)
        
        # Clean up response
        if '<think>' in response:
            parts = response.split('</think>')
            if len(parts) > 1:
                response = parts[-1].strip()
        
        print(f"\nAssistant: {response}\n")
        print("-" * 60 + "\n")

if __name__ == "__main__":
    main()
