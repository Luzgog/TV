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
function clear_tableau(){
    var tableHeaderRowCount = 1;
    var table = document.getElementById("tableau");
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
}
}
function trier_tableau(){
    /*On parcoure chaque ligne et on ajoute a notre liste les elements de la ligne puis ensuite on trie la liste et on rajoute tout ce qui est dans la liste dans le tableau*/ 
    var tableRef = document.getElementById("tableau").getElementsByTagName("tbody")[0]
    var liste = [];
    for ( i =0; i< tableRef.rows.length; i++){
        var l = [];
        for ( j =0; j<tableRef.rows[i].cells.length; j++){
            l.push(tableRef.rows[i].cells[j].innerText)
        }
        liste.push(l)
    }
    //a partir de maintenant on a une liste qui contient des listes qui contiennent chaque element
    liste.sort(function(a, b) { // il faut faire une fonction qui prend 2 listes et doit retourner un nombre negatif si la liste a vient avant la liste b et positif sinon
        var temps = new Date()
        var nb1 = Date.parse(to2nombre(temps.getDate())+'/'+to2nombre(temps.getMonth())+ '/' + temps.getFullYear() + " " + a[0]+":00");
        var nb2 = Date.parse(to2nombre(temps.getDate())+'/'+to2nombre(temps.getMonth())+ '/' + temps.getFullYear() + " " + b[0]+":00");
        return nb1-nb2
    })
    console.log(liste)
    clear_tableau()
    
    for(i = 0; i<liste.length; i++){
        ajouter_ligne(liste[i][0], liste[i][1], liste[i][2], liste[i][3])
    }
}
function set_map(){
    var map = new Map()
    //1ere annee
    map.set("1A", 95872)
    map.set("1A G1", 97637)
    map.set("1A G1 A", 95873)
    map.set("1A G1 B", 95874)
    map.set("1A G2", 97638)
    map.set("1A G2 A", 95875)
    map.set("1A G1 B", 95876)
    map.set("1A G3", 97639)
    map.set("1A G3 A", 95877)
    map.set("1A G3 B", 95878)
    map.set("1A G4", 97640)
    map.set("1A G4 A", 95879)
    map.set("1A G4 B", 95880)


    //2eme annee
    map.set("2A", 18854)
    map.set("2A G1 A", 43724)
    map.set("2A G1 B", 43786)
    map.set("2A G2 A", 18832)
    map.set("2A G2 B", 32167)
    map.set("2A G3 A", 32189)
    map.set("2A G3 B", 43713)

    //1ere annee apprentie
    map.set("1A APP", 24043)
    map.set("1A APP A", 54062)
    map.set("1A APP B", 21383)

    //2eme annee apprentie
    map.set("2A APP", 24043)
    map.set("2A APP A", 54062)
    map.set("2A APP B", 21383)
}
var map = set_map();

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
        console.log(vevent)
        vevent.forEach(element => {
            var temps = element.getFirstPropertyValue("dtend")
            var d = element.getFirstPropertyValue("description")
            ajouter_ligne(to2nombre(temps._time.hour) + ":" + to2nombre(temps._time.minute),"1A APP", element.getFirstPropertyValue("location"), element.getFirstPropertyValue("summary"))
            console.log(element.getFirstPropertyValue("UUID"))
        });
        trier_tableau()
        /*
        var vevent = comp.getFirstSubcomponent("vevent");
        var summary = vevent.getFirstPropertyValue("summary");
        console.log(summary)
        console.log(vevent)
        console.log(comp)*/
    })
    .catch(err=> {console.error(err)})
}
recuperer_donnee(18832)
recuperer_donnee(32167)


//http://api.openweathermap.org/data/2.5/weather?id=2995468&appid=4502b4f9f62b856175f966968f504e09&lang=fr&units=metric