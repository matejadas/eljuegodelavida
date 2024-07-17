// Inicialización
window.addEventListener("DOMContentLoaded", () =>{
    console.log("cargado");

    // FUNCIONES
    function GenerarCuadrado(ctx, posx, posy, alto, ancho, color){
        ctx.beginPath();
        ctx.rect(posx, posy, ancho, alto);
        ctx.fillStyle = color;
        ctx.fill();
    }

    function ObtenerColor(){
        let ret = "";
        let colores = ["red", "green"];

        ret = colores[Math.floor(Math.random() * 2)];

        return ret;
    }

    function GenerarRejilla(anchoRejilla, ancho, alto){
        // Se considerará una rejilla cuadrada
        
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");

        // Posición x de inicio de los cuadrados
        let posx = 0;

        // Posición y de inicio de los cuadrados
        let posy = 0;

        // Generamos los cuadrados
        for(let i = 0; i < anchoRejilla; i++){
            for(let j = 0; j < anchoRejilla; j++){
                GenerarCuadrado(ctx, posx, posy, ancho, alto, ObtenerColor())
                posy += alto;
            }
            posx += ancho;
            posy = 0;
        }
    }

    //ACCIONES
    //GenerarCuadrado(0, 0, 20, 20);

    //EVENTOS
    document.addEventListener("click", ev => {
        if(ev.target.matches("#nueva")){
            GenerarRejilla(40, 20, 20);
        }
    });
});