<template>
    <div class="row">
        <h4>{{titulo}}</h4>
        <div class="col-4">

            <div class="mb-3">
                <label class="for-label">Nombre y Apellido</label>
               <input v-model= "nombre_apellido" class="form-control" type="text"> 
               
               </div>

            <div class="mb-3">

            <label for="form-label">Curso</label>
            <input v-model= "curso" class="form-control" type="text">

            </div>
        
            <button  v-if="estado==0" @click="guardar_alumno ()" class="btn btn-secondary">Guardar</button>
            <button v-if="estado==1" @click="actualizar_alumno()" class="btn btn-primary">Actualizar</button>

             </div>

        <div class="col-8">
            <table class="table">
                <thead>
                    <tr>
                        <th>Nombre y apellido</th>
                        <th> Curso</th>
                        <th>Accion</th>
                    </tr>

                </thead>
                <tbody>
                    <tr v-for="alumno of lista_alumnos" v-bind:key="alumno.id">
                        <td>{{alumno.nombre_apellido}}</td>
                        <td>{{alumno.curso}}</td>
                        <td>
                            <button @click="eliminar_alumno(alumno.id)" class="btn btn-danger btn-sm">X</button>
                            <button @click="editar_alumno(alumno)" class="btn btn-primary btn-sm">edit</button>
                        </td>

                    </tr>

                </tbody>
            </table>

        </div>

    </div>

</template>

<script>
//importa la base de datos
import { db } from '@/utils/firebase.js'
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc} from 'firebase/firestore'

export default {
    name:'AlumnoForm',
    data ()
    {
    return {
        titulo:'formulario alumno',
        nombre_apellido: '',
        curso: '',
        lista_alumnos: [],
        id:null,
        estado:0


        }
    },
    methods: {
        guardar_alumno ()
        {
            const datos_a_enviar = {

                nombre_apellido: this.nombre_apellido,
                curso: this.curso
            }
            //nos conectamos con la coleccion
            const coleccion = collection (db, 'alumnos')
            addDoc(coleccion,datos_a_enviar)
            this.vaciar ()
        },
        obtener_alumno ()
        {
            onSnapshot (collection (db, 'alumnos')  ,(snapshot) => {
                this.lista_alumnos = []
                snapshot.docs.map ((doc) => {
                    this.lista_alumnos.push( {id:doc.id, ...doc.data()})

                })
            })
        },
        eliminar_alumno (id) 
        {
            deleteDoc (doc(db,'alumnos', id))

        },
        editar_alumno (alumno) {
            //lleno los input con los datos ingresados
            this.curso = alumno.curso
            this.nombre_apellido = alumno.nombre_apellido

            this.id = alumno.id
            this.estado = 1;
        },
        actualizar_alumno (){
            const datosModificados = {
                nombre_apellido:this.nombre_apellido,
                curso:this.curso 
            }
            updateDoc(doc(db, 'alumnos',this.id), datosModificados)
            this.vaciar ()

            this.estado = 0;

            
        },

        vaciar() 
        {
            this.curso = ''
            this.nombre_apellido = ''
        },
    },
    mounted (){
        this.obtener_alumno()
    }
}
</script>