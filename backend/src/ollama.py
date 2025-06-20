import requests
import os
from dotenv import load_dotenv

load_dotenv()

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434")

def generate_response(message: str) -> str:
    payload = {
        "model": "llama3",
        "prompt": message,
        "stream": False
    }
    response = requests.post(f"{OLLAMA_URL}/api/generate", json=payload)
    if response.status_code == 200:
        return response.json()["response"]
    else:
        return "Error: Unable to get response from Ollama"