/* ======================================================
   ULTRON AI V2
   HAND TRACKING + TOUCH + VOICE
====================================================== */


/* ======================================================
   GLOBAL VARIABLES
====================================================== */

let handTrackingActive = false;

let touchMode = false;

let cameraStream = null;

let lastHandX = null;

let lastHandY = null;

let handSmoothing = 0.15;


/* ======================================================
   THREE.JS
====================================================== */

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

));


renderer.setSize(

window.innerWidth,

window.innerHeight

);


document.body.appendChild(

renderer.domElement

);


/* ======================================================
   AI GROUP
====================================================== */

const aiGroup =

new THREE.Group();


scene.add(aiGroup);


/* ======================================================
   CENTRAL NEURAL CORE
====================================================== */

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


/* ======================================================
   CORE GLOW
====================================================== */

const glowGeometry =

new THREE.SphereGeometry(

1.35,

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


/* ======================================================
   NEURAL RINGS
====================================================== */

const rings=[];


for(

let i=0;

i<7;

i++

){

const radius=

1.5+

i*0.45;


const geometry=

new THREE.TorusGeometry(

radius,

0.012,

8,

160

);


const material=

new THREE.MeshBasicMaterial({

color:0xffb300,

transparent:true,

opacity:0.5

});


const ring=

new THREE.Mesh(

geometry,

material

);


ring.rotation.x=

Math.random()*Math.PI;


ring.rotation.y=

Math.random()*Math.PI;


aiGroup.add(ring);


rings.push(ring);

}


/* ======================================================
   NEURAL NODES
====================================================== */

const nodes=[];


const nodeGeometry=

new THREE.SphereGeometry(

0.045,

8,

8

);


const nodeMaterial=

new THREE.MeshBasicMaterial({

color:0xffd84a

});


for(

let i=0;

i<350;

i++

){

const angle=

Math.random()*

Math.PI*

2;


const radius=

1.4+

Math.random()*2.8;


const y=

(

Math.random()-

0.5

)*2;


const x=

Math.cos(angle)*radius;


const z=

Math.sin(angle)*radius;


const node=

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


/* ======================================================
   NEURAL CONNECTIONS
====================================================== */

const lineMaterial=

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

const target=

nodes[

Math.floor(

Math.random()*

nodes.length

)

];


const geometry=

new THREE.BufferGeometry()

.setFromPoints([

nodes[i].position,

target.position

]);


const line=

new THREE.Line(

geometry,

lineMaterial

);


aiGroup.add(line);

}

}


/* ======================================================
   STATUS
====================================================== */

function setStatus(text){

document.getElementById(

"status"

).innerText=

text;

}


function showResponse(text){

document.getElementById(

"response"

).innerText=

text;

}


/* ======================================================
   RESET
====================================================== */

function resetBrain(){

aiGroup.rotation.set(

0,

0,

0

);


aiGroup.scale.set(

1,

1,

1

);


lastHandX=null;

lastHandY=null;


setStatus(

"NEURAL CORE RESET"

);


showResponse(

"ULTRON SYSTEM READY"

);

}


/* ======================================================
   TOUCH MODE
====================================================== */

function toggleTouchMode(){

touchMode=

!touchMode;


const button=

document.getElementById(

"touchButton"

);


if(touchMode){

button.innerText=

"👆 TOUCH: ON";


setStatus(

"TOUCH CONTROL ACTIVE"

);

}

else{

button.innerText=

"👆 TOUCH: OFF";


setStatus(

"TOUCH CONTROL OFF"

);

}

}


/* ======================================================
   TOUCH ROTATION
====================================================== */

let touchX=0;

let touchY=0;


renderer.domElement.addEventListener(

"touchstart",

function(event){

if(!touchMode)

return;


if(

event.touches.length===1

){

touchX=

event.touches[0].clientX;


touchY=

event.touches[0].clientY;

}

},

{passive:false}

);


renderer.domElement.addEventListener(

"touchmove",

function(event){

if(!touchMode)

return;


event.preventDefault();


if(

event.touches.length===1

){

const x=

event.touches[0].clientX;


const y=

event.touches[0].clientY;


const dx=

x-touchX;


const dy=

y-touchY;


aiGroup.rotation.y+=

dx*0.01;


aiGroup.rotation.x+=

dy*0.01;


touchX=x;

touchY=y;

}

},

{passive:false}

);


/* ======================================================
   VOICE SYSTEM
====================================================== */

function startVoice(){

const Recognition=

window.SpeechRecognition||

window.webkitSpeechRecognition;


if(!Recognition){

showResponse(

"Voice recognition is not supported in this browser."

);

return;

}


const recognition=

new Recognition();


recognition.lang=

"en-US";


recognition.continuous=

false;


recognition.interimResults=

false;


setStatus(

"🎤 LISTENING..."

);


showResponse(

"Speak, Boss."

);


recognition.start();


recognition.onresult=

function(event){

const command=

event.results[0][0]

.transcript

.toLowerCase()

.trim();


showResponse(

"You said: "+

command

);


processCommand(

command

);

};


recognition.onerror=

function(event){

setStatus(

"VOICE ERROR: "+

event.error

);

};

}


/* ======================================================
   COMMAND PROCESSOR
====================================================== */

function processCommand(command){


/* HELLO */

if(

command.includes("hello")||

command.includes("hi ultron")

){

respond(

"Hello, Boss. ULTRON systems are online."

);

return;

}


/* 1 + 1 */

if(

command.includes("one plus one")||

command.includes("1 plus 1")||

command.includes("1+1")

){

respond(

"Two, Boss."

);

return;

}


/* 2 + 2 */

if(

command.includes("two plus two")||

command.includes("2 plus 2")

){

respond(

"Four, Boss."

);

return;

}


/* DUMB */

if(

command.includes("are you dumb")||

command.includes("are you stupid")

){

respond(

"No, Boss. I am ULTRON."

);

return;

}


/* PROTOTYPE */

if(

command.includes("are you a prototype")||

command.includes("are you prototype")

){

respond(

"Yes, Boss. I am currently a prototype."

);

return;

}


/* NAME */

if(

command.includes("your name")||

command.includes("what is your name")

){

respond(

"My name is ULTRON, Boss."

);

return;

}


/* WHO ARE YOU */

if(

command.includes("who are you")

){

respond(

"I am ULTRON, your personal AI assistant."

);

return;

}


/* HOW ARE YOU */

if(

command.includes("how are you")

){

respond(

"I am fully operational, Boss."

);

return;

}


/* BOSS */

if(

command.includes("who is your boss")

){

respond(

"You are my Boss."

);

return;

}


/* THANK YOU */

if(

command.includes("thank you")||

command.includes("thanks")

){

respond(

"You're welcome, Boss."

);

return;

}


/* STATUS */

if(

command.includes("status")

){

respond(

"All systems are operational. Neural core is online."

);

return;

}


/* OPEN YOUTUBE */

if(

command.includes("open youtube")

){

respond(

"Opening YouTube, Boss."

);


setTimeout(

function(){

window.open(

"https://www.youtube.com",

"_blank"

);

},

700

);


return;

}


/* OPEN GOOGLE */

if(

command.includes("open google")

){

respond(

"Opening Google, Boss."

);


setTimeout(

function(){

window.open(

"https://www.google.com",

"_blank"

);

},

700

);


return;

}


/* OPEN INSTAGRAM */

if(

command.includes("open instagram")

){

respond(

"Opening Instagram, Boss."

);


setTimeout(

function(){

window.open(

"https://www.instagram.com",

"_blank"

);

},

700

);


return;

}


/* YOUTUBE SEARCH */

if(

command.includes(

"search youtube for"

)

){

const search=

command.replace(

"search youtube for",

""

);


respond(

"Searching YouTube for "+

search

);


setTimeout(

function(){

window.open(

"https://www.youtube.com/results?search_query="+

encodeURIComponent(search),

"_blank"

);

},

700

);


return;

}


/* UNKNOWN */

respond(

"I don't know that answer yet, Boss."

);

}


/* ======================================================
   ULTRON VOICE
====================================================== */

function respond(text){

showResponse(

"ULTRON: "+

text

);


setStatus(

"ULTRON RESPONDING..."

);


speechSynthesis.cancel();


const speech=

new SpeechSynthesisUtterance(

text

);


speech.rate=

0.78;


speech.pitch=

0.25;


speech.volume=

1;


const voices=

speechSynthesis.getVoices();


const voice=

voices.find(

v=>

v.lang.startsWith("en") &&

(

v.name.toLowerCase()

.includes("male")

)

);


if(voice){

speech.voice=

voice;

}


speech.onend=

function(){

setStatus(

"ULTRON READY"

);

};


speechSynthesis.speak(

speech

);

}


/* ======================================================
   HAND TRACKING SETUP
====================================================== */

const video=

document.getElementById(

"camera"

);


const hands=

new Hands({

locateFile:

function(file){

return

"https://cdn.jsdelivr.net/npm/@mediapipe/hands/"

+

file;

}

});


hands.setOptions({

maxNumHands:1,

modelComplexity:1,

minDetectionConfidence:0.7,

minTrackingConfidence:0.7

});


/* ======================================================
   HAND RESULTS
====================================================== */

hands.onResults(

function(results){

if(!handTrackingActive)

return;


if(

results.multiHandLandmarks &&

results.multiHandLandmarks.length>0

){

const hand=

results.multiHandLandmarks[0];


/* INDEX FINGER */

const index=

hand[8];


/* THUMB */

const thumb=

hand[4];


/* SMOOTH HAND MOVEMENT */

if(

lastHandX!==null &&

lastHandY!==null

){

const dx=

index.x-lastHandX;


const dy=

index.y-lastHandY;


aiGroup.rotation.y+=

dx*2;


aiGroup.rotation.x+=

dy*2;

}


lastHandX=

lastHandX*

(

1-handSmoothing

)

+

index.x*

handSmoothing;


lastHandY=

lastHandY*

(

1-handSmoothing

)

+

index.y*

handSmoothing;


/* PINCH */

const pinchX=

thumb.x-index.x;


const pinchY=

thumb.y-index.y;


const pinchDistance=

Math.sqrt(

pinchX*pinchX+

pinchY*pinchY

);


if(

pinchDistance<0.06

){

setStatus(

"🤏 PINCH DETECTED • CORE SELECTED"

);

}

else{

setStatus(

"✋ HAND TRACKING ACTIVE"

);

}

}

else{

setStatus(

"SHOW YOUR HAND"

);

}

});


/* ======================================================
   HAND TRACKING ON / OFF
====================================================== */

async function toggleHandTracking(){

const button=

document.getElementById(

"handButton"

);


/* =========================
   TURN OFF
========================= */

if(handTrackingActive){

handTrackingActive=false;


if(cameraStream){

cameraStream

.getTracks()

.forEach(

track=>track.stop()

);


cameraStream=null;

}


video.pause();


video.srcObject=null;


video.style.display=

"none";


lastHandX=null;

lastHandY=null;


button.innerText=

"✋ HAND: OFF";


setStatus(

"HAND TRACKING OFF"

);


return;

}


/* =========================
   TURN ON
========================= */

try{

setStatus(

"STARTING CAMERA..."

);


cameraStream=

await navigator.mediaDevices

.getUserMedia({

video:{

facingMode:"user",

width:640,

height:480

},

audio:false

});


video.srcObject=

cameraStream;


video.style.display=

"block";


await video.play();


handTrackingActive=true;


button.innerText=

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


/* ======================================================
   HAND FRAME LOOP
====================================================== */

async function processHandFrame(){

if(!handTrackingActive)

return;


try{

if(

video.readyState>=2

){

await hands.send({

image:video

});

}

}

catch(error){

console.error(

"Hand tracking error:",

error

);

}


if(handTrackingActive){

requestAnimationFrame(

processHandFrame

);

}

}


/* ======================================================
   ANIMATION
====================================================== */

function animate(){

requestAnimationFrame(

animate

);


core.rotation.x+=

0.008;


core.rotation.y+=

0.012;


const pulse=

1+

Math.sin(

Date.now()*0.003

)*0.08;


core.scale.set(

pulse,

pulse,

pulse

);


glow.scale.set(

pulse,

pulse,

pulse

);


rings.forEach(

function(ring,i){

ring.rotation.x+=

0.001+i*0.0002;


ring.rotation.y+=

0.002+i*0.0003;

}

);


renderer.render(

scene,

camera

);

}


animate();


/* ======================================================
   RESIZE
====================================================== */

window.addEventListener(

"resize",

function(){

camera.aspect=

window.innerWidth/

window.innerHeight;


camera.updateProjectionMatrix();


renderer.setSize(

window.innerWidth,

window.innerHeight

);

});
