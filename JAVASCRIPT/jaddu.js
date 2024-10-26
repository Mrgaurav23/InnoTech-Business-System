//Element Selector.
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const speakBtn = document.querySelector("#speak");

// jaddu Setup
if (localStorage.getItem("jaddu-setup") !== null) {
    //Add info here
}

//jaddu information setup
const setup = document.querySelector(".jaddu-setup");
setup.style.display = "none";
if(localStorage.getItem("jaddu-setup") === null){
    setup.style.display = "block";
    // setup.style.display = flex;
    document.querySelector(".sub-btn").addEventListener("click",userInfo);
}

//UserInfo function
function userInfo(){
    let setupInfo = {
        name : setup.querySelectorAll("input")[0].value,
        Bio : setup.querySelectorAll("input")[1].value,
        Location : setup.querySelectorAll("input")[2].value,
        LinkedIn : setup.querySelectorAll("input")[3].value,
        Github : setup.querySelectorAll("input")[4].value,
    }

    let testArr = [];
    setup.querySelectorAll("input").forEach( (val) => {
        testArr.push(val);
    });

    if (testArr.includes("")) {
        readOut("Fill complete information sir");
    }
    else{
        localStorage.clear();
        localStorage.setItem("jaddu-setup",JSON.stringify(setupInfo));
        setup.style.display = "none";
    }
}

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
    let userData = localStorage.getItem("jaddu-setup");
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

    //Github Commands
    if (transcript.includes("open github")) {
        readOut("Opening github sir");
        window.open("https://github.com/")
    }
    if (transcript.includes("open my github profile")) {
        readOut("Opening your github profile Sir");
        window.open(`https://github.com/${JSON.parse(userData).Github}`);
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