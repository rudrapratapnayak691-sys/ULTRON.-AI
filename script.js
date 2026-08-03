/* ==========================================
   ULTRON MARK 10
   BROWSER AI VOICE + NEURAL CORE
========================================== */


/* ==========================================
   VARIABLES
========================================== */

let handOn = false;

let touchOn = false;

let stream = null;

let lastX = null;

let lastY = null;

let zoom = 1;

let lastPinch = null;

let lastTap = 0;

let processing = false;


/* ==========================================
   UI
========================================== */

const response =
document.getElementById("response");

const status =
document.getElementById("status");

const video =
document.getElementById("camera");

const input =
document.getElementById("questionInput");

const typing =
document.getElementById("typingPanel");


/* ==========================================
   THREE JS
========================================== */

const scene =
new THREE.Scene();

const camera =
new THREE.PerspectiveCamera(

60,

innerWidth / innerHeight,

.1,

1000

);

camera.position.z = 8;


const renderer =
new THREE.WebGLRenderer({

antialias:true,

alpha:true

});


renderer.setSize(

innerWidth,

innerHeight

);


renderer.setPixelRatio(

Math.min(devicePixelRatio,2)

);


document.body.appendChild(

renderer.domElement

);


/* ==========================================
   NEURAL BRAIN
========================================== */

const brain =
new THREE.Group();

scene.add(brain);


/* ==========================================
   CORE
========================================== */

const core =
new THREE.Mesh(

new THREE.IcosahedronGeometry(

1,3

),

new THREE.MeshBasicMaterial({

color:0xffd000,

wireframe:true

})

);


brain.add(core);


/* ==========================================
   CORE GLOW
========================================== */

const glow =
new THREE.Mesh(

new THREE.SphereGeometry(

1.3,

32,

32

),

new THREE.MeshBasicMaterial({

color:0xff9900,

transparent:true,

opacity:.12

})

);


brain.add(glow);


/* ==========================================
   NEURONS
========================================== */

const neurons = [];


for(let i=0;i<300;i++){

const angle =
Math.random()*Math.PI*2;

const radius =
1.5+Math.random()*2.5;


const neuron =
new THREE.Mesh(

new THREE.SphereGeometry(

.045,

8,

8

),

new THREE.MeshBasicMaterial({

color:0xffd84a

})

);


neuron.position.set(

Math.cos(angle)*radius,

(Math.random()-.5)*2.5,

Math.sin(angle)*radius

);


neuron.userData.type =

Math.floor(

Math.random()*5

);


brain.add(neuron);

neurons.push(neuron);

}


/* ==========================================
   SIGNALS
========================================== */

const signals=[];


for(let i=0;i<40;i++){

const signal=

new THREE.Mesh(

new THREE.SphereGeometry(

.035,

8,

8

),

new THREE.MeshBasicMaterial({

color:0xffffff

})

);


signal.visible=false;

signal.userData.progress=0;

signal.userData.target=null;


brain.add(signal);

signals.push(signal);

}


/* ==========================================
   SCREEN
========================================== */

function show(text){

response.innerText=

"ULTRON MARK 10: "+text;

}


/* ==========================================
   ERROR
========================================== */

function error(){

core.material.color.set(

0xff0000

);

glow.material.color.set(

0xff0000

);

glow.material.opacity=.8;

document.body.classList.add("error");

status.innerText=

"⚠️ NEURAL SYSTEM ERROR";


setTimeout(()=>{

core.material.color.set(

0xffd000

);

glow.material.color.set(

0xff9900

);

glow.material.opacity=.12;

document.body.classList.remove("error");

status.innerText=

"MARK 10 READY";

},1500);

}


/* ==========================================
   JARVIS STYLE BROWSER VOICE
========================================== */

function speak(text){

if(

!("speechSynthesis" in window)

){

error();

return;

}


speechSynthesis.cancel();


const speech=

new SpeechSynthesisUtterance(

text

);


/*

Deep robotic AI settings

*/

speech.rate=.78;

speech.pitch=.35;

speech.volume=1;


/*

Find deepest available
voice on device

*/

const voices=

speechSynthesis.getVoices();


const preferred=

voices.find(v=>

/David|Daniel|Alex|Google UK English Male|Microsoft David/i

.test(v.name)

);


if(preferred){

speech.voice=

preferred;

}


speech.onstart=()=>{

status.innerText=

"⚡ MARK 10 SPEAKING";

core.material.color.set(

0xffffff

);

glow.material.opacity=.8;

};


speech.onend=()=>{

core.material.color.set(

0xffd000

);

glow.material.opacity=.12;

status.innerText=

"MARK 10 READY";

};


speech.onerror=()=>{

error();

};


speechSynthesis.speak(

speech

);

}


/* ==========================================
   RESPONSE
========================================== */

function answer(text,type=1){

processing=true;


show(text);


neurons.forEach(n=>{

n.material.color.set(

0xffd84a

);

});


const selected=

neurons.filter(n=>

n.userData.type===type

);


selected.forEach(n=>{

n.material.color.set(

0xffffff

);

});


core.material.color.set(

0xffffff

);

glow.material.opacity=.8;


speak(text);


setTimeout(()=>{

processing=false;

},1500);

}


/* ==========================================
   APP OPENING
========================================== */

function openApp(app){

try{

if(app==="youtube"){

location.href=

"https://m.youtube.com/";

}

else if(app==="instagram"){

location.href=

"https://www.instagram.com/";

}

else if(app==="whatsapp"){

location.href=

"https://www.whatsapp.com/";

}

else if(app==="google"){

location.href=

"https://www.google.com/";

}

else if(app==="roblox"){

location.href=

"https://www.roblox.com/";

}

else{

throw new Error();

}

}

catch(e){

error();

}

}


/* ==========================================
   COMMANDS
========================================== */

function command(text){

text=

text.toLowerCase().trim();


/* APP COMMANDS */

if(text.includes("open youtube")){

answer(

"Opening YouTube, Boss.",

3

);

setTimeout(

()=>openApp("youtube"),

700

);

return;

}


if(text.includes("open instagram")){

answer(

"Opening Instagram, Boss.",

3

);

setTimeout(

()=>openApp("instagram"),

700

);

return;

}


if(text.includes("open whatsapp")){

answer(

"Opening WhatsApp, Boss.",

3

);

setTimeout(

()=>openApp("whatsapp"),

700

);

return;

}


if(text.includes("open google")){

answer(

"Opening Google, Boss.",

3

);

setTimeout(

()=>openApp("google"),

700

);

return;

}


if(text.includes("open roblox")){

answer(

"Opening Roblox, Boss.",

3

);

setTimeout(

()=>openApp("roblox"),

700

);

return;

}


/* SIMPLE QUESTIONS */

if(

text.includes("1+1") ||

text.includes("1 plus 1") ||

text.includes("one plus one")

){

answer(

"Two, Boss.",

0

);

return;

}


if(text.includes("are you dumb")){

answer(

"No, Boss. I am ULTRON MARK 10.",

1

);

return;

}


if(text.includes("prototype")){

answer(

"Yes, Boss. I am the ULTRON MARK 10 prototype.",

2

);

return;

}


if(text.includes("your name")){

answer(

"My designation is ULTRON MARK 10.",

2

);

return;

}


if(text.includes("who are you")){

answer(

"I am ULTRON MARK 10, your personal AI assistant.",

2

);

return;

}


if(text.includes("hello")){

answer(

"Hello, Boss. Neural systems are online.",

1

);

return;

}


/* UNKNOWN */

answer(

"I don't know that yet, Boss.",

4

);

}


/* ==========================================
   VOICE INPUT
========================================== */

function listen(){

const Recognition=

window.SpeechRecognition ||

window.webkitSpeechRecognition;


if(!Recognition){

error();

return;

}


const recognition=

new Recognition();


recognition.lang="en-US";

recognition.continuous=false;

recognition.interimResults=false;


status.innerText=

"🎤 LISTENING...";


recognition.start();


recognition.onresult=

event=>{

const text=

event.results[0][0]

.transcript;


command(text);

};


recognition.onerror=

()=>{

error();

};

}


/* ==========================================
   TYPING
========================================== */

function send(){

const text=

input.value.trim();


if(!text)return;


command(text);


input.value="";

}


document.getElementById(

"sendButton"

).onclick=send;


input.addEventListener(

"keydown",

e=>{

if(e.key==="Enter")

send();

});


/* ==========================================
   TYPING BUTTON
========================================== */

document.getElementById(

"typeButton"

).onclick=()=>{

typing.style.display=

typing.style.display==="block"

?"none"

:"block";

};


/* ==========================================
   HAND TRACKING
========================================== */

const hands=

new Hands({

locateFile:file=>

"https://cdn.jsdelivr.net/npm/@mediapipe/hands/"

+file

});


hands.setOptions({

maxNumHands:1,

modelComplexity:1,

minDetectionConfidence:.7,

minTrackingConfidence:.7

});


hands.onResults(

results=>{

if(!handOn)return;


if(

results.multiHandLandmarks &&

results.multiHandLandmarks.length

){

const hand=

results.multiHandLandmarks[0];


const index=hand[8];

const thumb=hand[4];


/* ROTATION */

if(lastX!==null){

brain.rotation.y+=

(index.x-lastX)*2;


brain.rotation.x+=

(index.y-lastY)*2;

}


lastX=index.x;

lastY=index.y;


/* PINCH ZOOM */

const dx=

thumb.x-index.x;


const dy=

thumb.y-index.y;


const distance=

Math.sqrt(

dx*dx+dy*dy

);


if(lastPinch!==null){

zoom+=

(distance-lastPinch)*3;


zoom=Math.max(

.5,

Math.min(4,zoom)

);


brain.scale.set(

zoom,zoom,zoom

);

}


lastPinch=distance;


status.innerText=

"✋ HAND TRACKING ACTIVE";

}

});


/* ==========================================
   CAMERA
========================================== */

async function toggleHand(){

if(handOn){

handOn=false;


if(stream){

stream.getTracks()

.forEach(t=>t.stop());

}


video.style.display="none";


document.getElementById(

"handButton"

).innerText=

"✋ HAND OFF";


return;

}


try{

stream=

await navigator.mediaDevices

.getUserMedia({

video:true,

audio:false

});


video.srcObject=

stream;


video.style.display=

"block";


handOn=true;


document.getElementById(

"handButton"

).innerText=

"✋ HAND ON";


processHands();

}

catch(e){

error();

}

}


async function processHands(){

if(!handOn)return;


try{

await hands.send({

image:video

});

}

catch(e){

error();

}


requestAnimationFrame(

processHands

);

}


/* ==========================================
   TOUCH MODE
========================================== */

document.getElementById(

"touchButton"

).onclick=()=>{

touchOn=!touchOn;


document.getElementById(

"touchButton"

).innerText=

touchOn

?"👆 TOUCH ON"

:"👆 TOUCH OFF";

};


/* ==========================================
   TOUCH ROTATION
========================================== */

renderer.domElement.addEventListener(

"touchstart",

e=>{

const now=Date.now();


if(

now-lastTap<300

){

answer(

"Core selected, Boss.",

2

);

}


lastTap=now;


if(touchOn){

touchX=

e.touches[0].clientX;

touchY=

e.touches[0].clientY;

}

});


renderer.domElement.addEventListener(

"touchmove",

e=>{

if(!touchOn)return;


e.preventDefault();


const x=

e.touches[0].clientX;


const y=

e.touches[0].clientY;


brain.rotation.y+=

(x-touchX)*.01;


brain.rotation.x+=

(y-touchY)*.01;


touchX=x;

touchY=y;

},

{passive:false}

);


/* ==========================================
   RESET
========================================== */

document.getElementById(

"resetButton"

).onclick=()=>{

brain.rotation.set(

0,0,0

);


brain.scale.set(

1,1,1

);


zoom=1;


core.material.color.set(

0xffd000

);


glow.material.opacity=.12;


status.innerText=

"MARK 10 READY";


show(

"NEURAL CORE ONLINE"

);

};


/* ==========================================
   BUTTONS
========================================== */

document.getElementById(

"handButton"

).onclick=

toggleHand;


document.getElementById(

"voiceButton"

).onclick=

listen;


/* ==========================================
   ANIMATION
========================================== */

function animate(){

requestAnimationFrame(

animate

);


core.rotation.x+=.008;

core.rotation.y+=.012;


neurons.forEach(n=>{

if(

Math.random()<.01

){

n.material.color.set(

0xffffff

);

setTimeout(()=>{

n.material.color.set(

0xffd84a

);

},150);

}

});


renderer.render(

scene,

camera

);

}


animate();


/* ==========================================
   RESIZE
========================================== */

window.onresize=()=>{

camera.aspect=

innerWidth/innerHeight;


camera.updateProjectionMatrix();


renderer.setSize(

innerWidth,

innerHeight

);

};
