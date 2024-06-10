import streamlit as st
import joblib
import pickle
from nltk.tokenize import RegexpTokenizer
from nltk.corpus import stopwords
from nltk.stem import SnowballStemmer
import nltk

# Ensure the required NLTK data packages are downloaded
nltk.download('stopwords')

# Initialize the stemmer and tokenizer
stemmer = SnowballStemmer('english')
tokenizer = RegexpTokenizer(r'[A-Za-z]+')

# Function to preprocess the text
def transform_text(text):
    text = text.lower()  # Convert text to lowercase
    tokens = tokenizer.tokenize(text)  # Tokenize the text
    stemmed_tokens = [stemmer.stem(word) for word in tokens]  # Stem the tokens
    transformed_text = ' '.join(stemmed_tokens)  # Join tokens into a single string
    return transformed_text

# Load the pre-trained models
cv = joblib.load(open('count_vectorizer.pkl', 'rb'))
model = pickle.load(open('model.pkl', 'rb'))

# Streamlit app title
st.title("Phishing Site Detection")

# Text area for input
input_sms = st.text_area("Enter the message")

# Predict button
if st.button('Predict'):
    # Preprocess the input
    transformed_url = transform_text(input_sms)
    
    # Vectorize the input
    vector_input = cv.transform([transformed_url])
    
    # Predict using the loaded model
    result = model.predict(vector_input)[0]
    
    # Display the result
    if result == 1:
        st.header("Not Phishing")
    else:
        st.header("Phishing")
