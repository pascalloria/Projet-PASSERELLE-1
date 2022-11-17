
let availableLettersDiv = $("#availableLetters")

availableLetters.forEach(letter => {

    availableLettersDiv.append("<button class='letters'>" + letter+ "</button>");
    
});

let btnL