<template>
  <div>
    <h1>Task Manager</h1>
    <ItemForm />
    <ItemList :items="items"/>
  </div>
</template>
<script>
  import ItemForm from './components/ItemForm.vue'
  import ItemList from './components/ItemList.vue'

  export default{
    name: 'App',
    components: {
      ItemForm,
      ItemList,
    },
    data(){
      return{
        items: [
          { id: 1, text: 'Task 1', done: false },
          { id: 2, text: 'Task 2', done: true },
          { id: 3, text: 'Task 3', done: false },
        ]
      }
    }
  }
</script>
