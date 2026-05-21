<template>
    <ul>
        <li v-for="task in taskStore.filteredTasks" :key="task.id">
            {{task.title}} <span v-if="task.done">(завершено)</span>
            <button @click="taskStore.toggleTask(task.id)">Перемкнути статус</button>
            <button @click="taskStore.removeTask(task.id)">Видалити</button>
        </li>
    </ul>
</template>

<script>
    import { useTaskStore } from '../stores/taskStore'
    export default{
        name: 'TaskList',
        setup(){
            const taskStore = useTaskStore();
            return { taskStore }
        }
    }
</script>