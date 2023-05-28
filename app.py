from flask import Flask, render_template, session, redirect
from functools import wraps
import pymongo

app = Flask(__name__)
app.secret_key = b'\xe7\xb0\x87\x02\x83\x15n\x05x\xee\x1c)w\x12pE'

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

@app.route('/patient/')
@login_required
def dashboard():
  return render_template('patient.html')