y = [
        "Age",
        "Diarrhea",
        "Difficulty in Breathing",
        "Dry Cough",
        "Fever",
        "Nasal",
        "Pains",
        "Runny Nose"
    ]

x = [
        "Age",
        "Diarrhea",
        "Difficulty in Breathing",
        "Dry Cough",
        "Nasal",
        "Runny Nose"
    ]

#z = []
#j = 0
#
#
#for i in y:
#    if i == x[j]:
#        print(i)
#        z.append(1)
#        j+=1
#    else:
#        z.append(0)
#print(z)

def compare_lists(x, y):
    z = []
    i = 0
    for yi in y:
        if yi in x:
            z.append(1)
        else:
            z.append(0)
        i += 1
    return print(z)

compare_lists(x, y)
