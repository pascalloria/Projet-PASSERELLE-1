
// Fonction pou retirer une valeur d'un tableau depuis sa valeur
function arrayRemove(arr, value) { 
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

function checkInArray(array,l){
    if (array.includes(l)) {
        return true        ;
    } else {
        return false    ;
}}

function disabledLetterFromAvailableLetters(letter){
    availableLetters = arrayRemove(availableLetters,letter);
    document.querySelector("#"+letter).setAttribute("disabled","disabled")
}

// remplacer le mot a trouver par _ *nbre lettre
function coderMot (motInconnu) {
    motInconnu.split("").forEach(letter => {
        wordCode.push(" _ ")  ;   
    }); 
    return wordCode.join(" ");
}

function verifierInput(input){
    if(input.length > 1){
        motComplet(input);
        return false
    } else {
        letter = input;
    }
    return true
}   

function addLetterMotCoder(letter) {
    let idx=hiddenWord.indexOf(letter)
    let indices = []
    while(idx !=-1) {
        indices.push(idx)    
        idx=hiddenWord.indexOf(letter,idx+1)
    }   
    indices.forEach(indice => {        
        wordCode[indice]=letter        
    });  
    document.querySelector("#motInconnu").innerHTML = wordCode.join("");   
}

function desactivate(){
    btn.setAttribute("disabled","disabled")    
}

function motComplet(input){
    if (input === hiddenWord){
        victory()
    }else{
        i++
        updateImg()   
    }
}

// verifions si la donnée est bien une lettre avec methode RegEx
function isValid(value){
    return /^[a-zA-Z]/.test(value)
}

function validate(letter) {
    if (i < coupsMax ) {
        if (verifierInput(letter)) {            
            disabledLetterFromAvailableLetters(letter)            
            if(checkInArray(hiddenWord,letter)){
                addLetterMotCoder(letter)
                if (wordCode.join("") == hiddenWord){
                    victory()
                }
            } else {
                i++
                updateImg()
                //coupsRestant()  
            }         
        } else {
            return
        }        
    } else {
        defeat()
    }
}

function defeat() { 
    i=12  
    gameOver.innerHTML = "Vous avez PERDU ! Le personnage etait : " + word ;
    gameEnded()    
}

function victory() {  
    gameOver.innerHTML = "Vous avez Gagné ! Le personnage est bien : " + word
    i=13 
    gameEnded() 
    
}

function clickBtn () {
    if (state =="gameOn"){
        validate(input.value.toLowerCase())
    } else {
        restartVar()
        state = "gameOn"
        btn.textContent = "Valider"
    }  
}

function gameEnded(){
    updateImg();
    btn.textContent = "restart";
    state = "gameOver";
    //desactivate()
    document.querySelector("#lore p").style.display = "block" ;
    wiki.setAttribute("href",character.lien);
    wiki.innerHTML = character.name;
    availableLettersDiv.style.display = "none";          
}

function reactivateLetterBtn(){
    let letterBtns= document.querySelectorAll(".letters")   
    letterBtns.forEach((letterBtn) => {
        letterBtn.removeAttribute("disabled") ;   
    });
}
    


function restartVar () {
    lastcharacter=character;
    i = 0;
    do {
         character = personnageSDA[Math.floor(Math.random()*(personnageSDA.length-1))];
    }
    while ( lastcharacter === character );   
    word = character.name;
    hiddenWord = word.toLowerCase();
    availableLetters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    wordCode = [] ;
    wordJoined = coderMot(hiddenWord);
    reactivateLetterBtn()
    document.querySelector("#motInconnu").innerHTML=wordJoined; 
    gameOver.innerHTML = "";
    updateImg() ;
    race.innerHTML = character.race;
    document.querySelector("#lore p").style.display = "none";
    availableLettersDiv.style.display ="grid";

}

function updateImg() {
    penduImg.setAttribute("src","ressources/images/"+penduImgs[i])    
}

//declare variable
let coupsMax = 11;
let letter;
let character=personnageSDA[Math.floor(Math.random()*(personnageSDA.length-1))]
let word = character.name;
let hiddenWord = word.toLowerCase();
let availableLetters= ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let wordCode=[];
let i = 0;
let wordJoined = coderMot(hiddenWord);
let state = "gameOn";
let lastcharacter;
let penduImgs = [
    "Pendu0.png","Pendu1.png",
    "Pendu2.png","Pendu3.png",
    "Pendu4.png","Pendu5.png",
    "Pendu6.png","Pendu7.png",
    "Pendu8.png","Pendu9.png",
    "Pendu10.png","Pendu11.png",
    "Pendu12.png","Pendu13.png"
    ];

// declarer variable DOM
let input = document.querySelector("#input");
let btn = document.querySelector("button");
let sousInput = document.querySelector("#sousInput");
let availableLettersDiv = document.querySelector("#availableLetters");
let penduImg = document.querySelector("#penduImg");
let gameOver = document.querySelector("#gameOver");
let race = document.querySelector("#race");
let wiki = document.querySelector("#wiki");



//afficher le pattern du mot
document.querySelector("#motInconnu").innerHTML= wordJoined;
race.innerHTML= character.race;

// Event : bouton ou enter valide l'input
btn.addEventListener("click", clickBtn);

input.addEventListener("keydown" , function (e) {
    if(e.keyCode === 13){    
        if (!btn.attributes("disabled")){
            btn.addEventListener(click)
                }           
    }
});
// Controler l'input : pas de chiffre
input.addEventListener("input",(e) => {     
    if (!isValid(e.target.value.slice(-1)) ){        
        input.style.borderColor = "red";
        desactivate ()
        input.value= ""
        sousInput.innerHTML = "Merci d'entrez une lettre ou un mot"
        sousInput.style.color = "red"
    }    else {
        btn.removeAttribute("disabled");
        sousInput.innerHTML= ""
    }
});

// reset input Value
input.addEventListener("click", ()=> {input.val=""})

// afficher les lettres
availableLetters.forEach(letter => {
    let letterDiv  = document.createElement("button");
    availableLettersDiv.append(letterDiv)
    letterDiv.classList.add("letters")
    letterDiv.id = letter
    letterDiv.innerHTML = letter
    letterDiv.addEventListener("click", () => validate(letter));  
});





