<template>
    <div style="max-width: 700px; margin: 0 auto;">
        <h2>Каталог постів</h2>
        <span v-if="isLoading">Завантаження...</span>
        <span v-else-if="error">Помилка: {{ error }}</span>
        <span v-else-if="items.length === 0">Пости не знайдено.</span>
        <span v-else>
            
        </span>
    </div>
</template>

<script setup>
    import {ref} from 'vue';

    const items = ref([]);
    const isLoading = ref(false);
    const error = ref(null);
</script>