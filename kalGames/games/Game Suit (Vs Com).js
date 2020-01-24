function getPilihanComputer() {
	const comp = Math.random();
	if( comp < 0.34 ) return 'gunting';
	if( comp >= 0.34 && comp < 0.67 ) return 'batu';
		return 'kertas';
}

function getHasil(p, comp) {
	if( p == comp ) return 'SERI !!!';
	if( p == 'gunting' ) return ( comp == 'batu' ) ? 'KALAH !!!' : 'MENANG !!!';
	if( p == 'batu' ) return ( comp == 'kertas' ) ? 'KALAH !!!' : 'MENANG !!!';
	if( p == 'kertas' ) return ( comp == 'gunting' ) ? 'KALAH !!!' : 'MENANG !!!';
}

function acakPilihanCom() {
	const imgComputer = document.querySelector('.img-computer');
	const gambar = ['batu', 'gunting', 'kertas'];
	let i = 0;
	const waktuMulai = new Date().getTime();
	setInterval(function() {
		if(new Date().getTime() - waktuMulai > 1000) {
			clearInterval;
			return;
		}
		imgComputer.setAttribute('src', 'Properties/' + gambar[i++] + '.png');
		if ( i == gambar.length ) i = 0;
	}, 100)
}

const pilihan = document.querySelectorAll('li img');
let win = 1;
let lose = 1;
pilihan.forEach(function(pil){

	pil.addEventListener('click', function() {
		const pilihanComputer = getPilihanComputer();
		const pilihanPlayer = pil.className;
		const hasilGame = getHasil(pilihanPlayer, pilihanComputer);

		acakPilihanCom();

		setTimeout(function() {
			const imgComputer = document.querySelector('.img-computer');
			imgComputer.setAttribute('src', 'Properties/' + pilihanComputer + '.png');

		const hasil = document.querySelector('.hasil');
		hasil.innerHTML = hasilGame;

		const skorKomputer = document.querySelector('.skor-computer');
		const skorPlayer = document.querySelector('.skor-player');

		if( hasilGame == 'MENANG !!!' ) {
			skorPlayer.innerHTML = win++;
		}

		if( hasilGame == 'KALAH !!!' ) {
			skorKomputer.innerHTML = lose++;
		}
		}, 1000);
	});
});
// var coba = true;
// while( coba ) {
// 	//Pilihan Player
// 	var p = prompt('Selamat Datang di Game Suit \nSilahkan Pilih \n(gunting, batu, atau kertas)');

// 	//Pilihan Computer
// 	//Membangkitkan bilangan random
// 	var comp = Math.random();
// 	if( comp < 0.34 ) {
// 		comp = 'gunting';
// 	} else if( comp >= 0.34 && comp < 0.67 ) {
// 		comp = 'batu';
// 	} else {
// 		comp = 'kertas';
// 	}

// 	//Peraturan Game
// 	var hasil = '';
// 	if( p == comp ) {
// 		hasil = 'SERI !!!';
// 	} else if( p == 'gunting' ) {
// 		hasil = ( comp == 'batu' ) ? 'KALAH !!!' : 'MENANG !!!';
// 	} else if( p == 'batu' ) {
// 		hasil = ( comp == 'kertas' ) ? 'KALAH !!!' : 'MENANG !!!';
// 	} else if( p == 'kertas' ) {
// 		hasil = ( comp == 'gunting' ) ? 'KALAH !!!' : 'MENANG !!!';
// 	} else if( p == '' ) {
// 		hasil = 'belum memasukkan pilihan apapun. Silahkan pilih pilihan yang tersedia !!!';
// 	} else {
// 		hasil = 'memasukkan pilihan yang salah. Tolong pilih pilihan yang tersedia !!!';
// 	}

// 	//Hasil
// 	alert('Pilihanmu : ' + p + '\nPilihan Kom : ' + comp + '\n\nHasil : Kamu ' + hasil);
	
// 	coba = confirm('Ingin bermain Lagi ?');
// }
// alert('Terima kasih sudah bermain.');