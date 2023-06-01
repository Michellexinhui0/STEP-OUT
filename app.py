from flask import Flask, render_template, session, redirect
from functools import wraps
import pymongo

#python -c 'import os; print(os.urandom(16))' to generate the secret key in terminal
app = Flask(__name__)
app.secret_key = b'\xf6,\xcc\x88\x9e1\xbc\xa8\xd5?\x1a\xf8{q\x92\x9e'

# Database
client = pymongo.MongoClient('localhost', 27017)
db = client.user_login_system

# Decorators
def login_required(f):
  @wraps(f)
  def wrap(*args, **kwargs):
    if 'logged_in' in session:
      return f(*args, **kwargs)
    else:
      return redirect('/')
  
  return wrap

# Routes
from user import routes

@app.route('/')
def home():
  return render_template('login.html')

@app.route('/ml/')
@login_required
def dashboard():
  return render_template('ml.html')