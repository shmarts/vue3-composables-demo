<script lang="ts" setup>
import axios from 'axios'
import type { User } from '../types'
import UserListItem from '../components/UserListItem.vue'
import useSearch from '../composables/useSearch'

// mock api request
const request = async (q: string) => {
  const { data } = await axios.get<User[]>(
    `https://611548928f38520017a38427.mockapi.io/users?p=1&l=5&search=${q}`,
  )
  return data
}

// useSearch hook setup
const { query, results: users, clearResults } = useSearch<User>(request)

// selecting a user
const selectedUser = ref<User | undefined>()
const selectUser = (user: User) => {
  selectedUser.value = user
  query.value = ''
  clearResults()
}
</script>

<template>
  <div class="h-[400px]">
    <p v-if="!selectedUser" class="h-12 text-sm flex items-center justify-center">
      Please search for a user
    </p>
    <UserListItem v-else :user="selectedUser" />
    <input
      v-model="query"
      type="text"
      placeholder="search users"
      class="mt-3 w-full border-gray-300 input input-bordered input-primary"
    />
    <div v-if="users.length" class="mt-3 space-y-2">
      <UserListItem v-for="user in users" :key="user.id" :user="user" @click="selectUser(user)" />
    </div>
  </div>
</template>
