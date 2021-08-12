import { Ref } from 'vue'
import _debounce from 'lodash/debounce'

type Req<T> = (query: string) => Promise<T[]>

export default <T>(req: Req<T>) => {
  const query = ref('')
  const results = ref([]) as Ref<T[]>

  // clear results array
  const clearResults = () => {
    results.value = []
  }

  // search function to that gets triggered on query change
  const search = _debounce(async () => {
    if (!query.value) return clearResults()
    results.value = await req(query.value)
  }, 250)

  watch(query, search)

  return {
    query,
    results,
    clearResults,
  }
}
