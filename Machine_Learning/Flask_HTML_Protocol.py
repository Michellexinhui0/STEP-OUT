from flask import Flask, render_template, request
import pickle
import numpy as np

app = Flask(__name__, template_folder= './Machine_Learning/templates', static_folder='./Machine_Learning/static')

@app.route('/')
def greeting():
    return render_template('patient.html')

@app.route("/result", methods=['POST'])
def predict():
    form_data = request.form
    x = list(form_data.values())
    raw_data = [str(x[0])]
    print("This is the First Raw Data:", raw_data)
    x.pop(0)
    y = ['Age',
         'Diarrhea',
         'Difficulty in Breathing',
         'Dry Cough',
         'Fever',
         'Nasal',
         'Pains',
         'Runny Nose',
         'Sore Throat',
         'Tireness']
    z = [int(x[0])]
    for i in range(len(y)):
        if y[i] not in x:
            z.insert(i+1, 0)
        else:
            y[i] = 1
            z.append(y[i])
    # print(z)
    for i in range(len(z)):
        raw_data.append(str(z[i]))
    # print("This is the Second Raw Data:", raw_data)
    feature_data = [
        'Gender',
        'Severity',
        'Age',
        'Diarrhea',
        'Difficulty in Breathing',
        'Dry Cough',
        'Fever',
        'Nasal',
        'Pains',
        'Runny Nose',
        'Sore Throat',
        'Tireness'
    ]
    
    doc = {}
    for key in feature_data:
        for value in raw_data:
            doc[key] = value
            raw_data.remove(value)
            break
    
    # print('This is the dictinary: ', doc)
    loaded_model = pickle.load(open('./Machine_Learning/Capstone_RFC_Model.sav', 'rb'))
    a = np.expand_dims(z, 0)
    result = str(loaded_model.predict(a))
    print(result)
    return result


if __name__ == '__main__':
    app.run()
