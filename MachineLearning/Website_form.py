from flask import Flask, render_template, request

app = Flask(__name__)


@app.route("/")
def greeting():
    return render_template("form.html")


@app.route("/vehicle", methods=["POST"])
def vehicle():
    #     vehicle = []
    #     for i in range(6):
    #         estimate = request.args.get("vehicle")
    #         vehicle.append(estimate)
    form_data = request.form
    x = list(form_data.values())
    print("First one")
    print(x)
    x.pop(0)
    print("Second one")
    print(x)
    y = [
        "Age",
        "Diarrhea",
        "Difficulty in Breathing",
        "Dry Cough",
        "Fever",
        "Nasal",
        "Pains",
        "Runny Nose",
    ]

    for i in range(len(y)):
        if y[i] == x[i]:
            x[i] = 1
        elif y[i] != x[i]:
            x.insert(i, 0)
        print(x)
    #     return str(dict(form_data.values()))
    return str(list(form_data.values()))


if __name__ == "__main__":
    app.run()
