const bgMusic = document.getElementById("bgMusic");

function startMusic() {
    if (bgMusic) {
        bgMusic.volume = 0.7;
        bgMusic.play().catch(() => {});
    }
}

document.addEventListener("click", startMusic, { once: true });
document.addEventListener("touchstart", startMusic, { once: true });
const rakhiFiles = [
  "assets/rakhi_1_cute_playful.png",
  "assets/rakhi_2_peacock_royal.png",
  "assets/rakhi_3_blue_eye.png",
  "assets/rakhi_4_red_royal.png"
];

let selectedRakhi = null;
let tied = false;

function show(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({top:0,behavior:"smooth"});
}
function go(id){ show(id); }

function startMusic(){
  if(!music) return;
  music.volume = .7;
  const p = music.play();
  if(p) p.catch(()=>{});
}
function enterSite(){;
  go("q1");
}
window.addEventListener("load", startMusic);
["click","touchstart","keydown"].forEach(e=>{
  document.addEventListener(e,()=>{ if(music && music.paused) startMusic(); },{passive:true});
});

function startGame(){
  go("game");
}

const cards = document.querySelectorAll(".rakhi-card");
const target = document.getElementById("wristTarget");

cards.forEach(card=>{
  card.addEventListener("click",()=>chooseRakhi(Number(card.dataset.index)));

  card.addEventListener("dragstart",e=>{
    selectedRakhi = Number(card.dataset.index);
    e.dataTransfer.setData("text/plain",String(selectedRakhi));
    highlight(card);
    target.classList.add("ready");
  });
  card.addEventListener("dragend",()=>{
    target.classList.remove("ready");
  });
});

function highlight(card){
  cards.forEach(c=>c.classList.remove("selected"));
  card.classList.add("selected");
}

function chooseRakhi(index){
  selectedRakhi=index;
  tied=false;
  cards.forEach(c=>c.classList.toggle("selected",Number(c.dataset.index)===index));
  document.getElementById("gameHint").textContent =
    "Now drag the selected Rakhi onto Brother's wrist ❤️";
  target.classList.add("ready");
}

target.addEventListener("dragover",e=>{
  e.preventDefault();
  target.classList.add("ready");
});
target.addEventListener("dragleave",()=>target.classList.remove("ready"));
target.addEventListener("drop",e=>{
  e.preventDefault();
  const value=e.dataTransfer.getData("text/plain");
  if(value!=="") selectedRakhi=Number(value);
  tieRakhi();
});

target.addEventListener("click",()=>{
  if(selectedRakhi!==null) tieRakhi();
});

function tieRakhi(){
  if(selectedRakhi===null || tied) return;
  tied=true;

  const src=rakhiFiles[selectedRakhi];
  document.getElementById("tiedImg").src=src;
  document.getElementById("tiedRakhi").classList.add("show");
  target.classList.remove("ready");
  target.classList.add("tied");

  document.getElementById("gameHint").textContent =
    "Tied with Love! 💖 Your Rakhi is on Brother's wrist!";
  document.getElementById("doneBtn").classList.remove("hidden");

  celebrate();
}

function celebrate(){
  for(let i=0;i<22;i++){
    const x=document.createElement("div");
    x.textContent=["❤️","💗","✨","🎀","💙"][Math.floor(Math.random()*5)];
    x.style.position="fixed";
    x.style.left=(40+Math.random()*20)+"%";
    x.style.top="45%";
    x.style.zIndex="100";
    x.style.pointerEvents="none";
    x.style.fontSize=(15+Math.random()*22)+"px";
    x.style.transition="1.2s ease";
    document.body.appendChild(x);
    requestAnimationFrame(()=>{
      x.style.transform=`translate(${(Math.random()-.5)*350}px,${-80-Math.random()*260}px) rotate(${Math.random()*220-110}deg)`;
      x.style.opacity="0";
    });
    setTimeout(()=>x.remove(),1300);
  }
}
window.addEventListener("load", function () {
    const music = document.getElementById("bgMusic");

    if (music) {
        music.volume = 0.7;
        music.currentTime = 0;

        music.play().catch(function () {
            console.log("Browser blocked autoplay with sound.");
        });
    }
});