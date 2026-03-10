<script setup>
  import {useGoodStore} from "@/stores/goodStore.js";

  const goodStore = useGoodStore()

  goodStore.getGoods()
</script>

<template>
    <div v-for="good in goodStore.goods" :key="good.id">
      {{good.name}}
    </div>
</template>