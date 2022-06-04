
let faceValue = null
let suit = null
const Card = document.querySelector("[data-card-image]")
document.querySelector("[data-face-value]").addEventListener("change",(e)=>{
    console.log(e.target.value)
    faceValue = e.target.value
    updateCard()
})

document.querySelector("[data-suit]").addEventListener("change",(e)=>{
    console.log(e.target.value)
    suit = e.target.value
    updateCard()
})


function updateCard(){
    faceValue = document.querySelector("[data-face-value]").value
    suit = document.querySelector("[data-suit]").value
    console.log(faceValue)
    console.log(suit)
    if(faceValue == "" || suit == "") return
    let cardName = `${face_words[faceValue]}_of_${suit.toLowerCase()}.svg`  
    console.log({cardName})
    Card.setAttribute("src", `assets/svg/${cardName}`)
}

function pickRandomCard(){
    // let faceValues = [ "Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"]
    let faceValues = [ "Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"]
"Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"    
    let suitValues = [ "clubs", "diamonds", "hearts", "spades" ]
    const randomFace = Math.floor(Math.random() * faceValues.length);
    const randomSuit = Math.floor(Math.random() * suitValues.length);
    // document.querySelector("[data-face-value]").value = faceValues[randomFace]
    // document.querySelector("[data-suit]").value = suitValues[randomSuit]
    updateFaceSelect(faceValues[randomFace])
    updateSuitSelect(suitValues[randomSuit])
    updateCard()
}

function updateFaceSelect(value){
    document.querySelector("[data-face-value]").value = value;
    document.querySelector("[data-face-value]").parentNode.getElementsByClassName("select-selected")[0].innerHTML = value

}
function updateSuitSelect(value){
    document.querySelector("[data-suit]").value = value
    document.querySelector("[data-suit]").parentNode.getElementsByClassName("select-selected")[0].innerHTML = value

}