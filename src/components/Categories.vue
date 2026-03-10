<script setup>
import { useCategoryStore } from "@/stores/categoryStore.js"

const categoryStore = useCategoryStore()


categoryStore.getCategories()

</script>

<template>
  <div>
    <div v-for="category in categoryStore.categories" :key="category.id">
      {{ category.name }}
    </div>
  </div>
</template>