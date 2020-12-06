import { inject, provide } from 'vue'
import { saveAs } from 'file-saver'

const UseDownload = () => {
  const download = (src: string, name = 'no_name') => {
    saveAs(src, name)
  }

  return {
    download
  }
}

export type ReturnTypUseDownload = ReturnType<typeof UseDownload>
const USE_DOWNLOAD = Symbol()

export const provideUseDownload = (): void => {
  provide(USE_DOWNLOAD, UseDownload())
}

export const injectUseDownload = (): ReturnTypUseDownload => {
  const useDownload = inject<ReturnTypUseDownload>(USE_DOWNLOAD)

  if (useDownload) {
    return useDownload
  } else {
    throw new Error('error inject useDownload')
  }
}
