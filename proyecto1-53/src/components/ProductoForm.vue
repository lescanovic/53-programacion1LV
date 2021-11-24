<template>

<div class="row">
        <div class="col-4">

            <div class="mb-3">
                <label class= "form-label" for="">Descripcion</label>
                 <input  v-model="descripcion" class= "form-control" type="text" placeholder="Ingrese Descripcion">
            </div>

             <div class="mb-3">
                <label class= "form-label" for="">Precio ventas</label>
                 <input  v-model="precio_ventas" class= "form-control" type="text" placeholder="Ingrese Precio">
            </div>

             <div class="mb-3">
                <label class= "form-label" for="">Precio de compras</label>
                 <input  v-model="precio_compras" class= "form-control" type="text" placeholder="Ingrese precio de compras">
            </div>
             <div class="mb-3">
                <label class= "form-label" for="">Stock</label>
                 <input  v-model="stock" class= "form-control" type="number" placeholder="Ingrese Stock">
            </div>


    </div>

</div>

    
</template>




<script>
export default {
    name: 'ProductoForm',
    data(){
        return {
            descripcion: '',
            

        }
    },
    methods:{




    }
}
</script>