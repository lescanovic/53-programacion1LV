<template>
    <div class="row">
        <div v-for= "p of lista_producto" v-bind:key="p.id" class= "col-3 me-1" >
            <div class="card">
                <img :src="p.url" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">{{p.descripcion}}</h5>
                    <p class="card-text">{{p.precio}}</p>
                    <a href="#" class="btn btn-primary">Comprar</a>
                </div>
            </div>

        </div>
        
    </div>

</template>
<script>
import {db} from '@/utils/firebase.js'
import {collection,onSnapshot} from 'firebase/firestore'
export default {
    name:'Catalogo',
    data(){
        return{
             lista_producto: []
        }
      
    },
    methods: {
        obtener(){
            onSnapshot(collection(db,'catalogo'), (snapshot) => {
                this.lista_producto=[]

                snapshot.docs.map((doc) => {
                    this.lista_producto.push( {id:doc.id, ...doc.data()})

                })

            })
            
        },

    },
     mounted(){
         this.obtener()

     }  
}

</script>