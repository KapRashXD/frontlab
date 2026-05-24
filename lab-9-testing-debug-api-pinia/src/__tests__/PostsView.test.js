import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { usePostsStore } from '../stores/usePostsStore'
import PostsView from '../views/PostsView.vue'

function mountWithStore() {
  const pinia = createTestingPinia({
    createSpy: vi.fn,
    stubActions: false,
  })

  const wrapper = mount(PostsView, {
    global: {
      plugins: [pinia],
      stubs: {
        RouterLink: true,
      },
    },
  })

  const store = usePostsStore()
  return { wrapper, store }
}

describe('PostsView', () => {
  it('displays loading state', () => {
    const { store } = mountWithStore()
    store.isLoading = true

    const wrapper = mount(PostsView)
    expect(wrapper.text()).toContain('Завантаження...')
  })
  it('displays error message', async () => {
    const { store, wrapper } = mountWithStore()

    store.isLoading = false
    store.error = 'Помилка при завантаженні'

    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Помилка: Помилка при завантаженні')
  })
  it('displays item list if items are present', async () => {
    const { store, wrapper } = mountWithStore()

    store.items = [{ id: 1, title: 'Test Post 1', body: 'This is a test post.' }]
    store.isLoading = false

    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Test Post 1')
  })
  it('displays "Немає даних" if no items are present, no error and no loading', async () => {
    const { store, wrapper } = mountWithStore()

    store.items = []
    store.error = null
    store.isLoading = false

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Нічого не знайдено.')
  })
})
