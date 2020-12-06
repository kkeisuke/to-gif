import { inject, provide, ref } from 'vue'

const UseVideo = () => {
  const file = ref<File | null>(null)

  const setFile = (video: File) => {
    file.value = video
  }

  return {
    file,
    setFile
  }
}

export type ReturnTypeUseVideo = ReturnType<typeof UseVideo>
const USE_VIDEO = Symbol()

export const provideUseVideo = (): void => {
  provide(USE_VIDEO, UseVideo())
}

export const injectUseVideo = (): ReturnTypeUseVideo => {
  const useVideo = inject<ReturnTypeUseVideo>(USE_VIDEO)

  if (useVideo) {
    return useVideo
  } else {
    throw new Error('error inject useVideo')
  }
}
