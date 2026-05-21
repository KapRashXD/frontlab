import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [
      { id: 1, title: 'Завдання 1', done: false },
      { id: 2, title: 'Завдання 2', done: true },
    ],
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
  },
})
