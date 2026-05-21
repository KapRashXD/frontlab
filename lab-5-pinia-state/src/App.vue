<template>
  <div>
    <h1>Task Manager</h1>
    <TaskForm/>
    <TaskStats/>
    <TaskList />
  </div>
</template>

<script>
  import TaskList from './components/TaskList.vue'
  import TaskForm from './components/TaskForm.vue'
  import TaskStats from './components/TaskStats.vue';
  import { useTaskStore } from './stores/taskStore'
  import { onMounted } from 'vue'

  export default{
    name: 'App',
    components: {
      TaskStats,
      TaskList,
      TaskForm
    },
    setup(){
      const taskStore = useTaskStore();
      onMounted(() => {
        taskStore.loadFromStorage();
      })
    }
  }
</script>

<style scoped></style>
