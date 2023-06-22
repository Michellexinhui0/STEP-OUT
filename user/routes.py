from flask import Flask, redirect, render_template, url_for
from app import app, login_required
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

@app.route('/test/', methods=['GET'])
@login_required
def test_func():
    dict_patient = functions.patient_table(10)  # assuming n is defined in your code
    return render_template('search.html', users=dict_patient)



