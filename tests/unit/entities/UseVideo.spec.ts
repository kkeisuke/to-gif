import { defineComponent, h, isReadonly } from 'vue'
import { mount } from '@vue/test-utils'
import { injectUseVideo, provideUseVideo } from '@/entities/UseVideo'

describe('entities/UseVideo', () => {
  const useVideoComponent = defineComponent({
    setup() {
      const useVideo = injectUseVideo()
      return {
        useVideo
      }
    },
    render() {
      return h('div')
    }
  })
  const wrapper = mount({
    components: {
      useVideoComponent
    },
    setup() {
      provideUseVideo()
      return {}
    },
    render() {
      return h(useVideoComponent)
    }
  })

  const useVideo = wrapper.findComponent(useVideoComponent).vm.useVideo

  const buffer = new Uint8Array(Array.from({ length: 1000 }))
  const blob = new Blob([buffer], { type: 'video/mp4' })
  const video = new File([blob], 'test')

  test('file', () => {
    expect(useVideo.file.value).toBe(null)
    useVideo.setFile(video)
    expect(useVideo.file.value).toBe(video)
    expect(isReadonly(useVideo.file)).toBe(true)
  })
})
