/* =========================
   MUSIC
========================= */

const bgMusic = document.getElementById("bgMusic");

function startMusic() {
    if (!bgMusic) return;

    bgMusic.volume = 0.7;

    const musicPromise = bgMusic.play();

    if (musicPromise !== undefined) {
        musicPromise.catch(() => {
            console.log("Autoplay blocked. Music will start after first interaction.");
        });
    }
}

/* Try music immediately when website loads */
window.addEventListener("load", () => {
    startMusic();
});


/* If browser blocks autoplay, start after first interaction */
function unlockMusic() {
    if (bgMusic && bgMusic.paused) {
        bgMusic.play().catch(() => {});
    }
}

document.addEventListener("click", unlockMusic, { once: true });
document.addEventListener("touchstart", unlockMusic, { once: true });
document.addEventListener("keydown", unlockMusic, { once: true });


/* =========================
   PAGE NAVIGATION
========================= */

function show(id) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const nextScreen = document.getElementById(id);

    if (nextScreen) {
        nextScreen.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function go(id) {
    show(id);
}


/* =========================
   ENTER WEBSITE
========================= */

function enterSite() {

    /* Make sure music keeps playing */
    startMusic();

    go("q1");
}


/* =========================
   QUESTIONS / ANSWERS
========================= */

let currentQuestion = null;


/*
   Messages for each question.

   You can easily change these later.
*/

const answerMessages = {

    q1: [
        {
            title: "Hahaha! 😎",
            message: "Of course you picked yourself! 😂 But deep down, you know Sis is the cutiee! 🥰❤️"
        },
        {
            title: "Awww! 🥰❤️",
            message: "Correct answer! Obviously you're the cutiee! Don't let Brother argue about it 😂💕"
        }
    ],

    q2: [
        {
            title: "Chocolate Time! 🍫",
            message: "Now that's a plan I can get behind! Chocolate tastes better when we share it... sometimes 😋❤️"
        },
        {
            title: "Movie Time! 🎬",
            message: "A movie together sounds perfect! Just don't fight over what to watch 😂💕"
        },
        {
            title: "Typical Us! 😂",
            message: "Annoying each other is basically our special talent! 😂❤️"
        },
        {
            title: "Best Answer! 💖",
            message: "Everything! Because every moment with you becomes a special memory. 🥹❤️"
        }
    ],

    q3: [
        {
            title: "Very Special! ⭐",
            message: "Yes! Our bond is definitely something special. ❤️"
        },
        {
            title: "Forever Special! 💖",
            message: "Exactly! No matter how much we fight, our bond will always stay special. 🥹❤️"
        },
        {
            title: "BEST BOND EVER! ♾️",
            message: "Now that's the answer I wanted to hear! 😎❤️ Our bond is forever!"
        }
    ],

    q4: [
        {
            title: "Hahaha! 😂",
            message: "The fights are definitely unlimited! But somehow we always end up laughing again. 😂❤️"
        },
        {
            title: "That's Us! 🤝",
            message: "No matter what happens, we've always got each other's back. ❤️"
        },
        {
            title: "SNACKS! 🍫",
            message: "Sharing snacks is a very serious sibling responsibility... sometimes! 😋😂"
        },
        {
            title: "Exactly! ❤️",
            message: "The fights, the laughter, the snacks, the memories... ALL OF IT makes our bond special! 🥹❤️"
        }
    ]

};


/* =========================
   ANSWER FUNCTION
========================= */

function answer(question, option) {

    currentQuestion = question;

    /*
       Find the correct answer message
    */

    const questionAnswers = answerMessages[question];

    if (!questionAnswers || !questionAnswers[option]) {
        console.log("Answer not found:", question, option);
        return;
    }

    const selectedAnswer = questionAnswers[option];


    /*
       Popup elements
    */

    const popup = document.getElementById("answerPopup");
    const popupTitle = document.getElementById("popupTitle");
    const popupMessage = document.getElementById("popupMessage");
    const popupNextBtn = document.getElementById("popupNextBtn");


    /*
       Put answer inside popup
    */

    if (popupTitle) {
        popupTitle.textContent = selectedAnswer.title;
    }

    if (popupMessage) {
        popupMessage.textContent = selectedAnswer.message;
    }


    /*
       Change button text on last question
    */

    if (popupNextBtn) {

        if (question === "q4") {
            popupNextBtn.textContent = "Start Mini Game 🎀";
        } else {
            popupNextBtn.textContent = "Next Question ➜";
        }

    }


    /*
       Show popup
    */

    if (popup) {

        popup.classList.add("show");

        /*
           This also guarantees the popup appears
           even if the CSS doesn't have the show class.
        */

        popup.style.display = "flex";

    }


    /*
       Little heart celebration
    */

    createAnswerHearts();

}


/* =========================
   CONTINUE AFTER ANSWER
========================= */

function continueAfterAnswer() {

    /*
       Close popup
    */

    const popup = document.getElementById("answerPopup");

    if (popup) {
        popup.classList.remove("show");
        popup.style.display = "none";
    }


    /*
       Move to next question
    */

    if (currentQuestion === "q1") {

        go("q2");

    } else if (currentQuestion === "q2") {

        go("q3");

    } else if (currentQuestion === "q3") {

        go("q4");

    } else if (currentQuestion === "q4") {

        /*
           After question 4,
           start the Rakhi mini game.
        */

        startGame();

    }

}


/* =========================
   ANSWER HEART EFFECT
========================= */

function createAnswerHearts() {

    const hearts = [
        "❤️",
        "💗",
        "💕",
        "💖",
        "✨"
    ];

    for (let i = 0; i < 12; i++) {

        const heart = document.createElement("div");

        heart.textContent =
            hearts[Math.floor(Math.random() * hearts.length)];

        heart.style.position = "fixed";

        heart.style.left =
            (20 + Math.random() * 60) + "%";

        heart.style.top =
            (55 + Math.random() * 20) + "%";

        heart.style.zIndex = "9999";

        heart.style.pointerEvents = "none";

        heart.style.fontSize =
            (15 + Math.random() * 18) + "px";

        heart.style.transition =
            "1.2s ease-out";

        document.body.appendChild(heart);


        requestAnimationFrame(() => {

            heart.style.transform =
                `translate(
                    ${(Math.random() - 0.5) * 300}px,
                    ${-100 - Math.random() * 250}px
                )
                rotate(
                    ${Math.random() * 180 - 90}deg
                )`;

            heart.style.opacity = "0";

        });


        setTimeout(() => {
            heart.remove();
        }, 1300);

    }

}


/* =========================
   RAKHI MINI GAME
========================= */

const rakhiFiles = [
    "assets/rakhi_1_cute_playful.png",
    "assets/rakhi_2_peacock_royal.png",
    "assets/rakhi_3_blue_eye.png",
    "assets/rakhi_4_red_royal.png"
];

let selectedRakhi = null;
let tied = false;


/* =========================
   START MINI GAME
========================= */

function startGame() {

    /*
       Reset game
    */

    selectedRakhi = null;
    tied = false;


    /*
       Hide done button again
    */

    const doneBtn = document.getElementById("doneBtn");

    if (doneBtn) {
        doneBtn.classList.add("hidden");
    }


    /*
       Reset tied rakhi
    */

    const tiedRakhi = document.getElementById("tiedRakhi");

    if (tiedRakhi) {
        tiedRakhi.classList.remove("show");
    }


    /*
       Reset target
    */

    const target = document.getElementById("wristTarget");

    if (target) {
        target.classList.remove("ready");
        target.classList.remove("tied");
    }


    /*
       Reset cards
    */

    document.querySelectorAll(".rakhi-card").forEach(card => {
        card.classList.remove("selected");
    });


    /*
       Reset message
    */

    const hint = document.getElementById("gameHint");

    if (hint) {
        hint.textContent =
            "Drag your favorite Rakhi onto Brother's wrist ❤️";
    }


    go("game");

}


/* =========================
   RAKHI ELEMENTS
========================= */

const cards = document.querySelectorAll(".rakhi-card");
const target = document.getElementById("wristTarget");


/* =========================
   RAKHI CARD EVENTS
========================= */

cards.forEach(card => {


    /*
       CLICK RAKHI
    */

    card.addEventListener("click", () => {

        chooseRakhi(
            Number(card.dataset.index)
        );

    });


    /*
       DRAG RAKHI
    */

    card.addEventListener("dragstart", event => {

        selectedRakhi =
            Number(card.dataset.index);

        event.dataTransfer.setData(
            "text/plain",
            String(selectedRakhi)
        );

        highlight(card);

        if (target) {
            target.classList.add("ready");
        }

    });


    /*
       STOP DRAGGING
    */

    card.addEventListener("dragend", () => {

        if (target) {
            target.classList.remove("ready");
        }

    });

});


/* =========================
   HIGHLIGHT SELECTED RAKHI
========================= */

function highlight(card) {

    cards.forEach(c => {
        c.classList.remove("selected");
    });

    card.classList.add("selected");

}


/* =========================
   CHOOSE RAKHI
========================= */

function chooseRakhi(index) {

    selectedRakhi = index;

    tied = false;


    cards.forEach(card => {

        card.classList.toggle(
            "selected",
            Number(card.dataset.index) === index
        );

    });


    const hint =
        document.getElementById("gameHint");

    if (hint) {

        hint.textContent =
            "Now click or drag the selected Rakhi onto Brother's wrist ❤️";

    }


    if (target) {
        target.classList.add("ready");
    }

}


/* =========================
   WRIST DRAG AREA
========================= */

if (target) {


    /*
       DRAG OVER
    */

    target.addEventListener("dragover", event => {

        event.preventDefault();

        target.classList.add("ready");

    });


    /*
       DRAG LEAVE
    */

    target.addEventListener("dragleave", () => {

        target.classList.remove("ready");

    });


    /*
       DROP
    */

    target.addEventListener("drop", event => {

        event.preventDefault();

        const value =
            event.dataTransfer.getData("text/plain");

        if (value !== "") {

            selectedRakhi =
                Number(value);

        }

        tieRakhi();

    });


    /*
       CLICK TARGET
    */

    target.addEventListener("click", () => {

        if (selectedRakhi !== null) {

            tieRakhi();

        }

    });

}


/* =========================
   TIE RAKHI
========================= */

function tieRakhi() {

    if (selectedRakhi === null || tied) {
        return;
    }


    tied = true;


    const src =
        rakhiFiles[selectedRakhi];


    const tiedImg =
        document.getElementById("tiedImg");

    const tiedRakhi =
        document.getElementById("tiedRakhi");


    if (tiedImg) {

        tiedImg.src = src;

    }


    if (tiedRakhi) {

        tiedRakhi.classList.add("show");

    }


    if (target) {

        target.classList.remove("ready");

        target.classList.add("tied");

    }


    const hint =
        document.getElementById("gameHint");


    if (hint) {

        hint.textContent =
            "Tied with Love! 💖 Your Rakhi is on Brother's wrist!";

    }


    const doneBtn =
        document.getElementById("doneBtn");


    if (doneBtn) {

        doneBtn.classList.remove("hidden");

    }


    celebrate();

}


/* =========================
   CELEBRATION EFFECT
========================= */

function celebrate() {

    for (let i = 0; i < 22; i++) {

        const element =
            document.createElement("div");


        element.textContent =
            ["❤️", "💗", "✨", "🎀", "💙"]
            [Math.floor(Math.random() * 5)];


        element.style.position =
            "fixed";


        element.style.left =
            (40 + Math.random() * 20) + "%";


        element.style.top =
            "45%";


        element.style.zIndex =
            "100";


        element.style.pointerEvents =
            "none";


        element.style.fontSize =
            (15 + Math.random() * 22) + "px";


        element.style.transition =
            "1.2s ease";


        document.body.appendChild(element);


        requestAnimationFrame(() => {

            element.style.transform =
                `translate(
                    ${(Math.random() - 0.5) * 350}px,
                    ${-80 - Math.random() * 260}px
                )
                rotate(
                    ${Math.random() * 220 - 110}deg
                )`;

            element.style.opacity = "0";

        });


        setTimeout(() => {

            element.remove();

        }, 1300);

    }

}