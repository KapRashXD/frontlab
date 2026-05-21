<template>
  <div>
    <h1>Task Manager</h1>
    <ItemForm />
    <ItemList />
  </div>
</template>
<script>
  import ItemForm from './components/ItemForm.vue'
  import ItemList from './components/ItemList.vue'

  export default{
    name: 'Task Manager',
    components: {
      ItemForm,
      ItemList,
    }
  }
</script>
