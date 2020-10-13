from flask import jsonify,Flask, render_template
#from flask_cors import CORS, cross_origin
import datetime, requests
app = Flask(__name__)
temps = datetime.datetime.now() + datetime.timedelta(days=1)
app.config['CORS_HEADERS'] = 'Content-Type'
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
"""
@app.route("/")
def index():
    return render_template("index.html")
"""
if __name__ == "__main__":#permet de lancer 
    app.run()