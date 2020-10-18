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

    //LP Epocs
    map.set(1400, 29128)
    map.set(1401, 29149)

    //LP RSF
    map.set(2900, 29178)
    map.set(3000, 58120)
    map.set(3100, 29179)
    map.set(3200, 29180)
    map.set(3300, 29181)
    map.set(3400, 58122)
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
    map.set(206, "2A G1 +G2")
    map.set(315, "2A")

    map.set(320, "1A APP A")
    map.set(321, "1A APP B")

    map.set(641, "1A APP")

    map.set(650, "2A APP A")
    map.set(651, "2A APP B")

    map.set(1301, "2A APP")
    
    map.set(1400, "LP EPOCS G1")
    map.set(1401, "LP EPOCS G2")
    map.set(2801, "LP EPOCS")

    map.set(2900, "LP RSF G1A1")
    map.set(3000, "LP RSF G1A2")
    map.set(3100, "LP RSF G1B")
    map.set(3200, "LP RSF G2B")
    map.set(3300, "LP RSF G2C1")
    map.set(3400, "LP RSF G2C2")

    map.set(9000, "LP RSF G1")
    map.set(9900, "LP RSF G2")
    map.set(18900 , "LP RSF")
    
    return map
}

// liste de liste [ UUID, temps._time, location, summary, groupe]

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
                deja_present=true 
            }
        }
        if (!deja_present){
            this.valeur.push(element)
        }
    }
    trier_liste(){

        this.valeur.sort((a, b) => { // il faut faire une fonction qui prend 2 listes et doit retourner un nombre negatif si la liste a vient avant la liste b et positif sinon

            var nb1 = new Date(a[1].year, a[1].month -1 , a[1].day, a[1].hour, a[1].minute)
            var nb2 = new Date(b[1].year, b[1].month -1 , b[1].day, b[1].hour, b[1].minute)
            var nb3 = nb1.getTime()
            var nb4 = nb2.getTime()
            if (nb3- nb4>0){
                return 1
            }else if (nb3 - nb4 <0){
                return -1
            }
            else{
                return 0
            }
        });
        
    }
    clear_liste(){
        this.valeur = []
    }
    
}
function nom_groupe(nb){
    var map_str = set_map_str()
    if (!map_str.has(nb)){//si le nombre n'est pas present dans la liste
        console.log("le nombre " + nb+ " n'est pas present dans le map")
        return ""
    }
    return map_str.get(nb)
}
var objet = new Liste_made_by_me();
function liste_au_tableau(){ // j'ai essayer de mettre cette fonction dans la classe mais ca marche pas, bug de javascript
    var decalage = new Date()
    /*var i =0;
    var limite = 20;
    var nombre_ajouter = 0
    while(i<objet.valeur.length){
        var element = objet.valeur[i]
        var date_element = new Date(element[1].year, element[1].month -1 , element[1].day, element[1].hour, element[1].minute)
        if (date_element.getTime() - decalage.getTime()< 30600 && date_element.getTime() - decalage.getTime() > 0 && nombre_ajouter <= limite){
            nombre_ajouter ++;
            ajouter_ligne(to2nombre(element[1].hour - decalage.getTimezoneOffset()/60) + ":" + to2nombre(element[1].minute), nom_groupe(element[4]), element[2], element[3]);
        }
        if(nombre_ajouter >=20){
            break
        }
        i++;
    }*/
    console.log(decalage.getTime())
    for(i=0; i< objet.valeur.length; i++){
        element = objet.valeur[i]
        var date_element = new Date(element[1].year, element[1].month -1 , element[1].day, element[1].hour, element[1].minute)
        console.log(date_element.getTime())
        ajouter_ligne(to2nombre(objet.valeur[i][1].hour - decalage.getTimezoneOffset()/60) + ":" + to2nombre(objet.valeur[i][1].minute), nom_groupe(objet.valeur[i][4]), objet.valeur[i][2], objet.valeur[i][3]);
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
    //document.getElementById("horloge").innerText = time
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
async function lefetch(numero_groupe, id){
        console.log("debut avec le groupe "+ nom_groupe(numero_groupe) )
        
        var url = "http://127.0.0.1:5000/api/"+id
        var a = await fetch(url)
        var ical = await a.json()
        return ical;

}
async function recuperer_donnee(){
    var ICAL = require("ical.js")
    var map = set_map_nombre();
    var liste2 = []
    for (const [numero_groupe , id] of map){
            await lefetch(numero_groupe, id)
            .then(ical => {
                var calendrier = ICAL.parse(ical.valeur);
                var comp = new ICAL.Component(calendrier);
                var vevent = comp.getAllSubcomponents("vevent")//on recupere tout les evenements
                vevent.forEach(element => {
                    var liste = []
                    liste.push(element.getFirstPropertyValue("uid"))
                    liste.push(element.getFirstPropertyValue("dtstart")._time) //[ UUID, temps._time, location, summary, groupe]
                    if (element.getFirstPropertyValue("location") == ""){
                        liste.push("")
                    }
                    else{
                        liste.push(element.getFirstPropertyValue("location"))
                    }
                    liste.push(element.getFirstPropertyValue("summary"))
                    liste.push(numero_groupe)
                    objet.ajouter_a_la_liste(liste)     
                    });
            })
            .catch(err => {
                //console.log(err)
                liste2.push([numero_groupe, id])
            })
            
    }// on a executé pour chaque groupe 1 fois et mit ceux qui marche pas dans la liste 2
    objet.trier_liste()
    liste_au_tableau()
    while (liste2.length != 0){
        var a = []
        for(var i =0; i<liste2.length; i++){
            console.log("je retry " + nom_groupe(liste2[i][0]))
            await test(liste2[i][0], liste2[i][1])
            .then(ical => {
                //console.log("je recupere les données suivante : \n"+ical.valeur)
                var calendrier = ICAL.parse(ical.valeur);
                var comp = new ICAL.Component(calendrier);
                var vevent = comp.getAllSubcomponents("vevent")//on recupere tout les evenements
                vevent.forEach(element => {
                    var liste = []
                    liste.push(element.getFirstPropertyValue("uid"))
                    liste.push(element.getFirstPropertyValue("dtstart")._time)//[ UID, temps._time, location, summary, groupe] 
                    if (element.getFirstPropertyValue("location") == ""){
                        liste.push("")
                    }
                    else{
                        liste.push(element.getFirstPropertyValue("location"))
                    }
                    liste.push(element.getFirstPropertyValue("summary"))
                    liste.push(liste2[i][0])
                    objet.ajouter_a_la_liste(liste)     
                    });
            })
            .catch(err => {
                console.log(err)
                a.push([liste2[i][0], liste2[i][1]])
            })
        }
        console.log(a)
        liste2 = a
    }
    objet.trier_liste()
    console.log(objet.valeur)
    clear_tableau()
    liste_au_tableau()
    setTimeout(recuperer_donnee, 3600000)//on refait dans 1 heure
}
recuperer_donnee()


async function pour_le_message(){
    var url = "http://127.0.0.1:5000/message"
    var a = await fetch(url)
    var json = await a.json()
    return json;

}
async function recuperer_message(){
        await pour_le_message()
        .then(json => {
            return json.message
        })
        .then(message =>{
            console.log(message)
            document.getElementById("message").textContent = message
        })
        .catch(err => {
            setTimeout(() => {
                recuperer_message()
            }, 5000);
        })
        setTimeout(recuperer_message, 300000)//on redemande le message toute les 5 minutes pour savoir si il a changé        
}
recuperer_message()
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

LP EPOCS
1400 : LP EPOCS G1
1401 : LP EPOCS G2
LP EPOCS = 2801

LP RSF
2900: LP RSF G1A1
3000: LP RSF G1A2
3100: LP RSF G1B
3200: LP RSF G2B
3300: LP RSF G2C1
3400: LP RSF G2C2

LP RSF G1 = 9000
LP RSF G2 = 9900
LP RSF = 18900
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
    
    //LP EPOCs
*/