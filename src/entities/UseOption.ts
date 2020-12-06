import { inject, provide, reactive } from 'vue'
export type ConvertOption = { fps: number }

const UseOption = () => {
  const MAX_FPS = 240
  const MIN_FPS = 1

  const option = reactive<ConvertOption>({
    fps: 60
  })

  return {
    MAX_FPS,
    MIN_FPS,
    option
  }
}

export type ReturnTypeUseOption = ReturnType<typeof UseOption>
const USE_OPTION = Symbol()

export const provideUseOption = (): void => {
  provide(USE_OPTION, UseOption())
}

export const injectUseOption = (): ReturnTypeUseOption => {
  const useOption = inject<ReturnTypeUseOption>(USE_OPTION)

  if (useOption) {
    return useOption
  } else {
    throw new Error('error inject useOption')
  }
}
