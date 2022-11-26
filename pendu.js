

// Fonction pour desactiver un bouton.
function disabledLetterBtn(letter){   
    document.querySelector("#"+letter).setAttribute("disabled","disabled")
}

// remplacer le mot a trouver par _ *nbre lettre
function coderMot (inknowWord) {
    inknowWord.split("").forEach(letter => {
        wordCode.push(" _ ")  ;   
    }); 
    return wordCode.join(" ");
}
// gerer l'input clavier
function checkInput(input){
    if(input.length > 1){
        fullWordCompare(input);
        return false
    } else {
        return true
    }
    
}   
// remplacer le _ du mot coder par la lettre proposé
function addLetterWordCode(letter) {
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
// desactiver le bouton "Valider"
function desactivate(){
    btn.setAttribute("disabled","disabled")    
}
// compart un mot proposé par input aux mot à trouver
function fullWordCompare(input){
    if (input === hiddenWord){
        victory()
    }else{
        i++
        updateSVG()   
    }
}

// verifions si la donnée est bien une lettre avec methode RegEx
function isValid(value){
    return /^[a-zA-Z]/.test(value)
}

function defeat() { 
    audioDefeat.play()
    i=11  
    gameOver.innerHTML = "Vous avez PERDU ! Le personnage etait : " + word ;
    gameEnded()    

}

function victory() {  
    gameOver.innerHTML = "Vous avez Gagné ! Le personnage est bien : " + word
    i=0
    gameEnded() 
    audioVictory.play()
    document.querySelector("#dessin svg").style.display="none";
    document.querySelector("#victory").style.display="inline-block";
    document.querySelector("#motInconnu").innerHTML = word;
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
    updateSVG();
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

function restartVar() {
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
    updateSVG() ;
    race.innerHTML = character.race;
    document.querySelector("#lore p").style.display = "none";
    availableLettersDiv.style.display ="grid";
    document.querySelector("#dessin svg").style.display="inline-block";
    document.querySelector("#victory").style.display="none";
    input.value= ""

}

function updateSVG() {
    if ( i != 0) {
        console.log(hangmanSVGs[i])
        document.querySelector("#hangmanSVG").innerHTML += hangmanSVGs[i]   

    } else {
        document.querySelector("#hangmanSVG").innerHTML =""  
    }

    
}
function validate(letter) {
    input.value= ""
    if (i < maxHit ) {
        if (checkInput(letter)) {            
            disabledLetterBtn(letter)            
            if(hiddenWord.includes(letter)){
                addLetterWordCode(letter)
                if (wordCode.join("") == hiddenWord){
                    victory()
                }
            } else {
                i++
                updateSVG()
                
            }         
        } else {
            return
        }        
    } else {
        defeat()
    }
}


//declaration des variables
let maxHit = 10;
let letter;
let character = personnageSDA[Math.floor(Math.random()*(personnageSDA.length-1))]
let word = character.name;
let hiddenWord = word.toLowerCase();
let availableLetters= ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let wordCode=[];
let i = 0;
let wordJoined = coderMot(hiddenWord);
let state = "gameOn";
let lastcharacter;
let hangmanSVGs = ['',
    '<rect fill="#000000" height="12" id="svg_1" stroke="#000000" width="131" x="22" y="239"/>',
    '<rect fill="#000000" height="216" id="svg_2" stroke="#000000" width="11" x="42" y="33"/>',    
    '<rect fill="#0a0909" height="8" id="svg_3" stroke="#000000" width="109" x="33" y="27"/>',
    '<rect fill="#0a0909" height="8.25" id="svg_4" stroke="#000000" transform="rotate(-35 71.7851 48.5509)" width="57.04" x="43.27" y="44.43"/>',
    '<rect fill="#000000" height="30" id="svg_5" stroke="#000000" width="6" x="125" y="34"/>',
    '<ellipse cx="127.5" cy="83" fill="#ffffff" fill-opacity="0.01" id="svg_6" rx="20.5" ry="18" stroke="#000000"/>',
    '<rect fill="#000000" height="69" id="svg_7" stroke="#000000" width="9" x="123" y="102"/>',
    '<rect fill="#000000" height="8.63" id="svg_9" stroke="#000000" transform="rotate(-25 145.485 118.541)" width="35.93" x="127.52" y="114.23"/>',
    '<rect fill="#000000" height="8.63" id="svg_10" stroke="#000000" transform="rotate(25 110 118)" width="35.93" x="91.53" y="113.68"/>',
    '<rect fill="#000000" height="8.23" id="svg_11" stroke="#000000" transform="rotate(50 142.236 180.185)" width="42.46" x="121.01" y="176.07"/>',
    '<rect fill="#000000" height="8.23" id="svg_12" stroke="#000000" transform="rotate(-50 112 179)" width="42.46" x="90.27" y="174.88"/>'
]

let audioVictory = new Audio("ressources/music/sdaVictory.mp3")
let audioDefeat = new Audio("ressources/music/sdaDefeat.mp3")
audioDefeat.volume = 0.2;
audioVictory.volume = 0.2

// declarationd des variables DOM
let input = document.querySelector("#input");
let btn = document.querySelector("button");
let subInput = document.querySelector("#subInput");
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
        clickBtn()
    }
});
// Controler l'input : pas de chiffre
input.addEventListener("input",(e) => {     
    if (!isValid(e.target.value.slice(-1)) ){        
        input.style.borderColor = "red";
        desactivate ()
        input.value= ""
        subInput.innerHTML = "Merci d'entrez une lettre ou un mot"
        subInput.style.color = "red"
    }    else {
        btn.removeAttribute("disabled");
        subInput.innerHTML= ""
    }
});

// reset input Value
input.addEventListener("click", ()=> {input.value=""})

// afficher les lettres
availableLetters.forEach(letter => {
    let letterDiv  = document.createElement("button");
    availableLettersDiv.append(letterDiv)
    letterDiv.classList.add("letters")
    letterDiv.id = letter
    letterDiv.innerHTML = letter
    letterDiv.addEventListener("click", () => validate(letter));  
});





