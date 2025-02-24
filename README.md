# Health Monitoring System

## Description
The Health Monitoring System is a web-based ML application designed to predict diseases based on user-provided symptoms. The application leverages a ***Multi-Layer Perceptron (MLP Classifier)*** machine learning model with an ***Accuracy of 94.42%*** and an ***F1-Score of 94.30%***. The system allows users to select from ***376 symptoms*** and predicts up to ***41 diseases*** with a ***confidence score threshold of 50%***.

Once a disease is predicted, the application provides detailed information including:

  1. Disease Description
  2. Precautions
  3. Recommended Diet
  4. Medications
  5. Doctor to be Consulted

Additionally, users can download a neatly formatted PDF prescription for their records. The frontend is built using React.js, providing a seamless
and interactive user experience, while the backend is powered by Flask, ensuring robust and efficient data handling.

  > [!NOTE]  
  > Checkout the screenshots of the web app in the **[HMS-Interface Preview](./HMS-Interface%20Preview)** folder.

---

## Dataset
  The dataset used in this project is a combination of two publicly available datasets:
  1. [Disease-Symptom Dataset (Kaggle)](https://www.kaggle.com/datasets/dhivyeshrk/diseases-and-symptoms-dataset)
  2. [Symptom-Disease Prediction Dataset (Mendeley)](https://data.mendeley.com/datasets/dv5z3v2xyd/1)
  
  After integrating these datasets, extensive processing - including symptom mapping, disease mapping, elimination of redundant features, and removal of duplicates was performed. The final dataset consists of:
  - **19,012 records**
  - **376 unique symptoms**
  - **41 disease labels**

For additional disease-related information such as **description, precautions, diet, medications, and consulted doctor**, the following resource was used: [Disease-Prediction-and-Medical-Recommendation-System](https://github.com/sohamvsonar/Disease-Prediction-and-Medical-Recommendation-System/tree/main/kaggle_dataset)

---

## Installation Guide
  Follow these steps to set up and run the Health Monitoring System on your local machine.

  ### Prerequisites
  Ensure you have the following installed:

  [![Python 3.8+](https://img.shields.io/badge/Python-3.8+-blue)](https://www.python.org/downloads)  
  [![Node.js](https://img.shields.io/badge/Node.js-LTS-green)](https://nodejs.org/en)  
  [![Git](https://img.shields.io/badge/Git-Latest-orange)](https://git-scm.com)  

**Step 1: Clone the Repository to your local machine**
  1. Run the following command to clone the repository:
     `git clone https://github.com/your-username/health-monitoring-system.git`
  2. Navigate to the project directory:
     `cd health-monitoring-system`

**Step 2: Set Up the Backend**
  1. Navigate to the backend folder:
     `cd backend`
  2. Create a virtual environment (optional but recommended):
     `python -m venv venv`
  3. Activate the virtual environment:
     - On Windows:
       `venv\Scripts\activate`
     - On macOS/Linux:
       `source venv/bin/activate`
  4. Install the required Python packages:
     `pip install -r requirements.txt`
  5. Run the Flask backend server:
     `python app.py`

**Step 3: Set Up the Frontend**
  1. Open a new terminal window and navigate to the frontend folder:
     `cd ../frontend`
  2. Install the required Node.js packages:
     `npm install`
  3. Start the React development server:
     `npm start`

**Step 4: Access the Application**
  Once both the backend and frontend servers are running, open your browser and navigate to
  [`https://localhost:3000`](https://localhost:3000) to access the Health Monitoring System.

---

## Project Directory Structure

  ![Project Directory Structure](https://github.com/user-attachments/assets/7f8693e3-a4ca-4970-aa32-ff536518f8bc)

---

## Usage
1. **Select Symptoms:** Use the search box to select your symptoms from the list of 376 symptoms.
2. **Submit:** Click on the "Submit" button to get the predicted disease with a confidence score of 50% or higher.
3. **View Details:** Once a disease is predicted, view the Disease Description, Precautions, Diet, Medications, and Doctor to be Consulted.
4. **Download Prescription:** If desired, download a PDF prescription for your records.

---

## Technologies Used
1. **Frontend:** React.js
2. **Backend:** Flask (Python)
3. **Machine Learning:** Multi-Layer Perceptron Model (scikit-learn library)
4. **PDF Generation:** jspdf & jspdf-autotable
5. **Styling:** CSS
