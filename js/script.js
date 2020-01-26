// Memunculkan Form
const munculkanFormulir = document.querySelector('.jumbotron .container button')
const formulir = document.querySelector('.formulir')
munculkanFormulir.addEventListener('click', function() {
    munculkanFormulir.style.display = 'none';
    formulir.style.display = 'block'
})