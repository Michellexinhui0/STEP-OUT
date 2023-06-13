from flask import Flask, render_template, request, jsonify
import json
import pickle
import numpy as np
from sklearn.preprocessing import StandardScaler
app = Flask(__name__, template_folder= './Machine_Learning/templates', static_folder='./Machine_Learning/static')
model = pickle.load(open('./Machine_Learning/ANN.sav', 'rb'))
status = ""
doc = {}

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

@app.route('/')
def greeting():
    return render_template('patient.html')

@app.route('/result', methods = ['POST'])
def receiveData():
    data =  request.get_json()
    nested = list(data['data'])
    flat_list = [num for sublist in nested for num in sublist]
    flat_list.insert(0,45) #hard-coding age
    result = model.predict([flat_list])> 0.5
   
    to_json(flat_list)
    if str(result) == "[[False]]":
        status = "Outlying"
        print(status)
    elif str(result) == "[[ True]]":
        status = "Hospitalized"
        print(status)
    package = {"status" : status}
    return jsonify(package)


if __name__ == '__main__':
    app.run()
