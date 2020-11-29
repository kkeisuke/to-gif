declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // https://github.com/vuejs/vue-cli/releases/tag/v4.5.8
  // lint が通らないので保留
  // const component: DefineComponent<{}, {}, any>
  const component: DefineComponent
  export default component
}
