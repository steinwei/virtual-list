import { mount } from '@vue/test-utils'
import MyComponent from './index.vue'
import { expect, test } from 'vitest'

test('emits custom event on scroll', async () => {
  const testList = [] as any[];
  function makeRandomNumber() {
    return Math.random() * Date.now()
  }
  
  function makeTestItem(index: number) {
    return {
      name: 'stein' + makeRandomNumber(),
      school: 'pku' + makeRandomNumber(),
      rank: index + '',
    }
  }
  
  function init() {
    for(let i=0; i<10000; i++) {
      testList.push(makeTestItem(i))
    }
  }
  
  init()
  
  const wrapper = mount(MyComponent, {
    props: {
      list: testList,
      itemHeight: 200,
      paddingCount: 2,
    },
  })

  const target = wrapper.find(`div.${wrapper.vm.styles['scroll-container-padding']}`)
  const div = target.element
  const height = div.style.height

  await wrapper.trigger('scroll')
  
  expect(wrapper.emitted('scroll')).toHaveLength(1) // 验证是否触发了 scrolled 事件
  expect(height).toBe('2000000px')
})
