const canvas =
  document.getElementById("neuralCanvas");

const ctx =
  canvas.getContext("2d");

const neuronCountElement =
  document.getElementById("neuronCount");

const signalCountElement =
  document.getElementById("signalCount");

const processingElement =
  document.getElementById("processing");

const responseElement =
  document.getElementById("response");

const commandInput =
  document.getElementById("commandInput");

const micButton =
  document.getElementById("micButton");

const sendButton =
  document.getElementById("sendButton");

const voiceStatus =
  document.getElementById("voiceStatus");


let width;
let height;

let neurons = [];

let signals = [];

let rotationX = 0;

let rotationY = 0;

let zoom = 1;

let dragging = false;

let lastX = 0;

let lastY = 0;

let lastTap = 0;

let processing = false;


/* =========================
   RESIZE
========================= */

function resize() {

  width =
    canvas.width =
    window.innerWidth;

  height =
    canvas.height =
    window.innerHeight;

  createNeuralNetwork();
}

window.addEventListener(
  "resize",
  resize
);


/* =========================
   CREATE NEURAL NETWORK
========================= */

function createNeuralNetwork() {

  neurons = [];

  const count =
    window.innerWidth < 600
      ? 180
      : 350;

  for (
    let i = 0;
    i < count;
    i++
  ) {

    const radius =
      Math.random() * 270;

    const theta =
      Math.random() *
      Math.PI * 2;

    const phi =
      Math.acos(
        Math.random() * 2 - 1
      );

    neurons.push({

      x:
        radius *
        Math.sin(phi) *
        Math.cos(theta),

      y:
        radius *
        Math.sin(phi) *
        Math.sin(theta),

      z:
        radius *
        Math.cos(phi),

      size:
        Math.random() * 2 + 1,

      pulse:
        Math.random() *
        Math.PI * 2,

      cluster:
        Math.floor(
          Math.random() * 6
        )

    });
  }

  neuronCountElement.textContent =
    neurons.length;
}


/* =========================
   3D PROJECTION
========================= */

function project(n) {

  let x = n.x;

  let y = n.y;

  let z = n.z;


  const cosY =
    Math.cos(rotationY);

  const sinY =
    Math.sin(rotationY);


  let x1 =
    x * cosY -
    z * sinY;

  let z1 =
    x * sinY +
    z * cosY;


  const cosX =
    Math.cos(rotationX);

  const sinX =
    Math.sin(rotationX);


  let y1 =
    y * cosX -
    z1 * sinX;

  let z2 =
    y * sinX +
    z1 * cosX;


  const perspective =
    700 /
    (700 + z2);


  return {

    x:
      width / 2 +
      x1 *
      perspective *
      zoom,

    y:
      height / 2 +
      y1 *
      perspective *
      zoom,

    scale:
      perspective *
      zoom,

    z:
      z2

  };
}


/* =========================
   BACKGROUND
========================= */

function drawBackground() {

  ctx.fillStyle =
    "rgba(2,2,2,0.25)";

  ctx.fillRect(
    0,
    0,
    width,
    height
  );


  const gradient =
    ctx.createRadialGradient(

      width / 2,

      height / 2,

      10,

      width / 2,

      height / 2,

      420

    );


  gradient.addColorStop(
    0,
    "rgba(255,180,30,.15)"
  );

  gradient.addColorStop(
    .4,
    "rgba(255,140,0,.03)"
  );

  gradient.addColorStop(
    1,
    "rgba(0,0,0,0)"
  );


  ctx.fillStyle =
    gradient;

  ctx.fillRect(
    0,
    0,
    width,
    height
  );
}


/* =========================
   CONNECTIONS
========================= */

function drawConnections(
  projected
) {

  for (
    let i = 0;
    i < neurons.length;
    i++
  ) {

    for (
      let j = i + 1;
      j < neurons.length;
      j++
    ) {

      const a =
        neurons[i];

      const b =
        neurons[j];


      const dx =
        a.x - b.x;

      const dy =
        a.y - b.y;

      const dz =
        a.z - b.z;


      const distance =
        Math.sqrt(

          dx * dx +

          dy * dy +

          dz * dz

        );


      if (
        distance < 75
      ) {

        const pa =
          projected[i];

        const pb =
          projected[j];


        const alpha =
          Math.max(

            0.03,

            0.16 -
            distance / 600

          );


        ctx.beginPath();

        ctx.moveTo(
          pa.x,
          pa.y
        );

        ctx.lineTo(
          pb.x,
          pb.y
        );


        ctx.strokeStyle =
          `rgba(
            255,
            190,
            40,
            ${alpha}
          )`;


        ctx.lineWidth =
          0.5;


        ctx.stroke();

      }
    }
  }
}


/* =========================
   NEURONS
========================= */

function drawNeurons(
  projected,
  time
) {

  for (
    let i = 0;
    i < neurons.length;
    i++
  ) {

    const n =
      neurons[i];

    const p =
      projected[i];


    const pulse =

      Math.sin(

        time * 0.003 +

        n.pulse

      ) * 0.5 + 0.5;


    const size =

      (
        n.size +

        pulse * 1.5

      ) *

      p.scale;


    ctx.beginPath();


    ctx.arc(

      p.x,

      p.y,

      Math.max(
        0.5,
        size
      ),

      0,

      Math.PI * 2

    );


    ctx.fillStyle =

      `rgba(
        255,
        210,
        80,
        ${0.45 +
        pulse * 0.55}
      )`;


    ctx.shadowBlur =
      10 * p.scale;


    ctx.shadowColor =
      "#ffb300";


    ctx.fill();


    ctx.shadowBlur =
      0;

  }
}


/* =========================
   GOLDEN PLASMA WAVES
========================= */

function drawPlasmaWaves(
  time
) {

  const cx =
    width / 2;

  const cy =
    height / 2;


  for (
    let wave = 0;
    wave < 5;
    wave++
  ) {

    ctx.beginPath();


    for (
      let i = 0;
      i <= 360;
      i += 3
    ) {

      const angle =
        i *
        Math.PI /
        180;


      const radius =

        130 +

        wave * 28 +

        Math.sin(

          angle * 5 +

          time * 0.003 +

          wave

        ) *

        12;


      const x =

        cx +

        Math.cos(angle) *

        radius;


      const y =

        cy +

        Math.sin(angle) *

        radius *

        0.35;


      if (
        i === 0
      ) {

        ctx.moveTo(
          x,
          y
        );

      } else {

        ctx.lineTo(
          x,
          y
        );

      }

    }


    ctx.strokeStyle =

      `rgba(
        255,
        180,
        30,
        ${0.12 +
        wave * 0.015}
      )`;


    ctx.lineWidth =
      1.5;


    ctx.shadowBlur =
      12;


    ctx.shadowColor =
      "#ffb300";


    ctx.stroke();


    ctx.shadowBlur =
      0;

  }
}


/* =========================
   CENTRAL CORE
========================= */

function drawCore(
  time
) {

  const cx =
    width / 2;

  const cy =
    height / 2;


  const pulse =

    Math.sin(
      time * 0.004
    ) * 0.5 + 0.5;


  const radius =

    30 +

    pulse * 8;


  const gradient =

    ctx.createRadialGradient(

      cx,

      cy,

      2,

      cx,

      cy,

      radius * 3

    );


  gradient.addColorStop(
    0,
    "rgba(255,255,220,1)"
  );

  gradient.addColorStop(
    .15,
    "rgba(255,210,70,.95)"
  );

  gradient.addColorStop(
    .4,
    "rgba(255,150,0,.4)"
  );

  gradient.addColorStop(
    1,
    "rgba(255,120,0,0)"
  );


  ctx.fillStyle =
    gradient;


  ctx.beginPath();


  ctx.arc(

    cx,

    cy,

    radius * 3,

    0,

    Math.PI * 2

  );


  ctx.fill();


  ctx.beginPath();


  ctx.arc(

    cx,

    cy,

    radius,

    0,

    Math.PI * 2

  );


  ctx.fillStyle =
    "#ffd34e";


  ctx.shadowBlur =
    35;


  ctx.shadowColor =
    "#ffae00";


  ctx.fill();


  ctx.shadowBlur =
    0;
}


/* =========================
   ANIMATION
========================= */

function animate(
  time
) {

  drawBackground();


  rotationY +=
    0.0015;


  rotationX +=
    0.0005;


  const projected =
    neurons.map(
      project
    );


  drawConnections(
    projected
  );


  drawNeurons(
    projected,
    time
  );


  drawPlasmaWaves(
    time
  );


  drawCore(
    time
  );


  requestAnimationFrame(
    animate
  );
}


/* =========================
   SPEECH SYNTHESIS
========================= */

function speak(
  text
) {

  if (
    !("speechSynthesis"
      in window)
  ) {

    return;

  }


  speechSynthesis.cancel();


  const speech =
    new SpeechSynthesisUtterance(
      text
    );


  speech.rate =
    0.9;

  speech.pitch =
    0.7;

  speech.volume =
    1;


  speech.onstart =
    () => {

      voiceStatus.textContent =
        "SPEAKING";

    };


  speech.onend =
    () => {

      voiceStatus.textContent =
        "READY";

    };


  speechSynthesis.speak(
    speech
  );
}


/* =========================
   RESPONSE
========================= */

function respond(
  text
) {

  responseElement.innerHTML =

    `<span>ULTRON:</span>
     ${text}`;

  speak(text);
}


/* =========================
   WEBSITE / APP LAUNCHER
========================= */

const sites = {

  youtube:
    "https://www.youtube.com/",

  google:
    "https://www.google.com/",

  whatsapp:
    "https://web.whatsapp.com/",

  roblox:
    "https://www.roblox.com/",

  instagram:
    "https://www.instagram.com/",

  chatgpt:
    "https://chatgpt.com/"

};


function openSite(
  name
) {

  const url =
    sites[name];


  if (!url) {

    respond(
      "I could not find that application."
    );

    return;

  }


  respond(
    `Opening ${name}, Boss.`
  );


  setTimeout(
    () => {

      window.location.href =
        url;

    },

    700
  );
}


/* =========================
   COMMAND PROCESSOR
========================= */

function processCommand(
  command
) {

  const text =
    command
      .toLowerCase()
      .trim();


  if (
    text.includes(
      "open youtube"
    )
  ) {

    openSite(
      "youtube"
    );

    return;

  }


  if (
    text.includes(
      "open google"
    )
  ) {

    openSite(
      "google"
    );

    return;

  }


  if (
    text.includes(
      "open whatsapp"
    )
  ) {

    openSite(
      "whatsapp"
    );

    return;

  }


  if (
    text.includes(
      "open roblox"
    )
  ) {

    openSite(
      "roblox"
    );

    return;

  }


  if (
    text.includes(
      "open instagram"
    )
  ) {

    openSite(
      "instagram"
    );

    return;

  }


  if (
    text.includes(
      "open chatgpt"
    )
  ) {

    openSite(
      "chatgpt"
    );

    return;

  }


  if (
    text.includes(
      "hello"
    ) ||

    text.includes(
      "hi ultron"
    )
  ) {

    respond(
      "Greetings, Boss. Neural systems are fully operational."
    );

    return;

  }


  if (
    text.includes(
      "who are you"
    )
  ) {

    respond(
      "I am ULTRON MARK 12. Your advanced neural interface."
    );

    return;

  }


  if (
    text.includes(
      "status"
    )
  ) {

    respond(
      "All systems are operational. Neural core stable."
    );

    return;

  }


  respond(
    "Command received, Boss. I am ready."
  );
}


/* =========================
   SEND BUTTON
========================= */

sendButton.addEventListener(
  "click",
  () => {

    const command =
      commandInput.value;


    if (
      command.trim()
    ) {

      processCommand(
        command
      );

      commandInput.value =
        "";

    }

  }
);


/* =========================
   ENTER KEY
========================= */

commandInput.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key ===
      "Enter"
    ) {

      sendButton.click();

    }

  }
);


/* =========================
   VOICE RECOGNITION
========================= */

const SpeechRecognition =

  window.SpeechRecognition ||

  window.webkitSpeechRecognition;


if (
  SpeechRecognition
) {

  const recognition =
    new SpeechRecognition();


  recognition.continuous =
    false;


  recognition.interimResults =
    false;


  recognition.lang =
    "en-US";


  recognition.onstart =
    () => {

      voiceStatus.textContent =
        "LISTENING";

      micButton.textContent =
        "🔴";

    };


  recognition.onend =
    () => {

      voiceStatus.textContent =
        "READY";

      micButton.textContent =
        "🎤";

    };


  recognition.onresult =
    (event) => {

      const command =

        event
          .results[0][0]
          .transcript;


      commandInput.value =
        command;


      processCommand(
        command
      );

    };


  micButton.addEventListener(
    "click",
    () => {

      recognition.start();

    }
  );

} else {

  micButton.disabled =
    true;

  voiceStatus.textContent =
    "NOT SUPPORTED";

}


/* =========================
   QUICK BUTTONS
========================= */

document
  .querySelectorAll(
    ".quick-buttons button"
  )
  .forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          openSite(
            button.dataset.site
          );

        }
      );

    }
  );


/* =========================
   TOUCH ROTATION
========================= */

canvas.addEventListener(
  "pointerdown",
  (event) => {

    dragging = true;

    lastX =
      event.clientX;

    lastY =
      event.clientY;

  }
);


canvas.addEventListener(
  "pointermove",
  (event) => {

    if (
      !dragging
    ) {

      return;

    }


    const dx =
      event.clientX -
      lastX;


    const dy =
      event.clientY -
      lastY;


    rotationY +=
      dx * 0.008;


    rotationX +=
      dy * 0.008;


    lastX =
      event.clientX;


    lastY =
      event.clientY;

  }
);


canvas.addEventListener(
  "pointerup",
  () => {

    dragging = false;

  }
);


canvas.addEventListener(
  "pointercancel",
  () => {

    dragging = false;

  }
);


/* =========================
   DOUBLE TAP
========================= */

canvas.addEventListener(
  "pointerup",
  () => {

    const now =
      Date.now();


    if (
      now - lastTap <
      300
    ) {

      rotationX = 0;

      rotationY = 0;

      zoom = 1;

    }


    lastTap =
      now;

  }
);


/* =========================
   PINCH ZOOM
========================= */

let initialDistance =
  null;


canvas.addEventListener(
  "touchstart",
  (event) => {

    if (
      event.touches.length ===
      2
    ) {

      initialDistance =
        getDistance(
          event.touches[0],
          event.touches[1]
        );

    }

  }
);


canvas.addEventListener(
  "touchmove",
  (event) => {

    if (
      event.touches.length ===
      2
    ) {

      const distance =
        getDistance(
          event.touches[0],
          event.touches[1]
        );


      if (
        initialDistance
      ) {

        const difference =

          distance -
          initialDistance;


        zoom +=
          difference *
          0.002;


        zoom =
          Math.max(
            .5,
            Math.min(
              2.5,
              zoom
            )
          );

      }


      initialDistance =
        distance;

    }

  }
);


canvas.addEventListener(
  "touchend",
  () => {

    initialDistance =
      null;

  }
);


function getDistance(
  a,
  b
) {

  return Math.sqrt(

    Math.pow(
      a.clientX -
      b.clientX,
      2
    )

    +

    Math.pow(
      a.clientY -
      b.clientY,
      2
    )

  );

}


/* =========================
   START ULTRON
========================= */

resize();

requestAnimationFrame(
  animate
);
