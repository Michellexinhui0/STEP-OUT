from flask import Flask, redirect, render_template, url_for, jsonify, request
from app import app, login_required, db
from user.models import User, functions
import numpy as np
import pickle
from sklearn.preprocessing import StandardScaler

@app.route('/user/signup', methods=['POST'])
def signup():
    return User().signup()

@app.route('/user/signout')
def signout():
    return User().signout()

@app.route('/user/login', methods=['POST'])
def login():
    return User().login()

@app.route('/addpatient/', methods=['POST'])
def add_patient():
    return functions.addPatient()

@app.route('/searchPatient', methods=['GET'])
def search_document():
    search_term = request.args.get('searchTerm', '')
    search_patient = []
    search_patient = functions.search_patient(search_term)
    return  render_template('search.html', users=search_patient)

#return personal info + current status return jsonify
@app.route('/patientdetails/', methods=['POST'])
def patientDetails():
    data = request.get_json()
    p_id = data['data']
    from app import db
    select_patient = db.patient.find_one({'patient_id': p_id})
    return jsonify(select_patient)


@app.route('/update', methods=['POST'])
def patientUpdate():
    data = request.get_json()
    print(data)
    patient_id = data['patient_id']
    status = data['status']
    reason = data['reason']
    
    query = {"patient_id": patient_id}
    doc = db.patient.find_one(query)
    if doc:
        doc["status"] = status
        doc["reason"] = reason
        db.patient.replace_one(query, doc)
        print("Status update success")
            
    else:
        print("no document found, failed")
        
    print(data['status'])
    print(data['reason'])
    return jsonify(200)

model = pickle.load(open('./ANN.sav', 'rb'))
status = ""
doc = {} #dictionary for features, probably without R1

def to_json(list_x):
    features = [
        'Age', 
        'Systolic bp', 'Diastolic bp', 
        'Oxygen Level', 'Allergies', 
        'Flu', 'Coughing', 
        'Diarrhea', 'Fatigue', 
        'Fever', 'Muscle Ache', 
        'Sore Throat', 'Cold', 
        'Legs Pains', 'Hands Pains', 
        'Stomach Pains', 'Chest Pains',
        'Eye Pains', 'R1'
    ]
    
    for key in features:
        for value in list_x:
            doc[key] = value
            list_x.remove(value)
            break
    print(str(doc))
    return doc

@app.route('/result', methods = ['POST'])
def receiveData():
    data =  request.get_json()
    print(data)
    nested = list(data['data'])
    p_id = nested[-1]
    print(p_id)
    query = {"patient_id": p_id}
    doc = db.patient.find_one(query)
    if doc:
        # Insert the first embedded JSON into specific embedded fields
        doc["hospital_visit"]["condition"]["systolic_BP"], doc["hospital_visit"]["condition"]["diastolic_BP"], doc["hospital_visit"]["condition"]["oxygen_lvl"] = nested[0]

        # Insert the second embedded JSON into specific embedded fields
        doc["hospital_visit"]["condition"]["gen_sickness"]["allergies"], doc["hospital_visit"]["condition"]["gen_sickness"]["flu"], doc["hospital_visit"]["condition"]["gen_sickness"]["coughing"], doc["hospital_visit"]["condition"]["gen_sickness"]["diarrhea"], doc["hospital_visit"]["condition"]["gen_sickness"]["fatigue"], doc["hospital_visit"]["condition"]["gen_sickness"]["fever"], doc["hospital_visit"]["condition"]["gen_sickness"]["muscle_ache"], doc["hospital_visit"]["condition"]["gen_sickness"]["sore_throat"], doc["hospital_visit"]["condition"]["gen_sickness"]["cold"] = nested[1]

        # Insert the third embedded JSON into specific embedded fields
        doc["hospital_visit"]["condition"]["legs"], doc["hospital_visit"]["condition"]["hands"], doc["hospital_visit"]["condition"]["stomach"], doc["hospital_visit"]["condition"]["chest"], doc["hospital_visit"]["condition"]["eyes"] = nested[2]

        # Save the updated document back to the database
        db.patient.replace_one(query, doc)
        print("Data inserted successfully.")
    else:
        print("No document found with the given patient id")
        
    age = doc.get("hospital_visit", {}).get("condition", {}).get("age")
    age = int(age)
    print(age)
    
    nested = nested[:-1]
    print("nested slice", nested)
    
    flat_list = [num for sublist in nested for num in sublist]
    flat_list.insert(0,age) #hard-coding age
    print("flat list here", flat_list)
    result = model.predict([flat_list])> 0.5
   
    to_json(flat_list) # convert the list to dic, but without the result
    if str(result) == "[[False]]":
        status = "Outlying"
        print(status)
        #flat_list.append(0) # Insert the R1 value
    elif str(result) == "[[ True]]":
        status = "Hospitalized"
        print(status)
        #flat_list.append(1) # Insert the R1 value
    package = {"status" : status}
    
    query2 = {"patient_id": p_id}
    doc2 = db.patient.find_one(query2)
    print(doc2)
    if doc2:
        doc2["status"] = status
        doc2["reason"] = "ML Output"
        db.patient.replace_one(query2, doc2)
        print("Status update success")
            
    else:
        print("no document found, failed")
    #to_json(flat_list)
    return jsonify(package)




