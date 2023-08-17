//Déclaration des variables
const availableColors = ['#a37a00ff', '#933710ff', '#691312ff', '#5d0933ff', '#291938ff', '#042d3aff', '#12403cff', '#586600ff']; //array des couleurs
//lien avec les éléments html 
const btnToggle = document.querySelector('.btnToggle'); 
const scoreHtml = document.querySelector('.scorePanel > span');
const btnReset = document.querySelector('.btnReset');
const goodAlert = document.querySelector('.goodAlert');
//facteur d'augmentation de la difficulté (voir ligne 54)
const difficultyFactor = 100;

//Valeurs qui vont changer
let currentBgColorIndex = 0; //Permet de changer d'index de l'array pour le background
let currentButtonColorIndex = 0; //Idem pour le bouton
let isRunning = false; //Toggle pour pouvoir lancer start() ou stop(). Initialiser à false
let bgColorChanger = 0; //Variable pour l'intervalle de changement de couleur
let score = 0; //Variable pour le score

//Fonction qui permet de chnager la couleur du background
function changeBgColor(){
    currentBgColorIndex++; //Incrémentation de l'index
    if(currentBgColorIndex >= availableColors.length){//Condition qui assure qu'on ne sort par de l'array

        currentBgColorIndex = 0; //réinitialisation de l'index
    }

    document.body.style.backgroundColor = availableColors[currentBgColorIndex]; //Injecte la nouvelle valeur de l'index dans le style de l'élément HTML
}

//Fonction qui permet de changer la couleur du bouton
function changeBtnColor(){
    currentButtonColorIndex = Math.round(Math.random() * (availableColors.length - 1)); //Injecte une nouvelle valeur aléatoire à la variable currentButtonColorIndex
    btnToggle.style.backgroundColor = availableColors[currentButtonColorIndex];  //Injecte la nouvelle valeur de l'index dans le style de l'élément HTML
}

//Fonction qui arrête le jeu
function stop(){
    btnToggle.innerHTML = 'GO'; //chnage le texte du bouton
    clearInterval(bgColorChanger); //Annule l'intervalle donc arrête le changement de couleur
    if(currentBgColorIndex === currentButtonColorIndex){ //vérifie si le joueur a gagné
        score++; //si oui, incrémente le score
        btnReset.style.display = 'block';//Fait apparaitre le btnReset
        goodAlert.style.display = 'block';//Idem
       
    }

    else{
        score = 0; //si non, le score est réinitialisé 
    }
    scoreHtml.innerHTML = score; //injecte la nouvelle valeur de score dans l'HTML
    isRunning = false; //Toggle
}

//Fonction qui permet de lancer le jeu
function start(){
    btnToggle.innerHTML = 'BREAK'; //change le texte du bouton
    changeBtnColor();//Lance la fonction changeBtnColor
    changeBgColor();//Lance la fonction changeBgColor
    bgColorChanger = setInterval(changeBgColor, 1000 - (score * difficultyFactor));//Détermine la vitesse à laquelle les couleurs changent
    isRunning = true;//Toggle
    goodAlert.style.display = 'none';//Fait disparaitre le message Good!
}

//Écoute le clic du bouton 
btnToggle.addEventListener('click', () => {
    if(isRunning === true){ //si le toggle est à true, le jeu est en marche, donc il faut lancer la fonction stop
        stop();
    }

    else{      //si le toglle est à false, le jeu est arrêté, donc il faut lancer la fonction start
        start();
    }
});

//Écoute le clic du bouton reset
btnReset.addEventListener('click', () => {
    score = 0; //Réinitialise la valeur du score
    scoreHtml.innerHTML = score; //injecte la nouvelle valeur de score
    btnReset.style.display = 'none'; //Fait disparaitre le bouton reset
    goodAlert.style.display = 'none';//Fait disparaitre le message Good!
    
    changeBgColor();
    changeBtnColor();
}
)


//Lancer les fonctions pour starter le jeu
changeBtnColor();
changeBgColor();

