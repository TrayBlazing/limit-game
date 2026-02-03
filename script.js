let currentQuestion = 0;
let score = 0;
let correctAnswer = 0;
let gameOver = false;

const TOTAL_QUESTIONS = 10;
const TIME_PER_QUESTION = 60;

let timeLeft = TIME_PER_QUESTION;
let timerInterval = null;

const correctMessages = ["😃 Lumayan", "😎 Cerdas seperti Ruru", "🔥 Luar biasa lanjutkan"];
const wrongMessages = [
    "🤦 Bodoh",
    "🧠❌ Tolong jangan taruh otak anda di dengkul",
    "🦥 Kukang lebih cerdas daripada anda"
];

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* TIMER */
function startTimer() {
    clearInterval(timerInterval);
    timeLeft = TIME_PER_QUESTION;
    updateTimer();

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            nextQuestion();
        }
    }, 1000);
}

function updateTimer() {
    document.getElementById("timer").innerText =
        `⏱️ Waktu: ${timeLeft} detik`;
}

/* SOAL */
function generateQuestion() {
    startTimer();

    let a = randomInt(1, 5);
    let b = randomInt(1, 5);
    let x = randomInt(1, 5);
    let type = randomInt(1, 3);

    if (type === 1) {
        correctAnswer = a * x + b;
        document.getElementById("question").innerText =
            `Soal ${currentQuestion + 1}: lim (x → ${x}) (${a}x + ${b})`;
    }

    if (type === 2) {
        correctAnswer = a * x * x;
        document.getElementById("question").innerText =
            `Soal ${currentQuestion + 1}: lim (x → ${x}) ${a}x²`;
    }

    if (type === 3) {
        correctAnswer = (a * x) / 2;
        document.getElementById("question").innerText =
            `Soal ${currentQuestion + 1}: lim (x → ${x}) (${a}x / 2)`;
    }
}

/* JAWAB */
function submitAnswer() {
    if (gameOver) return;

    const input = document.getElementById("answer");
    const feedback = document.getElementById("feedback");

    if (input.value === "") return;

    clearInterval(timerInterval);
    const userAnswer = Number(input.value);

    if (userAnswer === correctAnswer) {
        score++;
        feedback.innerText =
            correctMessages[randomInt(0, correctMessages.length - 1)];
    } else {
        feedback.innerText =
            wrongMessages[randomInt(0, wrongMessages.length - 1)];
    }

    nextQuestion();
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById("answer").value = "";

    if (currentQuestion < TOTAL_QUESTIONS) {
        setTimeout(() => {
            document.getElementById("feedback").innerText = "";
            generateQuestion();
        }, 1000);
    } else {
        endGame();
    }
}

/* SELESAI + GAMBAR */
function endGame() {
    gameOver = true;
    clearInterval(timerInterval);

    document.getElementById("question").innerText = "🎉 Permainan Selesai!";
    document.getElementById("timer").innerText = "";
    document.getElementById("score").innerText =
        `Skor kamu: ${score} / ${TOTAL_QUESTIONS}`;

    document.getElementById("submitBtn").disabled = true;
    document.getElementById("restartBtn").style.display = "inline-block";

    if (score < 5) {
        const jumpscare = document.getElementById("jumpscare");
        jumpscare.style.display = "block";

        setTimeout(() => {
            jumpscare.style.display = "none";
        }, 2000);
    }
}

/* ULANG */
function restartGame() {
    currentQuestion = 0;
    score = 0;
    gameOver = false;

    document.getElementById("score").innerText = "";
    document.getElementById("feedback").innerText = "";
    document.getElementById("submitBtn").disabled = false;
    document.getElementById("restartBtn").style.display = "none";

    generateQuestion();
}

/* MULAI */
generateQuestion();
