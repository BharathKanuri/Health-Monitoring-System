# Health Monitoring System

## Description
<p align="justify">
  The <b><i>Health Monitoring System</i></b> is a <b><i>web-based machine learning application</i></b> designed to predict diseases based on user-provided symptoms. The application 
  utilizes a <b><i>Multi-Layer Perceptron (MLP Classifier)</i></b> machine learning model, achieving an <b><i>accuracy of 94.42%</i></b> and an <b><i>f1-score of 94.30%</i></b>.
</p>
<p align="justify">
  This system enables users to select from <b><i>376 symptoms</i></b> and predicts up to <b><i>41 diseases</i></b> 
  with a <b><i>confidence score threshold of 50%</i></b>, ensuring reliable and data-driven health assessments. 
  Once a disease is predicted, the application provides detailed information including:
</p>

  1. Disease Description
  2. Precautions
  3. Recommended Diet
  4. Medications
  5. Doctor to be Consulted

<p align="justify">
  Additionally, users can download a neatly formatted PDF prescription for their records. The frontend is built using React.js, providing 
  a seamless and interactive user experience, while the backend is powered by Flask, ensuring robust and efficient data handling.
</p>

  > [!NOTE]  
  > Checkout the screenshots of the web app in the **[HMS-Interface Preview](./HMS-Interface%20Preview)** folder.

---

## Dataset
  The dataset used in this project is a combination of two publicly available datasets:
  1. [Disease-Symptom Dataset (Kaggle)](https://www.kaggle.com/datasets/dhivyeshrk/diseases-and-symptoms-dataset)
  2. [Symptom-Disease Prediction Dataset (Mendeley)](https://data.mendeley.com/datasets/dv5z3v2xyd/1)
<p align="justify">
  After integrating these datasets, extensive processing - including symptom mapping, disease mapping, elimination of 
  redundant features, and removal of duplicate records... was performed. The final dataset consists of:
</p>

  - **19,012 records**
  - **376 unique symptoms**
  - **41 disease labels**

<p align="justify">
  For additional disease-related information such as <b>description, precautions, diet, medications, and consulted doctor</b>, the following resource was used:<br>
  <a href="https://github.com/sohamvsonar/Disease-Prediction-and-Medical-Recommendation-System/tree/main/kaggle_dataset" 
     style="text-decoration: none; font-weight: bold; color: black;">
    Disease-Prediction-and-Medical-Recommendation-System
  </a>
</p>

---

## Installation Guide
  <p align="justify">
    Follow these steps to set up and run the Health Monitoring System on your local machine.
  </p>
  
### Prerequisites
  Ensure you have the following installed:
  <p align="justify">
    <a href="https://www.python.org/downloads">
      <img src="https://img.shields.io/badge/Python-3.8+-blue" alt="Python 3.8+">
    </a>  
    <br>
    <a href="https://nodejs.org/en">
      <img src="https://img.shields.io/badge/Node.js-LTS-green" alt="Node.js">
    </a>  
    <br>
    <a href="https://git-scm.com">
      <img src="https://img.shields.io/badge/Git-Latest-orange" alt="Git">
    </a>
  </p>
<p align="justify">
  <b>Step 1: Clone the Repository to your local machine</b><br><br>
  &nbsp;&nbsp;&nbsp;&nbsp;1. Run the following command to clone the repository:<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>git clone https://github.com/your-username/health-monitoring-system.git</code><br><br>
  &nbsp;&nbsp;&nbsp;&nbsp;2. Navigate to the project directory:<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>cd health-monitoring-system</code>
</p>
<p align="justify">
  <b>Step 2: Set Up the Backend</b><br><br>
  &nbsp;&nbsp;&nbsp;&nbsp;1. Navigate to the backend folder:<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>cd backend</code><br><br>
  &nbsp;&nbsp;&nbsp;&nbsp;2. Create a virtual environment (optional but recommended):<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>python -m venv venv</code><br><br>
  &nbsp;&nbsp;&nbsp;&nbsp;3. Activate the virtual environment:<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• <b>On Windows:</b><br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>venv\Scripts\activate</code><br><br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• <b>On macOS/Linux:</b><br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>source venv/bin/activate</code><br><br>
  &nbsp;&nbsp;&nbsp;&nbsp;4. Install the required Python packages:<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>pip install -r requirements.txt</code><br><br>
  &nbsp;&nbsp;&nbsp;&nbsp;5. Run the Flask backend server:<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>python app.py</code>
</p>

> [!NOTE]
> Before proceeding, please visit **[/frontend/README.md](./frontend/README.md)** for detailed instructions on setting up the React app.

<p align="justify">
  <b>Step 3: Set Up the Frontend</b><br><br>
  &nbsp;&nbsp;&nbsp;&nbsp;1. Open a new terminal window and navigate to the frontend folder:<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>cd ../frontend</code><br><br>
  &nbsp;&nbsp;&nbsp;&nbsp;2. Install the required Node.js packages:<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>npm install</code><br><br>
  &nbsp;&nbsp;&nbsp;&nbsp;3. Start the React development server:<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>npm start</code>
</p>
<p align="justify">
  <b>Step 4: Access the Application</b><br><br>
  &nbsp;&nbsp;&nbsp;&nbsp;Once both the backend and frontend servers are running, open your browser and<br>
  &nbsp;&nbsp;&nbsp;&nbsp;navigate to: <code><a href="https://localhost:3000"><b>https://localhost:3000</b></a></code> to access the Health Monitoring System.
</p>

---

## Project Directory Structure
  ![Project Directory Structure](https://github.com/user-attachments/assets/7f8693e3-a4ca-4970-aa32-ff536518f8bc)

---

## Usage
| **Step** | **Description** |
|----------|-----------------|
| **1. Select Symptoms** | Use the search box to select your symptoms from the list of 376 symptoms. |
| **2. Submit** | Click on the _Submit_ button to get the predicted disease with a confidence score of 50% or higher. |
| **3. View Details** | Once a disease is predicted, view the Disease Description, Precautions, Diet, Medications, and Doctor to be Consulted. |
| **4.&nbsp;Download&nbsp;Prescription** | If desired, download a PDF prescription for your records. |

---

## Technologies Used
1. **Frontend:** React.js
2. **Backend:** Flask (Python)
3. **Machine Learning:** Multi-Layer Perceptron Model (scikit-learn library)
4. **PDF Generation:** jspdf & jspdf-autotable libraries
5. **Styling:** CSS