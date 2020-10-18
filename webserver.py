from flask import jsonify,Flask, render_template, redirect
import flask
#from flask_cors import CORS, cross_origin
import datetime, requests
app = Flask(__name__)
temps = datetime.datetime.now() + datetime.timedelta(days=2)
app.config['CORS_HEADERS'] = 'Content-Type'
MESSAGE_GENERAL = [""]
MOT_DE_PASSE="aaa"
def generer_url(id, time):
    """prend en entrée l'id qui correspond au groupe et renvoie  l'url"""
    return f"https://ade-web-consult.univ-amu.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?projectId=8&resources={id}&calType=ical&firstDate={time.year}-{str(time.month).zfill(2)}-{str(time.day).zfill(2)}&lastDate={time.year}-{str(time.month).zfill(2)}-{str(time.day).zfill(2)}"

@app.route("/api/<id>")#cette fonction est appelé a chaque fois que on contacte http://127.0.0.1/api/...
def api(id):# A faire, rajouter si jamais ya une erreur parceque yaura des erreurs et je veux pas que le serv s'arrete
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
            MESSAGE_GENERAL = message
            return render_template("form.html", message="Reussi")
        else:
            return render_template("form.html", message="Mot de passe invalide")
    return render_template("form.html", message="")

@app.route("/message")
def message():
    print(MESSAGE_GENERAL)
    res = jsonify(message = MESSAGE_GENERAL[0])
    res.headers['Access-Control-Allow-Origin'] = '*' #autorise tout le monde en CORS
    return res


if __name__ == "__main__":#permet de lancer 
    app.run()