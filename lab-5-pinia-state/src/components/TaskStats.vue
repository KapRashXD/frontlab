<template>
    <div>
        Всього завдань: {{ taskStore.totalCount }},
        Виконано: {{ taskStore.doneCount }},
        Невиконано: {{ taskStore.activeCount }}
        <div>
            <label><input type="radio" value="all" v-model="taskStore.filter" /> Усі</label>
            <label><input type="radio" value="active" v-model="taskStore.filter" /> Активні</label>
            <label><input type="radio" value="done" v-model="taskStore.filter" /> Виконані</label>
        </div>
    </div>
</template>

<script>
import { useTaskStore } from '../stores/taskStore'

export default {
  setup() {
    const taskStore = useTaskStore()

    return {
      taskStore
    }
  }
}
</script>
