const hamburger = document.querySelector('.header_hamburger');
const header = document.querySelector('.header');

hamburger.addEventListener("click", function () {
    hamburger.classList.toggle('open');
    header.classList.toggle('active');
});


// =======================
// TIME (corrigé)
// =======================

function ten(x){
  return x < 10 ? "0" + x : x;
}

const dy   = document.getElementById("y");
const dm   = document.getElementById("m");
const dw   = document.getElementById("w");
const d    = document.getElementById("d");
const dhr  = document.getElementById("hr");
const dmin = document.getElementById("min");
const dsec = document.getElementById("sec");

const startDate = new Date(2025, 0, 25, 15, 0, 0); // 25 janvier 2025 15:00


function getCurrentTime() {
  const now = new Date();

  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();
  let hours = now.getHours() - startDate.getHours();
  let minutes = now.getMinutes() - startDate.getMinutes();
  let seconds = now.getSeconds() - startDate.getSeconds();

  // Ajustement si négatif
  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    // Obtenir le nombre de jours du mois précédent
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  // Affichage
  dy.innerText   = ten(years);   // années
  dm.innerText   = ten(months);  // mois
  d.innerText    = ten(days);    // jours
  dhr.innerText  = ten(hours);   // heures
  dmin.innerText = ten(minutes); // minutes
  dsec.innerText = ten(seconds); // secondes
}

setInterval(getCurrentTime, 1000);
getCurrentTime();

// =======================
// SCROLL
// =======================

const scroll = document.querySelector(".scroll");

window.addEventListener('scroll',function(){
    const h = document.documentElement.clientHeight * 0.5;
    if(window.scrollY > h){
        scroll.classList.remove('inactive-scroll');
        scroll.classList.add('active-scroll');
    } else {
        scroll.classList.remove('active-scroll');
        scroll.classList.add('inactive-scroll');
    }
});


// =======================
// SPINNER (modifié)
// =======================

const spinner = document.querySelector('.spinning');
const spinBtn = document.querySelector('.spin-con button');

spinBtn.addEventListener('click', spinWheel);

let deg = 0;
let prize;

function spinWheel(){
  // chral = segment 1 = 0°
  const targetAngle = 0;

  // rotation naturelle (plusieurs tours)
  const spins = 8;
  const rotateDeg = deg + 360 * spins + targetAngle;

  spinner.style.transform = `rotate(${rotateDeg}deg)`;
  deg = rotateDeg;
  prize = 1;

  spinBtn.removeEventListener('click', spinWheel);

  setTimeout(function(){
    let winner = document.querySelector('.spin-con_content:nth-of-type(1)');
    let infoSpin = document.querySelector('.spin-info');

    document
      .querySelectorAll('.spin-con_content')
      .forEach(el => el.classList.remove('won'));

    winner.classList.add('won');

    let wItem = winner.children[0].innerText;
    if(wItem.length < 6) wItem = 'un ' + wItem;

    infoSpin.innerText = `Bravo Maaadam tu as gagné ${wItem}!`;

    spinBtn.addEventListener('click', spinWheel);
  }, 5000);
}



// =======================
// GALLERY ZOOM
// =======================

const photosArr = document.querySelectorAll('.gal-box span');
const galOv = document.querySelector('.gal-big');
const galOvImg = document.querySelector('.gal-big img');

galOv.addEventListener('click', function(e){
  if(e.target === this){
    galOv.classList.remove('show-galbig');
  }
});

photosArr.forEach((p)=>{
  p.addEventListener('click', function(){
    let src = p.children[0].getAttribute('src');
    galOvImg.setAttribute('src', src);
    galOv.classList.add('show-galbig');
  });
});

const nextBtn = document.getElementById('nextPageBtn');

if(nextBtn){
  nextBtn.addEventListener('click', () => {
    document.body.classList.add('page-leave');

    setTimeout(() => {
      window.location.href = 'suite.html'; // ← ta page suivante
    }, 600);
  });
}