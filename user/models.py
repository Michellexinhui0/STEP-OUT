from flask import Flask, jsonify, render_template, request, session, redirect, url_for
from passlib.hash import pbkdf2_sha256
import uuid

class User:
    def start_session(self, user):
        del user['password']
        session['logged_in'] = True
        session['user'] = user
        return jsonify(user), 200

    def signup(self):
        from app import db
        print(request.form)

        # Create user objects
        user = {
            "_id": uuid.uuid4().hex,
            "email": request.form.get('email'),
            "password": request.form.get('password')
        }

        # Encrypting password
        user['password'] = pbkdf2_sha256.hash(user['password'])
        
        if db.users.find_one({"email": user['email']}):
            return jsonify({"error": "Email address already in use"}), 400 
        
        if db.users.insert_one(user):
            return self.start_session(user)  
        
        return jsonify({"error": "Signup failed"}), 400
    
    def signout(self):
        session.clear()
        return redirect('/')
    
    def login(self):
        from app import db
        user = db.users.find_one({
            "email": request.form.get('email')
        })

        if user and pbkdf2_sha256.verify(request.form.get('password'), user['password']):
            return self.start_session(user)
    
        return jsonify({ "error": "Invalid login credentials" }), 401
    

class functions:
    
    #Function to query db for a specifc patient to display on the search page.
    def search_patient(searchTerm):
        from app import db #import database connection info
        
        condition = {'$or': [
        {'patient_id': searchTerm},
        {'name.surname': searchTerm},
        {'name.given_name': searchTerm}
        ]}
        
        dict_patient = []
        nPatient= db.patient.find(condition)
        for patient in nPatient:
            dict_patient.append(patient)
        return dict_patient
     
    #Function to query db to display on the initial search page table with patient's info
    #Refer to search.HTML with a jinja for loop
    def patient_table(n):
        from app import db #import database connection info
        dict_patient = []
        #find patient that are outlying or hospitalised to display on search page
        nPatient= db.patient.find({'status':{"$in":["Hospitalized","Outlying"]} } ).limit(n) 
        for patient in nPatient:
            dict_patient.append(patient)
        return dict_patient
    
    #Function to add patient into db using postman
    #function used only with postman dont change.
    def addPatient():
        from app import db
        
        patient={
            "_id": uuid.uuid4().hex,
            "patient_id": request.form.get('patient_id'),
            "name": {
                "surname": request.form.get('surname'), 
                "given_name": request.form.get('given_name')
                },
            "gender": request.form.get('gender'),
            "DOB": {
                "day": request.form.get('day'), 
                "month": request.form.get('month'), 
                "year": request.form.get('year')
                },
            "hospital_visit": {
                "admission_date": request.form.get('admission_date'),
                "ward": request.form.get('ward'),
                "doctor": request.form.get('doctor'),
                "condition": {
                    "age": request.form.get('age'),
                    "systolic_BP": request.form.get('systolic_BP'),
                    "diastolic_BP": request.form.get('diastolic_BP'),
                    "oxygen_lvl": request.form.get('oxygen_lvl'),
                    "gen_sickness": {
                        "allergies": request.form.get('allergies'),
                        "flu": request.form.get('flu'),
                        "coughing": request.form.get('coughing'),
                        "diarrhea": request.form.get('diarrhea'),
                        "fatigue": request.form.get('fatigue'),
                        "fever": request.form.get('fever'),
                        "muscle_ache": request.form.get('muscle_ache'),
                        "sore_throat": request.form.get('sore_throat'),
                        "cold": request.form.get('cold'),
                    },
                    "legs": request.form.get('legs'),
                    "hands": request.form.get('hands'),
                    "stomach": request.form.get('stomach'),
                    "chest": request.form.get('chest'),
                    "eyes": request.form.get('eyes'),
                    },
                },
            
            "status": request.form.get('status'),
            "last_update": request.form.get('last_update')
        }
        
        if db.patient.find_one({"patient_id": patient['patient_id']}):
            return jsonify({"error": "Patient already registered"}), 400 
        
        if db.patient.insert_one(patient):
            return jsonify({"Success": "Patient registered"}), 200 
        
        return jsonify({"error": "Register patient failed"}), 400
