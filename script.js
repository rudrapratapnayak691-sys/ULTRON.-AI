/* =====================================================
   ULTRON MARK 9
===================================================== */


/* =========================
   VARIABLES
========================= */

let handTrackingActive = false;

let touchMode = false;

let cameraStream = null;

let lastHandX = null;

let lastHandY = null;

let currentZoom = 1;

let previousPinch = null;

let processing = false;

let touchX = 0;

let touchY = 0;

let lastTap = 0;

let signalIndex = 0;


/* =========================
   UI
========================= */

const responseBox =
document.getElementById("response");

const statusBox =
document.getElementById("status");

const inputBox =
document.getElementById("questionInput");

const typingPanel =
document.getElementById("typingPanel");

const cameraVideo =
document.getElementById("camera");


/* =====================================================
   THREE.JS
===================================================== */

const scene =
new THREE.Scene();


const camera =
new THREE.PerspectiveCamera(

60,

window.innerWidth /
window.innerHeight,

0.1,

1000

);


camera.position.z = 8;


const renderer =
new THREE.WebGLRenderer({

antialias:true,

alpha:true

});


renderer.setPixelRatio(

Math.min(

window.devicePixelRatio,

2

)

);


renderer.setSize(

window.innerWidth,

window.innerHeight

);


document.body.appendChild(

renderer.domElement

);


/* =====================================================
   NEURAL SYSTEM
===================================================== */

const brain =
new THREE.Group();


scene.add(brain);


/* =========================
   CORE
========================= */

const coreGeometry =
new THREE.IcosahedronGeometry(

1,

3

);


const coreMaterial =
new THREE.MeshBasicMaterial({

color:0xffd000,

wireframe:true

});


const core =
new THREE.Mesh(

coreGeometry,

coreMaterial

);


brain.add(core);


/* =========================
   CORE GLOW
========================= */

const glowGeometry =
new THREE.SphereGeometry(

1.3,

32,

32

);


const glowMaterial =
new THREE.MeshBasicMaterial({

color:0xff9900,

transparent:true,

opacity:0.12

});


const coreGlow =
new THREE.Mesh(

glowGeometry,

glowMaterial

);


brain.add(coreGlow);


/* =========================
   RINGS
========================= */

const rings = [];


for(

let i = 0;

i < 8;

i++

){

const geometry =

new THREE.TorusGeometry(

1.5 +

i * 0.35,

0.012,

8,

120

);


const material =

new THREE.MeshBasicMaterial({

color:0xffaa00,

transparent:true,

opacity:0.5

});


const ring =

new THREE.Mesh(

geometry,

material

);


ring.rotation.x =

Math.random() *

Math.PI;


ring.rotation.y =

Math.random() *

Math.PI;


brain.add(ring);


rings.push(ring);

}


/* =========================
   NEURONS
========================= */

const neurons = [];


const neuronGeometry =

new THREE.SphereGeometry(

0.045,

8,

8

);


for(

let i = 0;

i < 300;

i++

){

const angle =

Math.random() *

Math.PI *

2;


const radius =

1.5 +

Math.random() *

2.5;


const x =

Math.cos(angle) *

radius;


const y =

(

Math.random() -

0.5

) *

2.5;


const z =

Math.sin(angle) *

radius;


const material =

new THREE.MeshBasicMaterial({

color:0xffd84a

});


const neuron =

new THREE.Mesh(

neuronGeometry,

material

);


neuron.position.set(

x,

y,

z

);


neuron.userData.type =

Math.floor(

Math.random() *

5

);


brain.add(neuron);


neurons.push(neuron);

}


/* =====================================================
   SIGNALS
===================================================== */

const signals = [];


for(

let i = 0;

i < 50;

i++

){

const geometry =

new THREE.SphereGeometry(

0.035,

8,

8

);


const material =

new THREE.MeshBasicMaterial({

color:0xffffff

});


const signal =

new THREE.Mesh(

geometry,

material

);


signal.visible = false;


signal.userData.progress = 0;

signal.userData.target = null;


brain.add(signal);


signals.push(signal);

}


/* =====================================================
   RESPONSE
===================================================== */

function showResponse(text){

responseBox.innerText =

text;

}


/* =====================================================
   ERROR SYSTEM
===================================================== */

function triggerError(){

/* Make core red */

coreMaterial.color.set(

0xff0000

);


coreGlow.material.color.set(

0xff0000

);


coreGlow.material.opacity =

0.8;


document.body.classList.add(

"errorMode"

);


setStatus(

"⚠️ ULTRON MARK 9 ERROR"

);


/* Red error for 1.5 seconds */

setTimeout(

function(){

coreMaterial.color.set(

0xffd000

);


coreGlow.material.color.set(

0xff9900

);


coreGlow.material.opacity =

0.12;


document.body.classList.remove(

"errorMode"

);


setStatus(

"ULTRON MARK 9 READY"

);

},

1500

);

}


/* =====================================================
   ACTIVATE NEURONS
===================================================== */

function activateNeurons(type){

neurons.forEach(

neuron => {

neuron.material.color.set(

0xffd84a

);

}

);


const selected =

neurons.filter(

neuron =>

neuron.userData.type === type

);


selected.forEach(

neuron => {

neuron.material.color.set(

0xffffff

);

}

);


/* Create signals */

selected.forEach(

(neuron,index) => {

const signal =

signals[

(index +

signalIndex)

%

signals.length

];


signal.visible = true;

signal.userData.progress = 0;

signal.userData.target =

neuron;

}

);


signalIndex +=

selected.length;

}


/* =====================================================
   SIGNAL ANIMATION
===================================================== */

function animateSignals(){

signals.forEach(

signal => {

if(!signal.visible)

return;


signal.userData.progress +=

0.02;


if(!signal.userData.target)

return;


const start =

new THREE.Vector3(

0,

0,

0

);


signal.position.lerpVectors(

start,

signal.userData.target.position,

signal.userData.progress

);


if(

signal.userData.progress >= 1

){

signal.userData.progress = 0;

}

}

);

}


/* =====================================================
   PROCESSING
===================================================== */

function startProcessing(type){

processing = true;


activateNeurons(type);


coreMaterial.color.set(

0xffffff

);


coreGlow.material.opacity =

0.7;

}


function stopProcessing(){

processing = false;


coreMaterial.color.set(

0xffd000

);


coreGlow.material.opacity =

0.12;


signals.forEach(

signal => {

signal.visible = false;

});


setStatus(

"ULTRON MARK 9 READY"

);

}


/* =====================================================
   JARVIS VOICE
===================================================== */

function speak(text){

const audio =

new Audio(

"Jarvisvoice.mp3"

);


/*

Your MP3 will play.

If your MP3 is only a short
voice clip, it will NOT automatically
speak different sentences.

*/

audio.play().catch(

function(){

triggerError();

}

);

}


/* =====================================================
   ULTRON RESPONSE
===================================================== */

function respond(text){

showResponse(

"ULTRON MARK 9: " +

text

);


coreMaterial.color.set(

0xffffff

);


coreGlow.material.opacity =

0.9;


speak(text);


setTimeout(

function(){

stopProcessing();

},

1500

);

}


/* =====================================================
   APP URL SYSTEM
===================================================== */

function openApp(app){

try{

if(app === "youtube"){

window.location.href =

"https://m.youtube.com/";

}


else if(app === "instagram"){

window.location.href =

"https://www.instagram.com/";

}


else if(app === "whatsapp"){

window.location.href =

"https://www.whatsapp.com/";

}


else if(app === "google"){

window.location.href =

"https://www.google.com/";

}


else if(app === "roblox"){

window.location.href =

"https://www.roblox.com/";

}


else{

throw new Error(

"Unknown application"

);

}

}

catch(error){

triggerError();

}

}


/* =====================================================
   COMMAND SYSTEM
===================================================== */

function processCommand(command){

command =

command

.toLowerCase()

.trim();


/* YOUTUBE */

if(

command.includes(

"open youtube"

)

){

startProcessing(3);


respond(

"Opening YouTube, Boss."

);


setTimeout(

function(){

openApp(

"youtube"

);

},

800

);


return;

}


/* INSTAGRAM */

if(

command.includes(

"open instagram"

)

){

startProcessing(3);


respond(

"Opening Instagram, Boss."

);


setTimeout(

function(){

openApp(

"instagram"

);

},

800

);


return;

}


/* WHATSAPP */

if(

command.includes(

"open whatsapp"

)

){

startProcessing(3);


respond(

"Opening WhatsApp, Boss."

);


setTimeout(

function(){

openApp(

"whatsapp"

);

},

800

);


return;

}


/* GOOGLE */

if(

command.includes(

"open google"

)

){

startProcessing(3);


respond(

"Opening Google, Boss."

);


setTimeout(

function(){

openApp(

"google"

);

},

800

);


return;

}


/* ROBLOX */

if(

command.includes(

"open roblox"

)

){

startProcessing(3);


respond(

"Opening Roblox, Boss."

);


setTimeout(

function(){

openApp(

"roblox"

);

},

800

);


return;

}


/* 1 + 1 */

if(

command.includes("1+1") ||

command.includes(

"1 plus 1"

) ||

command.includes(

"one plus one"

)

){

startProcessing(0);


setTimeout(

function(){

respond(

"Two, Boss."

);

},

700

);


return;

}


/* DUMB */

if(

command.includes(

"are you dumb"

)

){

startProcessing(1);


setTimeout(

function(){

respond(

"No, Boss. I am ULTRON MARK 9."

);

},

700

);


return;

}


/* PROTOTYPE */

if(

command.includes(

"prototype"

)

){

startProcessing(2);


setTimeout(

function(){

respond(

"Yes, Boss. I am the ULTRON MARK 9 prototype."

);

},

700

);


return;

}


/* NAME */

if(

command.includes(

"your name"

)

){

startProcessing(2);


setTimeout(

function(){

respond(

"My designation is ULTRON MARK 9."

);

},

700

);


return;

}


/* UNKNOWN */

startProcessing(4);


setTimeout(

function(){

respond(

"I don't know that yet, Boss."

);

},

700

);

}


/* =====================================================
   VOICE INPUT
===================================================== */

function startVoice(){

const Recognition =

window.SpeechRecognition ||

window.webkitSpeechRecognition;


if(!Recognition){

triggerError();

showResponse(

"Voice recognition is not supported."

);

return;

}


const recognition =

new Recognition();


recognition.lang =

"en-US";


recognition.continuous =

false;


recognition.interimResults =

false;


setStatus(

"🎤 LISTENING..."

);


recognition.start();


recognition.onresult =

function(event){

const command =

event

.results[0][0]

.transcript;


showResponse(

"You: " +

command

);


processCommand(

command

);

};


recognition.onerror =

function(){

triggerError();

};

}


/* =====================================================
   TYPING
===================================================== */

function toggleTyping(){

typingPanel.style.display =

typingPanel.style.display ===

"block"

?

"none"

:

"block";

}


function sendTyped(){

const text =

inputBox.value.trim();


if(!text)

return;


processCommand(text);


inputBox.value = "";

}


document

.getElementById(

"sendButton"

)

.onclick =

sendTyped;


inputBox

.addEventListener(

"keydown",

function(event){

if(

event.key ===

"Enter"

){

sendTyped();

}

}

);


/* =====================================================
   HAND TRACKING
===================================================== */

const hands =

new Hands({

locateFile:

file =>

"https://cdn.jsdelivr.net/npm/@mediapipe/hands/" +

file

});


hands.setOptions({

maxNumHands:1,

modelComplexity:1,

minDetectionConfidence:0.7,

minTrackingConfidence:0.7

});


hands.onResults(

function(results){

if(!handTrackingActive)

return;


if(

results.multiHandLandmarks &&

results.multiHandLandmarks.length

){

const hand =

results.multiHandLandmarks[0];


const index = hand[8];

const thumb = hand[4];


/* ROTATION */

if(lastHandX !== null){

const dx =

index.x -

lastHandX;


const dy =

index.y -

lastHandY;


brain.rotation.y +=

dx * 2;


brain.rotation.x +=

dy * 2;

}


lastHandX =

index.x;


lastHandY =

index.y;


/* PINCH */

const dx =

thumb.x -

index.x;


const dy =

thumb.y -

index.y;


const distance =

Math.sqrt(

dx * dx +

dy * dy

);


if(

previousPinch !== null

){

const difference =

distance -

previousPinch;


currentZoom +=

difference * 3;


currentZoom =

Math.max(

0.5,

Math.min(

4,

currentZoom

)

);


brain.scale.set(

currentZoom,

currentZoom,

currentZoom

);

}


previousPinch =

distance;


setStatus(

"✋ HAND TRACKING ACTIVE"

);

}

});


/* =====================================================
   CAMERA
===================================================== */

async function toggleHand(){

if(handTrackingActive){

handTrackingActive =

false;


if(cameraStream){

cameraStream

.getTracks()

.forEach(

track =>

track.stop()

);

}


cameraVideo.style.display =

"none";


document

.getElementById(

"handButton"

)

.innerText =

"✋ HAND OFF";


return;

}


try{

cameraStream =

await navigator

.mediaDevices

.getUserMedia({

video:true,

audio:false

});


cameraVideo.srcObject =

cameraStream;


cameraVideo.style.display =

"block";


handTrackingActive =

true;


document

.getElementById(

"handButton"

)

.innerText =

"✋ HAND ON";


processHands();

}

catch(error){

triggerError();

}

}


async function processHands(){

if(!handTrackingActive)

return;


try{

await hands.send({

image:cameraVideo

});

}

catch(error){

triggerError();

}


requestAnimationFrame(

processHands

);

}


/* =====================================================
   TOUCH
===================================================== */

function toggleTouch(){

touchMode =

!touchMode;


touchButton.innerText =

touchMode

?

"👆 TOUCH ON"

:

"👆 TOUCH OFF";

}


/* TOUCH ROTATION */

renderer.domElement

.addEventListener(

"touchstart",

function(event){

const now =

Date.now();


/* DOUBLE TAP */

if(

now -

lastTap <

300

){

startProcessing(2);


respond(

"Core selected, Boss."

);

}


lastTap = now;


if(touchMode){

touchX =

event.touches[0]

.clientX;


touchY =

event.touches[0]

.clientY;

}

}

);


/* TOUCH MOVE */

renderer.domElement

.addEventListener(

"touchmove",

function(event){

if(!touchMode)

return;


event.preventDefault();


const x =

event.touches[0]

.clientX;


const y =

event.touches[0]

.clientY;


const dx =

x -

touchX;


const dy =

y -

touchY;


brain.rotation.y +=

dx * 0.01;


brain.rotation.x +=

dy * 0.01;


touchX = x;

touchY = y;

},

{

passive:false

}

);


/* =====================================================
   RESET
===================================================== */

function reset(){

brain.rotation.set(

0,

0,

0

);


coreMaterial.color.set(

0xffd000

);


coreGlow.material.opacity =

0.12;


currentZoom = 1;


brain.scale.set(

1,

1,

1

);


stopProcessing();


showResponse(

"ULTRON MARK 9 ONLINE"

);

}


/* =====================================================
   BUTTONS
===================================================== */

document

.getElementById(

"handButton"

)

.onclick =

toggleHand;


document

.getElementById(

"touchButton"

)

.onclick =

toggleTouch;


document

.getElementById(

"voiceButton"

)

.onclick =

startVoice;


document

.getElementById(

"typeButton"

)

.onclick =

toggleTyping;


document

.getElementById(

"resetButton"

)

.onclick =

reset;


/* =====================================================
   ANIMATION
===================================================== */

function animate(){

requestAnimationFrame(

animate

);


core.rotation.x +=

0.008;


core.rotation.y +=

0.012;


rings.forEach(

(ring,index) => {

ring.rotation.x +=

0.001;


ring.rotation.y +=

0.002;

}

);


animateSignals();


renderer.render(

scene,

camera

);

}


animate();


/* =====================================================
   RESIZE
===================================================== */

window

.addEventListener(

"resize",

function(){

camera.aspect =

window.innerWidth /

window.innerHeight;


camera.updateProjectionMatrix();


renderer.setSize(

window.innerWidth,

window.innerHeight

);

});
