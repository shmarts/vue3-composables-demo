import type { ComputedRef, WritableComputedRef } from 'vue'
import type { RuleItem, ValidateError } from 'async-validator'
import Validator from 'async-validator'

export type FieldRules = RuleItem

export type FieldValues<Fields> = {
  [K in keyof Fields]: Fields[K]
}

export interface Field<T> {
  errors: ComputedRef<ValidateError[]>
  error: ComputedRef<ValidateError | null>
  hasError: ComputedRef<boolean>
  value: WritableComputedRef<T>
}

export function useForm<Fields>() {
  // helper types
  type Keys = keyof Fields
  type FieldStore = { [K in Keys]: Fields[K] }
  type ErrorStore = { [K in Keys]: ValidateError[] }

  // store current values and errors
  const fields = ref<Partial<FieldStore>>({})
  const errors = ref<Partial<ErrorStore>>({})

  // store Field validators config
  const validators = ref<{ [K in Keys]?: RuleItem }>({})
  let validator = new Validator({})

  // re-create the Validator when the config changes
  watch(
    validators,
    (config) => {
      validator = new Validator(config)
    },
    { deep: true },
  )

  // validates all of the relevant fields
  const validate = async () =>
    new Promise((resolve) => {
      validator.validate(fields.value, undefined, (errs) => {
        if (errs === null) return resolve(true)

        for (let i = 0; i < errs.length; i++) {
          const { field } = errs[i]
          if (!field) continue
          errors.value[field].push(errs[i])
        }

        resolve(false)
      })
    })

  // returns the refs related to a specific Field
  const useField = <K extends Keys>(name: K, fieldOptions: FieldRules = {}) => {
    if (!errors.value[name]) {
      errors.value[name] = []
    }

    // append the Validator config
    validators.value[name] = fieldOptions

    // assign a default value
    if (!fields.value[name]) {
      fields.value[name] = ''
    }

    // computed property for getting and setting the value of the field
    const value = computed<Fields[K]>({
      get() {
        return fields.value[name]
      },
      set(val) {
        fields.value[name] = val
      },
    })

    // computed property for fetching the current error(s)
    const fieldErrors = computed<ValidateError[]>(() => errors.value[name] ?? [])
    const fieldError = computed(() => {
      return fieldErrors.value.length > 0 ? fieldErrors.value[0] : null
    })
    const fieldHasError = computed(() => fieldError.value !== null)

    return reactive<Field<Fields[K]>>({
      errors: fieldErrors,
      error: fieldError,
      hasError: fieldHasError,
      value,
    })
  }

  // clears all errors
  const clearErrors = () => {
    const keys = Object.keys(errors.value)

    for (let i = 0; i < keys.length; i++) {
      errors.value[keys[i]] = []
    }
  }

  // form submission
  const handle = (run: (values: FieldValues<Fields>) => Promise<void>) => async (e?: Event) => {
    if (e) e.preventDefault()

    clearErrors()

    const valid = await validate()

    if (valid) {
      await run(fields.value as FieldValues<Fields>)
    }
  }

  return {
    useField,
    handle,
  }
}
