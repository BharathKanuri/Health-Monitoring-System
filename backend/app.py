# Import Libraries
import ast
import pandas as pd
import pickle
from flask import Flask,request,jsonify
from flask_cors import CORS

# Create Flask App Object
app=Flask(__name__)
 # Allow all Domains to Access the API
CORS(app)

# Load the Model and Other Resources
with open("Trained_Classifier_Model.pkl","rb") as model_file:
    model=pickle.load(model_file)
with open("Disease_Label_Encoder.pkl","rb") as le_file:
    label_encoder=pickle.load(le_file)
with open("Disease_Mapper.pkl","rb") as mapper_file:
    mapper=pickle.load(mapper_file)

# Reading CSV Files
columns_df=pd.read_csv("F:\\Major-Project\\health-monitoring-system\\backend\\datasets\\Column_Name_Mapping.csv")
description_df=pd.read_csv("F:\\Major-Project\\health-monitoring-system\\backend\\datasets\\Description.csv")
precautions_df=pd.read_csv("F:\\Major-Project\\health-monitoring-system\\backend\\datasets\\Precautions.csv")
diet_df=pd.read_csv("F:\\Major-Project\\health-monitoring-system\\backend\\datasets\\Diets.csv")
medications_df=pd.read_csv("F:\\Major-Project\\health-monitoring-system\\backend\\datasets\\Medications.csv")
doctor_df=pd.read_csv("F:\\Major-Project\\health-monitoring-system\\backend\\datasets\\Doctor.csv")

# Disease Prediction Function
def predict_health_status(symptoms):
    input_df=pd.DataFrame([[0]*376],columns=list(columns_df["values"]))
    for symptom in symptoms:
        input_df[symptom]=1
    predicted_label=model.predict(input_df)[0]
    predicted_disease=mapper[predicted_label]
    confidence_score=round(model.predict_proba(input_df)[0][predicted_label],5)
     # Check Confidence Score and Send Response Accordingly
    if confidence_score>=0.5:
        return predicted_disease,confidence_score
    else:
        return "Sorry, our model couldn't match any disease with these symptoms...",confidence_score

# Function to Fetch Details for the Predicted Disease
def get_disease_details(disease):
    # Fetch Associated Details for the Disease
    try:
        description=description_df[description_df["Disease"]==disease]["Description"].values[0]
        precautions=precautions_df[precautions_df["Disease"]==disease]
        precaution_list=[]
        for i in range(1,5):
            precaution_col=f"Precaution_{i}"
            precaution_value=precautions[precaution_col].values[0]
            precaution_list.append(precaution_value)
        diet=ast.literal_eval(diet_df[diet_df["Disease"]==disease]["Diet"].values[0])
        medications=ast.literal_eval(medications_df[medications_df["Disease"]==disease]["Medications"].values[0])
        consult_doctor=doctor_df[doctor_df["Disease"]==disease]["Consulted Doctor"].values[0]
        return{
            "description": description,
            "precautions": precaution_list,
            "diet": diet,
            "medications": medications,
            "consult": consult_doctor
        }
    except Exception as e:
        raise ValueError(f"Error in Fetching Details for the Disease : {disease}")

# Flask Route for Prediction
@app.route('/predict',methods=['POST'])
def predict():
    try:
        # Get the Data from the Frontend
        data=request.get_json()
        symptoms=data.get('symptoms',[])
        # Get Prediction
        predicted_disease,confidence_score=predict_health_status(symptoms)
        # If no Match Found (Confidence < 0.5)
        if confidence_score<0.5:
            return jsonify({
                "prediction": predicted_disease,
                "confidence_score": confidence_score,
                "message": "The Confidence Score of our Model is too low to Provide Prediction"
            })
        else:
            # Get Details for the Predicted Disease
            disease_details=get_disease_details(predicted_disease)
            # Prepare the Response
            response={
                "prediction": predicted_disease,
                "confidence_score": confidence_score,
                **disease_details
            }
            # Send Back the Response
            return jsonify(response)
    except ValueError as ve:
        return jsonify({'error': str(ve)}),400  # Handle Specific ValueError Exceptions
    except Exception as e:
        return jsonify({'error': str(e)}),500  # Handle Other General Exceptions

if __name__=='__main__':
    app.run(debug=True)