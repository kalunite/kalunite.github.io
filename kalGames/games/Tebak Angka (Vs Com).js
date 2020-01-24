//Memunculkan dan menghilangkan petunjuk
const munculkanPetunjuk = document.querySelector('.cara-bermain');
const petunjuk = document.querySelector('.petunjuk');
const hilangkanPetunjuk = document.querySelector('.petunjuk span');
munculkanPetunjuk.addEventListener('mouseenter', function() {
	munculkanPetunjuk.style.backgroundColor = 'white';
	munculkanPetunjuk.style.color = 'maroon';
})
munculkanPetunjuk.addEventListener('mouseleave', function() {
	munculkanPetunjuk.style.backgroundColor = 'lightblue';
	munculkanPetunjuk.style.color = 'darkblue';
})
munculkanPetunjuk.addEventListener('click', function() {
	petunjuk.style.display = 'block';
})
hilangkanPetunjuk.addEventListener('mouseenter', function() {
	hilangkanPetunjuk.style.color = 'maroon';
})
hilangkanPetunjuk.addEventListener('mouseleave', function() {
	hilangkanPetunjuk.style.color = 'darkblue';
})
hilangkanPetunjuk.addEventListener('click', function() {
	petunjuk.style.display = 'none';
})

//Fungsi untuk angka yang dimaksud COM
function getTebakanComputer() {
	const comp = Math.random();
	if( comp <= 0.1 ) return '0';
	if( comp <= 0.2 ) return '1';
	if( comp <= 0.3 ) return '2';
	if( comp <= 0.4 ) return '3';
	if( comp <= 0.5 ) return '4';
	if( comp <= 0.6 ) return '5';
	if( comp <= 0.7 ) return '6';
	if( comp <= 0.8 ) return '7';
	if( comp <= 0.9 ) return '8';
			return '9';
}

//Memanggil pilihan computer
const pilihanComputer = getTebakanComputer();
pilihanComputer;

//Judul game dalam kolom hasil
const hasil = document.querySelector('.hasil');
hasil.innerHTML = 'Tebak Angka !';

//Fungsi untuk rules
function getHasil(p, comp) {
		//Rules
		if( p == comp ) return 'Selamat tebakan anda BENAR !!!';
		if( p < comp ) return 'Tebakan anda terlalu RENDAH !!!';
		if( p > comp ) return 'Tebakan anda terlalu TINGGI !!!';
}

//Memanggil elemen pilihan
const pilihan = document.querySelectorAll('li img');
//Jumlah Nyawa
let jmlNyawa = (3)-1;
//Menyeleksi elemen pilihan
pilihan.forEach(function(pilih) {

	//Menambah event 'click' pada elemen pilihan
	pilih.addEventListener('click', function() {

			//Memanggil dan memasukkan pilihan player ke dalam fungsi rules
			const pilihanPlayer = pilih.className;
			const hasilGame = getHasil(pilihanPlayer, pilihanComputer);

			//Memanggil hasil
			const hasil = document.querySelector('.hasil');
			hasil.innerHTML = hasilGame;

			//Jika tebakan benar, munculkan pilihan computer
			if (hasilGame == 'Selamat tebakan anda BENAR !!!') {
				const imgComputer = document.querySelector('.img-computer');
				imgComputer.setAttribute('src', 'Properties/' + pilihanComputer + '.png');

				//Memunculkan hasil menang
				const hasilMenang = document.querySelector('.hasil-menang')
				const mMulaiUlang = document.querySelector('.hasil-menang a')
				hasilMenang.style.display = 'block';
				mMulaiUlang.addEventListener('mouseenter', function() {
					mMulaiUlang.style.backgroundColor = 'maroon';
					mMulaiUlang.style.color = 'white';
				})
				mMulaiUlang.addEventListener('mouseleave', function() {
					mMulaiUlang.style.backgroundColor = 'darkblue';
					mMulaiUlang.style.color = 'lightblue';
				})
			}

			//Memanggil dan mengatur jumlah nyawa
			const nyawa = document.querySelector('.nyawa');

				//Jika tebakan salah, nyawa dikurangi
				if (hasilGame != 'Selamat tebakan anda BENAR !!!') {
					nyawa.innerHTML = 'Nyawa : ' + jmlNyawa--;
				}

				//Jika nyawa habis, permainan berhenti dan munculkan pilihan computer
				if (nyawa.innerHTML <= 'Nyawa : 0') {
					const imgComputer = document.querySelector('.img-computer');
					imgComputer.setAttribute('src', 'Properties/' + pilihanComputer + '.png');
					hasil.innerHTML = 'Nyawa anda habis, silahkan mulai lagi !!!';
					jmlNyawa = 0;

					//Memunculkan hasil kalah
					const hasilKalah = document.querySelector('.hasil-kalah')
					const kMulaiUlang = document.querySelector('.hasil-kalah a')
					hasilKalah.style.display = 'block';
					kMulaiUlang.addEventListener('mouseenter', function() {
						kMulaiUlang.style.backgroundColor = 'darkblue';
						kMulaiUlang.style.color = 'lightblue';
					})
					kMulaiUlang.addEventListener('mouseleave', function() {
						kMulaiUlang.style.backgroundColor = 'maroon';
						kMulaiUlang.style.color = 'white';
					})
				}

	})
})

// //Pengulangan Game
// var coba = true
// while( coba == true ) {

// 	//Angka yang dimaksud COM
// 	var comp = Math.random();
// 	if( comp <= 0.1 ) {
// 		comp = 0
// 	} else if( comp <= 0.2 ) {
// 		comp = 1
// 	} else if( comp <= 0.3 ) {
// 		comp = 2
// 	} else if( comp <= 0.4 ) {
// 		comp = 3
// 	} else if( comp <= 0.5 ) {
// 		comp = 4
// 	} else if( comp <= 0.6 ) {
// 		comp = 5
// 	} else if( comp <= 0.7 ) {
// 		comp = 6
// 	} else if( comp <= 0.8 ) {
// 		comp = 7
// 	} else if( comp <= 0.9 ) {
// 		comp = 8
// 	} else {
// 		comp = 9
// 	}

// 	//Pengulangan nyawa
// 	var jmlNyawa = 3;
// 	for (var nyawa = jmlNyawa ; nyawa > 0; nyawa--) {

// 		//Pilihan Player
// 		var p = prompt(parseInt='Selamat datang di Game Tebak Angka !!! \n\nTebaklah angka dari 0-9 yang dimaksud COM !!! \n\nNyawa anda ' + nyawa)

// 		//Rules
// 		var hasil = '';
// 		if( p == comp ) {
// 			hasil = 'Selamat tebakan anda BENAR !!!'
// 			nyawa = 0
// 		} else if( p < comp ) {
// 			hasil = 'Tebakan anda terlalu Rendah !!!'
// 		} else if( p > comp ) {
// 			hasil = 'Tebakan anda terlalu Tinggi !!!'
// 		} else {
// 			hasil = 'Mohon isi angka antara 0-9 !!!'
// 		}

// 		//Hasil
// 		alert('Tebakanmu = ' + p + '. \n\n' + hasil)
// 	}

// 	if ( p != comp ) {
// 		alert('Maaf nyawa anda sudah habis. Silahkan coba lagi !')
// 	}

// 	coba = confirm('Ingin bermain lagi ?')
// }
// alert('Terima kasih sudah bermain :)')

