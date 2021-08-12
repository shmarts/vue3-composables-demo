import type { ComputedRef, WritableComputedRef } from 'vue'
import type { RuleItem, ValidateError } from 'async-validator'
import Validator from 'async-validator'

type FieldRules = RuleItem

type FieldValues<Fields> = {
  [K in keyof Fields]: Fields[K]
}

interface Field<T> {
  value: WritableComputedRef<T>
  error: ComputedRef<ValidateError | null>
  hasError: ComputedRef<boolean>
}

export default <Fields>() => {
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

  // returns the refs related to a specific Field
  const useField = <K extends Keys>(name: K, fieldOptions: FieldRules = {}) => {
    // set up the fields dependencies
    if (!errors.value[name]) errors.value[name] = []
    if (!fields.value[name]) fields.value[name] = ''
    validators.value[name] = fieldOptions

    // computed getter/setter for the field
    const value = computed<Fields[K]>({
      get: () => fields.value[name],
      set: (val) => (fields.value[name] = val),
    })

    // computeds for fetching the current error/s
    const fieldError = computed(() => {
      const fieldErrors = errors.value[name]
      return fieldErrors.length > 0 ? fieldErrors[0] : null
    })
    const fieldHasError = computed(() => fieldError.value !== null)

    return reactive<Field<Fields[K]>>({
      value,
      error: fieldError,
      hasError: fieldHasError,
    })
  }

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
    if (!valid) return

    await run(fields.value as FieldValues<Fields>)
  }

  return {
    useField,
    handle,
  }
}
