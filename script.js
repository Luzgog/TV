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
function set_map_nombre(){
    var map = new Map()
    //1ere annee

    map.set(1, 95873)
    map.set(2, 95874)
    map.set(4, 95875)
    map.set(5, 95876)
    map.set(6, 95877)
    map.set(8, 95878)
    map.set(10, 95879)
    map.set(11, 95880)

    //2eme annee
    map.set(50, 43724)
    map.set(51, 43786)
    map.set(52, 18832)
    map.set(53, 32167)
    map.set(54, 32189)
    map.set(55, 43713)

    //1ere annee apprentie
    map.set(320, 54062)
    map.set(321, 21383)

    //2eme annee apprentie
    map.set(650, 123861)
    map.set(651, 123860)
    return map
}
function set_map_str(){
    var map = new Map()
    map.set(1, "1A G1A")
    map.set(2, "1A G1B")
    map.set(4, "1A G2A")
    map.set(5, "1A G2B")
    map.set(6, "1A G3A")
    map.set(8, "1A G3B")
    map.set(10, "1A G4A")
    map.set(11, "1A G4B")

    map.set(21, "1A G4")
    map.set(14, "1A G3")
    map.set(9, "1A G2")
    map.set(3, "1A G1")
    map.set(47, "1A")

    map.set(50, "2A G1A")
    map.set(51, "2A G1B")
    map.set(52, "2A G2A")
    map.set(53, "2A G2B")
    map.set(54, "2A G3A")
    map.set(55, "2A G3B")

    map.set(101, "2A G1")
    map.set(105, "2A G2")
    map.set(109, "2A G3")
    map.set(315, "2A")

    map.set(320, "1A APP A")
    map.set(321, "1A APP B")

    map.set(641, "1A APP")

    map.set(650, "2A APP A")
    map.set(651, "2A APP B")

    map.set(1301, "2A APP")
    return map
}
// liste de liste [ UUID, temps._time, location, summary, groupe]
var numero_groupe = []
class Liste_made_by_me{
    constructor(){
        this.valeur = []
    }
    ajouter_a_la_liste(element){
        var deja_present = false
        for (var i =0; i<this.valeur.length; i++) {
            if (this.valeur[i][0] == element[0]){// si le cour est deja present, on ajoute le groupe a celui ci
                this.valeur[i][4] += element[4]// on additionne les numero correspondant aux groupes
                //console.log("Valeur deja presente")
                numero_groupe.push(element[4])
                deja_present=true 
            }
        }
        if (!deja_present){
            this.valeur.push(element)
            numero_groupe.push(element[4])
        }
    }
    trier_liste(){
        this.valeur.sort((a, b) => { // il faut faire une fonction qui prend 2 listes et doit retourner un nombre negatif si la liste a vient avant la liste b et positif sinon
            var nb1 = Date.parse(to2nombre(a[1].date)+'/'+to2nombre(a[1].month)+ '/' + a[1].year + " " + to2nombre(a[1].hour)+ ":" + to2nombre(a[1].minute) +":00");
            var nb2 = Date.parse(to2nombre(b[1].date)+'/'+to2nombre(b[1].month)+ '/' + b[1].year + " " + to2nombre(b[1].hour)+ ":" + to2nombre(b[1].minute) +":00");
            if (nb1<nb2){
                return 1;
            }
            if (nb1>nb2){
                return -1;
            }
            else{
                return 0
            }
        });
        
    }
    
}
function nom_groupe(nb){
    var map_str = set_map_str()
    if (!map_str.has(nb)){//si le nombre n'est pas present dans la liste
        console.log("le nombre " + nb+ " n'est pas present dans le map")
    }
    return map_str.get(nb)
}
var objet = new Liste_made_by_me();
function liste_au_tableau(){ // j'ai essayer de mettre cette fonction dans la classe mais ca marche pas, bug de javascript
    //console.log("la liste fait "+ objet.valeur.length + "de long")
    for (var i = 0; i < objet.valeur.length; i++){
        ajouter_ligne(to2nombre(objet.valeur[i][1].hour) + ":" + to2nombre(objet.valeur[i][1].minute), nom_groupe(objet.valeur[i][4]), objet.valeur[i][2], objet.valeur[i][3]);
    }

}

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


function recuperer_donnee(numero_groupe, id){
    var ICAL = require("ical.js")
    var url = "http://127.0.0.1:5000/api/"+id
    /*
    var http = new XMLHttpRequest();
    http.open("GET", url)
    http.send()
    http.onreadystatechange()
    */
    
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
        //console.log("je recupere les données suivante : \n"+ical)
        var calendrier = ICAL.parse(ical);
        var comp = new ICAL.Component(calendrier);
        var vevent = comp.getAllSubcomponents("vevent")//on recupere tout les evenements
        vevent.forEach(element => {
            var liste = []
            liste.push(element.getFirstPropertyValue("uid"))
            liste.push(element.getFirstPropertyValue("dtend")._time) //[ UUID, temps._time, location, summary, groupe]
            if (element.getFirstPropertyValue("location") == ""){
                liste.push("Distanciel")
            }// Si ya pas de salle c'est que c'est forcement distanciel
            else{
                liste.push(element.getFirstPropertyValue("location"))
            }
            liste.push(element.getFirstPropertyValue("summary"))
            liste.push(numero_groupe)
            objet.ajouter_a_la_liste(liste)
            console.log("fini avec le groupe " + nom_groupe(numero_groupe))
        });
    })
    .catch(err =>{
        console.log(err)
    })

}
function main(){
    //var map_nombre = set_map_nombre()
    var p = new Promise(function(resolve, reject){
        recuperer_donnee(1, 95873)
        console.log("groupe 1a")
        recuperer_donnee(2, 95874)
        console.log("groupe 1b")
        recuperer_donnee(4, 95875)
        console.log("groupe 2a")
        recuperer_donnee(5, 95876)
        console.log("groupe 2b")
        recuperer_donnee(6, 95877)
        console.log("groupe 3a")
        recuperer_donnee(8, 95878)
        console.log("groupe 3b")
        recuperer_donnee(10, 95879)
        console.log("groupe 4a")
        recuperer_donnee(11, 95880)
        console.log("groupe 4b")
    })
    setTimeout(function(){

        console.log(objet.valeur)
        objet.trier_liste()
        liste_au_tableau()
    }, 5000);

}

main()


//http://api.openweathermap.org/data/2.5/weather?id=2995468&appid=4502b4f9f62b856175f966968f504e09&lang=fr&units=metric
/*
code pour les groupes
1: 1A G1a
2: 1A G1b
4: 1A G2a
5: 1A G2b
6: 1A G3a
8: 1A G3b
10: 1A G4a
11: 1A G4b

G4 = 21
G3 = 14
G2 = 9
G1 = 3
1A = 47

50: 2A G1a
51: 2A G1b
52: 2A G2a
53: 2A G2b
54: 2A G3a
55: 2A G3b


G1 = 101
G2 = 105
G3 = 109
2A = 315

1ere annee apprentie 
320 : 1A APP A
321: 1A APP B
1A APP = 641

2eme année apprentie
650 : 2A APP A
651 : 2A APP B
2A APP = 1301
*/
/*
    //1ere annee
    //map.set("1A", 95872)
    //map.set("1A G1", 97637)
    map.set("1A G1 A", 95873)
    map.set("1A G1 B", 95874)
    //map.set("1A G2", 97638)
    map.set("1A G2 A", 95875)
    map.set("1A G1 B", 95876)
    //map.set("1A G3", 97639)
    map.set("1A G3 A", 95877)
    map.set("1A G3 B", 95878)
    //map.set("1A G4", 97640)
    map.set("1A G4 A", 95879)
    map.set("1A G4 B", 95880)


    //2eme annee
    //map.set("2A", 18854)
    map.set("2A G1 A", 43724)
    map.set("2A G1 B", 43786)
    map.set("2A G2 A", 18832)
    map.set("2A G2 B", 32167)
    map.set("2A G3 A", 32189)
    map.set("2A G3 B", 43713)

    //1ere annee apprentie
    //map.set("1A APP", 24043)
    map.set("1A APP A", 54062)
    map.set("1A APP B", 21383)

    //2eme annee apprentie
    //map.set("2A APP", 24043)
    map.set("2A APP A", 54062)
    map.set("2A APP B", 21383)
*/