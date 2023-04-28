'''
To do for this file later
1. Separate the machine learning from the function so that i can insert the data into db
2. Add mongodb    
'''

from flask import Flask,render_template,request, url_for, redirect
import pickle
import numpy as np

@app.route('/')
def greeting():
    return render_template('form.html')


@app.route("/result", methods=['POST'])
def predict(): 
    form_data = request.form
    x = list(form_data.values())
    print("raw data ",x)
    x.pop(0)
    print("remove 0 ", x)
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
        else :
            y[i]=1
            z.append(y[i])
    print("this is z ", z)
    
    #inserting  data into db

    
    loaded_model = pickle.load(open('Capstone_RFC_model.sav','rb'))
    a = np.expand_dims(z,0)
    result = str(loaded_model.predict(a))
    print(result)
    return result


if __name__=='__main__':
    app.run()



'''
Old @jq Code
from flask import Flask, render_template, request
import pickle
import numpy as np

app = Flask(__name__)


@app.route("/")
def greeting():
    return render_template("form.html")


@app.route("/compare_lists", methods=["POST"])

def compare_lists(x, y):
    form_data = request.form
    x = list(form_data.values())
    z = []
    i = 0
    for yi in y:
        if yi in x:
            z.append(1)
        else:
            z.append(0)
        i += 1
    print(z)
    return z

if __name__ == "__main__":
    app.run()
'''