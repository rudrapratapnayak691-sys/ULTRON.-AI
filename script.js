const neurons =
    document.getElementById("neurons");

const response =
    document.getElementById("response");

const statusText =
    document.getElementById("status");


// Create neural network
for (let i = 0; i < 100; i++) {

    const neuron =
        document.createElement("div");

    neuron.className = "neuron";

    neuron.style.left =
        Math.random() * 100 + "%";

    neuron.style.top =
        Math.random() * 100 + "%";

    neuron.style.setProperty(
        "--speed",
        (1 + Math.random() * 3) + "s"
    );

    neurons.appendChild(neuron);
}


// Create moving energy signals
for (let i = 0; i < 40; i++) {

    const signal =
        document.createElement("div");

    signal.className = "signal";

    signal.style.left =
        40 + Math.random() * 20 + "%";

    signal.style.top =
        40 + Math.random() * 20 + "%";

    signal.style.setProperty(
        "--x",
        (Math.random() * 500 - 250) + "px"
    );

    signal.style.setProperty(
        "--y",
        (Math.random() * 500 - 250) + "px"
    );

    signal.style.setProperty(
        "--duration",
        (1 + Math.random() * 3) + "s"
    );

    signal.style.animationDelay =
        Math.random() * 3 + "s";

    neurons.appendChild(signal);
}


// Built-in ULTRON responses
function askUltron(question) {

    const q =
        question.toLowerCase().trim();


    if (
        q === "hello" ||
        q.includes("hi")
    ) {

        return "Hello, Boss. ULTRON MARK 12 is online.";

    }


    if (
        q.includes("prototype")
    ) {

        return "I am ULTRON MARK 12, an advanced experimental AI prototype.";

    }


    if (
        q.includes("1+1") ||
        q.includes("1 + 1")
    ) {

        return "1 plus 1 equals 2.";

    }


    if (
        q.includes("who are you")
    ) {

        return "I am ULTRON MARK 12. Neural core fully operational.";

    }


    return "I don't have an answer for that yet, Boss.";

}


// Type command
function typeCommand() {

    const question =
        prompt("ULTRON: Enter command");

    if (!question) return;

    const answer =
        askUltron(question);

    response.textContent =
        answer;

    statusText.textContent =
        "PROCESSING COMMAND...";

    setTimeout(() => {

        statusText.textContent =
            "MARK 12 READY";

    }, 1500);

}


// Voice command
function startVoice() {

    if (!("webkitSpeechRecognition"
        in window)) {

        response.textContent =
            "Voice recognition is not supported in this browser.";

        return;

    }


    const recognition =
        new webkitSpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();


    statusText.textContent =
        "LISTENING...";


    recognition.onresult =
        function(event) {

            const text =
                event.results[0][0].transcript;

            response.textContent =
                "You: " + text;

            const answer =
                askUltron(text);

            setTimeout(() => {

                response.textContent =
                    answer;

                speak(answer);

            }, 500);

        };


    recognition.onend =
        function() {

            statusText.textContent =
                "MARK 12 READY";

        };

}


// Voice output
function speak(text) {

    const speech =
        new SpeechSynthesisUtterance(text);

    speech.rate = .95;

    speech.pitch = .8;

    window.speechSynthesis.speak(
        speech
    );

}


// Hand mode
function toggleHand() {

    response.textContent =
        "Hand tracking interface ready.";

    statusText.textContent =
        "HAND MODE ONLINE";

}


// Touch mode
function toggleTouch() {

    response.textContent =
        "Touch interaction enabled.";

    statusText.textContent =
        "TOUCH MODE ONLINE";

}


// Reset
function resetUltron() {

    response.textContent =
        "Neural core reset complete.";

    statusText.textContent =
        "MARK 12 READY";

}
