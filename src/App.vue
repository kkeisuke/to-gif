<template>
  <ToGifContext>
    <ToGif />
  </ToGifContext>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ToGifContext from '@/components/ToGif/ToGifContext.vue'
import ToGif from '@/components/ToGif/ToGif.vue'

export default defineComponent({
  components: {
    ToGifContext,
    ToGif
  }
})
</script>
