// Inicialización
window.addEventListener("DOMContentLoaded", () =>{
    let numGeneracion = 0;
    let rejilla2d = []; // Array bidimensional
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
            rejilla2d.push(columna);
            posx += ancho;
            posy = 0;
        }

        console.log("Rejilla generada: ");
        console.table(rejilla2d);
    }
    //#endregion Generación inicial

    //#region Evaluar y guardar estado
    function EvaluarCelulaVecina(rejilla2d){
        let ret = false;

        try{
            ret = rejilla2d;
        } catch (err){
            console.log(err);
        }
        
        return ret;
    }

    function EvaluarEstadoDeCelulas(anchoRejilla){
        // Células alrededor
        let vivas = 0;
        let muertas = 0;
        let estados2d = [];

        for(let i = 0; i < anchoRejilla; i++){
            let columnaEstados = [anchoRejilla];

            for(let j = 0; j < anchoRejilla; j++){
                // Evaluamos las celdas vecinas
                try{
                    if(EvaluarCelulaVecina(rejilla2d[i-1][j-1])) vivas++;
                    else muertas++;
                } catch(err){
                    muertas++;
                }

                try{
                    if(EvaluarCelulaVecina(rejilla2d[i-1][j])) vivas++;
                    else muertas++;
                } catch (err) {
                    muertas++;
                }

                try{
                    if(EvaluarCelulaVecina(rejilla2d[i-1][j+1])) vivas++;
                    else muertas++;
                } catch (err){
                    muertas++;
                }
                try{
                    if(EvaluarCelulaVecina(rejilla2d[i][j-1])) vivas++;
                    else muertas++;
                } catch (err){
                    muertas++;
                }
                try{
                    if(EvaluarCelulaVecina(rejilla2d[i][j+1])) vivas++;
                    else muertas++;

                } catch (err){
                    muertas++;
                }
                try{
                    if(EvaluarCelulaVecina(rejilla2d[i+1][j-1])) vivas++;
                    else muertas++;
                } catch (err){
                    muertas++;
                }
                try{
                    if(EvaluarCelulaVecina(rejilla2d[i+1][j])) vivas++;
                    else muertas++;
                } catch (err){
                    muertas++;
                }
                try{
                    if(EvaluarCelulaVecina(rejilla2d[i+1][j+1])) vivas++;
                    else muertas++;
                } catch (err){
                    muertas++;
                }

                console.log("Vivas: " + vivas);
                //console.log("Muertas: " + muertas);

                // Decidimos estado de la célula en cuestión
                if(vivas == 2 || vivas == 3) columnaEstados[j] = true;
                else columnaEstados[j] = false;

                console.log("columnaEstados[" + j + "]: " + columnaEstados[j]);

                vivas = 0;
                muertas = 0
            }

            estados2d.push(columnaEstados);
        }

        console.log("Rejilla estados: ");
        console.table(estados2d);
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

        if(ev.target.matches("#turno")){
            EvaluarEstadoDeCelulas(anchoRejilla);
        }
    });
});