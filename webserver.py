from flask import jsonify,Flask, render_template
from flask_cors import CORS
import time, requests
app = Flask(__name__, static_folder='/static', template_folder='/template')
CORS(app)
def generer_url(id, time):
    """prend en entrée l'id qui correspond au groupe et renvoie  l'url"""
    return f"https://ade-web-consult.univ-amu.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?projectId=8&resources={id}&calType=ical&firstDate={time.tm_year}-{str(time.tm_mon).zfill(2)}-{str(time.tm_mday).zfill(2)}&lastDate={time.tm_year}-{str(time.tm_mon).zfill(2)}-{str(time.tm_mday).zfill(2)}"

@app.route("/api/<id>")
def api(id):# A faire, rajouter si jamais ya une erreur parceque yaura des erreurs et je veux pas que le serv s'arrete
    r = requests.get(generer_url(95878, time.localtime()))
    return jsonify({"valeur" : r.text})

@app.route("/")
def index():
    return render_template("index.html")
if __name__ == "__main__":#permet de lancer 
    app.run()