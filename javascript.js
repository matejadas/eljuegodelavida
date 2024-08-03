// Inicialización
window.addEventListener("DOMContentLoaded", () =>{
    let numGeneracion = 0;
    let rejilla = [];
    const anchoRejilla = 5;
    const anchoCelda = 160;
    const altoCelda = 160;
    let colorMuerta = "black";
    let colorViva = "whitesmoke";

    // FUNCIONES
    //#region Generación inicial

    function ObtenerEstadoAleatorio(){
        let ret = "";

        let estados = [false, true];

        ret = estados[Math.floor(Math.random() * 2)];

        return ret;
    }

    function GenerarCuadrado(ctx, posx, posy, ancho, alto, estado){
        let color = estado ? colorViva : colorMuerta;

        ctx.beginPath();
        ctx.rect(posx, posy, ancho, alto);
        ctx.fillStyle = color;
        ctx.fill();
    }

    function ObtenerHora(){
        let fecha = new Date();
        let hora = fecha.toLocaleTimeString();

        return hora + " ";
    }

    function LimpiarRegistro(){
        let registro = document.getElementById("registro");

        registro.innerHTML = "";
    }

    function EscribirEnRegistro(texto){
        let registro = document.getElementById("registro");
        let linea = ObtenerHora() + texto + "\n";

        registro.innerHTML += linea + "<br>";
    }

    function EscribirGeneracion(){
        let spanGeneracion = document.getElementById("numGeneracion");
        
        spanGeneracion.innerHTML = numGeneracion;
    }

    function GenerarRejilla(anchoRejilla, ancho, alto){
        LimpiarRegistro();
        EscribirEnRegistro("Generando rejilla...")
        // Se considerará una rejilla cuadrada

        EscribirGeneracion();
        
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");

        // Posición x de inicio de los cuadrados
        let posx = 0;

        // Posición y de inicio de los cuadrados
        let posy = 0;

        // Generamos los cuadrados
        for(let i = 0; i < anchoRejilla; i++){
            let columna = [];

            for(let j = 0; j < anchoRejilla; j++){
                //EscribirEnRegistro("Generando casilla " + i + ", " + j);  // Esto ralentiza notablemente la generación, sólo para pruebas
                let estado = ObtenerEstadoAleatorio();

                GenerarCuadrado(ctx, posx, posy, ancho, alto,estado);
                columna.push(estado);
                posy += alto;
            }
            rejilla.push(columna);
            posx += ancho;
            posy = 0;
        }        
    }
    //#endregion Generación inicial

    //#region Evaluar y guardar estado
    function EvaluarEstadoDeCelula(){
        
    }
    //#endregion Evaluar y guardar estado

    //ACCIONES
    //GenerarCuadrado(0, 0, 20, 20);

    //EVENTOS
    document.addEventListener("click", ev => {
        if(ev.target.matches("#rejilla")){
            numGeneracion = 0;
            GenerarRejilla(anchoRejilla, anchoCelda, altoCelda);
        }
    });
});