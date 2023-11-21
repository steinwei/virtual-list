<template>
  <div :class="styles.wrapper" :style="{ height: itemHeight + 'px' }">
    <div>{{ name }}</div>
    <div>{{ rank }}</div>
    <div>{{ school }}</div>
  </div>
</template>

<script lang="ts">
import styles from './VirtualItem.module.css'

export default {
  data() {
    return {
      styles,
    }
  },
  name: 'VirtualItem'
}
</script>

<script lang="ts" setup>
export type ItemType = {
  itemHeight: number;
  name: string;
  rank: string;
  school: string;
}

defineProps<ItemType>()
</script>