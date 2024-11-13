let musica = document.getElementById("musica");
let playPauseButton = document.getElementById("playPause");
let avanzarCancion = document.getElementById("avanzarCancion");
let audio1 = new Audio("/audios/audio1.mp3");
let audio2 = new Audio("/audios/audio2.mp3");
let audio3 = new Audio("/audios/audio3.mp3");
let Cancion = audio1; // Inicialmente, el audio actual es audio1

const canciones = [
    {
        Titulo: "Full Moon Full Life",
        Cantante: "Lotus Juice",
        Archivo: audio1
    },
    {
        Titulo: "Aria of the Soul",
        Cantante: "Atlus Game Music",
        Archivo: audio2
    },
    {
        Titulo: "It's Going Down Now",
        Cantante: "Lotus Juice",
        Archivo: audio3
    }
];

const tituloElement = document.getElementById("tituloCancion");
const cantanteElement = document.getElementById("cantanteCancion");
//Con esta funcion 
function aleatoria() {
    const indiceAleatorio = Math.floor(Math.random() * canciones.length);
    return canciones[indiceAleatorio];
}

function actualizarInfoCancion(cancion) {
    tituloElement.textContent = cancion.Titulo;
    cantanteElement.textContent = cancion.Cantante;
}

// Cuando una canción termina, se reproduce otra aleatoria y se actualiza la información.
Cancion.addEventListener("ended", function() {
    const cancionAleatoria = aleatoria();
    Cancion.pause();
    Cancion = cancionAleatoria.Archivo;
    Cancion.play();
    actualizarInfoCancion(cancionAleatoria);
});

// Función para reproducir o pausar la canción
function playPause() {
    if (Cancion.paused) {
        Cancion.play();
    } else {
        Cancion.pause();
    }
}

// Avanzar a la siguiente canción aleatoria
function avanzar() {
    Cancion.pause();
    const cancionAleatoria = aleatoria();
    Cancion = cancionAleatoria.Archivo;
    Cancion.play();
    actualizarInfoCancion(cancionAleatoria);
}

// Retroceder a una canción aleatoria
function retroceder() {
    Cancion.pause();
    const cancionAleatoria = aleatoria();
    Cancion = cancionAleatoria.Archivo;
    Cancion.play();
    actualizarInfoCancion(cancionAleatoria);
}

// Bajar el volumen en incrementos de 0.1
function bajarVolumen() {
    if (Cancion.volume > 0) {
        Cancion.volume = Math.max(0, Cancion.volume - 0.1).toFixed(1);
    }
}

// Subir el volumen en incrementos de 0.1
function subirVolumen() {
    if (Cancion.volume < 1) {
        Cancion.volume = Math.min(1, Cancion.volume + 0.1).toFixed(1);
    }
}

// Se activa el evento para para o empezar la cancion con la tecla espacio
document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        event.preventDefault();
        playPause();
    }
});

// Eventos para activar las funciones al pulsar las teclas seleccionadas
document.addEventListener("keydown", function(event) {
    if (event.code === "ArrowRight") {
        event.preventDefault();
        avanzar();
    } else if (event.code === "ArrowLeft") {
        event.preventDefault();
        retroceder();
    } else if (event.code === "ArrowDown") {
        event.preventDefault();
        bajarVolumen();
    } else if (event.code === "ArrowUp") {
        event.preventDefault();
        subirVolumen();
    }
});
 