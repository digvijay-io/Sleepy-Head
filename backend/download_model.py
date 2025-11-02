#!/usr/bin/env python3
"""
Script to download a lightweight LLM model for SleepyHead
Downloads TinyLlama-1.1B-Chat (GGUF format) - perfect for chatbots
"""

import os
import sys
from pathlib import Path

# Model configuration
MODELS = {
    "tinyllama": {
        "name": "TinyLlama-1.1B-Chat-v1.0",
        "url": "https://huggingface.co/TheBloke/TinyLlama-1.1B-Chat-v1.0-GGUF/resolve/main/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf",
        "filename": "tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf",
        "size": "~669 MB",
        "description": "Ultra-light, fast. Great for testing."
    },
    "phi2": {
        "name": "Phi-2-Chat",
        "url": "https://huggingface.co/TheBloke/phi-2-GGUF/resolve/main/phi-2.Q4_K_M.gguf",
        "filename": "phi-2.Q4_K_M.gguf",
        "size": "~1.6 GB",
        "description": "Microsoft’s Phi-2, strong reasoning for small size."
    },
    "gemma7b": {
        "name": "Gemma-7B-it",
        "url": "https://huggingface.co/TheBloke/gemma-7b-it-GGUF/resolve/main/gemma-7b-it.Q4_K_M.gguf",
        "filename": "gemma-7b-it.Q4_K_M.gguf",
        "size": "~5.0 GB",
        "description": "Google’s Gemma 7B, multilingual (handles Hinglish), empathetic responses."
    },
    "openhermes": {
        "name": "OpenHermes-2.5-Mistral-7B",
        "url": "https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-GGUF/resolve/main/openhermes-2.5-mistral-7b.Q4_K_M.gguf",
        "filename": "openhermes-2.5-mistral-7b.Q4_K_M.gguf",
        "size": "~4.5 GB",
        "description": "Therapist-style, fine-tuned for roleplay and empathy."
    },
    "llama3": {
        "name": "LLaMA-3-8B-Instruct",
        "url": "https://huggingface.co/TheBloke/Llama-3-8B-Instruct-GGUF/resolve/main/llama-3-8b-instruct.Q4_K_M.gguf",
        "filename": "llama-3-8b-instruct.Q4_K_M.gguf",
        "size": "~4.8 GB",
        "description": "Meta’s newest, excellent reasoning + Hinglish understanding."
    }
}

def download_file_simple(url, filepath):
    """Download file with simple progress indicator"""
    import urllib.request
    
    print(f"\nDownloading from: {url}")
    print(f"Saving to: {filepath}")
    print("Please wait, this may take several minutes...\n")
    
    def report_progress(block_num, block_size, total_size):
        downloaded = block_num * block_size
        if total_size > 0:
            percent = min(downloaded * 100.0 / total_size, 100)
            downloaded_mb = downloaded / (1024 * 1024)
            total_mb = total_size / (1024 * 1024)
            
            # Print every 5%
            if int(percent) % 5 == 0 and block_num > 0:
                print(f"\rProgress: {percent:.1f}% ({downloaded_mb:.1f}/{total_mb:.1f} MB)", end='', flush=True)
    
    try:
        urllib.request.urlretrieve(url, filepath, reporthook=report_progress)
        print("\n")  # New line after progress
        return True
    except Exception as e:
        print(f"\n✗ Download failed: {e}")
        return False

def create_env_file(model_filename):
    """Create .env file with model path"""
    env_path = Path(__file__).parent / ".env"
    env_content = f"""# SleepyHead Configuration
MODEL_NAME={model_filename}
MODEL_PATH=models/{model_filename}
"""
    
    with open(env_path, 'w') as f:
        f.write(env_content)
    
    print(f"✓ Created .env file: {env_path}")

def main():
    print("=" * 60)
    print("SleepyHead - Model Downloader")
    print("=" * 60)
    
    # Show available models
    print("\nAvailable models:\n")
    for i, (key, model) in enumerate(MODELS.items(), 1):
        print(f"{i}. {model['name']}")
        print(f"   Size: {model['size']}")
        print(f"   Description: {model['description']}")
        print()
    
    # Get user choice
    print("Recommended: Option 1 (TinyLlama) - Best balance of speed and quality")
    choice = input("\nEnter your choice (1-3) [default: 1]: ").strip() or "1"
    
    try:
        choice_idx = int(choice) - 1
        model_key = list(MODELS.keys())[choice_idx]
        selected_model = MODELS[model_key]
    except (ValueError, IndexError):
        print("Invalid choice. Using TinyLlama (default).")
        selected_model = MODELS["tinyllama"]
    
    print(f"\n✓ Selected: {selected_model['name']}")
    
    # Create models directory
    models_dir = Path(__file__).parent / "models"
    models_dir.mkdir(exist_ok=True)
    print(f"✓ Models directory: {models_dir}")
    
    # Check if model already exists
    model_path = models_dir / selected_model['filename']
    if model_path.exists():
        print(f"\n⚠ Model already exists: {model_path}")
        overwrite = input("Do you want to re-download? (y/N): ").strip().lower()
        if overwrite != 'y':
            print("Using existing model.")
            create_env_file(selected_model['filename'])
            return
    
    # Download model
    try:
        print(f"\nDownloading {selected_model['name']}...")
        print(f"Size: {selected_model['size']}")
        
        success = download_file_simple(selected_model['url'], str(model_path))
        
        if not success:
            print("\n✗ Error: Download failed")
            if model_path.exists():
                model_path.unlink()
            sys.exit(1)
        
        # Verify download
        if model_path.exists() and model_path.stat().st_size > 0:
            size_mb = model_path.stat().st_size / (1024 * 1024)
            print(f"✓ Model downloaded successfully!")
            print(f"✓ File size: {size_mb:.2f} MB")
            print(f"✓ Location: {model_path}")
            
            # Create .env file
            create_env_file(selected_model['filename'])
            
            print("\n" + "=" * 60)
            print("SUCCESS! Your model is ready to use.")
            print("=" * 60)
            print("\nNext steps:")
            print("1. Make sure you have all dependencies installed:")
            print("   pip install -r requirements.txt")
            print("\n2. Start the backend server:")
            print("   python server.py")
            print("\n3. Start the frontend:")
            print("   npm run dev")
            print("\n" + "=" * 60)
        else:
            print("\n✗ Error: Download failed or file is empty")
            sys.exit(1)
            
    except KeyboardInterrupt:
        print("\n\nDownload cancelled by user.")
        if model_path.exists():
            model_path.unlink()
        sys.exit(1)
    except Exception as e:
        print(f"\n✗ Error downloading model: {e}")
        import traceback
        traceback.print_exc()
        if model_path.exists():
            model_path.unlink()
        sys.exit(1)

if __name__ == "__main__":
    main()