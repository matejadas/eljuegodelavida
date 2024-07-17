// Inicialización
window.addEventListener("DOMContentLoaded", () =>{
    console.log("cargado");

    // FUNCIONES
    function GenerarCuadrado(posx, posy, alto, ancho, color){
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.rect(posx, posy, alto, ancho);
        ctx.fillStyle = color;
        ctx.fill();
    }

    function ObtenerColor(){
        let ret = "";
        let colores = ["red", "green"];

        ret = colores[Math.floor(Math.random()*2)];

        return ret;
    }

    // TO_DO function GenerarArray()

    function GenerarRejilla(ancho, alto){
        // Declaramos el array vacío
        let arrayAncho = []

        // Posición x de inicio de los cuadrados
        let posx = 0;

        // Rellenamos con 40 elementos, que serán números enteros
        for(let i = 0; i < 40; i++){
            arrayAncho.push(i);
        }

        console.log(arrayAncho);

        // Generamos los cuadrados
        for(let i = arrayAncho[0]; i < arrayAncho.length; i++){
            GenerarCuadrado(posx, 0, ancho, alto, ObtenerColor())
            posx += ancho;
        }
    }

    //ACCIONES
    //GenerarCuadrado(0, 0, 20, 20);

    //EVENTOS
    document.addEventListener("click", ev => {
        if(ev.target.matches("#nueva")){
            //GenerarCuadrado(0, 0, 20, 20, ObtenerColor());
            GenerarRejilla(20, 20);
        }
    });
});