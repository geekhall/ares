<template>
  <div class="page-container">
    <header>
      <page-header />
    </header>
    <main>
      <div v-if="showLeft" class="left">
        <page-sidebar></page-sidebar>
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import PageHeader from './components/PageHeader.vue'
import PageSidebar from './components/PageSidebar.vue'
const route = useRoute()
const showLeft = computed(() => {
  const routeName = route.name
  return !['Login', 'NotFound'].includes(routeName) && !/^Personal/.test(routeName)
})
</script>
<style lang="scss">
.page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  > header {
    height: 54px;
    background: #000;
    color: #fff;
  }

  > main {
    display: flex;
    flex: 1;
    overflow: auto;

    > .left {
      height: 100%;
      background-color: #000;
      color: #fff;
    }
    > .right {
      flex: 1;
      overflow: hidden;
      background-color: #f5f7f9;
      > .main-body {
        padding: 16px 16px 30px;
        overflow: auto;
        height: 100%;
        box-sizing: border-box;
      }
    }
  }
}
</style>
