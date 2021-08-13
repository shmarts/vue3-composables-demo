<script lang="ts" setup>
import useForm from '../composables/useForm'

// prepare the form
type Form = {
  name: string
}
const { useField, handle } = useForm<Form>()
const name = useField('name', { required: true })

// handle submitting the form
const responseFromServer = ref()
const submit = handle(async (form) => {
  responseFromServer.value = `Success, thank you ${form.name}!`
})
</script>

<template>
  <div>
    <form @submit="submit">
      <div class="relative flex flex-col mb-4">
        <label class="label label-text">name</label>
        <input
          v-model="name.value"
          type="text"
          placeholder="name"
          class="mb-4 border-gray-300 input input-bordered input-primary"
          :class="{ 'input-error': name.hasError }"
        />
        <label
          v-if="name.hasError"
          class="absolute -mt-5 label text-red-500 label-text-alt top-full"
        >
          {{ name.error?.message }}
        </label>
      </div>

      <button class="w-full mt-4 btn btn-primary" @click="submit">Submit</button>
    </form>
    <p v-if="responseFromServer" class="mt-6 text-sm font-bold text-center text-green-500">
      {{ responseFromServer }}
    </p>
  </div>
</template>
