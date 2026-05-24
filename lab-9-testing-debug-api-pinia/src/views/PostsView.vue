<template>
    <div>
        <h2>Каталог постів</h2>
        <input v-model="posts.query" placeholder="Пошук постів..."/>
        <span v-if="posts.isLoading">Завантаження...</span>
        <span v-else-if="posts.error">Помилка: {{ posts.error }}</span>
        <span v-else-if="posts.filteredItems.length === 0">Нічого не знайдено.</span>
        <div v-else>
            <li v-for="post in posts.filteredItems" :key="post.id">
                <p>{{ post.title }}</p>
                <router-link :to="{name: 'postDetails', params: {id: post.id}}">Деталі</router-link>
            </li>
        </div>
        <div>
            <button @click="posts.prevPage" :disabled="posts.page === 1 || posts.isLoading">Попередня сторінка</button>
            <span>Сторінка {{ posts.page }}</span>
            <button @click="posts.nextPage" :disabled="posts.isLoading">Наступна сторінка</button>
        </div>
    </div>
</template>

<script setup>
    import {ref, onMounted, computed, watch} from 'vue';
    import {usePostsStore} from '../stores/usePostsStore';

    const posts = usePostsStore();

    watch(() => posts.page, posts.fetchItems, {immediate: true});
</script>