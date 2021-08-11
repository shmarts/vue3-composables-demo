<script lang="ts" setup>
import { useForm } from '../composables/useForm'

type Form = {
  email: string
}

const { useField, handle } = useForm<Form>()

const email = useField('email', { required: true, min: 10 })

const responseFromServer = ref()

const submit = handle(async ({ email }) => {
  responseFromServer.value = `Success,thank you ${email}!`
})

defineExpose({
  email,
  submit,
  responseFromServer,
})
</script>

<template>
  <div>
    <form @submit="submit">
      <div class="relative form-control">
        <label class="label">
          <span class="label-text">Email</span>
        </label>
        <input
          v-model="email.value"
          type="text"
          placeholder="email"
          class="mb-4 border-gray-300 input input-bordered input-primary"
          :class="{ 'input-error': email.hasError }"
        />
        <label v-if="email.hasError" class="absolute -mt-5 label top-full">
          <span class="text-red-500 label-text-alt">{{ email.error?.message }}</span>
        </label>
      </div>
      <button class="w-full mt-4 btn btn-primary" @click="submit">Submit</button>
    </form>
    <p v-if="responseFromServer" class="mt-6 text-sm font-bold text-center text-green-500">{{ responseFromServer }}</p>
  </div>
</template>
