//Element Selector.
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const speakBtn = document.querySelector("#speak");

//Speech Recognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

//SR Start
recognition.onstart = function(){
    console.log("vr active");
}

//SR Result
recognition.onresult = function(event){
    let current = event.resultIndex;
    let transcript = event.results[current][0].transcript;
    transcript = transcript.toLowerCase();
    console.log(`my words : ${transcript}`);
    if (transcript.includes("hello jadu")|| transcript.includes("hey jadu") || transcript.includes("jadoo")) {
        readOut("hello Sir");
    }
    //Openning youtube
    if (transcript.includes("open youtube")) {
        readOut("openning youtube Sir")
        window.open("https://www.youtube.com/")
    }
    //Openning google
    if (transcript.includes("open google")) {
        readOut("openning google Sir")
        window.open("https://www.google.com/")
    }
    //google Search
    if (transcript.includes("search")) {
        readOut("here's the result");
        let input = transcript.split("");
        input.splice(0,7);
        input.pop();
        input = input.join("").split(" ").join("+");
        window.open(`https://google.com/search?q=${input}`)
    }
}

//SR Stop
recognition.onend = function () {
    console.log("vr deactive");
}

//SR contionous
recognition.continuous = true;

startBtn.addEventListener("click", () =>{
    recognition.start();
})

stopBtn.addEventListener("click", () => {
    recognition.stop();
})

//JADDU Speech 
function readOut(message){
    const speech = new SpeechSynthesisUtterance();
    //different voices
    const allVoices = speechSynthesis.getVoices();
    speech.voice = allVoices[2];
    speech.text = message;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
    console.log("speaking out");
}

speakBtn.addEventListener("click" , () =>{
    readOut();
})