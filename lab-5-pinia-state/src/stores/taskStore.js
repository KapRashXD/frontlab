import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [
      { id: 1, title: 'Завдання 1', done: false },
      { id: 2, title: 'Завдання 2', done: true },
    ],
    filter: 'all',
  }),
  actions: {
    addTask(title) {
      this.tasks.push({ id: Date.now(), title, done: false })
    },
    toggleTask(id) {
      const task = this.tasks.find((t) => t.id === id)
      if (task) {
        task.done = !task.done
      }
    },
    removeTask(id) {
      this.tasks = this.tasks.filter((t) => t.id !== id)
    },
    setFilter(filter) {
      this.filter = filter
    },
  },
  getters: {
    totalCount: (state) => state.tasks.length,
    doneCount: (state) => state.tasks.filter((t) => t.done).length,
    activeCount: (state) => state.tasks.filter((t) => !t.done).length,
    filteredTasks: (state) => {
      if (state.filter === 'done') {
        return state.tasks.filter((t) => t.done)
      }
      if (state.filter === 'active') {
        return state.tasks.filter((t) => !t.done)
      }
      if (state.filter === 'all') {
        return state.tasks
      }
      return state.tasks
    },
  },
})
