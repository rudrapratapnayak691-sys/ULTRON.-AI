/* =====================================================
   ULTRON AI
   Circular Neural Core
   Touch Control
   Hand Tracking
   Voice Assistant
   Simple Commands
===================================================== */


/* =====================================================
   THREE.JS SETUP
===================================================== */

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(

    60,

    window.innerWidth /
    window.innerHeight,

    0.1,

    1000

);


camera.position.z = 8;


const renderer = new THREE.WebGLRenderer({

    antialias: true,

    alpha: true

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

const aiGroup = new THREE.Group();

scene.add(aiGroup);


/* =====================================================
   CENTRAL AI CORE
===================================================== */

const coreGeometry =

new THREE.IcosahedronGeometry(

    1,

    3

);


const coreMaterial =

new THREE.MeshBasicMaterial({

    color: 0xffd000,

    wireframe: true

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

    color: 0xffa000,

    transparent: true,

    opacity: 0.12

});


const glow =

new THREE.Mesh(

    glowGeometry,

    glowMaterial

);


aiGroup.add(glow);


/* =====================================================
   CIRCULAR NEURAL RINGS
===================================================== */

const rings = [];


for(

    let i = 0;

    i < 6;

    i++

){

    const radius =

    1.6 +

    i * 0.5;


    const geometry =

    new THREE.TorusGeometry(

        radius,

        0.012,

        8,

        160

    );


    const material =

    new THREE.MeshBasicMaterial({

        color: 0xffb300,

        transparent: true,

        opacity: 0.5

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
   NEURAL NODES
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

    color: 0xffd84a

});


for(

    let i = 0;

    i < 400;

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


    const y =

    (

        Math.random() -

        0.5

    ) * 1.8;


    const x =

    Math.cos(angle) *

    radius;


    const z =

    Math.sin(angle) *

    radius;


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
   NEURAL CONNECTIONS
===================================================== */

const lineMaterial =

new THREE.LineBasicMaterial({

    color: 0xffa800,

    transparent: true,

    opacity: 0.2

});


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


        const line =

        new THREE.Line(

            geometry,

            lineMaterial

        );


        aiGroup.add(line);

    }

}


/* =====================================================
   ENERGY PARTICLES
===================================================== */

const particleGeometry =

new THREE.BufferGeometry();


const positions = [];


for(

    let i = 0;

    i < 600;

    i++

){

    const angle =

    Math.random() *

    Math.PI *

    2;


    const radius =

    2 +

    Math.random() *

    3;


    positions.push(

        Math.cos(angle) *

        radius,


        (

            Math.random() -

            0.5

        ) * 3,


        Math.sin(angle) *

        radius

    );

}


particleGeometry.setAttribute(

    "position",

    new THREE.Float32BufferAttribute(

        positions,

        3

    )

);


const particleMaterial =

new THREE.PointsMaterial({

    color: 0xffd84a,

    size: 0.025,

    transparent: true,

    opacity: 0.8

});


const particles =

new THREE.Points(

    particleGeometry,

    particleMaterial

);


aiGroup.add(particles);


/* =====================================================
   TOUCH MODE
===================================================== */

let touchMode = false;


let lastX = 0;

let lastY = 0;


function toggleTouchMode(){

    touchMode = !touchMode;


    const button =

    document.getElementById(

        "touchButton"

    );


    if(touchMode){

        button.innerText =

        "👆 TOUCH MODE: ON";


        setStatus(

            "TOUCH CONTROL ACTIVE • DRAG THE NEURAL CORE"

        );

    }

    else{

        button.innerText =

        "👆 TOUCH MODE: OFF";


        setStatus(

            "TOUCH CONTROL DISABLED"

        );

    }

}


/* =====================================================
   TOUCH START
===================================================== */

renderer.domElement.addEventListener(

    "touchstart",

    function(event){

        if(!touchMode){

            return;

        }


        if(

            event.touches.length === 1

        ){

            lastX =

            event.touches[0].clientX;


            lastY =

            event.touches[0].clientY;

        }

    },

    {

        passive: false

    }

);


/* =====================================================
   TOUCH MOVE
===================================================== */

renderer.domElement.addEventListener(

    "touchmove",

    function(event){

        if(!touchMode){

            return;

        }


        event.preventDefault();


        if(

            event.touches.length === 1

        ){

            const x =

            event.touches[0].clientX;


            const y =

            event.touches[0].clientY;


            const dx =

            x - lastX;


            const dy =

            y - lastY;


            aiGroup.rotation.y +=

            dx * 0.01;


            aiGroup.rotation.x +=

            dy * 0.01;


            lastX = x;

            lastY = y;

        }

    },

    {

        passive: false

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


    aiGroup.scale.set(

        1,

        1,

        1

    );


    setStatus(

        "NEURAL CORE RESET • ONLINE"

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


    const pulse =

    1 +

    Math.sin(

        Date.now() *

        0.003

    ) * 0.08;


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

        function(ring, i){

            ring.rotation.x +=

            0.001 +

            i * 0.0002;


            ring.rotation.y +=

            0.002 +

            i * 0.0003;

        }

    );


    particles.rotation.y +=

    0.003;


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

    }

);


/* =====================================================
   STATUS
===================================================== */

function setStatus(text){

    document.getElementById(

        "status"

    ).innerText = text;

}


/* =====================================================
   VOICE RECOGNITION
===================================================== */

function startVoice(){

    const Recognition =

    window.SpeechRecognition ||

    window.webkitSpeechRecognition;


    if(!Recognition){

        alert(

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

        "🎤 LISTENING, BOSS..."

    );


    recognition.start();


    recognition.onresult =

    function(event){

        const command =

        event.results[0][0]

        .transcript

        .toLowerCase()

        .trim();


        processCommand(

            command

        );

    };


    recognition.onerror =

    function(){

        setStatus(

            "VOICE ERROR • TRY AGAIN"

        );

    };

}


/* =====================================================
   ULTRON COMMAND PROCESSOR
===================================================== */

function processCommand(command){


    /* HELLO */

    if(

        command.includes("hello") ||

        command.includes("hi ultron") ||

        command.includes("hello ultron")

    ){

        respond(

            "Hello, Boss. ULTRON is online."

        );

        return;

    }


    /* 1 + 1 */

    if(

        command.includes("1+1") ||

        command.includes("one plus one") ||

        command.includes(

            "what is one plus one"

        )

    ){

        respond(

            "Two, Boss. One plus one equals two."

        );

        return;

    }


    /* ARE YOU DUMB */

    if(

        command.includes(

            "are you dumb"

        ) ||

        command.includes(

            "are you stupid"

        )

    ){

        respond(

            "No, Boss. I am ULTRON, your AI assistant."

        );

        return;

    }


    /* PROTOTYPE */

    if(

        command.includes(

            "are you a prototype"

        ) ||

        command.includes(

            "are you prototype"

        )

    ){

        respond(

            "Yes, Boss. I am currently a prototype."

        );

        return;

    }


    /* WHO ARE YOU */

    if(

        command.includes(

            "who are you"

        ) ||

        command.includes(

            "what are you"

        )

    ){

        respond(

            "I am ULTRON, your personal AI assistant."

        );

        return;

    }


    /* YOUR NAME */

    if(

        command.includes(

            "what is your name"

        ) ||

        command.includes(

            "your name"

        )

    ){

        respond(

            "My name is ULTRON, Boss."

        );

        return;

    }


    /* HOW ARE YOU */

    if(

        command.includes(

            "how are you"

        )

    ){

        respond(

            "I am fully operational, Boss."

        );

        return;

    }


    /* WHO IS YOUR BOSS */

    if(

        command.includes(

            "who is your boss"

        ) ||

        command.includes(

            "who is the boss"

        )

    ){

        respond(

            "You are my Boss."

        );

        return;

    }


    /* THANK YOU */

    if(

        command.includes(

            "thank you"

        ) ||

        command.includes(

            "thanks"

        )

    ){

        respond(

            "You're welcome, Boss."

        );

        return;

    }


    /* GOOD MORNING */

    if(

        command.includes(

            "good morning"

        )

    ){

        respond(

            "Good morning, Boss. Systems are ready."

        );

        return;

    }


    /* GOOD NIGHT */

    if(

        command.includes(

            "good night"

        )

    ){

        respond(

            "Good night, Boss. ULTRON will be standing by."

        );

        return;

    }


    /* STATUS */

    if(

        command.includes(

            "status"

        ) ||

        command.includes(

            "system status"

        )

    ){

        respond(

            "All systems are operational. Neural core is online."

        );

        return;

    }


    /* OPEN YOUTUBE */

    if(

        command.includes(

            "open youtube"

        )

    ){

        respond(

            "Opening YouTube, Boss."

        );


        setTimeout(

            function(){

                window.location.href =

                "https://www.youtube.com";

            },

            1000

        );


        return;

    }


    /* SEARCH YOUTUBE */

    if(

        command.includes(

            "search youtube for"

        )

    ){

        const search =

        command.replace(

            "search youtube for",

            ""

        );


        respond(

            "Searching YouTube for " +

            search +

            ", Boss."

        );


        setTimeout(

            function(){

                window.location.href =

                "https://www.youtube.com/results?search_query=" +

                encodeURIComponent(

                    search

                );

            },

            1000

        );


        return;

    }


    /* OPEN GOOGLE */

    if(

        command.includes(

            "open google"

        )

    ){

        respond(

            "Opening Google, Boss."

        );


        setTimeout(

            function(){

                window.location.href =

                "https://www.google.com";

            },

            1000

        );


        return;

    }


    /* OPEN INSTAGRAM */

    if(

        command.includes(

            "open instagram"

        )

    ){

        respond(

            "Opening Instagram, Boss."

        );


        setTimeout(

            function(){

                window.location.href =

                "https://www.instagram.com";

            },

            1000

        );


        return;

    }


    /* UNKNOWN */

    respond(

        "I heard you say " +

        command +

        ". I don't know the answer to that yet, Boss."

    );

}


/* =====================================================
   ULTRON SPEAK
===================================================== */

function respond(text){

    setStatus(text);


    const speech =

    new SpeechSynthesisUtterance(

        text

    );


    speech.rate =

    0.9;


    speech.pitch =

    0.65;


    speech.volume =

    1;


    speechSynthesis.speak(

        speech

    );

}


/* =====================================================
   MEDIAPIPE HAND TRACKING
===================================================== */

const video =

document.getElementById(

    "camera"

);


const hands =

new Hands({

    locateFile:

    function(file){

        return (

            "https://cdn.jsdelivr.net/npm/@mediapipe/hands/"

            +

            file

        );

    }

});


hands.setOptions({

    maxNumHands: 1,

    modelComplexity: 1,

    minDetectionConfidence: 0.6,

    minTrackingConfidence: 0.6

});


hands.onResults(

    function(results){

        if(

            results.multiHandLandmarks &&

            results.multiHandLandmarks.length > 0

        ){

            const hand =

            results.multiHandLandmarks[0];


            const index =

            hand[8];


            const thumb =

            hand[4];


            /* HAND CONTROL */

            aiGroup.rotation.y =

            (index.x - 0.5) * 3;


            aiGroup.rotation.x =

            (index.y - 0.5) * 2;


            /* PINCH DETECTION */

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

                distance < 0.06

            ){

                setStatus(

                    "🤏 PINCH • AI CORE SELECTED"

                );

            }

            else{

                setStatus(

                    "✋ HAND DETECTED • NEURAL CORE CONTROL"

                );

            }

        }

        else{

            setStatus(

                "SEARCHING FOR HAND..."

            );

        }

    }

);


/* =====================================================
   START HAND TRACKING
===================================================== */

async function startHandTracking(){

    try{

        setStatus(

            "STARTING CAMERA..."

        );


        const stream =

        await navigator.mediaDevices

        .getUserMedia({

            video: {

                facingMode: "user",

                width: 640,

                height: 480

            },

            audio: false

        });


        video.srcObject =

        stream;


        video.style.display =

        "block";


        await video.play();


        setStatus(

            "CAMERA ON • SHOW YOUR HAND"

        );


        async function processFrame(){

            await hands.send({

                image: video

            });


            requestAnimationFrame(

                processFrame

            );

        }


        processFrame();

    }

    catch(error){

        console.error(error);


        setStatus(

            "CAMERA ERROR • ALLOW CAMERA PERMISSION"

        );

    }

}
