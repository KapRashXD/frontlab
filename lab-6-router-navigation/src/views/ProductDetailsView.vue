<template>
    <div>
        <h2>Product Details</h2>
        <div v-if="product">
            <p>Product ID: {{ product.id }}</p>
            <p>Product Title: {{ product.title }}</p>
        </div>
        <div v-else>
            <p>Product not found.</p>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'ProductDetailsView',
        data(){
            return {
                products: [
                    { id: 1, title: 'Product 1' },
                    { id: 2, title: 'Product 2' },
                    { id: 3, title: 'Product 3' },
                    { id: 4, title: 'Product 4' },
                    { id: 5, title: 'Product 5' }
                ]
            }
        },
        computed:{
            product(){
                const id = this.$route.params.id;
                return this.products.find(p => p.id === parseInt(id));
            }
        }
    }
</script>