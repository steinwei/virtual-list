<script setup lang="ts">
import { onMounted, ref } from 'vue';
import VirtualList from './components/VirtualList/index.vue'
import { ItemType } from './components/VirtualItem/VirtualItem.vue';

const testList = ref<any[]>([]);

function makeRandomNumber() {
  return Math.random() * Date.now()
}

function makeTestItem(index: number) : Partial<ItemType> {
  return {
    name: 'stein' + makeRandomNumber(),
    school: 'pku' + makeRandomNumber(),
    rank: index + '',
  }
}

function init() {
  for(let i=0; i<10000; i++) {
    testList.value.push(makeTestItem(i))
  }
}

onMounted(init)

</script>

<template>
  <VirtualList
    v-if="testList.length > 0"
    :list="testList"
    :item-height="200"
    :padding-count="2"
  />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
