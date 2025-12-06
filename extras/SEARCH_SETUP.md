# Search API Setup Guide

The free DuckDuckGo API has limited accuracy. For better search results, use one of these options:

## Option 1: Brave Search API (Recommended)
**Best balance of accuracy and free tier**

1. Sign up: https://api.search.brave.com/register
2. Get your API key (Free tier: 2,000 queries/month)
3. Set environment variable:
   ```bash
   export BRAVE_API_KEY='your-api-key-here'
   ```
4. Run:
   ```bash
   python search_chat_brave.py
   ```

## Option 2: SerpAPI (Most Accurate)
**Real Google search results**

1. Sign up: https://serpapi.com/
2. Get API key (Free tier: 100 searches/month)
3. Install: `pip install google-search-results`
4. Use in your code:
   ```python
   from serpapi import GoogleSearch
   
   params = {
       "q": query,
       "api_key": "your-serpapi-key"
   }
   search = GoogleSearch(params)
   results = search.get_dict()
   ```

## Option 3: Serper.dev
**Google search with generous free tier**

1. Sign up: https://serper.dev/
2. Get API key (Free: 2,500 queries)
3. Use REST API:
   ```python
   import requests
   
   url = "https://google.serper.dev/search"
   payload = json.dumps({"q": query})
   headers = {
       'X-API-KEY': 'your-api-key',
       'Content-Type': 'application/json'
   }
   response = requests.post(url, headers=headers, data=payload)
   ```

## Option 4: Tavily AI (AI-Optimized Search)
**Built specifically for AI/LLM use cases**

1. Sign up: https://tavily.com/
2. Free tier: 1,000 searches/month
3. Install: `pip install tavily-python`
4. Use:
   ```python
   from tavily import TavilyClient
   
   client = TavilyClient(api_key="your-api-key")
   results = client.search(query)
   ```

## Current Setup
- `interactive_search_chat.py` - Uses DuckDuckGo (free but limited accuracy)
- `search_chat_brave.py` - Uses Brave Search API (requires key, better accuracy)

## Quick Start with Brave Search:
```bash
# Get API key from https://api.search.brave.com/register
export BRAVE_API_KEY='BSAxxxxxxxxxxxxx'

# Run the improved search chat
python search_chat_brave.py
```

Now ask: "who is samantha ruth prabhu husband 2025" and get accurate results!
