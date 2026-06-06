const PASSWORD = "100426"; // PIN Mensiversary
let enteredPin = "";

// --- FUNGSI PIN CALCULATOR (PAGE 1) ---
function addNumber(num){
    if(enteredPin.length >= 6) return;
    enteredPin += num;
    updateDisplay();
}

function removeNumber(){
    enteredPin = enteredPin.slice(0,-1);
    updateDisplay();
}

function updateDisplay(){
    let dots = "";
    for(let i=0;i<enteredPin.length;i++){ dots += "● "; }
    for(let i=enteredPin.length;i<6;i++){ dots += "○ "; }
    document.getElementById("display").innerHTML = dots;
}

function checkPassword(){
    if(enteredPin === PASSWORD){
        nextPage(2);
    }else{
        document.getElementById("error").innerHTML = "Wrong password";
        enteredPin = "";
        updateDisplay();
    }
}

// === FUNGSI SHOWSTORY (PAGE 3 TO 4) ===
function showStory(){
    nextPage(4);
}

// --- FUNGSI FLIP CARD GALLERY (PAGE 2) ---
function flipCard(cardElement) {
    cardElement.classList.toggle("flipped");
}

// --- FUNGSI BUKA TUTUP AMPLOP (PAGE 5) ---
function toggleEnvelope() {
    const env = document.getElementById("envelope");
    if(env) {
        env.classList.toggle("open");
    }
}

function triggerNextReason() {
    const reasonTextElem = document.getElementById("reasonText");
    if(!reasonTextElem) return;
    
    reasonTextElem.style.opacity = "0";
    
    setTimeout(() => {
        currentReason++;
        if(currentReason >= reasons.length){ currentReason = 0; }
        
        reasonTextElem.innerHTML = reasons[currentReason];
        
        reasonTextElem.style.opacity = "1";
    }, 200); 
}

function revealPhotos() {
    const coupleContainer = document.querySelector(".couple-polaroids");
    if(coupleContainer) {
        coupleContainer.classList.add("revealed"); 
    }
    
    const hint = document.getElementById("hintText");
    if(hint) {
        hint.style.opacity = "0";
        setTimeout(() => {
            hint.style.display = "none";
        }, 500);
    }
}

const reasons = [
    "You make me feel loved.",
    "You always make me smile.",
    "You make ordinary days special.",
    "You understand me.",
    "You make me feel safe.",
    "You support me.",
    "You are my favorite person.",
    "You make my world brighter.",
    "You choose us every day.",
    "And because you're simply you."
];
let currentReason = 0;

// --- KONFIGURASI SURAT (PAGE 6) ---
const letterText = `Dear Love,

Happy Mensiversary

Thank you for every laugh, every conversation, and every memory we've shared together. You make my days brighter than you probably realize, and being with you has become one of the best parts of my life.

Thank you for staying, understanding me, and choosing us every day. I hope we continue creating beautiful memories together and growing side by side.

I love you so much.`;

function startTyping(){
    const target = document.getElementById("typedText");
    if (!target) return;
    target.innerHTML="";
    let i=0;
    const typing = setInterval(()=>{
        target.innerHTML += letterText.charAt(i);
        i++;
        if(i>=letterText.length){ clearInterval(typing); }
    },40);
}

// --- FUNGSI NAVIGASI NEXTPAGE DENGAN TRANSISI TIRAI ---
function nextPage(page){
    const curtain = document.getElementById("curtain-transition");
    if (curtain) curtain.classList.add("active");
    
    setTimeout(() => {
        document.querySelectorAll(".page").forEach(p=>{ p.classList.remove("active"); });
        
        const targetPage = document.getElementById("page"+page);
        if(targetPage) targetPage.classList.add("active");

        if(page===6){
            setTimeout(() => { startTyping(); }, 600); 
        }
        
        if(page===7){
            setupPage7();
        }

        if (curtain) curtain.classList.remove("active");
    }, 800); 
}

// --- FUNGSI HUJAN BUNGA FLOWER RAIN (PAGE 7) ---
function triggerFlowerRain() {
    const flowerSymbols = ["🌸", "💮", "🌸", "✨", "💕"];
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const flower = document.createElement("span");
            flower.classList.add("floating-flower");
            flower.innerHTML = flowerSymbols[Math.floor(Math.random() * flowerSymbols.length)];
            flower.style.left = Math.random() * 100 + "vw";
            flower.style.fontSize = Math.random() * 20 + 20 + "px";
            flower.style.animationDuration = Math.random() * 3 + 3 + "s";
            const randomX = (Math.random() * 160 - 80) + "px";
            flower.style.setProperty('--randomX', randomX);
            document.body.appendChild(flower);
            setTimeout(() => { flower.remove(); }, 6000);
        }, i * 150);
    }
}

// --- FUNGSI SETUP ENDING (PAGE 7) ---
function setupPage7() {
    triggerFlowerRain();
    
    const page7 = document.getElementById("page7");
    const thankYouSection = document.getElementById("thank-you-section");
    const mensiveSection = document.getElementById("happy-mensive-section");
    
    if(!page7 || !thankYouSection || !mensiveSection) return;
    
    const lines = document.querySelectorAll("#thank-you-section .fade-line");
    
    page7.classList.remove("show-secret");
    thankYouSection.style.display = "block";
    thankYouSection.classList.remove("fade-out");
    mensiveSection.style.display = "none";
    
    lines.forEach((line, index) => {
        line.classList.remove("appear");
        setTimeout(() => {
            line.classList.add("appear");
        }, index * 2000);
    });
    
    setTimeout(() => {
        thankYouSection.classList.add("fade-out");
        setTimeout(() => {
            thankYouSection.style.display = "none";
            mensiveSection.style.display = "block";
            const heading = mensiveSection.querySelector("h1");
            if(heading) heading.classList.add("fade-in");l
            aktifkanFiturTahanLayar();
        }, 1500); 
    }, 6500);
}

function aktifkanFiturTahanLayar() {
    const page7 = document.getElementById("page7");
    if(!page7) return;
    
    page7.ontouchstart = (e) => { e.preventDefault(); page7.classList.add("show-secret"); };
    page7.ontouchend = () => { page7.classList.remove("show-secret"); };
    page7.ontouchcancel = () => { page7.classList.remove("show-secret"); };
    
    page7.onmousedown = () => { page7.classList.add("show-secret"); };
    page7.onmouseup = () => { page7.classList.remove("show-secret"); };
    page7.onmouseleave = () => { page7.classList.remove("show-secret"); };
}

// --- INISIALISASI AWAL PAS DOLOAD ---
window.addEventListener('DOMContentLoaded', () => {
    const reasonElem = document.getElementById("reasonText");
    if (reasonElem) { reasonElem.innerHTML = reasons[0]; }
});