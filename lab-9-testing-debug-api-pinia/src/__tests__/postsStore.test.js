import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePostsStore } from '../stores/usePostsStore'

describe('Posts Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.restoreAllMocks()
  })
  it('fetchItems sets isLoading to true while fetching, false after completion, sets error to null on success and items are written to the store', async () => {
    let resolveFetch
    global.fetch = vi.fn().mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve
        }),
    )

    const store = usePostsStore()

    const pending = store.fetchItems()

    expect(store.isLoading).toBe(true)

    resolveFetch({
      ok: true,
      json: async () => [{ id: 1, title: 'Test Post', body: 'This is a test post.' }],
    })

    await pending

    expect(store.isLoading).toBe(false)
    expect(store.error).toBe(null)
    expect(store.items).toHaveLength(1)
  })
  it('fetchItems sets error and clears items on fetch failure', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    })

    const store = usePostsStore()

    store.items = [{ id: 1, title: 'Test Post', body: 'This is a test post.' }]

    await store.fetchItems()

    expect(store.items).toEqual([])
    expect(store.error).toBe('Failed to fetch posts')
  })
  it('filteredItems filters items by query (case insensitive)', () => {
    const store = usePostsStore()

    store.items = [
      { id: 1, title: 'Test Post', body: 'first post' },
      { id: 2, title: 'Post 2', body: 'post2' },
    ]

    store.query = 'POST2'

    expect(store.filteredItems).toHaveLength(1)
    expect(store.filteredItems[0].id).toBe(2)
  })
})
