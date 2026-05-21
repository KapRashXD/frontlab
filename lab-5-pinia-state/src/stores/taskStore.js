import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    filter: 'all',
  }),
  actions: {
    addTask(title) {
      this.tasks.push({ id: Date.now(), title, done: false })
      this.saveToStorage()
    },
    toggleTask(id) {
      const task = this.tasks.find((t) => t.id === id)
      if (task) {
        task.done = !task.done
        this.saveToStorage()
      }
    },
    removeTask(id) {
      this.tasks = this.tasks.filter((t) => t.id !== id)
      this.saveToStorage()
    },
    setFilter(filter) {
      this.filter = filter
      this.saveToStorage()
    },
    loadFromStorage() {
      const tasks = localStorage.getItem('tasks')
      if (tasks) {
        this.tasks = JSON.parse(tasks)
      }
      const filter = localStorage.getItem('filter')
      if (filter) {
        this.filter = filter
      }
    },
    saveToStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
      localStorage.setItem('filter', this.filter)
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
