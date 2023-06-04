from flask import Flask, redirect, render_template, url_for
from app import app
from user.models import User

@app.route('/user/signup', methods=['POST'])
def signup():
    return User().signup()

@app.route('/user/signout')
def signout():
    return User().signout()

@app.route('/search/', methods=['POST'])
def login_post():
    return User().login()



