from flask import Flask, redirect, render_template, url_for, jsonify, request
from app import app, login_required
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
    nested = list(data['data'])
    flat_list = [num for sublist in nested for num in sublist]
    flat_list.insert(0,45) #hard-coding age
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
    #to_json(flat_list)
    return jsonify(package)




