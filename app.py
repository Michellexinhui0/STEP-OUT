from flask import Flask, render_template, session, redirect
from functools import wraps
from user.models import functions
import pickle


from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://c_jq:stepout@stepout.hf5esdg.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

# Python -c 'import os; print(os.urandom(16))' to generate the secret key in terminal
app = Flask(__name__)
app.secret_key = b'\xf6,\xcc\x88\x9e1\xbc\xa8\xd5?\x1a\xf8{q\x92\x9e'

# Database
#client = pymongo.MongoClient('localhost', 27017)
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



@app.route('/search/')
@login_required
def search():
    dict_patient = functions.patient_table(10)
    return render_template('search.html', users=dict_patient)

@app.route('/patient', methods = ["GET"])
@login_required
def patient():
    return render_template('patient.html')

@app.route('/db/nPatient')
def view():
    return functions.patient_table(10)

model = pickle.load(open('./ANN.sav', 'rb'))
status = ""
doc = {} #dictionary for features, probably without R1

if __name__ == "__main__":
    context = ('local.crt', 'local.key')#certificate and key files
    app.run(debug=True, ssl_context=context)