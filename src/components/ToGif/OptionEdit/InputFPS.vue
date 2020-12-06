<template>
  <div>
    <InputNumber id="fps" v-model="option.fps" :min="MIN_FPS" :max="MAX_FPS" :step="10" class="p-inputtext-sm" suffix=" FPS" />
    <Slider v-model="option.fps" :min="MIN_FPS" :max="MAX_FPS" :step="5" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { injectUseOption } from '@/entities/UseOption'
import InputNumber from 'primevue/inputnumber'
import Slider from 'primevue/slider'

export default defineComponent({
  components: {
    InputNumber,
    Slider
  },
  setup() {
    const { MAX_FPS, MIN_FPS, option } = injectUseOption()

    return {
      MAX_FPS,
      MIN_FPS,
      option
    }
  }
})
</script>
