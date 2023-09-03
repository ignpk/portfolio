const width = window.innerWidth
const discount = (width * 2) / 100;
const widthTotal = width - discount;
const heigth = window.innerHeight

function setup() {
    createCanvas(widthTotal, 1200);
}

function draw() {
    background(0);
}


const cartas = document.querySelectorAll('.carta');
const cartas2 = document.querySelectorAll('.carta2');
const contenedor = document.getElementById("wrapper")

contenedor.classList.add("wrapper")


//------------------------movimiento del mouse--------------------------//
function aplicarEfectos(elemento) {
    elemento.addEventListener('mousemove', (event) => {
        const rect = elemento.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const xAxis = (event.clientX - centerX) / 15;
        const yAxis = (centerY - event.clientY) / 15;

        elemento.style.transform = `perspective(500px) rotateX(${yAxis}deg) rotateY(${xAxis}deg) scale(1.3)`;
    });


    //------------------------hover--------------------------//
    elemento.addEventListener('mouseenter', (event) => {
        elemento.style.transition = 'all 0.2s ease';
        setTimeout(function () {
            elemento.style.transition = 'none';
        }, 400);
    });


    //------------------------hover FIN--------------------------//
    elemento.addEventListener('mouseleave', (event) => {
        elemento.style.transition = `transform 0.5s ease`;
        elemento.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });
}

cartas.forEach(aplicarEfectos);
cartas2.forEach(aplicarEfectos);
