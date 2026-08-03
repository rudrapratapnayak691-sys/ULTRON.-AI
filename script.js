/* =====================================================
   ULTRON MARK 7
   ADVANCED NEURAL AI CORE
===================================================== */


/* =====================================================
   VARIABLES
===================================================== */

let handTrackingActive = false;

let touchMode = false;

let cameraStream = null;

let lastHandX = null;

let lastHandY = null;

let currentZoom = 1;

let previousPinchDistance = null;

let processing = false;

let touchX = 0;

let touchY = 0;

let lastTap = 0;

let signalCounter = 0;


/* =====================================================
   UI
===================================================== */

const responseBox =
document.getElementById("response");

const statusBox =
document.getElementById("status");

const inputBox =
document.getElementById("questionInput");

const typingPanel =
document.getElementById("typingPanel");

const handButton =
document.getElementById("handButton");

const touchButton =
document.getElementById("touchButton");

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
   AI GROUP
===================================================== */

const aiGroup =
new THREE.Group();

scene.add(aiGroup);


/* =====================================================
   CENTRAL CORE
===================================================== */

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


aiGroup.add(core);


/* =====================================================
   CORE GLOW
===================================================== */

const glowGeometry =
new THREE.SphereGeometry(

1.3,

32,

32

);


const glowMaterial =
new THREE.MeshBasicMaterial({

color:0xffa000,

transparent:true,

opacity:0.12

});


const coreGlow =
new THREE.Mesh(

glowGeometry,

glowMaterial

);


aiGroup.add(coreGlow);


/* =====================================================
   NEURAL RINGS
===================================================== */

const rings = [];


for(

let i = 0;

i < 10;

i++

){

const geometry =
new THREE.TorusGeometry(

1.5 +

i * 0.38,

0.012,

8,

160

);


const material =
new THREE.MeshBasicMaterial({

color:0xffb300,

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


aiGroup.add(ring);

rings.push(ring);

}


/* =====================================================
   NEURON TYPES
===================================================== */

const neuronTypes = [

"logic",

"voice",

"language",

"command",

"thinking",

"memory"

];


/* =====================================================
   CREATE NEURONS
===================================================== */

const nodes = [];


const nodeGeometry =
new THREE.SphereGeometry(

0.045,

8,

8

);


for(

let i = 0;

i < 450;

i++

){

const angle =
Math.random() *
Math.PI *
2;


const radius =
1.5 +
Math.random() *
2.8;


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


const node =
new THREE.Mesh(

nodeGeometry,

material

);


node.position.set(

x,

y,

z

);


node.userData.type =

neuronTypes[

Math.floor(

Math.random() *
neuronTypes.length

)

];


node.userData.pulse = 0;


aiGroup.add(node);

nodes.push(node);

}


/* =====================================================
   CONNECTIONS
===================================================== */

const lines = [];


for(

let i = 0;

i < nodes.length;

i++

){

for(

let j = 0;

j < 2;

j++

){

const target =

nodes[

Math.floor(

Math.random() *
nodes.length

)

];


const geometry =

new THREE.BufferGeometry()

.setFromPoints([

nodes[i].position,

target.position

]);


const material =

new THREE.LineBasicMaterial({

color:0xffa800,

transparent:true,

opacity:0.15

});


const line =

new THREE.Line(

geometry,

material

);


aiGroup.add(line);

lines.push(line);

}

}


/* =====================================================
   SIGNALS
===================================================== */

const signals = [];


for(

let i = 0;

i < 80;

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


aiGroup.add(signal);

signals.push(signal);

}


/* =====================================================
   UI
===================================================== */

function setStatus(text){

statusBox.innerText = text;

}


function showResponse(text){

responseBox.innerText = text;

}


/* =====================================================
   RESET NEURONS
===================================================== */

function resetNeurons(){

nodes.forEach(node => {

node.userData.pulse = 0;

node.material.color.set(

0xffd84a

);

});


signals.forEach(signal => {

signal.visible = false;

});

}


/* =====================================================
   TASK NEURONS
===================================================== */

function activateTask(type){

resetNeurons();


const selected =

nodes.filter(

node =>

node.userData.type === type

);


selected.forEach(node => {

node.userData.pulse = 1;

node.material.color.set(

0xffffff

);

});


signals.forEach(

(signal,index) => {

if(!selected.length)

return;


signal.visible = true;

signal.userData.progress =

(index % 20) / 20;

signal.userData.target =

selected[

index %
selected.length

];

});


setStatus(

"⚡ " +

type.toUpperCase() +

" NEURAL NETWORK ACTIVE"

);

}


/* =====================================================
   MOVEMENT SIGNAL
===================================================== */

function movementSignal(){

for(

let i = 0;

i < 15;

i++

){

const target =

nodes[

Math.floor(

Math.random() *
nodes.length

)

];


const signal =

signals[

signalCounter %
signals.length

];


signalCounter++;


signal.visible = true;

signal.userData.progress = 0;

signal.userData.target = target;

}


coreMaterial.color.set(

0xffffff

);


setTimeout(

() => {

if(!processing){

coreMaterial.color.set(

0xffd000

);

}

},

100

);

}


/* =====================================================
   SIGNAL ANIMATION
===================================================== */

function animateSignals(){

signals.forEach(signal => {

if(!signal.visible)

return;


signal.userData.progress +=

0.015;


const target =

signal.userData.target;


if(!target)

return;


const start =

new THREE.Vector3(

0,0,0

);


signal.position.lerpVectors(

start,

target.position,

signal.userData.progress

);


if(

signal.userData.progress >= 1

){

target.userData.pulse = 1;

target.material.color.set(

0xffffff

);


signal.userData.progress = 0;

}

});


nodes.forEach(node => {

if(node.userData.pulse > 0){

node.userData.pulse -= 0.02;


if(

node.userData.pulse <= 0

){

node.material.color.set(

0xffd84a

);

}

}

});


if(processing){

const pulse =

1 +

Math.sin(

Date.now() * 0.01

) *

0.15;


core.scale.set(

currentZoom * pulse,

currentZoom * pulse,

currentZoom * pulse

);

}

}


/* =====================================================
   START PROCESSING
===================================================== */

function startProcessing(task){

processing = true;


activateTask(task);


coreMaterial.color.set(

0xffffff

);


coreGlow.material.opacity = 0.6;


/* Mark 7 core transformation */

core.scale.set(

currentZoom * 1.2,

currentZoom * 0.8,

currentZoom * 1.4

);

}


/* =====================================================
   STOP PROCESSING
===================================================== */

function stopProcessing(){

processing = false;


coreMaterial.color.set(

0xffd000

);


coreGlow.material.opacity = 0.12;


core.scale.set(

currentZoom,

currentZoom,

currentZoom

);


signals.forEach(signal => {

signal.visible = false;

});


setStatus(

"ULTRON MARK 7 READY"

);

}


/* =====================================================
   ULTRON MARK 7 VOICE
===================================================== */

function respond(text){

showResponse(

"ULTRON MARK 7: " +

text

);


coreMaterial.color.set(

0xffffff

);


coreGlow.material.opacity = 0.9;


speechSynthesis.cancel();


const speech =

new SpeechSynthesisUtterance(

text

);


speech.rate = 0.76;


/*
  Lower pitch for a deeper
  male-style voice
*/

speech.pitch = 0.35;

speech.volume = 1.0;


/*
  Try to select a male voice
*/

const voices =

speechSynthesis.getVoices();


const maleVoice =

voices.find(voice =>

/male|david|daniel|alex|mark|google uk english male/i

.test(voice.name)

);


if(maleVoice){

speech.voice = maleVoice;

}


speech.onstart = function(){

setStatus(

"⚡ ULTRON MARK 7 SPEAKING"

);

};


speech.onend = function(){

stopProcessing();

};


speechSynthesis.speak(speech);

}


/* =====================================================
   COMMAND PROCESSOR
===================================================== */

function processCommand(

command,

inputType = "voice"

){

command =

command

.toLowerCase()

.trim();


/* LOGIC */

if(

command.includes("plus") ||

command.includes("minus") ||

command.includes("times") ||

command.includes("multiply") ||

command.includes("divide")

){

startProcessing("logic");

}


/* COMMAND */

else if(

command.includes("open")

){

startProcessing("command");

}


/* VOICE */

else if(

inputType === "voice"

){

startProcessing("voice");

}


/* LANGUAGE */

else{

startProcessing("language");

}


/* 1 + 1 */

if(

command.includes("one plus one") ||

command.includes("1 plus 1") ||

command.includes("1+1")

){

setTimeout(

() => {

respond(

"Two, Boss."

);

},

1200

);

return;

}


/* DUMB */

if(

command.includes("are you dumb")

){

setTimeout(

() => {

respond(

"No, Boss. I am ULTRON MARK 7."

);

},

1200

);

return;

}


/* PROTOTYPE */

if(

command.includes("prototype")

){

setTimeout(

() => {

respond(

"Yes, Boss. I am the ULTRON MARK 7 prototype."

);

},

1200

);

return;

}


/* NAME */

if(

command.includes("your name")

){

setTimeout(

() => {

respond(

"My designation is ULTRON MARK 7, Boss."

);

},

1200

);

return;

}


/* WHO ARE YOU */

if(

command.includes("who are you")

){

setTimeout(

() => {

respond(

"I am ULTRON MARK 7, your personal AI assistant."

);

},

1200

);

return;

}


/* BOSS */

if(

command.includes("who is your boss")

){

setTimeout(

() => {

respond(

"You are my Boss."

);

},

1200

);

return;

}


/* HELLO */

if(

command.includes("hello")

){

setTimeout(

() => {

respond(

"Hello, Boss. ULTRON MARK 7 is online."

);

},

1200

);

return;

}


/* YOUTUBE */

if(

command.includes("open youtube")

){

setTimeout(

() => {

respond(

"Opening YouTube, Boss."

);


window.open(

"https://www.youtube.com",

"_blank"

);

},

1200

);

return;

}


/* ROBLOX */

if(

command.includes("open roblox")

){

setTimeout(

() => {

respond(

"Opening Roblox, Boss."

);


window.open(

"https://www.roblox.com",

"_blank"

);

},

1200

);

return;

}


/* GOOGLE */

if(

command.includes("open google")

){

setTimeout(

() => {

respond(

"Opening Google, Boss."

);


window.open(

"https://www.google.com",

"_blank"

);

},

1200

);

return;

}


/* UNKNOWN */

setTimeout(

() => {

respond(

"I don't know that answer yet, Boss."

);

},

1200

);

}


/* =====================================================
   VOICE RECOGNITION
===================================================== */

function startVoice(){

const Recognition =

window.SpeechRecognition ||

window.webkitSpeechRecognition;


if(!Recognition){

respond(

"Voice recognition is not supported by this browser."

);

return;

}


const recognition =

new Recognition();


recognition.lang = "en-US";

recognition.continuous = false;

recognition.interimResults = false;


setStatus(

"🎤 ULTRON MARK 7 LISTENING..."

);


recognition.start();


recognition.onresult = function(event){

const command =

event.results[0][0]

.transcript

.toLowerCase()

.trim();


showResponse(

"You: " +

command

);


processCommand(

command,

"voice"

);

};


recognition.onerror = function(){

setStatus(

"VOICE ERROR"

);

};

}


/* =====================================================
   TYPING
===================================================== */

function toggleTyping(){

if(

typingPanel.style.display === "block"

){

typingPanel.style.display = "none";

}

else{

typingPanel.style.display = "block";

inputBox.focus();

}

}


function sendTypedQuestion(){

const question =

inputBox.value

.toLowerCase()

.trim();


if(!question)

return;


showResponse(

"You: " +

question

);


processCommand(

question,

"type"

);


inputBox.value = "";

}


document

.getElementById("sendButton")

.addEventListener(

"click",

sendTypedQuestion

);


inputBox.addEventListener(

"keydown",

function(event){

if(event.key === "Enter"){

sendTypedQuestion();

}

}

);


/* =====================================================
   MEDIAPIPE HANDS
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


/* HAND MOVEMENT */

if(lastHandX !== null){

const dx =

index.x - lastHandX;


const dy =

index.y - lastHandY;


aiGroup.rotation.y +=

dx * 2;


aiGroup.rotation.x +=

dy * 2;


if(

Math.abs(dx) > 0.002 ||

Math.abs(dy) > 0.002

){

movementSignal();

}

}


lastHandX = index.x;

lastHandY = index.y;


/* PINCH ZOOM */

const pinchX =

thumb.x - index.x;


const pinchY =

thumb.y - index.y;


const pinchDistance =

Math.sqrt(

pinchX * pinchX +

pinchY * pinchY

);


if(

previousPinchDistance !== null

){

const difference =

pinchDistance -

previousPinchDistance;


if(difference > 0.002){

currentZoom +=

difference * 3;

}


if(difference < -0.002){

currentZoom +=

difference * 3;

}


currentZoom =

Math.max(

0.5,

Math.min(

4,

currentZoom

)

);


if(!processing){

aiGroup.scale.set(

currentZoom,

currentZoom,

currentZoom

);

}

}


previousPinchDistance =

pinchDistance;


setStatus(

"✋ MARK 7 HAND TRACKING ACTIVE"

);

}

else{

setStatus(

"SHOW YOUR HAND"

);

}

});


/* =====================================================
   HAND ON / OFF
===================================================== */

async function toggleHandTracking(){

if(handTrackingActive){

handTrackingActive = false;


if(cameraStream){

cameraStream

.getTracks()

.forEach(

track => track.stop()

);

}


cameraStream = null;

cameraVideo.srcObject = null;

cameraVideo.style.display = "none";


lastHandX = null;

lastHandY = null;

previousPinchDistance = null;


handButton.innerText =

"✋ HAND: OFF";


setStatus(

"MARK 7 HAND TRACKING OFF"

);


return;

}


try{

setStatus(

"STARTING MARK 7 CAMERA..."

);


cameraStream =

await navigator.mediaDevices

.getUserMedia({

video:{

facingMode:"user",

width:640,

height:480

},

audio:false

});


cameraVideo.srcObject =

cameraStream;


cameraVideo.style.display =

"block";


await cameraVideo.play();


handTrackingActive = true;


handButton.innerText =

"✋ HAND: ON";


setStatus(

"SHOW YOUR HAND"

);


processHandFrame();

}

catch(error){

console.error(error);


setStatus(

"CAMERA PERMISSION ERROR"

);

}

}


/* =====================================================
   HAND LOOP
===================================================== */

async function processHandFrame(){

if(!handTrackingActive)

return;


try{

if(

cameraVideo.readyState >= 2

){

await hands.send({

image:cameraVideo

});

}

}

catch(error){

console.log(

"Hand tracking error",

error

);

}


if(handTrackingActive){

requestAnimationFrame(

processHandFrame

);

}

}


/* =====================================================
   TOUCH MODE
===================================================== */

function toggleTouchMode(){

touchMode = !touchMode;


touchButton.innerText =

touchMode

?

"👆 TOUCH: ON"

:

"👆 TOUCH: OFF";


setStatus(

touchMode

?

"TOUCH CONTROL ACTIVE"

:

"TOUCH CONTROL OFF"

);

}


/* =====================================================
   TOUCH START
===================================================== */

renderer.domElement.addEventListener(

"touchstart",

function(event){

const now = Date.now();


/* DOUBLE TAP */

if(

now - lastTap < 300

){

coreMaterial.color.set(

0xffffff

);


coreGlow.material.opacity = 0.9;


setStatus(

"⚡ MARK 7 CORE SELECTED"

);


movementSignal();


setTimeout(

() => {

if(!processing){

coreMaterial.color.set(

0xffd000

);

coreGlow.material.opacity = 0.12;

}

},

1000

);

}


lastTap = now;


if(

touchMode &&

event.touches.length === 1

){

touchX =

event.touches[0].clientX;


touchY =

event.touches[0].clientY;

}

},

{

passive:false

}

);


/* =====================================================
   TOUCH MOVE
===================================================== */

renderer.domElement.addEventListener(

"touchmove",

function(event){

if(!touchMode)

return;


event.preventDefault();


if(

event.touches.length === 1

){

const x =

event.touches[0].clientX;


const y =

event.touches[0].clientY;


const dx =

x - touchX;


const dy =

y - touchY;


aiGroup.rotation.y +=

dx * 0.01;


aiGroup.rotation.x +=

dy * 0.01;


if(

Math.abs(dx) > 1 ||

Math.abs(dy) > 1

){

movementSignal();

}


touchX = x;

touchY = y;

}

},

{

passive:false

}

);


/* =====================================================
   RESET
===================================================== */

function resetBrain(){

aiGroup.rotation.set(

0,

0,

0

);


/* Keep zoom */

aiGroup.scale.set(

currentZoom,

currentZoom,

currentZoom

);


resetNeurons();


coreMaterial.color.set(

0xffd000

);


coreGlow.material.opacity = 0.12;


showResponse(

"ULTRON MARK 7 SYSTEM READY"

);


setStatus(

"ULTRON MARK 7 READY"

);


speechSynthesis.cancel();

}


/* =====================================================
   BUTTONS
===================================================== */

handButton.addEventListener(

"click",

toggleHandTracking

);


touchButton.addEventListener(

"click",

toggleTouchMode

);


document

.getElementById("voiceButton")

.addEventListener(

"click",

startVoice

);


document

.getElementById("typeButton")

.addEventListener(

"click",

toggleTyping

);


document

.getElementById("resetButton")

.addEventListener(

"click",

resetBrain

);


/* =====================================================
   ANIMATION
===================================================== */

function animate(){

requestAnimationFrame(

animate

);


/* Core */

core.rotation.x +=

0.008;


core.rotation.y +=

0.012;


/* Rings */

rings.forEach(

(ring,i) => {

ring.rotation.x +=

0.001 +

i * 0.0002;


ring.rotation.y +=

0.002 +

i * 0.0003;

}

);


/* Signals */

animateSignals();


/* Render */

renderer.render(

scene,

camera

);

}


animate();


/* =====================================================
   RESIZE
===================================================== */

window.addEventListener(

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
