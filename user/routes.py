from flask import Flask
from app import app, login_required
from user.models import User

@app.route('/signup', methods=['POST'])
def signup():
    return User().signup()

@app.route('/signout')
def signout():
    return User().signout()

@app.route('/', methods=['POST'])
def login():
    return User().login()

@app.route('/search/')
@login_required
def search():
    return render_template('search.html')
