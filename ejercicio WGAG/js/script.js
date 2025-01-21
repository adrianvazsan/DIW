
    let colors = ["orange", "pink", "lightcoral", "white", "tomato", "grey", "violet"];

    function btnChanger(){
        let random = Math.floor(Math.random()* colors.length);
        console.log("Random2 value: " + random);
        let z = document.getElementById("container1").style.background = colors[random];
    }

    window.addEventListener('load', () => {
        const progress = document.getElementById('progress');
        requestAnimationFrame(update);
    })

    function update(){
        progress.style.width = `${((window.scrollY) /(document.body.scrollHeight - window.innerHeight) * 100)}%`;
        requestAnimationFrame(update);
    }

    function arriba(pxPantalla){
        window.addEventListener('scroll', () =>{
            let scroll = document.documentElement.scrollTop;
            let botonArriba = document.getElementById('botonArriba');
            if(scroll > pxPantalla){
                botonArriba.style.right = 20 + "px";
            }else{
                botonArriba.style.right = -100 + "px";
            }
        })
    }

    arriba(200);

    function changeImage() {
        let displayImage = document.getElementById('imagen1')
        if (displayImage.src === 'https://img.icons8.com/?size=100&id=bv1XgSVyIgCb&format=png&color=000000') {
            displayImage.src = 'https://img.icons8.com/?size=100&id=0qNdJPsoGkQ9&format=png&color=000000';
        } else {
            displayImage.src = 'https://img.icons8.com/?size=100&id=bv1XgSVyIgCb&format=png&color=000000';
        }
    }


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
        } else {
          
            body.style.fontSize = '';
            button.style.fontSize = ''; 
            header.style.fontSize = ''; 
        }

        tamañoIncrementado = !tamañoIncrementado; 
    });

    const addMessage = () => {
        const message = new SpeechSynthesisUtterance("Renatoooooo vuelveeee.");
        speechSynthesis.speak(message);
      }
      
      const button = document.querySelector(".tts");
      button.addEventListener("click", () => addMessage());


    let clickCounter = 0;s

    function btnClickCount() {
        clickCounter++;
        document.getElementById("clickCount").textContent = "Numero de click: " + clickCounter;
    }

    const icono = document.querySelector(".icono");

    icono.addEventListener("click", e => {
        icono.classList.toggle("active");
        document.body.classList.toggle("");
    });
