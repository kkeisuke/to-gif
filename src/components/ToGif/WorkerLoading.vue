<template>
  <BlockUI :blocked="loading" :full-screen="true" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { injectUseToGif } from '@/usecase/UseToGif'
import BlockUI from 'primevue/blockui'

export default defineComponent({
  components: {
    BlockUI
  },
  setup() {
    const { loading } = injectUseToGif()

    return {
      loading
    }
  }
})
</script>
