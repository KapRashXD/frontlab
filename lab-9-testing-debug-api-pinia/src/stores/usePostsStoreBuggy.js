import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    items: [],
    isLoading: false,
    error: null,
    page: 1,
    limit: 10,
    query: '',
    hasNextPage: true,
  }),
  getters: {
    filteredItems() {
      if (!this.query.trim()) return this.items
      const query = this.query.toLowerCase()
      return this.items.filter(
        (post) =>
          post.title.toLowerCase().includes(query) || post.body.toLowerCase().includes(query),
      )
    },
  },
  actions: {
    async fetchItems() {
      this.isLoading = true
      this.error = null

      const url = `https://jsonplaceholder.typicode.com/posts?_page=${this.page}&_limit=${this.limit}`
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error('Failed to fetch posts')
        const data = await response.json()
        this.items = data
        this.hasNextPage = data.length === this.limit
      } catch (error) {
        if (error.name === 'AbortError') return
        this.error = error.message
        this.items = []
      } finally {
        this.isLoading = false
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page--
      }
    },
    nextPage() {
      if (this.hasNextPage) {
        this.page++
      }
    },
  },
})
