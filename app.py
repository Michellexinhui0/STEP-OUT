from functools import wraps
from flask import Flask, render_template, session, redirect, request, jsonify
import pymongo
import numpy as np
import pickle
from sklearn.preprocessing import StandardScaler
app = Flask(__name__, template_folder= './templates', static_folder='./static')
model = pickle.load(open('./ANN.sav', 'rb'))
status = ""
doc = {} #dictionary for features, probably without R1

def to_json(list_x):
    features = [
        'Age', 
        'Systolic bp', 'Diastolic bp', 
        'Oxygen Level', 'Allergies', 
        'Flu', 'Coughing', 
        'Diarrhea', 'Fatigue', 
        'Fever', 'Muscle Ache', 
        'Sore Throat', 'Cold', 
        'Legs Pains', 'Hands Pains', 
        'Stomach Pains', 'Chest Pains',
        'Eye Pains', 'R1'
    ]
    
    for key in features:
        for value in list_x:
            doc[key] = value
            list_x.remove(value)
            break
    print(str(doc))
    return doc

# Python -c 'import os; print(os.urandom(16))' to generate the secret key in terminal
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
    return render_template('patient.html')


@app.route('/search/')
@login_required
def search():
    return render_template('search.html')

#@app.route('/patient/')
#@login_required
#def search():
#    return render_template('patient.html')

@app.route('/result', methods = ['POST'])
def receiveData():
    data =  request.get_json()
    nested = list(data['data'])
    flat_list = [num for sublist in nested for num in sublist]
    flat_list.insert(0,45) #hard-coding age
    result = model.predict([flat_list])> 0.5
   
    to_json(flat_list) # convert the list to dic, but without the result
    if str(result) == "[[False]]":
        status = "Outlying"
        print(status)
        #flat_list.append(0) # Insert the R1 value
    elif str(result) == "[[ True]]":
        status = "Hospitalized"
        print(status)
        #flat_list.append(1) # Insert the R1 value
    package = {"status" : status}
    #to_json(flat_list)
    return jsonify(package)

if __name__ == '__main__':
    app.run()