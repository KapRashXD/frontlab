<template>
    <div>
        <h2>Catalog</h2>
        <ul>
            <li v-for="product in products" :key="product.id">
                <router-link :to="{ name: 'productDetails', params: { id: product.id } }">
                    {{ product.title }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'CatalogView',
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
        }
    }
</script>