from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

class SentimentAnalyzer:
    def __init__(self):
        self.analyzer = SentimentIntensityAnalyzer()
    
    def analyze(self, text):
        """
        Analyze sentiment of the given text
        Returns: dict with scores and classification
        """
        scores = self.analyzer.polarity_scores(text)
        
        # Classify sentiment
        compound = scores['compound']
        if compound >= 0.05:
            sentiment = 'positive'
        elif compound <= -0.05:
            sentiment = 'negative'
        else:
            sentiment = 'neutral'
        
        return {
            'sentiment': sentiment,
            'scores': scores,
            'compound': compound
        }
    
    def get_response_tone(self, sentiment_result):
        """
        Get the appropriate response tone based on sentiment
        """
        sentiment = sentiment_result['sentiment']
        compound = sentiment_result['compound']
        
        if sentiment == 'positive':
            if compound >= 0.5:
                return "very_positive"
            return "positive"
        elif sentiment == 'negative':
            if compound <= -0.5:
                return "very_negative"
            return "negative"
        else:
            return "neutral"