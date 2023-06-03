import numpy as np
import pandas as pd

data = pd.read_csv('./Machine_Learning/Sample.csv')
data.head()
data.describe()

Gender = data.Gender.tolist()
Age = data.Age.tolist()
Sysbp = data.Systolic_bp.tolist()
Diabp = data.Diastolic_Bp.tolist()
OxyLvl = data.Oxygen_Level.tolist()
Allergies = data.Allergies.tolist()
Flu = data.Flu.tolist()
Coughing = data.Coughing.tolist()
Diarrhea = data.Diarrhea.tolist()
Fatigue = data.Fatigue.tolist()
Fever = data.Fever.tolist()
MuscleAche = data.Muscle_Ache.tolist()
Sore_Throat = data.Sore_Throat.tolist()
Cold = data.Cold.tolist()
Legs = data.Legs_Pains.tolist()
Hands = data.Hands_Pains.tolist()
Stomach = data.Stomach_Pains.tolist()
Chest = data.Chest_Pains.tolist()
Eye = data.Eye_Pains.tolist()
Sum = data.Sum.tolist()

Result = []
counts = 0
for x in Age:
    if (Age[x] > 70)&((Sysbp[x] > 140)|(Sysbp[x] < 75))&((Diabp[x] >90)|(Diabp[x] < 45))|(OxyLvl[x] < 93):
        rand = np.random.randint(0,101)
        counts +=1
        if rand > 15:
            Result.append(1)
        else: 
            Result.append(0)
        continue
    if (Stomach[x] >= 8)|(Chest[x] >= 8)|(Eye[x] >= 8):
        rand = np.random.randint(0,101)
        counts +=1
        if rand > 15:
            Result.append(1)
        else: 
            Result.append(0)
        continue
    if Sum[x] >= 8:
        rand = np.random.randint(0,101)
        counts +=1
        if rand > 25:
            Result.append(1)
        else: 
            Result.append(0)
        continue
    else:
        Result.append(0)

Result = pd.DataFrame(data= Result, columns= ['Result'])
Result.value_counts()
counts
Gender = pd.DataFrame(data=Gender, columns=['Gender'])
Age = pd.DataFrame(data=Age, columns=['Age'])
Sysbp = pd.DataFrame(data=Sysbp, columns=['Systolic_bp'])
Diabp = pd.DataFrame(data=Diabp, columns=['Diastolic_bp'])
OxyLvl = pd.DataFrame(data=OxyLvl, columns=['Oxygen_Level'])
Allergies = pd.DataFrame(data=Allergies, columns=['Allergies'])
Flu = pd.DataFrame(data=Flu, columns=['Flu'])
Coughing = pd.DataFrame(data=Coughing, columns=['Coughing'])
Diarrhea = pd.DataFrame(data=Diarrhea, columns=['Diarrhea'])
Fatigue = pd.DataFrame(data=Fatigue, columns=['Fatigue'])
Fever = pd.DataFrame(data=Fever, columns=['Fever'])
MuscleAche = pd.DataFrame(data=MuscleAche, columns=['Mushle_Ache'])
Sore_Throat = pd.DataFrame(data=Sore_Throat, columns=['Sore_Throat'])
Cold = pd.DataFrame(data=Cold, columns=['Cold'])
Legs = pd.DataFrame(data=Legs, columns=['Legs_Pains'])
Hands = pd.DataFrame(data=Hands, columns=['Hands_Pains'])
Stomach = pd.DataFrame(data=Stomach, columns=['Stomach_Pains'])
Chest = pd.DataFrame(data=Chest, columns=['Chest_Pains'])
Eye = pd.DataFrame(data=Eye, columns=['Eye_Pains'])
result = pd.concat([Gender, Age, Sysbp, Diabp, OxyLvl, Allergies, Flu, Coughing, Diarrhea, Fatigue, Fever, MuscleAche, Sore_Throat, Cold, Legs, Hands, Stomach, Chest
                    , Eye ,Result], axis = 1)
result.to_csv('./Machine_Learning/Final_Sample.csv', index=False)