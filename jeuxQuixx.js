//Declaration de la classe case
class Case {
    constructor(valeur, couleur, checked) {
        this.valeur = valeur;
        this.couleur = couleur;
        this.checked = checked;
    }
}

//Declaration de la liste des collections d'object de type case de chaque ligne
let collectionCaseRouge = [];
let collectionCaseJaune = [];
let collectionCaseVert = [];
let collectionCaseBleu = [];
let collectionCasePenalite = [];
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
}

function creationCasePenalite(collection, couleur) {
    for (let i = 0; i < 4; i++) {
        let element = new Case(-5, couleur, false);
        collection.push(element);
    }
    console.log(collection);

}

function genererLigne(collection, couleur, idDiv) {
    for (let element in collection) {
        let balise = document.createElement("div");
        let p = document.createElement("p");
        let numeroCase = document.createTextNode(collection[element].valeur)
        p.appendChild(numeroCase)
        balise.setAttribute("id", collection[element].valeur + "_" + couleur);
        balise.setAttribute("class", "case " + couleur);
        balise.appendChild(p);
        console.log(p);
        var div = document.getElementById(idDiv);
        console.log(div);
        div.appendChild(balise);
    }
}

function genererLignePenalite(collection, couleur, idDiv) {

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

}