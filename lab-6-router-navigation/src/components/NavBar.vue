<template>
    <nav>
        <router-link to="/" exact-active-class="active-link">Home</router-link>
        <router-link to="/about" exact-active-class="active-link">About</router-link>
        <router-link to="/catalog" exact-active-class="active-link">Catalog</router-link>
    </nav>
</template>

<style scoped>
    nav{
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
    }

    .active-link {
        font-weight: bold;
        text-decoration: underline;
    }
</style>

<script>
    export default {
        name: 'NavBar'
    }
</script>