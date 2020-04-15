const mulaiGame = document.querySelector('.mulai-game');
const hitungWaktu = document.querySelector('.waktu');
const areaWaktu = document.querySelector('.area-waktu');
const hitungSkor = document.querySelector('.skor');
const areaSkor = document.querySelector('.area-skor');
const tanah = document.querySelectorAll('.tanah');
const tobi = document.querySelectorAll('.tobi');
const hasilAkhir = document.querySelector('.area-hasil');
const skorAkhir = document.querySelector('.skor-akhir');
const pop = document.querySelector(`.audio`);

let tanahSebelumnya;
let selesai;
let skor;

function randomTanah(tanah) {
    const t = Math.floor(Math.random() * tanah.length);
    const tRandom = tanah[t];
    if (tRandom == tanahSebelumnya) {
        randomTanah(tanah);
    }
    tanahSebelumnya = tRandom;
    return tRandom;
}

function randomWaktu(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function munculkanTobi() {
    const tRandom = randomTanah(tanah);
    const wRandom = randomWaktu(300, 700);
    tRandom.classList.add('muncul');
    
    setTimeout(() => {
        tRandom.classList.remove('muncul');
        if (!selesai) {
            munculkanTobi();
        }
    }, wRandom);
}

mulaiGame.addEventListener('click', function mulai() {
    selesai = false;
    skor = 0;
    hitungSkor.innerHTML = `0 pts`;
    hitungWaktu.innerHTML = `30 sec`;
    mulaiGame.style.display = `none`;
    munculkanTobi();
    let waktuBerjalan = (300) - 1;
    const waktuMundur = setInterval(() => {
        
        hitungWaktu.innerHTML = `${waktuBerjalan-- / 10} sec`;
        
        if (waktuBerjalan < 0 ) {
            
            clearInterval(waktuMundur);
            setTimeout(function() {
                mulaiGame.style.display = `block`;
            }, 100);
            selesai = true;
        }
    }, 100);
})

function pukul() {
    skor++;
    pop.play();
    hitungSkor.innerHTML = `${skor} pts`;
}

tobi.forEach(t => {
    t.addEventListener('click', pukul);
});