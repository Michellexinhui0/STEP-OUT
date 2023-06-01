from flask import Flask, jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
from app import db
import uuid

class User:
    def start_session(self, user):
        del user['password']
        session['logged_in'] = True
        session['user'] = user
        return jsonify(user), 200

    def signup(self):
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
        data = request.form
        email = data.get('email')
        password = data.get('password')
        
        user = db.users.find_one({
            "email": email
        })

        if user and pbkdf2_sha256.verify(password, user['password']):
            return self.start_session(user)

        return jsonify({"error": "Invalid login credentials"}), 401