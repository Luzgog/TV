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
//ajouter_ligne("08:00", "1A3B", "006", "ER")
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
function to2nombre(nb){//renvoie un string avec 2 nombre quite' a rajouter 0 devant
    if (nb<10){
        return "0"+nb
    }else{
        return nb
    }
}
function recuperer_donnee(id){
    var ICAL = require("ical.js")
    var url = "http://127.0.0.1:5000/api/"+id
    fetch(url)
    .then(data => {
        if (data.ok == true){
            return data.json();
        }
    })
    .then(json => {
        return json.valeur
    })
    .then(ical =>{
        var calendrier = ICAL.parse(ical);
        var comp = new ICAL.Component(calendrier);
        var vevent = comp.getAllSubcomponents("vevent")//on recupere tout les evenements
        //console.log(vevent)
        vevent.forEach(element => {
            //console.log(element)
            //console.log("Nom du cour :" + element.getFirstPropertyValue("summary"))
            //console.log(element.getFirstPropertyValue("dtend"))
            var temps = element.getFirstPropertyValue("dtend")
            //console.log("heure de debut " + to2nombre(temps._time.hour) + "h" + to2nombre(temps._time.minute))
            //console.log(element.getFirstPropertyValue("location"))
            //console.log(element.getFirstPropertyValue("description"))
            ajouter_ligne(to2nombre(temps._time.hour) + "h" + to2nombre(temps._time.minute), "1AG1A", element.getFirstPropertyValue("location"), element.getFirstPropertyValue("summary"))
        });
        /*
        var vevent = comp.getFirstSubcomponent("vevent");
        var summary = vevent.getFirstPropertyValue("summary");
        console.log(summary)
        console.log(vevent)
        console.log(comp)*/
    })
    .catch(err=> {console.error(err)})
}
recuperer_donnee(95873)

function trier_tableau(){
    /*On parcoure chaque ligne et on ajoute a notre liste les elements de la ligne puis ensuite on trie la liste et on rajoute tout ce qui est dans la liste dans le tableau*/ 
    var tableRef = document.getElementById("tableau").getElementsByTagName("tbody")[0]
    var liste = [];
    console.log("2")
    for (var i =0; i< tableRef.rows.length; i++){
        var l = [];
        console.log("1")
        for (var j =0; j<tableRef.rows[i].cells.length; j++){
            l.push(tableRef.rows[i].cells[j].innerText)
            console.log("je rajoute " + tableRef.rows[i].cells[j].innerText)
        }
        liste.push(l)
    }
    console.log(liste)

}

/*
1A:
G3b : 95878
G1a : 95873


*/
//http://api.openweathermap.org/data/2.5/weather?id=2995468&appid=4502b4f9f62b856175f966968f504e09&lang=fr&units=metric