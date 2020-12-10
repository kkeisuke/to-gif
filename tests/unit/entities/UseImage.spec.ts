import { defineComponent, h, isReadonly } from 'vue'
import { mount } from '@vue/test-utils'
import { injectUseImage, provideUseImage } from '@/entities/UseImage'

describe('entities/UseImage', () => {
  const useImageComponent = defineComponent({
    setup() {
      const useImage = injectUseImage()
      return {
        useImage
      }
    },
    render() {
      return h('div')
    }
  })
  const wrapper = mount({
    components: {
      useImageComponent
    },
    setup() {
      provideUseImage()
      return {}
    },
    render() {
      return h(useImageComponent)
    }
  })

  const useImage = wrapper.findComponent(useImageComponent).vm.useImage

  test('create', () => {
    useImage.create(new Uint8Array(Array.from({ length: 3000 })), 'test')
    // node に createObjectURL がないので、src は除外
    expect(isReadonly(useImage.image)).toBe(true)
    expect(useImage.image.size).toBe(3)
    expect(useImage.image.name).toBe('test.gif')
  })
})
