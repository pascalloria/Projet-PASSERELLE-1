
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

function deleteLetterFromAvailableLetters(letter){
    availableLetters = arrayRemove(availableLetters,letter);
    $("#availableLetters").html(availableLetters);
}

// remplacer le mot a trouver par _ *nbre lettre
function coderMot (motInconnu) {
    motInconnu.split("").forEach(letter => {
        motInconnuCoder.push(" _ ")  ;   
    }); 
    return motInconnuCoder.join(" ");
}

function verifierInput(){
    if(input.val().length > 1){
        motComplet(input.val());
        return false
    } else {
        letter = input.val();
    }
    return true
}   

function addLetterMotCoder(letter) {
    let idx=motInconnu.indexOf(letter)
    let indices = []
    while(idx !=-1) {
        indices.push(idx)    
        idx=motInconnu.indexOf(letter,idx+1)
    }   
    indices.forEach(indice => {        
        motInconnuCoder[indice]=letter        
    });  
    $("#motInconnu").html(motInconnuCoder.join(""));   
}
    

function desactivate(){
    btn.attr("disabled","disabled")
    //input.attr("disabled","disabled")
}

function motComplet(input){
    if (input === motInconnu){
        alert("vous avez gagné")
        desactivate()
    }else{
        i++
        coupsRestant()
    }
}

// verifions si la donnée est bien une lettre avec methode RegEx
function isValid(value){
    return /^[a-z]/.test(value)
}

function validate() {
    if (i < coupsMax ) {
        if (verifierInput()) {            
            deleteLetterFromAvailableLetters(letter)
            i++
            if(checkInArray(motInconnu,letter)){
                addLetterMotCoder(letter)
            }   
            coupsRestant()             
        } else {
            return
        }        
    } else {
        alert("vous avez perdu le mot etait " + motInconnu)
        coupsRestant()
        desactivate()
    }
}

//declare variable
let motInconnu = wordsFiltred[Math.floor(Math.random()*(wordsFiltred.length-1))]
let coupsMax = 11;
let coupsRestant= () => {compteur.html("coups Restant: " + (coupsMax-i))};
let availableLetters= ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let motInconnuCoder=[];
let i = 0
let letter;
// declarer variable DOM
let input = $("#input")
let btn = $("button")
let compteur= $("#coupsRestant")
let sousInput=$("#sousInput")

let motInconnuJoined = coderMot(motInconnu);
$("#motInconnu").html(motInconnuJoined);

// Event : bouton ou enter valide l'input
btn.click(function (e) { 
    e.preventDefault();
    validate()
});

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

input.click(()=>input.val(""))

