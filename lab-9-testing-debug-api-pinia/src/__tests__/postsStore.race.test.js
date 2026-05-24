import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePostsStore } from '../stores/usePostsStoreBuggy'

beforeEach(() => {
  setActivePinia(createPinia())
  vi.restoreAllMocks()
})

describe('buggy usePostsStore race condition', () => {
  it('race condition check', async () => {
    const store = usePostsStore()

    let resolveRequest1
    let resolveRequest2

    let callCount = 0
    vi.spyOn(globalThis, 'fetch').mockImplementation((_url, options) => {
      callCount++

      if (callCount === 1) {
        return new Promise((response, reject) => {
          resolveRequest1 = () =>
            response({
              ok: true,
              json: async () => [{ id: 1, title: 'Page 1 (old)', body: '' }],
            })
          options?.signal?.addEventListener('abort', () => {
            reject(new DOMException('Aborted', 'AbortError'))
          })
        })
      }

      return new Promise((response) => {
        resolveRequest2 = () =>
          response({
            ok: true,
            json: async () => [{ id: 2, title: 'Page 2 (current)', body: '' }],
          })
      })
    })

    store.page = 1
    const slowFetch = store.fetchItems()

    store.page = 2
    const fastFetch = store.fetchItems()

    resolveRequest2()
    await fastFetch

    expect(store.items[0].title).toBe('Page 2 (current)')

    resolveRequest1()
    await slowFetch.catch(() => {})

    expect(store.items[0].title).toBe('Page 2 (current)')
    expect(store.error).toBe(null)
  })
})
