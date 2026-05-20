<script setup lang="ts"></script>

<template>
  <div>
    <button @click="toggleLoading">Toggle loading</button>
        <button @click="toggleError">Toggle error</button>
        <button @click="clearItems">Clear items</button>
        <button @click="addSampleItems">Add sample items</button>
  </div>
  <div v-if="isLoading">Завантаження…</div>
        <div v-else-if="hasError">Помилка завантаження</div>
        <div v-else-if="items.length === 0">Немає даних</div>
        <ul v-else>
          <li v-for="(item, index) in items" :key="index">{{ item }}</li>
        </ul>
</template>

<script>
  export default{
    data(){
      return{ 
        isLoading: false,
        hasError: false,
        items: ['Елемент 1', 'Елемент 2', 'Елемент 3']
      }
    },
    methods: {
      toggleLoading(){
        this.isLoading = !this.isLoading;
        if(this.isLoading){
          this.hasError = false;
        }
      },
      toggleError(){
        this.hasError = !this.hasError;
        if(this.hasError){
          this.isLoading = false;
        }
      },
      clearItems(){
        this.items = [];
      },
      addSampleItems(){
        this.items = ['Елемент 1', 'Елемент 2', 'Елемент 3'];
      }
    }
  }
</script>

<style scoped>

</style>
