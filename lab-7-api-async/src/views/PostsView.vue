<template>
    <div>
        <h2>Каталог постів</h2>
        <input v-model="query" placeholder="Пошук постів..."/>
        <span v-if="isLoading">Завантаження...</span>
        <span v-else-if="error">Помилка: {{ error }}</span>
        <span v-else-if="filteredItems.length === 0">Нічого не знайдено.</span>
        <div v-else>
            <li v-for="post in filteredItems" :key="post.id">
                <p>{{ post.title }}</p>
                <router-link :to="{name: 'postDetails', params: {id: post.id}}">Деталі</router-link>
            </li>
        </div>
    </div>
</template>

<script setup>
    import {ref, onMounted, computed} from 'vue';

    const items = ref([]);
    const isLoading = ref(false);
    const error = ref(null);
    const query = ref('');

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

    const filteredItems = computed(() => {
        if(!query.value.trim()){
            return items.value;
        }
        const queryLower = query.value.toLowerCase();
        return items.value.filter(
            item => 
                item.title.toLowerCase().includes(queryLower) ||
                item.body.toLowerCase().includes(queryLower)
        );
    })
    onMounted(() => loadItems());
</script>