const text_preffix = "https://picsum.photos/id/";
const text_suffix = "/200/200";
//con estas constantes ponemos las imagenes para que se generen y el tamaño de las imagenes.
let num;

document.getElementById("mostrar").addEventListener("click", mostrar_filas);
//Con esta function limpiamos al seleccionar otra opcion.
function clear_data() {
    document.getElementById("aux").innerHTML = null;
}
//Con esta funcion lo que hacemos es seleccionar las filas de las imagenes y generalas dependiendo de la cantidad seleccionada.
function mostrar_filas() {
    clear_data();
    num = parseInt(document.getElementById("selector").value);
    if(num <= 0) {
        return;
    }
    let new_div, new_img, aux;
    let k = 0;
    aux = document.getElementById("aux");
//Con este bucle for creamos el numero de filas.
    for(let i = 0; i < num; i++) {
        new_div = document.createElement("div");
        new_div.classList.add("row");
//Con este seleccionamos que solo salgan 3 imagenes por fila.
        for(let j = 0; j < 3; j++) {
            new_img = document.createElement("img");
            new_img.classList.add("rounded", "mx-auto", "d-block", "col");
//Uso el lazy para que se cargen de manera diferida las imagenes.            
            new_img.loading = "lazy";
            new_img.style.borderRadius = "8px"
//Con la constante cacheBuster para que se guarden las imagenes en el cache del navegador.
            const cacheBuster = `?cb=${Date.now()}`;
            new_img.src = `${text_preffix}${k}${text_suffix}${cacheBuster}`;

            new_div.appendChild(new_img);
            k++;
        }
        aux.appendChild(new_div);
    }
}