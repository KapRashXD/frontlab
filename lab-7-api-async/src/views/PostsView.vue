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
    import {ref, onMounted} from 'vue';

    const items = ref([]);
    const isLoading = ref(false);
    const error = ref(null);

    async function loadItems(){
        isLoading.value = true;
        error.value = null;
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            if(!response.ok){
                throw new Error('Помилка при завантаженні даних');
            }
            items.value = await response.json();
        }catch(err){
            error.value = err.message;
            items.value = [];
        }
        finally{
            isLoading.value = false;
        }
    }
    onMounted(() => loadItems());
</script>