
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
    $("#"+letter).attr("disabled","disabled")
}

// remplacer le mot a trouver par _ *nbre lettre
function coderMot (motInconnu) {
    motInconnu.split("").forEach(letter => {
        motInconnuCoder.push(" _ ")  ;   
    }); 
    return motInconnuCoder.join(" ");
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
        victory()
    }else{
        i++
        coupsRestant()
    }
}

// verifions si la donnée est bien une lettre avec methode RegEx
function isValid(value){
    return /^[a-z]/.test(value)
}

function validate(letter) {
    if (i < coupsMax ) {
        if (verifierInput(letter)) {            
            deleteLetterFromAvailableLetters(letter)            
            if(checkInArray(motInconnu,letter)){
                addLetterMotCoder(letter)
                if (motInconnuCoder.join("") == motInconnu){
                    victory()
                }
            } else {
                i++
            }           
            coupsRestant()             
        } else {
            return
        }        
    } else {
        alert("vous avez perdu le mot etait " + motInconnu)        
        desactivate()
        restart()
    }
}

function victory(){
    alert("vous avez gagné le mot à trouvez etait bien : " + motInconnu )
    desactivate()
    restart()
}

function restart () {

    if (confirm("voulez vous rejouer ?")  ){
       i = 0;
        motInconnu = wordsFiltred[Math.floor(Math.random()*(wordsFiltred.length-1))];
        availableLetters= ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
        motInconnuCoder=[] ;
        motInconnuJoined = coderMot(motInconnu);
        $(".letters").removeAttr("disabled")
        $("#motInconnu").html(motInconnuJoined);

    } else {
        alert("Merci d'avoir jouer")
    }
}

//declare variable
let coupsMax = 11;
let letter;
let coupsRestant= () => {compteur.html("coups Restant: " + (coupsMax-i))};

let motInconnu = wordsFiltred[Math.floor(Math.random()*(wordsFiltred.length-1))];
let availableLetters= ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let motInconnuCoder=[];
let i = 0;
let motInconnuJoined = coderMot(motInconnu)


// declarer variable DOM
let input = $("#input")
let btn = $("button")
let compteur= $("#coupsRestant")
let sousInput=$("#sousInput")
let availableLettersDiv = $("#availableLetters")


;
$("#motInconnu").html(motInconnuJoined);

// Event : bouton ou enter valide l'input
btn.click(function (e) { 
    e.preventDefault();
    validate(input.val())
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

// reset input Value
input.click(()=>input.val(""))

// afficher les lettres
availableLetters.forEach(letter => {
    let letterDiv  =$("<button  class='letters'>" + letter+ "</button>").appendTo(availableLettersDiv);
    letterDiv.attr("id",letter)
    letterDiv.click (()=> validate(letter));  
});





