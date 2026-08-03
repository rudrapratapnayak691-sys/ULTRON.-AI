/* ==========================================
   ULTRON MARK 12
   NEURAL CORE
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

let touchX = 0;

let touchY = 0;


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
   THREE.JS
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

Math.min(

devicePixelRatio,

2

)

);


document.body.appendChild(

renderer.domElement

);


/* ==========================================
   NEURAL SYSTEM
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

1,

3

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

Math.cos(angle) *

radius,

(

Math.random() -

.5

) *

2.5,

Math.sin(angle) *

radius

);


neuron.userData.type =

Math.floor(

Math.random() *

5

);


brain.add(neuron);


neurons.push(neuron);

}


/* ==========================================
   NEURAL SIGNALS
========================================== */

const signals = [];


for(

let i = 0;

i < 50;

i++

){

const signal =

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


signal.visible = false;

signal.userData.progress = 0;

signal.userData.target = null;


brain.add(signal);


signals.push(signal);

}


/* ==========================================
   SHOW RESPONSE
========================================== */

function show(text){

response.innerText =

"ULTRON MARK 11: " +

text;

}


/* ==========================================
   NEURAL ACTIVITY
========================================== */

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

});


selected.forEach(

(neuron,index) => {

const signal =

signals[

index %

signals.length

];


signal.visible = true;

signal.userData.progress = 0;

signal.userData.target = neuron;

});

}


/* ==========================================
   SIGNAL ANIMATION
========================================== */

function animateSignals(){

signals.forEach(

signal => {

if(

!signal.visible ||

!signal.userData.target

)

return;


signal.userData.progress +=

.025;


signal.position.lerpVectors(

new THREE.Vector3(

0,

0,

0

),

signal.userData.target.position,

signal.userData.progress

);


if(

signal.userData.progress >= 1

){

signal.userData.progress = 0;

}

});

}


/* ==========================================
   ULTRON VOICE
========================================== */

function speak(text){

if(

!("speechSynthesis" in window)

){

return;

}


speechSynthesis.cancel();


const speech =

new SpeechSynthesisUtterance(

text

);


/*

Deep futuristic AI voice

*/

speech.rate = .78;

speech.pitch = .35;

speech.volume = 1;


const voices =

speechSynthesis.getVoices();


const voice =

voices.find(

v =>

/David|Daniel|Alex|Google UK English Male|Microsoft David/i

.test(

v.name

)

);


if(voice){

speech.voice = voice;

}


speech.onstart =

function(){

status.innerText =

"⚡ MARK 11 SPEAKING";


core.material.color.set(

0xffffff

);


glow.material.opacity =

.8;

};


speech.onend =

function(){

core.material.color.set(

0xffd000

);


glow.material.opacity =

.12;


status.innerText =

"MARK 11 READY";

};


speechSynthesis.speak(

speech

);

}


/* ==========================================
   ANSWER
========================================== */

function answer(

text,

type = 1

){

show(text);


activateNeurons(type);


/* Core glows */

core.material.color.set(

0xffffff

);


glow.material.opacity =

.8;


speak(text);


setTimeout(

function(){

core.material.color.set(

0xffd000

);


glow.material.opacity =

.12;


signals.forEach(

signal => {

signal.visible = false;

});


},

1800

);

}


/* ==========================================
   OPEN APPS / WEBSITES
========================================== */

function openApp(app){

if(

app === "youtube"

){

window.location.href =

"https://m.youtube.com/";

}


else if(

app === "google"

){

window.location.href =

"https://www.google.com/";

}


else if(

app === "whatsapp"

){

window.location.href =

"https://www.whatsapp.com/";

}


else if(

app === "roblox"

){

window.location.href =

"https://www.roblox.com/";

}


else if(

app === "instagram"

){

window.location.href =

"https://www.instagram.com/";

}


else if(

app === "facebook"

){

window.location.href =

"https://www.facebook.com/";

}


else if(

app === "chatgpt"

){

window.location.href =

"https://chatgpt.com/";

}


else if(

app === "github"

){

window.location.href =

"https://github.com/";

}


else if(

app === "gmail"

){

window.location.href =

"https://mail.google.com/";

}


else if(

app === "chrome"

){

window.location.href =

"https://www.google.com/";

}

}


/* ==========================================
   COMMAND SYSTEM
========================================== */

function command(text){

text =

text

.toLowerCase()

.trim();


/* YOUTUBE */

if(

text.includes(

"open youtube"

)

){

answer(

"Opening YouTube, Boss.",

3

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


/* GOOGLE */

if(

text.includes(

"open google"

)

){

answer(

"Opening Google, Boss.",

3

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


/* WHATSAPP */

if(

text.includes(

"open whatsapp"

)

){

answer(

"Opening WhatsApp, Boss.",

3

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


/* ROBLOX */

if(

text.includes(

"open roblox"

)

){

answer(

"Opening Roblox, Boss.",

3

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


/* INSTAGRAM */

if(

text.includes(

"open instagram"

)

){

answer(

"Opening Instagram, Boss.",

3

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


/* FACEBOOK */

if(

text.includes(

"open facebook"

)

){

answer(

"Opening Facebook, Boss.",

3

);


setTimeout(

function(){

openApp(

"facebook"

);

},

800

);


return;

}


/* CHATGPT */

if(

text.includes(

"open chatgpt"

)

){

answer(

"Opening ChatGPT, Boss.",

3

);


setTimeout(

function(){

openApp(

"chatgpt"

);

},

800

);


return;

}


/* GITHUB */

if(

text.includes(

"open github"

)

){

answer(

"Opening GitHub, Boss.",

3

);


setTimeout(

function(){

openApp(

"github"

);

},

800

);


return;

}


/* GMAIL */

if(

text.includes(

"open gmail"

)

){

answer(

"Opening Gmail, Boss.",

3

);


setTimeout(

function(){

openApp(

"gmail"

);

},

800

);


return;

}


/* CHROME */

if(

text.includes(

"open chrome"

)

){

answer(

"Opening Google Chrome, Boss.",

3

);


setTimeout(

function(){

openApp(

"chrome"

);

},

800

);


return;

}


/* 1 + 1 */

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


/* ARE YOU DUMB */

if(

text.includes(

"are you dumb"

)

){

answer(

"No, Boss. I am ULTRON MARK 11.",

1

);


return;

}


/* PROTOTYPE */

if(

text.includes(

"prototype"

)

){

answer(

"Yes, Boss. I am the ULTRON MARK 11 prototype.",

2

);


return;

}


/* NAME */

if(

text.includes(

"your name"

)

){

answer(

"My designation is ULTRON MARK 11.",

2

);


return;

}


/* WHO */

if(

text.includes(

"who are you"

)

){

answer(

"I am ULTRON MARK 11, your personal AI assistant.",

2

);


return;

}


/* HELLO */

if(

text.includes(

"hello"

)

){

answer(

"Hello, Boss. Neural systems are online.",

1

);


return;

}


/* TIME */

if(

text.includes(

"time"

)

){

const now =

new Date();


answer(

"The current time is " +

now.toLocaleTimeString(),

4

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
   VOICE RECOGNITION
========================================== */

function listen(){

const Recognition =

window.SpeechRecognition ||

window.webkitSpeechRecognition;


if(!Recognition){

show(

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


status.innerText =

"🎤 LISTENING...";


recognition.start();


recognition.onresult =

function(event){

const text =

event

.results[0][0]

.transcript;


command(text);

};


recognition.onerror =

function(){

status.innerText =

"MARK 11 READY";

};

}


/* ==========================================
   TYPING
========================================== */

function send(){

const text =

input.value.trim();


if(!text)

return;


command(text);


input.value = "";

}


document

.getElementById(

"sendButton"

)

.onclick =

send;


input.addEventListener(

"keydown",

function(e){

if(

e.key ===

"Enter"

){

send();

}

});


document

.getElementById(

"typeButton"

)

.onclick =

function(){

typing.style.display =

typing.style.display ===

"block"

?

"none"

:

"block";

};


/* ==========================================
   HAND TRACKING
========================================== */

const hands =

new Hands({

locateFile:

file =>

"https://cdn.jsdelivr.net/npm/@mediapipe/hands/"

+ file

});


hands.setOptions({

maxNumHands:1,

modelComplexity:1,

minDetectionConfidence:.7,

minTrackingConfidence:.7

});


hands.onResults(

function(results){

if(!handOn)

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


/* ROTATION */

if(lastX !== null){

brain.rotation.y +=

(index.x-lastX)*2;


brain.rotation.x +=

(index.y-lastY)*2;

}


lastX =

index.x;


lastY =

index.y;


/* PINCH */

const dx =

thumb.x-index.x;


const dy =

thumb.y-index.y;


const distance =

Math.sqrt(

dx*dx+dy*dy

);


if(lastPinch !== null){

zoom +=

(distance-lastPinch)*3;


zoom =

Math.max(

.5,

Math.min(

4,

zoom

)

);


brain.scale.set(

zoom,

zoom,

zoom

);

}


lastPinch =

distance;


status.innerText =

"✋ HAND TRACKING ACTIVE";

}

});


/* ==========================================
   CAMERA
========================================== */

async function toggleHand(){

if(handOn){

handOn = false;


if(stream){

stream

.getTracks()

.forEach(

track =>

track.stop()

);

}


video.style.display =

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

stream =

await navigator

.mediaDevices

.getUserMedia({

video:true,

audio:false

});


video.srcObject =

stream;


video.style.display =

"block";


handOn = true;


document

.getElementById(

"handButton"

)

.innerText =

"✋ HAND ON";


processHands();

}

catch(error){

show(

"Camera permission is required, Boss."

);

}

}


async function processHands(){

if(!handOn)

return;


try{

await hands.send({

image:video

});

}

catch(error){

/* No red error */

}


requestAnimationFrame(

processHands

);

}


/* ==========================================
   TOUCH CONTROL
========================================== */

document

.getElementById(

"touchButton"

)

.onclick =

function(){

touchOn =

!touchOn;


document

.getElementById(

"touchButton"

)

.innerText =

touchOn

?

"👆 TOUCH ON"

:

"👆 TOUCH OFF";

};


/* ==========================================
   TOUCH ROTATION
========================================== */

renderer

.domElement

.addEventListener(

"touchstart",

function(event){

const now =

Date.now();


/* DOUBLE TAP */

if(

now-lastTap < 300

){

answer(

"Core selected, Boss.",

2

);

}


lastTap =

now;


if(touchOn){

touchX =

event

.touches[0]

.clientX;


touchY =

event

.touches[0]

.clientY;

}

});


renderer

.domElement

.addEventListener(

"touchmove",

function(event){

if(!touchOn)

return;


event.preventDefault();


const x =

event

.touches[0]

.clientX;


const y =

event

.touches[0]

.clientY;


brain.rotation.y +=

(x-touchX)*.01;


brain.rotation.x +=

(y-touchY)*.01;


touchX = x;

touchY = y;

},

{

passive:false

}

);


/* ==========================================
   RESET
========================================== */

document

.getElementById(

"resetButton"

)

.onclick =

function(){

brain.rotation.set(

0,

0,

0

);


brain.scale.set(

1,

1,

1

);


zoom = 1;


core.material.color.set(

0xffd000

);


glow.material.opacity =

.12;


status.innerText =

"MARK 11 READY";


show(

"NEURAL CORE ONLINE"

);

};


/* ==========================================
   BUTTONS
========================================== */

document

.getElementById(

"handButton"

)

.onclick =

toggleHand;


document

.getElementById(

"voiceButton"

)

.onclick =

listen;


/* ==========================================
   ANIMATION
========================================== */

function animate(){

requestAnimationFrame(

animate

);


core.rotation.x +=

.008;


core.rotation.y +=

.012;


animateSignals();


neurons.forEach(

neuron => {

if(

Math.random() < .01

){

neuron.material.color.set(

0xffffff

);


setTimeout(

function(){

neuron.material.color.set(

0xffd84a

);

},

150

);

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

window

.addEventListener(

"resize",

function(){

camera.aspect =

innerWidth /

innerHeight;


camera.updateProjectionMatrix();


renderer.setSize(

innerWidth,

innerHeight

);

});
