<template>
  <div class="Links flex">
    <a href="https://kkeisuke.com" target="_blank" rel="noopener noreferrer" class="pi pi-home"></a>
    <a href="https://github.com/kkeisuke" target="_blank" rel="noopener noreferrer" class="pi pi-github ml-2"></a>
    <a href="https://twitter.com/kkeisuke" target="_blank" rel="noopener noreferrer" class="pi pi-twitter ml-2"></a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style lang="scss" scoped>
.Links {
  a {
    font-size: 1.5rem;
    color: #666;
    text-decoration: none;
  }
}
</style>
