<template>
  <div class="ToGif">
    <FileUpLoad />
    <OptionEdit />
    <WorkerLoading />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { provideUseToGif } from '@/usecase/UseToGif'
import FileUpLoad from '@/components/ToGif/FileUpLoad.vue'
import OptionEdit from '@/components/ToGif/OptionEdit.vue'
import WorkerLoading from '@/components/ToGif/WorkerLoading.vue'

export default defineComponent({
  components: {
    FileUpLoad,
    OptionEdit,
    WorkerLoading
  },
  setup() {
    provideUseToGif()

    return {}
  }
})
</script>

<style lang="scss" scoped>
.ToGif {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 2fr auto;
  min-width: 500px;
  height: 100vh;
}
</style>
