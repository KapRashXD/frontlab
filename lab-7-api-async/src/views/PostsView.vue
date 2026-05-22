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
        <div>
            <button @click="prevPage" :disabled="currentPage === 1 || isLoading">Попередня сторінка</button>
            <span>Сторінка {{ currentPage }}</span>
            <button @click="nextPage" :disabled="isLoading">Наступна сторінка</button>
        </div>
    </div>
</template>

<script setup>
    import {ref, onMounted, computed, watch} from 'vue';

    const items = ref([]);
    const isLoading = ref(false);
    const error = ref(null);
    const query = ref('');

    const currentPage = ref(1);
    const limit = 10;
    const hasNextPage = ref(true);
    let abortController = null;

    async function loadItems(){
        if(abortController){
            abortController.abort();
        }

        isLoading.value = true;
        error.value = null;
        abortController = new AbortController();

        let url = `https://jsonplaceholder.typicode.com/posts?_page=${currentPage.value}&_limit=${limit}`;
        try{
            const response = await fetch(url, { signal: abortController.signal });
            if(!response.ok){
                throw new Error('Помилка при завантаженні даних');
            }
            const data = await response.json();
            items.value = data;
            hasNextPage.value = data.length === limit;
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

    function prevPage(){
        if(currentPage.value > 1){
            currentPage.value--;
        }
    }
    function nextPage(){
        if(hasNextPage.value){
            currentPage.value++;
        }
    }

    watch(currentPage, loadItems, { immediate: true });
</script>