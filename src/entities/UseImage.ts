import { inject, provide, reactive } from 'vue'

const UseImage = () => {
  const image = reactive({
    src: '',
    name: '',
    size: 0,
    ext: 'gif'
  })

  const create = (buffer: Uint8Array, name: string) => {
    const blob = new Blob([buffer], { type: 'image/gif' })
    image.src = URL.createObjectURL(blob)
    image.size = Math.floor(blob.size / 1000)
    image.name = `${name}.${image.ext}`
  }

  return {
    image,
    create
  }
}

export type ReturnTypeUseImage = ReturnType<typeof UseImage>
const USE_IMAGE = Symbol()

export const provideUseImage = (): void => {
  provide(USE_IMAGE, UseImage())
}

export const injectUseImage = (): ReturnTypeUseImage => {
  const useImage = inject<ReturnTypeUseImage>(USE_IMAGE)

  if (useImage) {
    return useImage
  } else {
    throw new Error('error inject useImage')
  }
}
