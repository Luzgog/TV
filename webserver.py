from flask import jsonify,Flask, render_template, redirect
import flask
import datetime, requests
app = Flask(__name__)
temps = datetime.datetime.now() + datetime.timedelta(days=5)
app.config['CORS_HEADERS'] = 'Content-Type'
class M:
    def __init__(self):
        with open("message.txt", 'r') as file:
            self.message = file.read()
    def changer(self, new):
        self.message=new
        print(self.message)
        with open("message.txt", 'w') as file:
            file.write(new[0])
M = M()
MOT_DE_PASSE="aaa"


def generer_url(id, time):
    """prend en entrée l'id qui correspond au groupe et renvoie  l'url"""
    return f"https://ade-web-consult.univ-amu.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?projectId=8&resources={id}&calType=ical&firstDate={time.year}-{str(time.month).zfill(2)}-{str(time.day).zfill(2)}&lastDate={time.year}-{str(time.month).zfill(2)}-{str(time.day).zfill(2)}"

@app.route("/api/<id>")#cette fonction est appelé a chaque fois que on contacte http://127.0.0.1/api/...
def api(id):
    url = generer_url(id, temps)
    r = requests.get(url)
    res = jsonify(valeur = r.text)
    res.headers['Access-Control-Allow-Origin'] = '*' #autorise tout le monde en CORS
    return res

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/form", methods=["GET", "POST"])
def sign_up():
    if flask.request.method == "POST":
        message = flask.request.form.getlist("message")
        mdp = flask.request.form.getlist("mdp")
        if mdp == [MOT_DE_PASSE]:
            M.changer(message[0])
            return render_template("form.html", message="Reussi")
        else:
            return render_template("form.html", message="Mot de passe invalide")
    return render_template("form.html", message="")

@app.route("/message")
def message():
    print(M.message)
    res = jsonify(message = M.message)
    res.headers['Access-Control-Allow-Origin'] = '*' #autorise tout le monde en CORS
    return res


if __name__ == "__main__":#permet de lancer 
    app.run()