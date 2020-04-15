const mulaiGame = document.querySelector(`.mulai-game`);
const areaGame = document.querySelector(`.container`);
const areaSkor = document.querySelector(`.skor span`);
const backsound = document.querySelector(`.backsound`);
const sliceIt = document.querySelector(`.slice-it`);
const bomb = document.querySelector(`.bomb`);
const arrBuah = [
    `c3`,
    `nanas`,
    `mangga`,
    `semangka`,
    `jambu`,
    `lemon`,
    `strawberry`,
]

function randomIndex() {
    let comp = Math.random();
    if (comp <= 0.3) return 0;
    if (comp <= 0.45) return 1;
    if (comp <= 0.6) return 2;
    if (comp <= 0.75) return 3;
    if (comp <= 0.9) return 4;
    if (comp <= 0.97) return 5;
    return 6;
}

function randomWaktu(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

const wRandom = randomWaktu(1000, 3000);

mulaiGame.addEventListener(`click`, function() {
    mulaiGame.style.display = `none`;
    areaGame.style.marginTop = `50px`;
    let skor = 0;
    areaSkor.innerHTML = `${skor} pts`;
    backsound.play();
    const jedaImgBaru = setInterval(() => {
    
        let indexBaru = randomIndex();
        let buahBaru = arrBuah[indexBaru];
        const imgBaru = document.createElement(`div`);
        imgBaru.setAttribute(`class`, `buah ${buahBaru}`);
        imgBaru.style.backgroundImage = `url(css/img/${buahBaru}.png)`;
        imgBaru.addEventListener(`click`, function klikBuah() {
            imgBaru.style.backgroundImage = `url(css/img/${buahBaru}-slice.png)`;
            if (buahBaru == `c3`) {
                bomb.play();
                setTimeout(() => {
                    clearInterval(jedaImgBaru);
                    areaGame.removeChild(imgBaru);
                    document.querySelectorAll(`.buah`).forEach( b => {
                        b.style.display = `none`;
                    });
                    mulaiGame.style.display = `block`;
                    areaGame.style.marginTop = `0`;
                }, 500);
            } else if (buahBaru == `nanas`) {
                skor += 1;
            } else if (buahBaru == `mangga`) {
                skor += 2;
            } else if (buahBaru == `semangka`) {
                skor += 3;
            } else if (buahBaru == `jambu`) {
                skor += 5;
            } else if (buahBaru == `lemon`) {
                skor += 9;
            } else {
                skor += 25;
            }
            
            sliceIt.play();
            setTimeout(() => {
                imgBaru.style.display = `none`;
            }, 500);
            areaSkor.innerHTML = `${skor} pts`;
        });
        areaGame.appendChild(imgBaru);
        imgBaru.style.left = `${Math.round(Math.random() * 670)}px`;
        if (buahBaru == `c3`) {
            imgBaru.style.transition = `bottom ${Math.round(Math.random() * (5 - 1) + 1)}s`;
        } else if (buahBaru == `nanas` || buahBaru == `mangga` || buahBaru == `semangka`) {
            imgBaru.style.transition = `bottom 3s`;
            setTimeout(() => {
                imgBaru.style.display = `none`;
            }, 30000);
        } else if (buahBaru == `jambu` || buahBaru == `lemon`) {
            imgBaru.style.transition = `bottom 2s`;
            setTimeout(() => {
                imgBaru.style.display = `none`;
            }, 10000);
        } else {
            imgBaru.style.transition = `bottom 1s`;
            setTimeout(() => {
                imgBaru.style.display = `none`;
            }, 7000);
        }
        setTimeout(() => {
            areaGame.classList.toggle(`turun`);
        }, 500);
        
    }, wRandom);
})
