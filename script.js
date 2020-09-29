function ajouter_ligne(heure, groupe, salle, nom){
    var tableRef = document.getElementById("tableau").getElementsByTagName("tbody")[0];
    var newRow   = tableRef.insertRow();
    var mot = heure;
    for (var i = 0; i < 4; i++) {
        switch (i){
            case 0:
                mot = heure;
                break;
            case 1:
                mot = groupe;
                break;
            case 2:
                mot = salle;
                break;
            case 3:
                mot = nom;
                break;
        }
        var newCell  = newRow.insertCell(i);
        var newText  = document.createTextNode(mot);
        newCell.appendChild(newText);
    }
}
function afficher_heure(){
    var date = new Date();
    var h = date.getHours(); 
    var m = date.getMinutes(); 
    /*
    Ce qui suit transforme les heures et les minutes en nombre a 2 chiffres(avec un zero devant en gros si c'est <10)*/
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    var time = h + ":" + m;
    document.getElementById("horloge").innerText = time;
    document.getElementById("horloge").textContent = time;
    setTimeout(afficher_heure, 1000);//on attend 1 seconde, ouai c'est peut etre overkill mais balek
}
afficher_heure();//on est obliger de le lancer une fois pour initialiser