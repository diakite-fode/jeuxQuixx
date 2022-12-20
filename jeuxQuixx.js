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
    }
}

//Declaration de la liste des collections d'object de type case de chaque ligne
let collectionCaseRouge = [];
let collectionCaseJaune = [];
let collectionCaseVert = [];
let collectionCaseBleu = [];
let collectionCasePenalite = [];
let collectionCaseScore = [];
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
        balise.setAttribute("id", element + "_" + collection[element].couleur);
        balise.setAttribute("class", "casePenalite case");
        let pCase = document.createElement("p");
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
        let valeur = document.createTextNode(collection[element].valeur);
        p.appendChild(valeur);
        balise.appendChild(p);
        let div = document.getElementById(idDiv);
        div.appendChild(balise);
    }
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
    genererLigneScore(collectionCaseScore, "lignePoint");


}