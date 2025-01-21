let colors = ["orange", "pink", "lightcoral", "white", "tomato", "grey", "violet"];


function btnChanger() {
    let random = Math.floor(Math.random() * colors.length);
    console.log("Random2 value: " + random);
    let colorSeleccionado = colors[random];
    document.getElementById("container1").style.background = colorSeleccionado;


    localStorage.setItem('colorFondo', colorSeleccionado);
}


function loadColor() {
    const colorGuardado = localStorage.getItem('colorFondo');
    if (colorGuardado) {
        document.getElementById("container1").style.background = colorGuardado;
    }
}

window.addEventListener('load', () => {
    loadColor(); // Cargar el color de fondo
    const progress = document.getElementById('progress');
    requestAnimationFrame(update);
});

function update() {
    progress.style.width = `${((window.scrollY) / (document.body.scrollHeight - window.innerHeight) * 100)}%`;
    requestAnimationFrame(update);
}

function arriba(pxPantalla) {
    window.addEventListener('scroll', () => {
        let scroll = document.documentElement.scrollTop;
        let botonArriba = document.getElementById('botonArriba');
        if (scroll > pxPantalla) {
            botonArriba.style.right = 20 + "px";
        } else {
            botonArriba.style.right = -100 + "px";
        }
    });
}

arriba(200);

function changeImage() {
    let displayImage = document.getElementById('imagen1');
    if (displayImage.src === 'https://img.icons8.com/?size=100&id=bv1XgSVyIgCb&format=png&color=000000') {
        displayImage.src = 'https://img.icons8.com/?size=100&id=0qNdJPsoGkQ9&format=png&color=000000';
        localStorage.setItem('imagen', '0qNdJPsoGkQ9');
    } else {
        displayImage.src = 'https://img.icons8.com/?size=100&id=bv1XgSVyIgCb&format=png&color=000000';
        localStorage.setItem('imagen', 'bv1XgSVyIgCb');
    }
}


function loadImage() {
    const imagenGuardada = localStorage.getItem('imagen');
    if (imagenGuardada) {
        document.getElementById('imagen1').src = `https://img.icons8.com/?size=100&id=${imagenGuardada}&format=png&color=000000`;
    }
}

loadImage();

let tamañoIncrementado = false;

document.getElementById('imagenTamaño').addEventListener('click', () => {
    const body = document.body;
    const button = document.getElementById('imagenTamaño');
    const header = document.querySelector('h1');
    
    if (!tamañoIncrementado) {
        const tamañoActual = parseFloat(window.getComputedStyle(body).fontSize);
        const nuevoTamaño = tamañoActual + 10;
        const nuevoTamañobutton = tamañoActual + 50;
        const nuevoTamañoheader = tamañoActual + 30;
        body.style.fontSize = `${nuevoTamaño}px`;
        button.style.fontSize = `${nuevoTamañobutton}px`;
        header.style.fontSize = `${nuevoTamañoheader}px`;

       
        localStorage.setItem('fontSize', nuevoTamaño);
    } else {
        body.style.fontSize = '';
        button.style.fontSize = '';
        header.style.fontSize = '';
        
        
        localStorage.removeItem('fontSize');
    }
    tamañoIncrementado = !tamañoIncrementado;
});


function loadFontSize() {
    const fontSizeGuardado = localStorage.getItem('fontSize');
    if (fontSizeGuardado) {
        document.body.style.fontSize = `${fontSizeGuardado}px`;
    }
}

loadFontSize();

const addMessage = () => {

    const texto = document.body.innerText;

    const message = new SpeechSynthesisUtterance(texto);

    speechSynthesis.speak(message);
};


const button = document.querySelector(".tts");
button.addEventListener("click", () => addMessage());

let clickCounter = 0;

function btnClickCount() {
    clickCounter++;
    document.getElementById("clickCount").textContent = "Numero de click: " + clickCounter;
    localStorage.setItem('clickCounter', clickCounter);
}


function loadClickCounter() {
    const contadorGuardado = localStorage.getItem('clickCounter');
    if (contadorGuardado) {
        clickCounter = parseInt(contadorGuardado);
        document.getElementById("clickCount").textContent = "Numero de click: " + clickCounter;
    }
}

loadClickCounter();

const icono = document.querySelector(".icono");
icono.addEventListener("click", e => {
    icono.classList.toggle("active");
    document.body.classList.toggle("");
});

function saludar() {
    const h2 = document.getElementById('saludo');
    const hora = new Date().getHours();
    if (hora < 12) {
        h2.textContent = '¡Buenos días!';
    } else if (hora < 18) {
        h2.textContent = '¡Buenas tardes!';
    } else {
        h2.textContent = '¡Buenas noches!';
    }
}

window.onload = saludar;

function changeMode() {
    const body = document.body;
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const cards = document.querySelectorAll('.card');
    
    body.classList.toggle('modo-oscuro');
    header.classList.toggle('modo-oscuro');
    footer.classList.toggle('modo-oscuro');
    cards.forEach(card => {
        card.classList.toggle('modo-oscuro');
    });


    if (body.classList.contains('modo-oscuro')) {
        localStorage.setItem('modo', 'oscuro');
    } else {
        localStorage.setItem('modo', 'claro');
    }
}


function loadMode() {
    const modoGuardado = localStorage.getItem('modo');
    const body = document.body;
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const cards = document.querySelectorAll('.card');

    if (modoGuardado === 'oscuro') {
        body.classList.add('modo-oscuro');
        header.classList.add('modo-oscuro');
        footer.classList.add('modo-oscuro');
        cards.forEach(card => {
            card.classList.add('modo-oscuro');
        });
    }
}

loadMode();