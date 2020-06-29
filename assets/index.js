const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log('Number: ' , randomNum);

window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

let recognition = new window.SpeechRecognition();


// start recognition and game

recognition.start();


function onSpeak(e){
    var msg = e.results[0][0].transcript;


    writeMessage(msg);
    checkNumber(msg);
}
// write msg users speak
function writeMessage(msg){
    msgEl.innerHTML = `
    <div>You said:</div>
    <span class="box" >${msg} </span>
    `
}

// check msg

function checkNumber(){
    const num = +msg; //converts to string to number (jsES6)

    //check if valid number

    if(Number.isNaN(num)){
        msgEl.innerHTML = '<div>That is not a valid Number </div>';
        return;
    }

    //check in range 
    if(num > 100 || num <1){
        msgEl.innerHTML = '<div>Number must be in 1 and 100 </div>';
        return;
    }

    // checl number

    if(num === randomNum){
        document.body.innerHTML = `
        
        <h2>Congrats! You have guessed the number! <br><br>
        It was ${num} </h2>
        <button class="play-again" id="play-again"> Play Again 
        </button>


        `;
    }else if(num > randomNum){
        msgEl.innerHTML += '<div>Go LOWER</div>';
    }
    else{
        msgEl.innerHTML += '<div>Go Higher</div>';
    }

}

//speak result
recognition.addEventListener('result',onSpeak);

recognition.addEventListener('end',()=> {
    recognition.start();
})

document.body.addEventListener("click" , () => {
    if(e.target.id == 'play-again'){
        window.location.reload();
    }
})



function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}