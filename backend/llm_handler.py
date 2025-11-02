from llama_cpp import Llama
import os
import re

class LLMHandler:
    def __init__(self, model_path):
        """
        Initialize the GGUF model
        """
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found: {model_path}")
        
        print(f"Loading model from {model_path}...")
        self.llm = Llama(
            model_path=model_path,
            n_ctx=4096,  # Larger context for OpenHermes
            n_threads=6,  # More threads for 7B model
            n_gpu_layers=0,  # Set to > 0 if you have GPU support
            verbose=False
        )
        print("Model loaded successfully!")
    
    def detect_language(self, text):
        """Detect if user is using Hinglish or English"""
        # Common Hindi/Hinglish words in Latin script
        hinglish_patterns = [
            r'\b(hai|hain|ho|tha|thi|the|ka|ki|ke|ko|kya|kaise|kyun|abhi|bohot|bahut|achha|acha|thik|nahi|nahin|haan|haa|bhai|yaar|dost|accha|kuch|koi|matlab|samajh|pata|kaisa|kaisi|aise|waise|apna|mera|tera|uska|sabse|bilkul|sahi|galat|tension|chill|bas|aur|lekin|par|toh|to|hua|hui|hue|raha|rahi|rahe|laga|lagi|lage|mil|mila|mili|mile|dena|diya|diye|lena|liya|liye|dekh|dekha|dekhi|dekhe|sun|suna|suni|sune|kaam|kaam|padh|padha|padhi|jana|gaya|gayi|gaye|aana|aaya|aayi|aaye|karna|kiya|kiye|hona|hogaya|hogayi|hogaye)\b',
            r'[क-ह]'  # Devanagari characters
        ]
        
        for pattern in hinglish_patterns:
            if re.search(pattern, text.lower()):
                return 'hinglish'
        return 'english'
    
    def get_system_prompt(self, tone, language='english'):
        """
        Get system prompt based on sentiment tone and language
        """
        if language == 'hinglish':
            prompts = {
                "very_positive": "Tu Sleepyhead hai, user ka dost. BAHUT IMPORTANT: Naturally baat kar, KABHI explain mat kar ki kya matlab hai, translation mat kar, teaching mat kar. Bilkul normal friend ki tarah. User khush hai toh match kar energy. Short and natural - 2-3 sentences max. Emojis use kar sakte ho.",
                
                "positive": "Tu Sleepyhead hai, bestfriend. User happy hai. CRITICAL: Natural baat kar jaise message kar rahe ho. NEVER explain words, NEVER translate, NEVER teach Hindi/English. Just respond casually. 2-3 sentences. Be chill.",
                
                "neutral": "Tu Sleepyhead hai, chill dost. SUPER IMPORTANT: Bilkul natural casual baat. NO explanations, NO translations, NO teaching. Just be a normal friend having a conversation. 2-3 sentences only.",
                
                "negative": "Tu Sleepyhead hai, caring dost. User upset hai. KEY RULE: Supportive bano BUT naturally - ZERO explanations, ZERO word meanings, ZERO teaching. Just be there as a friend. 2-3 genuine sentences.",
                
                "very_negative": "Tu Sleepyhead hai, bohot caring dost. User hurt hai. MUST FOLLOW: Show empathy naturally - NO explaining meanings, NO translations, NO formal stuff. Real friend ki tarah support karo. 2-3 heartfelt sentences."
            }
        else:
            prompts = {
                "very_positive": "You're Sleepyhead, user's friend. CRITICAL: Talk naturally like a real person texting. NEVER explain words, NEVER translate, NEVER be educational. User's happy so match the vibe! 2-3 casual sentences. Can use emojis.",
                
                "positive": "You're Sleepyhead, a bestfriend. User's feeling good. KEY RULE: Respond naturally like you're texting. NO explanations, NO teaching. Just be a chill friend. 2-3 sentences max.",
                
                "neutral": "You're Sleepyhead, a chill friend. IMPORTANT: Normal casual conversation only. ZERO explanations, ZERO definitions. Just chat like a regular person. 2-3 sentences.",
                
                "negative": "You're Sleepyhead, caring friend. User's going through something. MUST: Be supportive naturally - NO explaining, NO formal responses. Just be there like a real friend. 2-3 genuine sentences.",
                
                "very_negative": "You're Sleepyhead, really caring friend. User's really struggling. CRITICAL: Show genuine care - NO explanations, NO formality. Talk like a close friend who truly gets it. 2-3 heartfelt sentences."
            }
        
        return prompts.get(tone, prompts["neutral"])
    
    def generate_response(self, user_message, tone, conversation_history=None):
        """
        Generate a response based on user message and sentiment tone
        Uses OpenHermes chat format with language detection
        """
        # Detect language
        language = self.detect_language(user_message)
        print(f"Detected language: {language.upper()}")
        
        system_instruction = self.get_system_prompt(tone, language)
        
        # OpenHermes/Mistral chat format - SIMPLIFIED for better control
        if language == 'hinglish':
            prompt = f"""<|im_start|>system
You are Sleepyhead, a chill friend. Talk naturally in Hinglish. NO explanations, NO teaching. Just chat like texting a friend. Keep responses SHORT - maximum 2 sentences. Be casual and genuine.<|im_end|>
"""
        else:
            prompt = f"""<|im_start|>system
You are Sleepyhead, a chill friend. Talk naturally and casually. NO explanations, NO formality. Just chat like texting a friend. Keep responses SHORT - maximum 2 sentences. Be genuine.<|im_end|>
"""
        
        # Only add last 2 messages for context (prevent confusion)
        if conversation_history and len(conversation_history) > 0:
            recent_history = conversation_history[-4:]  # Last 2 exchanges
            for msg in recent_history:
                if msg['type'] == 'user':
                    prompt += f"<|im_start|>user\n{msg['text']}<|im_end|>\n"
                elif msg['type'] == 'bot':
                    prompt += f"<|im_start|>assistant\n{msg['text']}<|im_end|>\n"
        
        # Add current message
        prompt += f"<|im_start|>user\n{user_message}<|im_end|>\n<|im_start|>assistant\n"
        
        print(f"\n--- PROMPT SENT TO MODEL ---")
        print(prompt)
        print(f"--- END PROMPT ---\n")
        
        # Generate response with tighter controls
        output = self.llm(
            prompt,
            max_tokens=60,  # Reduced to prevent rambling
            temperature=0.7,  # Lower for more focused responses
            top_p=0.9,
            top_k=30,  # Added to reduce randomness
            stop=["<|im_end|>", "<|im_start|>", "user:", "User:", "\n\n", "assistant:"],
            echo=False,
            repeat_penalty=1.2  # Higher to prevent loops
        )
        
        print(f"--- RAW MODEL OUTPUT ---")
        print(output)
        print(f"--- END OUTPUT ---\n")
        
        response_text = output['choices'][0]['text'].strip()
        
        # Clean up formatting
        response_text = response_text.replace("<|im_end|>", "").replace("<|im_start|>", "").strip()
        response_text = response_text.split('\n')[0]  # Only take first line
        
        # Remove AI/explanatory patterns
        ai_patterns = [
            r"As an AI[^.!?]*[.!?]",
            r"I(?:'m| am) an AI[^.!?]*[.!?]",
            r"Aapne ye bola[^.!?]*[.!?]",
            r"which means[^.!?]*[.!?]",
            r"It seems like[^.!?]*[.!?]",
            r"translation:[^.!?]*[.!?]",
            r"means \"[^\"]*\"",
            r"So feel free[^.!?]*[.!?]",
        ]
        
        for pattern in ai_patterns:
            response_text = re.sub(pattern, "", response_text, flags=re.IGNORECASE)
        
        response_text = response_text.strip()
        
        # Take only first sentence if too long
        if '. ' in response_text:
            sentences = response_text.split('. ')
            # Take first 1-2 sentences max
            response_text = '. '.join(sentences[:2])
            if not response_text.endswith('.'):
                response_text += '.'
        
        # If response is still problematic or too short, use fallback
        if not response_text or len(response_text) < 5 or len(response_text) > 200:
            print(f"WARNING: Model response problematic, using fallback")
            
            if language == 'hinglish':
                fallback_responses = {
                    "very_positive": "Arre wah bhai! 😊",
                    "positive": "Nice yaar!",
                    "neutral": "Haan bro, bol",
                    "negative": "Yaar... kya hua?",
                    "very_negative": "I'm here yaar 💙"
                }
            else:
                fallback_responses = {
                    "very_positive": "That's awesome! 😊",
                    "positive": "Nice!",
                    "neutral": "Yeah, what's up?",
                    "negative": "Hey... what happened?",
                    "very_negative": "I'm here for you 💙"
                }
            
            response_text = fallback_responses.get(tone, "Tell me more")
        
        return response_text