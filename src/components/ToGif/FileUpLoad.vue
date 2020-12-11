<template>
  <!-- id for E2E test -->
  <div id="FileUpLoad" class="FileUpLoad p-d-flex p-jc-center p-ai-center" @drop.prevent="onUpload" @dragover.prevent="">
    <p v-show="!image.size" id="description" class="description">Drag and drop files to here. Convert video to gif images</p>
    <img :src="image.src" v-show="image.size" :alt="image.name" :title="image.name" id="preview" class="preview" />
    <div v-show="converting" class="progressbar">
      <ProgressBar mode="indeterminate" />
    </div>
    <div v-if="errorMessage" class="messages">
      <Message severity="error">{{ errorMessage }}</Message>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { injectUseToGif } from '@/usecase/UseToGif'
import ProgressBar from 'primevue/progressbar'
import Message from 'primevue/message'

export default defineComponent({
  components: {
    ProgressBar,
    Message
  },
  setup() {
    const { image, converting, invoke } = injectUseToGif()
    const errorMessage = ref('')

    return {
      image,
      converting,
      errorMessage,
      onUpload: async (event: DragEvent) => {
        errorMessage.value = ''
        const file = event.dataTransfer?.files?.[0]
        if (file) {
          try {
            await invoke(file)
          } catch (error) {
            errorMessage.value = error
          }
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.FileUpLoad {
  position: relative;
  background: #333;
  .description {
    max-width: 90%;
    color: #eee;
    font-size: 1.2rem;
  }
  .preview {
    max-width: 90%;
    max-height: 90%;
    object-fit: scale-down;
  }
  .progressbar {
    position: absolute;
    top: 0;
    width: 100%;
    .p-progressbar {
      height: 0.5rem;
    }
  }
  .messages {
    position: absolute;
    bottom: 0;
  }
}
</style>
