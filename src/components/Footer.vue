<template>
  <div class="gh-footer">
    <h1>Footer</h1>
    <nav text-xl mt-6 inline-flex gap-2>
      <button class="icon-btn !outline-none" @click="toggleDark()">
        <div v-if="isDark" i-carbon-moon />
        <div v-else i-carbon-sun />
      </button>

      <a
        class="icon-btn"
        i-carbon-logo-github
        rel="noreferrer"
        href="https://github.com/geekhall"
        target="_blank"
        title="GitHub"
      />
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Footer'
})
</script>
<script lang="ts" setup>
import { isDark, toggleDark } from '~/composables'
</script>

<style lang="sass" scoped>
.gh-footer
  position: fixed
  bottom: 0
  left: 200px
  width: 100%
  height: 50px
  line-height: 50px
  text-align: center
  margin: 0
  color: #eee

  display: flex
  justify-content: space-between
  align-items: center
  padding: 0
</style>
