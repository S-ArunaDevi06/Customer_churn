import numpy as np
import pandas as pd
from flask import Flask, request, jsonify, render_template
import pickle
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
import xgboost
import random

app = Flask(__name__)

# Load models
scaler = pickle.load(open('scaler_model2.pkl', 'rb'))
pca = pickle.load(open('pca_model.pkl', 'rb'))
xgb_model = pickle.load(open('xgb_model.pkl', 'rb'))

data = pd.read_excel('customer_churn_data2.xlsx')  # Load the updated dataset

FEATURES = ['Zip Code', 'Latitude', 'Longitude', 'Gender', 'Tenure Months', 
            'Multiple Lines', 'Payment Method', 'Monthly Charges', 'Total Charges',
            'Churn Score']

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/predict', methods=['POST'])
def predict():
    customer_id = request.form.get('customer_id')
    customer_data = data[data['CustomerID'] == customer_id]
    
    if customer_data.empty:
        return render_template('home.html', prediction_text="Customer ID not found.")
    
    # Generate random churn prediction (Yes/No)
    churn_prediction = random.choice(['Yes', 'No'])
    
    churn_score = customer_data['Churn Score'].values[0]
    
    result_text = f"Churn Prediction: {churn_prediction} (Churn Score: {churn_score})"
    return render_template('home.html', prediction_text=result_text)

@app.route('/predict_api', methods=['POST'])
def predict_api():
    data_json = request.get_json(force=True)
    customer_id = data_json.get('customer_id')
    customer_data = data[data['CustomerID'] == customer_id]
    
    if customer_data.empty:
        return jsonify({'error': 'Customer ID not found'})
    
    # Generate random churn prediction (True/False)
    churn_prediction = random.choice([True, False])
    
    churn_score = customer_data['Churn Score'].values[0]
    
    return jsonify({
        'churn_prediction': churn_prediction,
        'churn_score': churn_score,
        'prediction_text': 'Yes' if churn_prediction else 'No'
    })

if __name__ == '__main__':
    app.run(debug=True)