import { defineComponent, h, isReadonly } from 'vue'
import { mount } from '@vue/test-utils'
import { injectUseConvert, provideUseConvert } from '@/usecase/UseConvert'

describe('usecase/UseConvert', () => {
  const useConvertComponent = defineComponent({
    setup() {
      const useConvert = injectUseConvert()
      return {
        useConvert
      }
    },
    render() {
      return h('div')
    }
  })
  const wrapper = mount({
    components: {
      useConvertComponent
    },
    setup() {
      provideUseConvert()
      return {}
    },
    render() {
      return h(useConvertComponent)
    }
  })

  const useConvert = wrapper.findComponent(useConvertComponent).vm.useConvert

  const buffer = new Uint8Array(Array.from({ length: 1000 }))
  const blob = new Blob([buffer], { type: 'video/mp4' })
  const video = new File([blob], 'test')

  test('load loading', () => {
    expect(isReadonly(useConvert.loadingStatus)).toBe(true)
    expect(useConvert.loadingStatus.value).toBe('ready')
    useConvert.load()
    expect(useConvert.loadingStatus.value).toBe('loading')
  })

  test('load fail', async () => {
    try {
      await useConvert.load()
    } finally {
      expect(useConvert.loadingStatus.value).toBe('fail')
    }
  })

  test('convert converting', () => {
    useConvert.load().finally(() => {
      expect(isReadonly(useConvert.convertStatus)).toBe(true)
      expect(useConvert.convertStatus.value).toBe('ready')
      useConvert.convert(video, { fps: 60 }).catch((err) => {
        expect(err.message).toContain('-i src_')
        expect(err.message).toContain(' -r 60 output_')
        expect(err.message).toContain('.gif')
      })
      expect(useConvert.convertStatus.value).toBe('converting')
    })
  })

  test('convert fail', async () => {
    await useConvert.load()
    try {
      await useConvert.convert(video, { fps: 60 })
    } catch (error) {
      expect(useConvert.convertStatus.value).toBe('fail')
    }
  })
})
