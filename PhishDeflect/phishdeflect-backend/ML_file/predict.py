import os
import sys
import pickle
import joblib
import sklearn

def load_vectorizer(vectorizer_path):
    with open(vectorizer_path, 'rb') as file:
        vectorizer = joblib.load(file)
    return vectorizer

def load_model(model_path):
    with open(model_path, 'rb') as file:
        model = pickle.load(file)
    return model

def predict(vectorizer, model, url):
    url_transformed = vectorizer.transform([url])
    prediction = model.predict(url_transformed)
    return prediction[0]

if __name__ == "__main__":
    # Define the base directory
    base_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Update the paths to be absolute
    vectorizer_path = os.path.join(base_dir, 'count_vectorizer.pkl')
    model_path = os.path.join(base_dir, 'model.pkl')
    
    url = sys.argv[1]
    
    vectorizer = load_vectorizer(vectorizer_path)
    model = load_model(model_path)
    result = predict(vectorizer, model, url)
    
    print(result)
