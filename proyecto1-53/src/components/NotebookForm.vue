<template>
        <div class="row">
            <h4>{{titulo}}</h4>

            <div class="col-4">

            <div class="mb-3">
                <label class="for-label">Procesador</label>
                <input v-model="procesador" class="form-control" type="text">
            </div>
            <div class="mb-3">
                <label class="for-label">RAM</label>
                <input v-model="ram" class="form-control" type="text">
            </div>
            <div class="mb-3">
                <label class="for-label">Placa Madre</label>
                <input v-model="placa_madre" class="form-control" type="text">
            </div>
            <div class="mb-3">
                <label class="for-label">Almacenamiento</label>
                <input v-model="almacenamiento" class="form-control" type="text">
            </div>
            <div class="mb-3">
                <label class="for-label">Precio</label>
                <input v-model="precio" class="form-control" type="text">
            </div>

            <button v-if="estado==0" @click="guardar()" class="btn btn-primary">Guardar</button>
           <button v-if="estado==1" @click="actualizar()" class="btn btn-secondary">Actualizar</button>
         </div>
         
         <div class="col-8"> 

             <table class="table">
                <thead>
                    <tr>
                        <th>Procesador</th>
                        <th>RAM</th>
                        <th>Placa Madre</th>
                        <th>Almacenamiento</th>
                        <th>Precio</th>
                    </tr>

                </thead>
                <tbody>
                    <tr v-for="notebook of lista_componentes" v-bind:key="notebook.id">
                        <td>{{notebook.procesador}}</td>
                        <td>{{notebook.ram}}</td>
                        <td>{{notebook.placa_madre}}</td>
                        <td>{{notebook.almacenamiento}}</td>
                        <td>{{notebook.precio}}</td>

                         <td>
                            <button @click="editar(notebook)" class="btn btn-primary btn sm ms-1">Edit</button>
                            <button @click="eliminar(notebook.id)" class="btn btn-danger btn sm ms-1">X</button>
                        </td>

                    </tr>
                </tbody>
             </table>
        </div>
    </div>

</template>
<script>

import {db} from '@/utils/firebase.js'
import {addDoc,collection, deleteDoc, onSnapshot,doc,updateDoc} from 'firebase/firestore'
export default {
    name : 'NotebookForm',
    data () {
        return{
             titulo: 'Formulario Notebook',
             procesador: '',
             ram: '',
             placa_madre: '',
             almacenamiento: '',
             precio:'',
             lista_componentes: [],
             id:null,
             estado:0,
        }
    },


    methods:{
        



        guardar (){
            const datos_enviados = {
                procesador: this.procesador,
                ram: this.ram,
                placa_madre: this.placa_madre,
                almacenamiento: this.almacenamiento,
                precio: this.precio,
            }
            const coleccion = collection (db, 'notebook')
            addDoc(coleccion,datos_enviados)
            this.vaciar()



        },
        obtener_datos (){
            onSnapshot(collection(db,'notebook'), (snapshot) => {
                this.lista_componentes =[]

                snapshot.docs.map((doc) => {
                    this.lista_componentes.push( {id:doc.id, ...doc.data()})

                })

            })
        },


        eliminar(id){
            deleteDoc (doc(db, 'notebook',id))
        },


        editar (notebook){
            this.procesador = notebook.procesador;
            this.ram = notebook.ram;
            this.placa_madre = notebook.placa_madre;
            this.almacenamiento = notebook.almacenamiento;
            this.precio = notebook.precio;
            this.id = notebook.id;

            this.estado= 1;

        },
        actualizar(){
            const producto_actualizado = {
                procesador: this.procesador,
                ram: this.ram,
                placa_madre: this.placa_madre,
                almacenamiento:this.almacenamiento,
                precio: this.precio,
            }

            updateDoc (doc(db, 'notebook', this.id),producto_actualizado)
            this.vaciar()
            this.estado = 0;
            

        },
        vaciar (){
        
            this.procesador = ''
            this.ram = ''
            this.placa_madre =''
            this.almacenamiento =''
            this.precio = ''


        },

        

    },

    mounted(){
        this.obtener_datos()
    }
    
}
</script>
        