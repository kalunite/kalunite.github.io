const mulaiGame = document.querySelector('.mulai-game')
const mines = [
    document.querySelector('.mine-1'),
    document.querySelector('.mine-2'),
    document.querySelector('.mine-3'),
    document.querySelector('.mine-4'),
    document.querySelector('.mine-5'),
    document.querySelector('.mine-6'),
    document.querySelector('.mine-7'),
    document.querySelector('.mine-8'),
    document.querySelector('.mine-9'),
    document.querySelector('.mine-10'),
    document.querySelector('.mine-11'),
    document.querySelector('.mine-12'),
    document.querySelector('.mine-13'),
    document.querySelector('.mine-14'),
    document.querySelector('.mine-15'),
    document.querySelector('.mine-16'),
    document.querySelector('.mine-17'),
    document.querySelector('.mine-18'),
    document.querySelector('.mine-19'),
    document.querySelector('.mine-20'),
    document.querySelector('.mine-21'),
    document.querySelector('.mine-22'),
    document.querySelector('.mine-23'),
    document.querySelector('.mine-24'),
    document.querySelector('.mine-25'),
    document.querySelector('.mine-26'),
    document.querySelector('.mine-27'),
    document.querySelector('.mine-28'),
    document.querySelector('.mine-29'),
    document.querySelector('.mine-30'),
    document.querySelector('.mine-31'),
    document.querySelector('.mine-32'),
    document.querySelector('.mine-33'),
    document.querySelector('.mine-34'),
    document.querySelector('.mine-35'),
    document.querySelector('.mine-36'),
    document.querySelector('.mine-37'),
    document.querySelector('.mine-38'),
    document.querySelector('.mine-39'),
    document.querySelector('.mine-40'),
    document.querySelector('.mine-41'),
    document.querySelector('.mine-42'),
    document.querySelector('.mine-43'),
    document.querySelector('.mine-44'),
    document.querySelector('.mine-45'),
    document.querySelector('.mine-46'),
    document.querySelector('.mine-47'),
    document.querySelector('.mine-48'),
    document.querySelector('.mine-49'),
    document.querySelector('.mine-50'),
    document.querySelector('.mine-51'),
    document.querySelector('.mine-52'),
    document.querySelector('.mine-53'),
    document.querySelector('.mine-54'),
    document.querySelector('.mine-55'),
    document.querySelector('.mine-56'),
    document.querySelector('.mine-57'),
    document.querySelector('.mine-58'),
    document.querySelector('.mine-59'),
    document.querySelector('.mine-60'),
    document.querySelector('.mine-61'),
    document.querySelector('.mine-62'),
    document.querySelector('.mine-63'),
    document.querySelector('.mine-64'),
    document.querySelector('.mine-65'),
    document.querySelector('.mine-66'),
    document.querySelector('.mine-67'),
    document.querySelector('.mine-68'),
    document.querySelector('.mine-69'),
    document.querySelector('.mine-70'),
    document.querySelector('.mine-71'),
    document.querySelector('.mine-72'),
    document.querySelector('.mine-73'),
    document.querySelector('.mine-74'),
    document.querySelector('.mine-75'),
    document.querySelector('.mine-76'),
    document.querySelector('.mine-77'),
    document.querySelector('.mine-78'),
    document.querySelector('.mine-79'),
    document.querySelector('.mine-80'),
    document.querySelector('.mine-81')
    ]
const hitungwaktu = document.querySelector('.waktu');
const areaWaktu = document.querySelector('.area-waktu');
const permainanBerakhir = document.querySelector('.area-hasil h1');
const areaSkor = document.querySelector('.area-skor');
const areaPetunjuk = document.querySelector('.area-petunjuk');
const hasilAkhir = document.querySelector('.area-hasil');
const skorAkhir = document.querySelector('.area-hasil .skor-akhir');
const hitungSkor = document.querySelector('.skor');
const areaPreview = document.querySelector('.area-preview');
const addPoints = document.querySelector(`.add-points`);
const bomb = document.querySelector(`.bomb`);

for (let i = 0; i < mines.length; i++) {
    mines[i].addEventListener('load', function() {
        
        let comp = Math.random();
        if( comp <= 0.1 ) {
                soal = '1';
            } 
            else if( comp <= 0.2 ) {
                soal = '2';
            }
            else if( comp <= 0.3 ) {
                soal = '3';
            } 
            else if( comp <= 0.4 ) {
                soal = '4';
            } 
            else if( comp <= 0.5 ) {
                soal = '5';
            } 
            else if( comp <= 0.6 ) {
                soal = '6';
            } 
            else if( comp <= 0.7 ) {
                soal = '7';
            } 
            else if( comp <= 0.8 ) {
                soal = '8';
            } 
            else if( comp <= 0.9 ) {
                soal = '9';
            } 
            else {
                soal = 'bomb';
            }

        })
}

mulaiGame.addEventListener('click', function mulai() {
    mulaiGame.style.display = 'none';
    let waktuBerjalan = (300) - 1;
    const waktuMundur = setInterval(function() {
        
        hitungwaktu.innerHTML = waktuBerjalan-- / 10 + ' sec';

        if (waktuBerjalan < 0 ) {
            bomb.play();
            clearInterval(waktuMundur);
            setTimeout(function() {
                hasilAkhir.style.display = 'block';
            }, 100);
            areaSkor.style.display = 'none';
            areaWaktu.style.display = 'none';
            areaPreview.style.display = 'none';
            areaPetunjuk.style.display = 'none';
            skorAkhir.innerHTML = 'Skor Anda : <br>' + skorSaatIni + ' Pts';
            permainanBerakhir.innerHTML = 'WAKTU HABIS, PERMAINAN BERAKHIR';
        }
    }, 100);
        
    let skorSaatIni = 0;
    for (let i = 0; i < mines.length; i++) {
        mines[i].addEventListener('click', function() {
            mines[i].setAttribute('src', 'css/img/' + soal + '.png');
        
            if (soal == 'bomb') {
                bomb.play();
                clearInterval(waktuMundur);
                setTimeout(function() {
                    hasilAkhir.style.display = 'block';
                }, 100);
                areaSkor.style.display = 'none';
                areaWaktu.style.display = 'none';
                areaPreview.style.display = 'none';
                areaPetunjuk.style.display = 'none';
                skorAkhir.innerHTML = 'Skor Anda : <br>' + skorSaatIni + ' Pts';
            }

            addPoints.play();
            skorSaatIni += parseInt(soal);
            hitungSkor.innerHTML = skorSaatIni + ' Pts';
            
            const imgBaru = document.createElement('img');
            imgBaru.setAttribute('src', 'css/img/' + soal + '.png');
            areaPreview.appendChild(imgBaru);
        })
    }
})
