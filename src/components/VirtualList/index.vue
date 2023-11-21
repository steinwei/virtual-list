<template>
  <div :class="styles.wrapper">
    <div :class="styles.header">
      this is header.
    </div>
    <div :class="styles.main" ref="scrollContainerRef" :style="{ height: containerHeight + 'px'}">
      <div :class="styles['scroll-container-padding']" :style="{ height: listHeight + 'px'}"></div>
      <div :class="styles['scroll-real-container']" :style="{ transform: `translate3d(0, ${startOffset}px, 0)` }">
        <VirtualItem 
          v-for="item in virtualData"
          :name="item.name"
          :key="item.name"
          :school="item.school"
          :rank="item.rank"
          :item-height="itemHeight"
        />
      </div>
    </div>
    <div :class="styles.footer">
      this is footer.
    </div>
  </div>
</template>

<script lang="ts">
import styles from './index.module.css'
import VirtualItem from '../VirtualItem/VirtualItem.vue'
import { binarySearch, initCachedList, throttle } from './utils';

export default {
  data() {
    return {
      styles,
    }
  }
}
</script>

<script setup lang="ts">
import { ref, onBeforeUnmount, computed, onMounted, unref } from 'vue';

type VirtualListType = {
  itemHeight: number
  list: any[]
  paddingCount: number
}

const scrollContainerRef = ref<HTMLDivElement>(null)
const props = defineProps<VirtualListType>()
const list = props.list
const itemHeight = props.itemHeight || 200
const paddingCount = props.paddingCount

const start = ref(0)
const positions = ref<any[]>([])
const containerHeight = computed(() => window.innerHeight).value
const listHeight = computed(() => itemHeight * list.length).value
const virtualData = computed(() => makeVirtualList())
const count = computed(() => getCountsInViewport()).value
const startOffset = ref(0)

console.log(positions.value, containerHeight, listHeight, paddingCount)

function getScrollStartIndex(e: any) {
  const scrollTop = e.target.scrollTop
  const scrollSize = Math.floor(scrollTop)
  const startIndex = binarySearch(positions.value, scrollSize)

  startOffset.value = scrollTop - scrollTop % itemHeight

  return Math.max(0, startIndex)
}

function getEndIndex(start: number) {
  const end = Math.max(start + count + paddingCount, 0)

  return Math.min(list.length, end)
}

function makeVirtualList() {
  const startIndex = unref(start)
  const endIndex = Math.min(getEndIndex(startIndex), list.length - 1)

  console.log(startIndex, endIndex)

  return list.slice(startIndex, endIndex)
}

function init() {
  positions.value = initCachedList(list.length, itemHeight)

  // bind event listener
  scrollContainerRef.value.addEventListener('scroll', throttle(handleScroll, 100))
}


function handleScroll(e: any) {
  const startIndex = getScrollStartIndex(e)

  start.value = startIndex
}

function getCountsInViewport() {
  return Math.floor(getViewportHeight() / 200)
}

function getViewportHeight() {
  return window.innerHeight
}

onMounted(() => {
  init()
})

onBeforeUnmount(() => {
  if(scrollContainerRef.value) {
    scrollContainerRef.value.removeEventListener('scroll', throttle(handleScroll, 100))
    scrollContainerRef.value = null
  }
})
</script>