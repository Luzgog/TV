from ics import Calendar
import requests
import time
temps = time.struct_time((2020, 9, 28, 1,1,1,0, 272, 0))

def generer_url(id, time):
    """prend en entrée l'id qui correspond au groupe et renvoie  l'url"""
    return f"https://ade-web-consult.univ-amu.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?projectId=8&resources={id}&calType=ical&firstDate={time.tm_year}-{str(time.tm_mon).zfill(2)}-{str(time.tm_mday).zfill(2)}&lastDate={time.tm_year}-{str(time.tm_mon).zfill(2)}-{str(time.tm_mday).zfill(2)}"

#url = "https://ade-web-consult.univ-amu.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?projectId=8&resources=95878&calType=ical&firstDate=2020-09-25&lastDate=2020-09-25"

#print(generer_url(95878, temps))
#print("https://ade-web-consult.univ-amu.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?projectId=8&resources=95878&calType=ical&firstDate=2020-09-28&lastDate=2020-09-28")
#assert(generer_url(95848, temps)== "https://ade-web-consult.univ-amu.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?projectId=8&resources=95878&calType=ical&firstDate=2020-09-28&lastDate=2020-09-28")


while True:
    try:
        r = requests.get(generer_url(95878, temps))
        break
    except requests.exceptions.Timeout:
        # Maybe set up for a retry, or continue in a retry loop
        print("erreur timeout on reessaie dans 30 secondes")
        time.sleep(30)
    except requests.exceptions.TooManyRedirects:
        # Tell the user their URL was bad and try a different one
        print("Too many redirect")
        exit()
    except requests.exceptions.RequestException as e:
    # catastrophic error. bail.
        raise SystemExit(e)
c = Calendar(r.text)
for i in c.events:
    print(f" nom : {i.name}, heure de debut : {i.begin}, heure de fin {i.end}")



