function ajouter_ligne(heure, groupe, salle, nom){
    var tableRef = document.getElementById("tableau").getElementsByTagName("tbody")[0]
    var newRow   = tableRef.insertRow()
    var mot = heure
    for (var i = 0; i < 4; i++) {
        switch (i){
            case 0:
                mot = heure
                break
            case 1:
                mot = groupe
                break
            case 2:
                mot = salle
                break
            case 3:
                mot = nom
                break
        }
        var newCell  = newRow.insertCell(i)
        var newText  = document.createTextNode(mot)
        newCell.appendChild(newText)
    }
}
ajouter_ligne("08:00", "1A3B", "006", "ER")
function afficher_heure(){
    var date = new Date()
    var h = date.getHours()
    var m = date.getMinutes()
    /*
    Ce qui suit transforme les heures et les minutes en nombre a 2 chiffres(avec un zero devant en gros si c'est <10)*/
    h = (h < 10) ? "0" + h : h
    m = (m < 10) ? "0" + m : m
    var time = h + ":" + m
    document.getElementById("horloge").innerText = time
    document.getElementById("horloge").textContent = time
    setTimeout(afficher_heure, 1000)//on attend 1 seconde, ouai c'est peut etre overkill mais balek
}
afficher_heure()//on est obliger de le lancer une fois pour initialiser
function to2nombre(nb){//renvoie un string avec 2 nombre quite' a rajouter 8 devant
    if (nb<10){
        return "0"+nb
    }else{
        return nb
    }
}

function generer_url(id, temps){
    return "https://cors-anywhere.herokuapp.com/https://ade-web-consult.univ-amu.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?projectId=8&resources=" + id+"&calType=ical&firstDate=" + temps.getFullYear()+"-"+to2nombre(temps.getMonth())+"-" +to2nombre(temps.getDate())+"&lastDate="+temps.getFullYear()+"-"+to2nombre(temps.getMonth())+"-"+to2nombre(temps.getDate());
}

function recuperer_donnee(id){
    var url = "http://127.0.0.1:5000/api/"+id
    fetch(url)
    .then(data => {
        if (data.ok == true){
            //console.log("je lui envoie le json de ca")
            //console.log(data)
            return data.json();
        }
    })
    .then(json => {
        return json.valeur
    })
    .then(ical =>{
        var calendrier = ICAL.parse(ical);
        var comp = new ICAL.Component(calendrier);
        var vevent = comp.getFirstSubcomponent("vevent");
        var summary = vevent.getFirstPropertyValue("summary");
        console.log(comp)
        console.log(vevent)
        console.log(summary)
    })
    .catch(err=> {console.error(err)})
}
recuperer_donnee(95878)

//http://api.openweathermap.org/data/2.5/weather?id=2995468&appid=4502b4f9f62b856175f966968f504e09&lang=fr&units=metric