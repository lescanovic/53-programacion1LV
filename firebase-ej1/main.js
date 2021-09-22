//me comunico con firestore
const bd= firebase.firestore()


const guardar_cliente= () => {

    const uncliente ={
        nombre:'juan',
        apellido:'perez',
        dni:37589632
    }

    bd.collection('cliente').doc().set(uncliente)


}


const boton= document.getElementById("btn_guardar")
boton.addEventListener("click", guardar_cliente)