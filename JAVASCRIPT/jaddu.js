//Element Selector.
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const speakBtn = document.querySelector("#speak");
const time = document.querySelector("#time");
const battery = document.querySelector("#battery");
const internet = document.querySelector("#internet");
let turnOn = document.querySelector("#turn_on");
const messages = document.querySelector(".messages");

function createMessage(who,msg){
  let newmsgs = document.createElement("p");
  newmsgs.innerText = msg;
  newmsgs.setAttribute("class",who);
  messages.appendChild(newmsgs);
}

//Start recognition
document.querySelector("#start_jaddu_btn").addEventListener("click", () => {
  recognition.start();
})

//Stop recognition
document.querySelector("#stop_jaddu_btn").addEventListener("click", () => {
  recognition.stop();
})


//Jaddu Commands
let jadducommands = []
jadducommands.push("hi friday");
jadducommands.push("what are your commands");
jadducommands.push("close this - to close opened popups");
jadducommands.push(
  "change my information - information regarding your acoounts and you"
);
jadducommands.push("whats the weather or temperature");
jadducommands.push("show the full weather report");
jadducommands.push("are you there - to check fridays presence");
jadducommands.push("shut down - stop voice recognition");
jadducommands.push("open google");
jadducommands.push('search for "your keywords" - to search on google ');
jadducommands.push("open whatsapp");
jadducommands.push("open youtube");
jadducommands.push('play "your keywords" - to search on youtube ');
jadducommands.push("close this youtube tab - to close opened youtube tab");
jadducommands.push("open firebase");
jadducommands.push("open netlify");
jadducommands.push("open twitter");
jadducommands.push("open my twitter profile");
jadducommands.push("open instagram");
jadducommands.push("open my instagram profile");
jadducommands.push("open github");
jadducommands.push("open my github profile");

// jaddu Setup
if (localStorage.getItem("jaddu-setup") !== null) {
  //Add info here
}

//jaddu information setup
const setup = document.querySelector(".jaddu-setup");
setup.style.display = "none";
if (localStorage.getItem("jaddu-setup") === null) {
  setup.style.display = "block";
  // setup.style.display = flex;
  document.querySelector(".sub_btn").addEventListener("click", userInfo);
}

//UserInfo function
function userInfo() {
  let setupInfo = {
    name: setup.querySelectorAll("input")[0].value,
    Bio: setup.querySelectorAll("input")[1].value,
    Location: setup.querySelectorAll("input")[2].value,
    LinkedIn: setup.querySelectorAll("input")[3].value,
    Github: setup.querySelectorAll("input")[4].value,
  };

  let testArr = [];
  setup.querySelectorAll("input").forEach((val) => {
    testArr.push(val);
  });

  if (testArr.includes("")) {
    readOut("Fill complete information sir");
  } else {
    localStorage.clear();
    localStorage.setItem("jaddu-setup", JSON.stringify(setupInfo));
    setup.style.display = "none";
  }
}

//Speech Recognition Setup
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

//SR Start
recognition.onstart = function () {
  console.log("vr active");
};

//Arr of window closing tab
let windowsB = []

//SR Result
recognition.onresult = function (event) {
  let current = event.resultIndex;
  let transcript = event.results[current][0].transcript;
  transcript = transcript.toLowerCase();
  let userData = localStorage.getItem("jaddu-setup");
  console.log(`my words : ${transcript}`);

  //Message function call
  createMessage("usermsg",transcript);
  //closing all tabs code
  if(transcript.includes("close all tabs")){
    readOut("clossing all tabs, sir");
    windowsB.forEach( (e) => {
      e.close();
    })
  }

  //Introduction command
  if (
    transcript.includes("hello jadu") ||
    transcript.includes("hey jadu") ||
    transcript.includes("jadoo")
  ) {
    readOut("hello ji");
  }

  //close voice recognition jaddu
  if(transcript.includes("shut down")){
    readOut("Ok, I will take a nap");
    stoppingR = true;
    recognition.stop();
  }

  //Openning youtube
  if (transcript.includes("open youtube")) {
    readOut("openning youtube Sir");
    let a = window.open("https://www.youtube.com/");
    windowsB.push(a);
  }
  //Openning google
  if (transcript.includes("open google")) {
    readOut("openning google Sir");
    window.open("https://www.google.com/");
  }
  //google Search
  if (transcript.includes("search")) {
    readOut("here's the result");
    let input = transcript.split("");
    input.splice(0, 7);
    input.pop();
    input = input.join("").split(" ").join("+");
    window.open(`https://google.com/search?q=${input}`);
  }

  //Github Commands
  if (transcript.includes("open github")) {
    readOut("Opening github sir");
    window.open("https://github.com/");
  }
  if (transcript.includes("open my github profile")) {
    readOut("Opening your github profile Sir");
    window.open(`https://github.com/${JSON.parse(userData).Github}`);
  }

  //Adding jaddu commands.
  if(transcript.includes("what are your command")){
    readOut("sir, I follow this following commands");
    document.querySelector(".commands").style.display = "block";
  }
  
  //clossing jaddu commands
  if (transcript.includes("close this")) {
    readOut("closed");
    document.querySelector(".commands").style.display = "none";
    setup.style.display = "none";
  }

  //changing user information command.
  if (transcript.includes("change my information")) {
    readOut("Opening the information tab sir");
    localStorage.clear();
    
    if(window.innerWidth <= 400 ){
      window.resizeTo(screen.width,screen.height)
    }
    setup.style.display = "flex";
    setup.querySelector("button").addEventListener("click", userInfo);
  }
};

//Time Setup
let date = new Date();
let hours = date.getHours();
let minutes = date.getMinutes();
let seconds = date.getSeconds();
hours = hours % 12;

//autoJaddu
function autoJaddu(){
    setTimeout(()=>{
        recognition.start();
    },2000)
}
//onload(window)
window.onload = () => {
  //OnStartUp
  // turnOn.play();
    turnOn.addEventListener("onend", () => {
        setTimeout( () => {
            autoJaddu();
            readOut("Ready to go sir");
            if(localStorage.getItem("jaddu-setup") === null){
                readOut("Sir, kindly fill the form");
            }
        },200);
    });

  //time clock
  time.textContent = `${hours} ${minutes} ${seconds}`;
  setInterval(() => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    time.textContent = `${hours}:${minutes}:${seconds}`;
  }, 1000);

  //Battery Setup
  let batteryPromise = navigator.getBattery();
  batteryPromise.then(batteryCallback);
  
  function batteryCallback(batteryObject){
    printBatteryStatus(batteryObject);
    setInterval( () => {
        printBatteryStatus(batteryObject);
    },5000);
  }

  function printBatteryStatus(batteryObject){
    battery.textContent = `${(batteryObject.level*100).toFixed(2)}%`;
    if (batteryObject.charging == true) {
        document.querySelector(".battery").style.width = "200px";
        battery.textContent = `${batteryObject.level*100}% Charging`;
    }
  }

  //Internet Setup
  navigator.onLine ? (internet.textContent = "Online") : (internet.textContent = "Offline");
  setInterval( () => {
    navigator.onLine ? (internet.textContent = "Online") : (internet.textContent = "Offline");
  },6000)

  //jaddu commands Adding
  jadducommands.forEach( (elem) => {
    document.querySelector(".commands").innerHTML += `<p>${elem}</p><br/>`
  })
};

//SR Stop
recognition.onend = function () {
  console.log("vr deactive");
};

//SR contionous
recognition.continuous = true;

startBtn.addEventListener("click", () => {
  recognition.start();
});

stopBtn.addEventListener("click", () => {
  recognition.stop();
});

//JADDU Speech
function readOut(message) {
  const speech = new SpeechSynthesisUtterance();
  //different voices
  const allVoices = speechSynthesis.getVoices();
  speech.voice = allVoices[2];
  speech.text = message;
  speech.volume = 1;
  window.speechSynthesis.speak(speech);
  console.log("speaking out");
  createMessage("jmsg",message)
}

speakBtn.addEventListener("click", () => {
  readOut();
});

recognition.onend = function(){
  if(stoppingR === false){
    setTimeout( () => {
      recognition.start();
    },500);
  }
  else if(stoppingR === true){
    recognition.stop();
  }
};
