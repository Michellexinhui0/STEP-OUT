import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import warnings
warnings.filterwarnings('ignore')
import tensorflow as tf

dataset = pd.read_csv("./Machine_Learning/Final_Sample.csv")
dataset = dataset.drop('Gender', axis = 1)

Y = dataset.iloc[:,-1].values
X = dataset.iloc[:,0:-1].values

from sklearn.model_selection import train_test_split as tts
Trained_X,Tested_X,Trained_Y,Tested_Y = tts(X,Y,test_size=0.2,random_state=5)

from sklearn.preprocessing import StandardScaler as stdS
stdscaler = stdS()
Trained_X = stdscaler.fit_transform(Trained_X)
Tested_X = stdscaler.transform(Tested_X)

#Initialising ANN
from keras.models import Sequential
ann = Sequential()

 #Adding First Hidden Layer
from keras.layers import Dense
ann.add(Dense(units=60,activation="relu", kernel_initializer='uniform', input_dim = 18))

 #Adding Second Hidden Layer
ann.add(Dense(units=60,activation="relu",kernel_initializer='uniform'))

#Adding Third Hidden Layer
ann.add(Dense(units=60,activation="relu",kernel_initializer='uniform'))

#Adding Forth Hidden Layer
ann.add(Dense(units=60,activation="relu",kernel_initializer='uniform'))

 #Adding Fifth Hidden Layer
ann.add(Dense(units=60,activation="relu",kernel_initializer='uniform'))

 #Adding Sixth Hidden Layer
ann.add(Dense(units=40,activation="relu", kernel_initializer='uniform'))

 #Adding Seventh Hidden Layer
ann.add(Dense(units=20,activation="relu", kernel_initializer='uniform'))

 #Adding Output Layer
ann.add(Dense(units=1,kernel_initializer='uniform',activation="sigmoid"))

#Compiling ANN
ann.compile(optimizer="adam",loss="binary_crossentropy",metrics=['accuracy'])

#Fitting ANN
ann.fit(Trained_X,Trained_Y,batch_size=64,epochs = 100)
_, accuracy = ann.evaluate(Trained_X, Trained_Y)
print('Accuracy : %.2f' % (accuracy*100))

from sklearn.metrics import confusion_matrix
y_pred_proba1 = ann.predict(Tested_X)
y_pred_proba1 = (y_pred_proba1 > 0.5)

from sklearn.metrics import confusion_matrix
conf_mat = confusion_matrix(Tested_Y, y_pred_proba1)
confusion = sns.heatmap(conf_mat, square=False, annot=True, fmt='d', cbar=False,
                        xticklabels= ['Negative', 'Positive'],
                       yticklabels= ['Negative', 'Positive'])
plt.xlabel('true label')
plt.ylabel('predicted label')
plt.show()

from sklearn.metrics import accuracy_score
acc = accuracy_score(Tested_Y, y_pred_proba1)
print('Accuracy of ANN: ', acc*100, '%')

from sklearn.preprocessing import StandardScaler
stdscaler = StandardScaler()
print(ann.predict(stdscaler.fit_transform([[56,124,56,99,1,0,1,1,0,0,0,0,0,0,0,10,0,0]])) > 0.5)

import pickle
filename = 'ANN.sav'
pickle.dump(ann,open(filename,'wb'))