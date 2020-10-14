from ics import Calendar
import requests
import time
temps = time.localtime()

def generer_url(id, time):
    """prend en entrée l'id qui correspond au groupe et renvoie  l'url"""
    return f"https://ade-web-consult.univ-amu.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?projectId=8&resources={id}&calType=ical&firstDate={time.tm_year}-{str(time.tm_mon).zfill(2)}-{str(time.tm_mday).zfill(2)}&lastDate={time.tm_year}-{str(time.tm_mon).zfill(2)}-{str(time.tm_mday).zfill(2)}"


r = requests.get(generer_url(95873, temps))
c = Calendar(r.text)
for i in c.events:
    print(f" nom : {i.name}, heure de debut : {i.begin}, heure de fin {i.end}")



