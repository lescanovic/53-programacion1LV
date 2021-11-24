<template>
    <div class="row">
        <h4>{{titulo}}</h4>
         <div class="col-4">

            <div class="mb-3">
                <label class="for-label">Descripcion</label>
                <input v-model="descripcion" class="form-control" type="text">
            </div>
            <div class="mb-3">
                <label class="for-label">Precio</label>
                <input v-model="precio" class="form-control" type="number">
            </div>
            <div class="mb-3">
                <label class="for-label">Porcentaje de descuento</label>
                <input v-model="descuento" class="form-control" type="number">
            </div>
            <div class="mb-3">
                <label class="for-label">Categoria</label>
                <input v-model="categoria" class="form-control" type="text">
            </div>
            <div class="mb-3">
                <label class="for-label">Stock</label>
                <input v-model="stock" class="form-control" type="number">
            </div>
        
            <select v-model="estado" class="form-select btn-sm" aria-label="Default select example">
                <option selected>Estado</option>
                <option value="Inactivo">Inactivo</option>
                <option value="Activo">Activo</option>
            </select>

            <div class="mb-3">
                <input id="inp_imagen"  class="form-file btn-sm" type="file">
            </div>

            <button v-if="Estado==0" @click="guardar()" class="btn btn-primary">Guardar</button>
            <button  v-if="Estado==1" @click="actualizar()" class="btn btn-secondary">Actualizar</button>

        </div>
        <div class="col-8"> 

             <table class="table">
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Descripcion</th>
                        <th>Precio</th>
                        <th>%Descuento</th>
                        <th>Categoria</th>
                        <th>Stock</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="catalogo of lista_producto" v-bind:key="catalogo.id">
                          <td>
                            <img style="width:6rem" :src="catalogo.url" alt="">
                        </td>
                        <td>{{catalogo.descripcion}}</td>
                        <td>{{catalogo.precio}}</td>
                        <td>{{catalogo.descuento}}</td>
                        <td>{{catalogo.categoria}}</td>
                        <td>{{catalogo.stock}}</td>
                        <td>{{catalogo.estado}}</td>

                        <td>
                            <button @click="editar(catalogo)" class="btn btn-primary btn-sm">Editar</button>
                            <button @click="eliminar(catalogo.id)" class="btn btn-danger btn-sm">X</button>
                        </td>
                    </tr>
                </tbody>
            </table>
    </div>

    </div>
</template>
<script>
import {db,storage} from '@/utils/firebase.js'
import {addDoc,collection,deleteDoc,onSnapshot,doc,updateDoc} from 'firebase/firestore'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
export default {
    name: 'CatalogoAdminForm',

    data() {
        return  {
        titulo: 'Catalogo Admin',
        descripcion: '',
        precio:'',
        descuento:'',
        categoria:'',
        stock: '',
        estado: 'activo',
        lista_producto: [],
        id:null,
        Estado:0,
        url: null
        }
    },

    methods:{
        async subir_imagen () 
        {
            const file = document.getElementById("inp_imagen").files[0]
            
            const referencia = ref(storage, '/catalogo'+file.name)
          
            await uploadBytes (referencia, file).then( () =>{
                alert ('operacion exitosa!')
        })
        this.url = await getDownloadURL(referencia)

        },

         async guardar(){

             await this.subir_imagen()

            const datos_enviados = {
              descripcion: this.descripcion,
              precio: this.precio,
              descuento: this.descuento,
              categoria: this.categoria,
              stock: this.stock,
              estado: this.estado,
              url: this.url
            }
            const coleccion = collection (db,'catalogo')
            addDoc(coleccion,datos_enviados)
            this.vaciar()
        },

        obtener(){
            onSnapshot(collection(db,'catalogo'), (snapshot) => {
                this.lista_producto=[]

                snapshot.docs.map((doc) => {
                    this.lista_producto.push( {id:doc.id, ...doc.data()})

                })

            })
            
        },
        eliminar (id){
            deleteDoc (doc(db, 'catalogo',id))
        },

        editar(catalogo){
            this.descripcion = catalogo.descripcion;
            this.precio = catalogo.precio;
            this.descuento = catalogo.descuento;
            this.categoria = catalogo.categoria;
            this.stock = catalogo.stock;
            this.id = catalogo.id;

            this.Estado = 1;

        },
        actualizar(){
            const producto_actualizado = {
             descripcion: this.descripcion,
             precio: this.precio,
             descuento: this.descuento,
             categoria: this.categoria,
             stock:this.stock,
            }

            updateDoc (doc(db, 'catalogo', this.id),producto_actualizado)
            this.vaciar()
            this.Estado = 0 ;
        },

        vaciar(){
            this.descripcion = ''
            this.descuento = ''
            this.precio = ''
            this.categoria = ''
            this.stock = ''

        }


    },
    mounted(){
        this.obtener()
    }
}
</script>