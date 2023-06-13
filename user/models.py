import pprint
from flask import Flask, jsonify, render_template, request, session, redirect, url_for
from passlib.hash import pbkdf2_sha256
import uuid

class User:
    def start_session(self, user):
        del user['password']
        session['logged_in'] = True
        session['user'] = user
        return render_template("search.html"), 200

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
    
    #Function to query db to display on the search page table 10 patient's info
    #refer to search.html for the jinja for loop
    def patient_table(n):
        from app import db #import database connection info
        dict_patient = []
        nPatient= db.patient.find({'status':{"$in":["Hospitalized","Outlying"]} } ).limit(n) #find patient that are outlying or hospitalised to display on search page
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
            "surname": request.form.get('surname'),
            "given_name": request.form.get('given_name'),
            "admission_date": request.form.get('admission_date'),
            "status": request.form.get('status'),
            "last_update": request.form.get('last_update'),
        }
        
        if db.patient.find_one({"patient_id": patient['patient_id']}):
            return jsonify({"error": "Patient already registered"}), 400 
        
        if db.patient.insert_one(patient):
            return jsonify({"Success": "Patient registered"}), 200 
        
        return jsonify({"error": "Register patient failed"}), 400
