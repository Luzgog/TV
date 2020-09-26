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
ajouter_ligne("10:15", "1A3B", "006", "TD EE")