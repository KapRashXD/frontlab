<template>
    <div>
        <button @click="$router.go(-1)">Назад</button>
        <span v-if="isLoading">Завантаження...</span>
        <span v-else-if="error">Помилка: {{ error }}</span>
        <span v-else-if="!item">Пост не знайдено.</span>
        <div v-else>
            <h2>{{ item.title }}</h2>
            <p>{{ item.body }}</p>
        </div>
    </div>
</template>

<script setup>
    import {ref, onMounted, watch} from 'vue';
    import {useRoute} from 'vue-router';

    const route = useRoute();
    const item = ref(null);
    const isLoading = ref(false);
    const error = ref(null);

    async function loadPost(){
        isLoading.value = true;
        error.value = null;
        try{
            const id = route.params.id;
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
            if(!response.ok){
                throw new Error('Помилка при завантаженні даних');
            }
            item.value = await response.json();
        }catch(err){
            error.value = err.message;
            item.value = null;
        }
        finally{
            isLoading.value = false;
        }
    }
    onMounted(loadPost);
    watch(() => route.params.id, loadPost);
</script>