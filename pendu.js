
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
    $("#"+letter).attr("disabled","disabled")
}

// remplacer le mot a trouver par _ *nbre lettre
function coderMot (motInconnu) {
    motInconnu.split("").forEach(letter => {
        wordCode.push(" _ ")  ;   
    }); 
    return wordCode.join(" ");
}

function verifierInput(l){
    if(input.val().length > 1){
        motComplet(input.val());
        return false
    } else {
        letter = l;
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
    $("#motInconnu").html(wordCode.join(""));   
}

function desactivate(){
    btn.attr("disabled","disabled")    
}

function motComplet(input){
    if (input === hiddenWord){
        victory()
    }else{
        i++
        updateImg()
        //coupsRestant()
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
    gameOver.html("Vous avez PERDU ! Le personnage etait : " + word)
    gameEnded()    
}

function victory() {  
    gameOver.html("Vous avez Gagné ! Le personnage est bien : " + word )
    i=13 
    gameEnded() 
    
}

function clickBtn () {
    if (state =="gameOn"){
        validate(input.val().toLowerCase())
    } else {
        restartVar()
        state="gameOn"
        btn.text("Valider")
    }  
}

function gameEnded(){
    updateImg()
    btn.text("restart")
    state="gameOver"
    //desactivate()
    $("#lore p").css("display","inline")
    console.log(character.lien)
    wiki.attr("href",character.lien)
    wiki.html(character.name)
    
      
}
  


function restartVar () {
    i = 0;
    character = personnageSDA[Math.floor(Math.random()*(personnageSDA.length-1))];
    word = character.name;
    hiddenWord = word.toLowerCase();
    availableLetters= ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    wordCode=[] ;
    wordJoined = coderMot(hiddenWord);
    $(".letters").removeAttr("disabled");
    $("#motInconnu").html(wordJoined); 
    gameOver.html("");
    updateImg() ;
    $("#lore p").css("display","none")   ;

}

function updateImg() {
    penduImg.attr("src","ressources/images/"+penduImgs[i])    
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
let state = "gameOn"
let penduImgs=[
    "Pendu0.png","Pendu1.png",
    "Pendu2.png","Pendu3.png",
    "Pendu4.png","Pendu5.png",
    "Pendu6.png","Pendu7.png",
    "Pendu8.png","Pendu9.png",
    "Pendu10.png","Pendu11.png",
    "Pendu12.png","Pendu13.png"];

// declarer variable DOM
let input = $("#input");
let btn = $("button");
let sousInput=$("#sousInput");
let availableLettersDiv = $("#availableLetters");
let penduImg = $("#penduImg");
let gameOver= $("#gameOver");
let race = $("#race");
let wiki = $("#wiki");



//afficher le pattern du mot
$("#motInconnu").html(wordJoined);
race.html(character.race)

// Event : bouton ou enter valide l'input
btn.click(()=>clickBtn());

input.keydown(function (e) {
    if(e.keyCode === 13){    
        if (!btn.attr("disabled")){
            btn.click()
        }           
    }
});
// Controler l'input : pas de chiffre
input.on("input",(e) => {     
    if (!isValid(e.target.value.slice(-1)) ){        
        input.css("borderColor","red") 
        desactivate ()
        input.val("")
        sousInput.html("Merci d'entrez une lettre ou un mot")
        sousInput.css("color","red")
    }    else {
        btn.removeAttr("disabled");
        sousInput.html("")
    }
});

// reset input Value
input.click(()=>input.val(""))

// afficher les lettres
availableLetters.forEach(letter => {
    let letterDiv  =$("<button  class='letters'>" + letter+ "</button>").appendTo(availableLettersDiv);
    letterDiv.attr("id",letter)
    letterDiv.click (()=> validate(letter));  
});





