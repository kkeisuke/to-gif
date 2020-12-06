import { inject, provide, readonly, ref } from 'vue'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import type { ConvertOption } from '@/entities/UseOption'

export type LoadingStatus = 'loading' | 'fail' | 'success'
export type ConvertStatus = 'ready' | 'converting' | 'fail' | 'success'

const UseConvert = () => {
  const ffmpeg = createFFmpeg()
  const loadingStatus = ref<LoadingStatus>('loading')
  const convertStatus = ref<ConvertStatus>('ready')

  const load = async () => {
    try {
      await ffmpeg.load()
      loadingStatus.value = 'success'
    } catch (error) {
      loadingStatus.value = 'fail'
    }
  }

  const convert = async (video: File, option: ConvertOption) => {
    const src = `src_${Date.now()}`
    const output = `output_${Date.now()}.gif`
    const command = ['-i', src, '-r', String(option.fps), output]

    try {
      convertStatus.value = 'converting'

      ffmpeg.FS('writeFile', src, await fetchFile(video))
      await ffmpeg.run(...command)
      const { buffer }: { buffer: Uint8Array } = ffmpeg.FS('readFile', output)

      ffmpeg.FS('unlink', src)
      ffmpeg.FS('unlink', output)

      convertStatus.value = 'success'

      return buffer
    } catch (error) {
      convertStatus.value = 'fail'
      throw new Error(command.join(' '))
    }
  }

  load()

  return {
    loadingStatus: readonly(loadingStatus),
    convertStatus: readonly(convertStatus),
    convert
  }
}

export type ReturnTypeUseConvert = ReturnType<typeof UseConvert>
const USE_CONVERT = Symbol()

export const provideUseConvert = (): void => {
  provide(USE_CONVERT, UseConvert())
}

export const injectUseConvert = (): ReturnTypeUseConvert => {
  const useConvert = inject<ReturnTypeUseConvert>(USE_CONVERT)

  if (useConvert) {
    return useConvert
  } else {
    throw new Error('error inject useConvert')
  }
}
