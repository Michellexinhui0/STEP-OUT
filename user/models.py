from flask import Flask, jsonify, render_template, request, session, redirect, url_for
from passlib.hash import pbkdf2_sha256
from app import db
import uuid

class User:
    def start_session(self, user):
        del user['password']
        session['logged_in'] = True
        session['user'] = user
        return render_template("search.html"), 200

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
        user = db.users.find_one({
            "email": request.form.get('email')
        })

        if user and pbkdf2_sha256.verify(request.form.get('password'), user['password']):
            return self.start_session(user)
    
        return jsonify({ "error": "Invalid login credentials" }), 401
    
    
