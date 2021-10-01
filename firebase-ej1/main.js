//me comunico con firestore
const bd= firebase.firestore()

const vaciar =()=> {
    document.getElementById ("inp_nom").value = ''
    document.getElementById ("inp_ape").value = ''
    document.getElementById ("inp_dni").value = ''

}

const guardar_cliente= () => {

    const nom= document.getElementById ("inp_nom").value
    const ape= document.getElementById ("inp_ape").value
    const dni= document.getElementById ("inp_dni").value

    const uncliente ={
        nombre:nom,
        apellido:ape,
        dni:dni,
    }

    bd.collection('cliente').doc().set(uncliente)
    //reseteamos el formulario
    vaciar()
    listar_clientes()

}

const boton= document.getElementById("btn_guardar")
boton.addEventListener("click", guardar_cliente) 

const listar_clientes = async () => {

const lista = await bd.collection ("cliente").get ()
let lc = []
let lista_definitiva = lista.docs.map ( (doc) =>{

    lc=doc.data ()
    lc.id= doc.id
    return lc;
    })

    let bolsita_tr = []
    lista_definitiva.forEach(element => {
        let fila= 
        `

        <tr>
            <td>${element.nombre}</td>
            <td>${element.apellido}</td>
            <td>${element.dni}</td>

            <td>
                <button onclick="eliminar_cliente('${element.id}')" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></button>
                <button onclick= "llenar_formulario('${element.nombre}','${element.apellido}',${element.dni},'${element.id}')" class="btn btn-primary btn-sm"><i class="fa fa-edit"></i></button>
            </td>

        <tr>    
        `
        bolsita_tr.push(fila)
    });

    //elimino las comillas
    document.getElementById("tbody").innerHTML = bolsita_tr.join('')
}

listar_clientes(); 

function eliminar_cliente (id)
{
bd.collection("cliente").doc(id).delete()
listar_clientes()
}

function llenar_formulario (nom,ape,dni,id)
{
//lleno los inp
    document.getElementById("inp_nom").value = nom;
    document.getElementById("inp_ape").value = ape;
    document.getElementById("inp_dni").value = dni; 
    document.getElementById("inp_id").value = id;

    document.getElementById ("btn_guardar").style.display = 'none';
    document.getElementById ("btn_actualizar"). style.display = 'block';


}

function actualizar_cliente()
{
//recojo el valor del inp
const nom = document.getElementById("inp_nom").value
const ape = document.getElementById("inp_ape").value
const dni = document.getElementById("inp_dni").value
const id = document.getElementById("inp_id").value

const clienteActualizado = {
     nombre: nom,
     apellido: ape,
     dni: dni,
}
bd.collection ("cliente").doc (id).update(clienteActualizado)

listar_clientes()
vaciar ()
document.getElementById ("btn_guardar").style.display = 'block'   
document.getElementById ("btn_actualizar"). style.display = 'none' 

}