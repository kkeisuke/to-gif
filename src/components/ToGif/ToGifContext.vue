<template>
  <slot />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { provideUseVideo } from '@/entities/UseVideo'
import { provideUseImage } from '@/entities/UseImage'
import { provideUseOption } from '@/entities/UseOption'
import { provideUseConvert } from '@/usecase/UseConvert'
import { provideUseDownload } from '@/usecase/UseDownload'

export default defineComponent({
  setup() {
    provideUseVideo()
    provideUseImage()
    provideUseOption()
    provideUseConvert()
    provideUseDownload()

    return {}
  }
})
</script>
