<template>
  <div class="header">
    <h1>Logo</h1>
    <nav text-xl mt-6 inline-flex gap-2>
      <button class="icon-btn !outline-none" @click="toggleDark()">
        <div v-if="isDark" i-carbon-moon />
        <div v-else i-carbon-sun />
      </button>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Header'
})
</script>
<script setup lang="ts">
</script>

<style lang="sass" scoped>
.header
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 50px
  line-height: 50px
  text-align: center
  margin: 0
  color: #eee
  background-color: #3c3c3c
  display: flex
  justify-content: space-between
  align-items: center
  padding: 0
</style>
