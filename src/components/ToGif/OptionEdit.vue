<template>
  <Toolbar>
    <template #left>
      <InputFPS />
      <Button :disabled="!image.size" icon="pi pi-download" class="p-button-rounded p-button-text p-ml-1" @click="download" />
      <div v-show="image.size" class="p-ml-3">
        <!-- id for E2E test -->
        <span id="imageName">{{ image.name }}</span>
        <span id="imageSize" class="p-ml-3">{{ Number(image.size).toLocaleString() }} KB</span>
      </div>
      <Links class="p-ml-auto" />
    </template>
  </Toolbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { injectUseToGif } from '@/usecase/UseToGif'
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'
import InputFPS from '@/components/ToGif/OptionEdit/InputFPS.vue'
import Links from '@/components/ToGif/OptionEdit/Links.vue'

export default defineComponent({
  components: {
    Toolbar,
    Button,
    InputFPS,
    Links
  },
  setup() {
    const { image, video, invoke } = injectUseToGif()

    return {
      image,
      download: () => {
        if (video.value) {
          invoke(video.value)
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
::v-deep .p-toolbar-group-left {
  width: 100%;
}
</style>
