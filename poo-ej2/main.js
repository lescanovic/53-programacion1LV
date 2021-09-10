import Area from "./area.js"

const  mostrar = () =>{
    const basesup = document.getElementById("inp_a").value
    const basein = document.getElementById("inp_b").value
    const ha  = document.getElementById("inp_c").value

    const instancia = new Area() 

    instancia.bs = basesup
    instancia.bi = basein
    instancia.h  = ha

    const respuesta = instancia.calcularAreaTrap()
    document.getElementById ("resultado").textContent =respuesta
    


}


const boton = document.getElementById ("btn_calcular")
boton.addEventListener ("click",mostrar)