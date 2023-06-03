# %%
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import tensorflow as tf
import seaborn as sns
import warnings
warnings.filterwarnings('ignore')

# %%
dataset = pd.read_csv('./Cleaned-data_1.3.csv')
dataset.head()

# %%
dataset.columns

# %%
dataset['Gender'].replace(['Male','Female','Transgender'], [0,1,2], inplace = True)
dataset['Severity Level'].replace([np.nan,'Mild','Moderate','Severe'], [0,1,2,3], inplace = True)

# %%
dataset.head()

# %%
dataset['Outlying Status'].value_counts()

# %%
dataset_corr = dataset
sns.set(rc={'figure.figsize':(15,15)})
sns.heatmap(dataset_corr.corr(), vmax=1, square=True, annot=True)
plt.show()

# %%
Y = dataset.iloc[:,-1].values
X = dataset.drop(['Gender','Outlying Status'],axis = 1)

# %%
X

# %%
#Splitting dataset into training and testing dataset
from sklearn.model_selection import train_test_split as tts
Trained_X,Tested_X,Trained_Y,Tested_Y = tts(X,Y,test_size=0.2,random_state=5)

# %%
from sklearn.ensemble import RandomForestClassifier as RFC
from sklearn.metrics import accuracy_score
rfc = RFC()
rfc.fit(Trained_X, Trained_Y)

y_pred4 = rfc.predict(Tested_X)
acc = accuracy_score(Tested_Y, y_pred4)
print('Accuracy of Random Forest: ', acc*100, '%')

# %%
import pickle

# %%
filename = 'Capstone_RFC_Model.sav'

# %%
pickle.dump(rfc,open(filename,'wb'))



# %%
