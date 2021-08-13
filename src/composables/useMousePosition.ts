export default () => {
  const x = ref(0)
  const y = ref(0)

  const handle = (e: MouseEvent) => {
    x.value = e.pageX
    y.value = e.pageY
  }

  window.addEventListener('mousemove', handle)
  onUnmounted(() => {
    window.removeEventListener('mousemove', handle)
  })

  return { x, y }
}
