<template>
    <div>
        <h2>404 - Сторінку не знайдено</h2>
        <router-link to="/">На головну</router-link>
        <button @click="goBack">Назад</button>
    </div>
</template>

<script>
    export default {
        name: 'NotFoundView',
        methods: {
            goBack() {
                this.$router.go(-1);
            }
        }
    }
</script>