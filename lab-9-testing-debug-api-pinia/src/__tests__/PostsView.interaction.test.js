import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePostsStore } from '../stores/usePostsStore'
import PostsView from '../views/PostsView.vue'

describe('PostsView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.restoreAllMocks()
  })
  it('search input triggers fetch', async () => {
    const store = usePostsStore()
    store.fetchItems = vi.fn()

    const wrapper = mount(PostsView)

    const input = wrapper.find('input[type="text"]')
    await input.setValue('test')

    expect(store.fetchItems).toHaveBeenCalled()
  })
  it('pagination click triggers fetch', async () => {
    const store = usePostsStore()
    store.fetchItems = vi.fn()

    const wrapper = mount(PostsView)

    const nextButton = wrapper.find('button.nextPageBtn')
    await nextButton.trigger('click')
  })
  it('store uses page/limit in request', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    })
    const store = usePostsStore()
    store.page = 2
    store.limit = 5

    await store.fetchItems()

    expect(global.fetch).toHaveBeenCalledTimes(1)
    const url = global.fetch.mock.calls[0][0]
    expect(url).toContain('_page=2')
    expect(url).toContain('_limit=5')
  })
  it('typing in search updates store.query', async () => {
    const store = usePostsStore()
    const wrapper = mount(PostsView)

    const input = wrapper.find('input[type="text"]')
    await input.setValue('search query')

    expect(store.query).toBe('search query')
  })
})
