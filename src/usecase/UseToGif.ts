import { computed, inject, provide } from 'vue'
import { injectUseVideo } from '@/entities/UseVideo'
import { injectUseImage } from '@/entities/UseImage'
import { injectUseOption } from '@/entities/UseOption'
import { injectUseConvert } from '@/usecase/UseConvert'
import { injectUseDownload } from '@/usecase/UseDownload'

const UseToGif = () => {
  const useVideo = injectUseVideo()
  const useImage = injectUseImage()
  const useOption = injectUseOption()
  const userConvert = injectUseConvert()
  const useDownload = injectUseDownload()

  // 初期化
  userConvert.load()

  const invoke = async (video: File) => {
    useVideo.setFile(video)
    const buffer = await userConvert.convert(video, useOption.option)
    useImage.create(buffer, video.name)
    useDownload.download(useImage.image.src, useImage.image.name)
  }

  return {
    loading: computed(() => userConvert.loadingStatus.value === 'loading'),
    converting: computed(() => userConvert.convertStatus.value === 'converting'),
    image: useImage.image,
    video: useVideo.file,
    option: useOption.option,
    invoke
  }
}

export type ReturnTypeUseToGif = ReturnType<typeof UseToGif>
const USE_TO_GIF = Symbol()

export const provideUseToGif = (): void => {
  provide(USE_TO_GIF, UseToGif())
}

export const injectUseToGif = (): ReturnTypeUseToGif => {
  const useToGif = inject<ReturnTypeUseToGif>(USE_TO_GIF)

  if (useToGif) {
    return useToGif
  } else {
    throw new Error('error inject useToGif')
  }
}
