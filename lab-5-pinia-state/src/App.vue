<template>
  <div>
    <h1>Task Manager</h1>
    <TaskForm/>
    <TaskList />
  </div>
</template>

<script>
  import TaskList from './components/TaskList.vue'
  import TaskForm from './components/TaskForm.vue'
  
  export default{
    name: 'App',
    components: {
      TaskList,
      TaskForm
    }
  }
</script>

<style scoped></style>
