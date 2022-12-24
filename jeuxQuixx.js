//Declaration de la classe case
class Case {
    constructor(valeur, couleur, checked) {
        this.valeur = valeur;
        this.couleur = couleur;
        this.checked = checked;
    }
}
class CaseScore {
    constructor(valeur) {
        this.valeur = valeur;
        this.id = "";
    }
}



//Declaration de la liste des collections d'object de type case de chaque ligne
let collectionCaseRouge = [];
let collectionCaseJaune = [];
let collectionCaseVert = [];
let collectionCaseBleu = [];
let collectionCasePenalite = [];
let collectionCaseScore = [];

//Declaration des variables qui vont contenir le nombre de case cliqué de chaque ligne
let nbRouge = 0;
let nbJaune = 0;
let nbVert = 0;
let nbBleu = 0;
//Fonction qui va creer des cases et les insèrer dans un tableaux
//La variable incrementation represente le sens: 1=2>12  2=12>2
function creationCase(collection, couleur, incrementation) {
    if (incrementation == 1) {
        for (let i = 2; i <= 12; i++) {
            let element = new Case(i, couleur, false);
            collection.push(element);
        }
    } else {
        for (let i = 12; i >= 2; i--) {
            let element = new Case(i, couleur, false);
            collection.push(element);
        }
    }
    let element = new Case("X", couleur, false);
    collection.push(element);
}

function creationCasePenalite(collection, couleur) {
    for (let i = 0; i < 4; i++) {
        let element = new Case(-5, couleur, false);
        collection.push(element);
    }
}

function creationCaseScore(collection) {
    for (let i = 0; i < 6; i++) {
        let element = new CaseScore(0);
        collection.push(element);
    }
}

function ajoutIdCaseScore() {
    collectionCaseScore[0].id = "rouge";
    collectionCaseScore[1].id = "jaune";
    collectionCaseScore[2].id = "vert";
    collectionCaseScore[3].id = "bleu";
    collectionCaseScore[4].id = "gris";
    collectionCaseScore[5].id = "scoreTotal";
}

function genererLigne(collection, couleur, idDiv) {
    for (let element in collection) {
        let balise = document.createElement("div");
        balise.setAttribute("onclick", "majScore(\"" + collection[element].valeur + "_" + couleur + "\",\"" + couleur + "\")");
        let p = document.createElement("p");
        let numeroCase = document.createTextNode(collection[element].valeur)
        p.appendChild(numeroCase)
        p.setAttribute("id", collection[element].valeur + "_" + couleur);
        p.setAttribute("name", couleur);
        balise.setAttribute("class", "case " + couleur);
        balise.appendChild(p);
        console.log(p);
        var div = document.getElementById(idDiv);
        console.log(div);
        div.appendChild(balise);
    }
}

function genererLignePenalite(collection, idDiv) {
    let grandeCase = document.createElement("div");
    grandeCase.setAttribute("id", "grandeCasePenalite");
    let p = document.createElement("p");
    let texte = document.createTextNode("Pénalité")
    p.appendChild(texte);
    grandeCase.appendChild(p);
    let div = document.getElementById(idDiv);
    div.appendChild(grandeCase);
    for (let element in collection) {
        let balise = document.createElement("div");
        balise.setAttribute("class", "casePenalite case");
        balise.setAttribute("onclick", "majScore(\"" + element + "\",\"" + collection[element].couleur + "\")");
        let pCase = document.createElement("p");
        pCase.setAttribute("id", element);
        pCase.setAttribute("name", collection[element].couleur);
        let textCase = document.createTextNode(collection[element].valeur)
        pCase.appendChild(textCase);
        balise.appendChild(pCase);
        div.appendChild(balise);
    }
}

function genererLigneScore(collection, idDiv) {
    for (let element in collection) {
        let balise = document.createElement("div");
        balise.setAttribute("class", "caseScore");
        let p = document.createElement("p");
        p.setAttribute("id", collection[element].id)
        let valeur = document.createTextNode(collection[element].valeur);
        p.appendChild(valeur);
        balise.appendChild(p);
        let div = document.getElementById(idDiv);
        div.appendChild(balise);
    }

}

/*Fonction qui met à jour les variables qui compte le nombre de case cliqué par ligne*/
function majVariableNbCaseCliquer(couleur) {
    switch (couleur) {
        case "rouge":
            nbRouge += 1;
            return nbRouge;
        case "jaune":
            nbJaune += 1;
            return nbJaune;
        case "vert":
            nbVert += 1;
            return nbVert;
        case "bleu":
            nbBleu += 1;
            return nbBleu;
    }
}

/*
function qui associe une couleur à un chiffre
le chiffre sera ensuite utiliser comme indice dans la collection: collectionCaseScore
*/
function couleurScore(couleur) {
    switch (couleur) {
        case "rouge":
            return 0;
        case "jaune":
            return 1;
        case "vert":
            return 2;
        case "bleu":
            return 3;
        case "gris":
            return 4;
        case "total":
            return 5;
        default:
            console.log("La couleur est introuvable.Entrez une autre couleur.");
    }

}
/*Fonction qui récupère le score de chaque case(dernière ligne) puis met à jour le score total*/
function calculScoreTotal() {
    let scoreLigneRouge = parseInt(document.getElementById("rouge").innerText);
    let scoreLigneJaune = parseInt(document.getElementById("jaune").innerText);
    let scoreLigneVert = parseInt(document.getElementById("vert").innerText);
    let scoreLignebleu = parseInt(document.getElementById("bleu").innerText);
    /*la ligne suivante récupère le score total de pénalité (nombre négative)*/
    let scoreLigneGris = parseInt(document.getElementById("gris").innerText);
    /*rappel: "+" et "-" = "-" donc pour deduire les pénalités(négative), on met un "+"*/
    let scoreTotal = (scoreLigneRouge + scoreLigneJaune + scoreLigneVert + scoreLignebleu + scoreLigneGris);
    let balise = document.getElementById("scoreTotal");
    balise.innerHTML = scoreTotal;
}
/*cette fonction permet de savoir si les valeurs d'une collection commence à 2 (ligne rouge et jaune) ou à 12 (ligne vert et bleu*/
function debutValeurIndexCollection(couleur) {
    if (couleur == "rouge" || couleur == "jaune") {
        return 2;
    } else {
        return 12;
    }
}
/*Cette fonction retourne une collection en fonction d'une couleur*/
function trouverCollection(couleur) {
    switch (couleurScore(couleur)) {
        case 0:
            return collectionCaseRouge;
        case 1:
            return collectionCaseJaune;
        case 2:
            return collectionCaseVert;
        case 3:
            return collectionCaseBleu;
    }
}

//Fonction qui retourne le nombre de case cliqué
function varNbCaseCliquer(couleur) {
    switch (couleur) {
        case "rouge":
            return nbRouge;
        case "jaune":
            return nbJaune;
        case "vert":
            return nbVert;
        case "bleu":
            return nbBleu;
    }
}

//Cette fonction return true si la case X de la ligne concerné peut être cliqué
function caseXvalide(couleur) {
    let nbCaseCliquer = varNbCaseCliquer(couleur);
    if (nbCaseCliquer >= 5) {
        return true;
    }
}

/*retourne l'indice d'une case*/
function trouverIndex(nombre, couleur) {
    let index;
    if (debutValeurIndexCollection(couleur) == 12) {
        index = debutValeurIndexCollection(couleur) - nombre;
        return index;
    } else {
        index = nombre - debutValeurIndexCollection(couleur);
        return index;
    }
}
//Cette fonction met à jour la case score des points de pénalité et met l'attribut checked de la case à false
function majScorePenalite(indexDansCollection) {
    let caseCliquer = collectionCasePenalite[indexDansCollection];
    if (caseCliquer.checked == false) {
        let score = collectionCaseScore[4].valeur += -5;
        let balise = document.getElementById("gris")
        balise.innerHTML = score;
        caseCliquer.checked = true;
    }
}

/*cette fonction retourne l'objet case qui a été appuyé*/
function trouverIndexCase(nombre, couleur) {
    let collection = trouverCollection(couleur);
    let index = trouverIndex(nombre, couleur);
    caseSelectionner = collection[index];
    return caseSelectionner;
}
/*Cette fonction met les attributs "checked" à true de toutes les cases,de manière décroissante en partant de l'indice donné en paramètre */
function desactiverCase(couleur, indice) {
    let collection;
    for (let i = indice; i >= 0; i--) {
        collection = trouverCollection(couleur);
        casee = collection[i].checked = true;
        console.log(casee);
    }

}
/*Fonction qui met à jour le score total*/
function majScore(id, couleur) {
    let nombre = parseInt(document.getElementById(id).innerText);
    let noeuParencaseCliquer = document.getElementById(id).parentNode;
    let attributClassParent = noeuParencaseCliquer.getAttribute('class');
    if (!nombre) {
        let collection = trouverCollection(couleur);
        if (caseXvalide(couleur)) {
            alert("la case \"X\" de la ligne " + couleur + " a été cliqué !");
            collection[11].checked == false;
            noeuParencaseCliquer.setAttribute("class", "caseCliquer " + attributClassParent);
        } else {
            alert("la case \"X\ de la ligne " + couleur + " ne peut pas être cliqué. Au moins 5 cases doivent précèdement être cliqué !");
        }
    } else if (nombre == -5) {
        majScorePenalite(id);
        noeuParencaseCliquer.setAttribute("class", "caseCliquer " + attributClassParent);
        calculScoreTotal();
    } else if (trouverIndexCase(nombre, couleur).checked == false) {
        let indice = couleurScore(couleur);
        let nbCaseCliquer = majVariableNbCaseCliquer(couleur);
        let score = collectionCaseScore[indice].valeur = nbCaseCliquer * (nbCaseCliquer + 1) / 2;
        let balise = document.getElementById(couleur);
        balise.innerHTML = score;
        noeuParencaseCliquer.setAttribute("class", "caseCliquer " + attributClassParent);
        calculScoreTotal();
        desactiverCase(couleur, trouverIndex(nombre, couleur))
    }
}
/*Fonction qui actualise la page*/
function refresh() {
    window.location.reload();
}


//Fonction principal
function run() {
    creationCase(collectionCaseRouge, "rouge", 1);
    creationCase(collectionCaseJaune, "jaune", 1);
    creationCase(collectionCaseVert, "vert", 2);
    creationCase(collectionCaseBleu, "bleu", 2);
    genererLigne(collectionCaseRouge, "rouge", "ligneRouge");
    genererLigne(collectionCaseJaune, "jaune", "ligneJaune");
    genererLigne(collectionCaseVert, "vert", "ligneVert");
    genererLigne(collectionCaseBleu, "bleu", "ligneBleu");
    creationCasePenalite(collectionCasePenalite, "gris");
    genererLignePenalite(collectionCasePenalite, "ligneMallus");
    creationCaseScore(collectionCaseScore);
    ajoutIdCaseScore();
    genererLigneScore(collectionCaseScore, "lignePoint");


}