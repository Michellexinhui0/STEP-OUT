from flask import Flask, redirect, render_template, url_for
from app import app
from user.models import User, functions

@app.route('/user/signup', methods=['POST'])
def signup():
    return User().signup()

@app.route('/user/signout')
def signout():
    return User().signout()

@app.route('/search/', methods=['POST'])
def login_post():
    return User().login()

@app.route('/addpatient/', methods=['POST'])
def add_patient():
    return functions.addPatient()

@app.route('/search/', methods=['GET'])
def test_func():
    return functions.patient_table(10)



