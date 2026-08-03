/* =====================================================
   ULTRON V4
===================================================== */


/* =====================================================
   VARIABLES
===================================================== */

let handTrackingActive = false;

let touchMode = false;

let cameraStream = null;

let lastHandX = null;

let lastHandY = null;


/* PERSISTENT ZOOM */

let currentZoom = 1;

let previousPinchDistance = null;

let zoomSensitivity = 3;


/* PROCESSING */

let processing = false;


/* DOUBLE TAP */

let lastTap = 0;


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
   CORE
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


const glow =
new THREE.Mesh(

glowGeometry,

glowMaterial

);


aiGroup.add(glow);


/* =====================================================
   RINGS
===================================================== */

const rings = [];


for(

let i=0;

i<7;

i++

){

const geometry =
new THREE.TorusGeometry(

1.5 + i*0.45,

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
Math.random()*Math.PI;


ring.rotation.y =
Math.random()*Math.PI;


aiGroup.add(ring);


rings.push(ring);

}


/* =====================================================
   NEURONS
===================================================== */

const nodes = [];


const nodeGeometry =
new THREE.SphereGeometry(

0.045,

8,

8

);


const nodeMaterial =
new THREE.MeshBasicMaterial({

color:0xffd84a

});


for(

let i=0;

i<300;

i++

){

const angle =
Math.random()*Math.PI*2;


const radius =
1.5 +

Math.random()*2.8;


const x =
Math.cos(angle)*radius;


const y =
(Math.random()-0.5)*2;


const z =
Math.sin(angle)*radius;


const node =
new THREE.Mesh(

nodeGeometry,

nodeMaterial

);


node.position.set(

x,

y,

z

);


aiGroup.add(node);


nodes.push(node);

}


/* =====================================================
   CONNECTIONS
===================================================== */

const lines = [];


const lineMaterial =
new THREE.LineBasicMaterial({

color:0xffa800,

transparent:true,

opacity:0.2

});


for(

let i=0;

i<nodes.length;

i++

){

for(

let j=0;

j<2;

j++

){

const target =
nodes[

Math.floor(

Math.random()*
nodes.length

)

];


const geometry =
new THREE.BufferGeometry()

.setFromPoints([

nodes[i].position,

target.position

]);


const line =
new THREE.Line(

geometry,

lineMaterial

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

let i=0;

i<35;

i++

){

const geometry =
new THREE.SphereGeometry(

0.04,

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


aiGroup.add(signal);


signals.push(signal);

}


/* =====================================================
   UI
===================================================== */

function setStatus(text){

document.getElementById(

"status"

).innerText = text;

}


function showResponse(text){

document.getElementById(

"response"

).innerText = text;

}


/* =====================================================
   TYPING
===================================================== */

function toggleTyping(){

const panel =
document.getElementById(

"typingPanel"

);


if(

panel.style.display ===
"block"

){

panel.style.display =
"none";

}

else{

panel.style.display =
"block";


document.getElementById(

"questionInput"

).focus();

}

}


function sendTypedQuestion(){

const input =
document.getElementById(

"questionInput"

);


const question =
input.value

.toLowerCase()

.trim();


if(!question)

return;


showResponse(

"You: " + question

);


processCommand(

question

);


input.value = "";

}


/* ENTER */

document.getElementById(

"questionInput"

).addEventListener(

"keydown",

function(event){

if(

event.key ===
"Enter"

){

sendTypedQuestion();

}

}

);


/* =====================================================
   PROCESSING
===================================================== */

function startProcessing(){

processing = true;


setStatus(

"⚡ NEURAL NETWORK PROCESSING..."

);


/* CORE GLOW */

coreMaterial.color.set(

0xffffff

);


glowMaterial.opacity =
0.5;


/* KEEP ZOOM */

core.scale.set(

currentZoom,

currentZoom,

currentZoom

);


/* SIGNALS */

signals.forEach(

signal => {

signal.visible = true;

}

);

}


function stopProcessing(){

processing = false;


coreMaterial.color.set(

0xffd000

);


glowMaterial.opacity =
0.12;


/* KEEP ZOOM */

core.scale.set(

currentZoom,

currentZoom,

currentZoom

);


signals.forEach(

signal => {

signal.visible = false;

}

);


setStatus(

"ULTRON READY"

);

}


/* =====================================================
   SIGNAL ANIMATION
===================================================== */

function animateSignals(){

if(!processing)

return;


signals.forEach(

(signal,i) => {

const time =

(

Date.now()*0.001 +

i*0.15

) % 1;


const angle =

i*0.7;


const radius =

1 +

time*3;


signal.position.set(

Math.cos(angle)*radius,

Math.sin(time*Math.PI*2)*1.5,

Math.sin(angle)*radius

);

}

);


/* CORE PULSE */

const pulse =

1 +

Math.sin(

Date.now()*0.01

)*0.15;


/* PULSE WITHOUT
   CHANGING ZOOM */

core.scale.set(

currentZoom*pulse,

currentZoom*pulse,

currentZoom*pulse

);

}


/* =====================================================
   VOICE
===================================================== */

function startVoice(){

const Recognition =

window.SpeechRecognition ||

window.webkitSpeechRecognition;


if(!Recognition){

respond(

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

event.results[0][0]

.transcript

.toLowerCase()

.trim();


showResponse(

"You: " + command

);


processCommand(

command

);

};

}


/* =====================================================
   COMMANDS
===================================================== */

function processCommand(command){

startProcessing();


/* HELLO */

if(

command.includes("hello")

){

setTimeout(

() => {

respond(

"Hello, Boss. ULTRON is online."

);

},

1200

);

return;

}


/* 1+1 */

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

"No, Boss. I am ULTRON."

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

"Yes, Boss. I am currently a prototype."

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

"My name is ULTRON, Boss."

);

},

1200

);

return;

}


/* WHO */

if(

command.includes("who are you")

){

setTimeout(

() => {

respond(

"I am ULTRON, your personal AI assistant."

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


window.location.href =

"roblox://";


setTimeout(

() => {

window.open(

"https://www.roblox.com",

"_blank"

);

},

1500

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
   ULTRON VOICE
===================================================== */

function respond(text){

showResponse(

"ULTRON: " + text

);


speechSynthesis.cancel();


const speech =

new SpeechSynthesisUtterance(

text

);


speech.rate =
0.75;


speech.pitch =
0.25;


speech.volume =
1;


speech.onend =

function(){

stopProcessing();

};


speechSynthesis.speak(

speech

);

}


/* =====================================================
   HAND TRACKING
===================================================== */

const video =

document.getElementById(

"camera"

);


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


const index =

hand[8];


const thumb =

hand[4];


/* =====================
   ROTATE CORE
===================== */

if(

lastHandX !== null

){

const dx =

index.x -

lastHandX;


const dy =

index.y -

lastHandY;


aiGroup.rotation.y +=

dx*2;


aiGroup.rotation.x +=

dy*2;

}


lastHandX =

index.x;


lastHandY =

index.y;


/* =====================
   PINCH ZOOM
===================== */

const pinchX =

thumb.x -

index.x;


const pinchY =

thumb.y -

index.y;


const pinchDistance =

Math.sqrt(

pinchX*pinchX +

pinchY*pinchY

);


/* FIRST FRAME */

if(

previousPinchDistance !== null

){

const difference =

pinchDistance -

previousPinchDistance;


/* FINGERS APART
   = ZOOM IN */

if(

difference > 0.002

){

currentZoom +=

difference *

zoomSensitivity;

}


/* FINGERS TOGETHER
   = ZOOM OUT */

if(

difference < -0.002

){

currentZoom +=

difference *

zoomSensitivity;

}

}


/* SAVE DISTANCE */

previousPinchDistance =

pinchDistance;


/* LIMIT */

currentZoom =

Math.max(

0.5,

Math.min(

4,

currentZoom

)

);


/* APPLY */

if(!processing){

aiGroup.scale.set(

currentZoom,

currentZoom,

currentZoom

);

}


setStatus(

"✋ HAND TRACKING ACTIVE"

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

const button =

document.getElementById(

"handButton"

);


/* OFF */

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


cameraStream = null;


video.srcObject =

null;


video.style.display =

"none";


lastHandX =

null;


lastHandY =

null;


/* RESET PINCH */

previousPinchDistance =

null;


button.innerText =

"✋ HAND: OFF";


setStatus(

"HAND TRACKING OFF"

);


return;

}


/* ON */

try{

setStatus(

"STARTING CAMERA..."

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


video.srcObject =

cameraStream;


video.style.display =

"block";


await video.play();


handTrackingActive =

true;


button.innerText =

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

video.readyState >= 2

){

await hands.send({

image:video

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

touchMode =

!touchMode;


document.getElementById(

"touchButton"

).innerText =

touchMode

?

"👆 TOUCH: ON"

:

"👆 TOUCH: OFF";

}


/* =====================================================
   TOUCH CONTROL
===================================================== */

let touchX = 0;

let touchY = 0;


renderer.domElement.addEventListener(

"touchstart",

function(event){

const now =

Date.now();


/* DOUBLE TAP */

if(

now -

lastTap < 300

){

coreMaterial.color.set(

0xffffff

);


setStatus(

"⚡ NEURAL CORE SELECTED"

);


setTimeout(

() => {

coreMaterial.color.set(

0xffd000

);

},

1000

);

}


lastTap =

now;


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


aiGroup.rotation.y +=

(x-touchX)*0.01;


aiGroup.rotation.x +=

(y-touchY)*0.01;


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


/* KEEP ZOOM */

aiGroup.scale.set(

currentZoom,

currentZoom,

currentZoom

);


setStatus(

"NEURAL CORE RESET"

);


showResponse(

"ULTRON SYSTEM READY"

);

}


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

(ring,i) => {

ring.rotation.x +=

0.001 +

i*0.0002;


ring.rotation.y +=

0.002 +

i*0.0003;

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
