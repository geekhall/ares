<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>


<style lang='sass'>
@import './assets/css/app.css'
@import './assets/css/dark.css'

html,
body
  height: 100%

#app
  height: 100%
  overflow: hidden

.flex-center
  display: flex
  align-items: center
  justify-content: center

.cursor
  cursor: pointer

.txt-c
  text-align: center

.w100p
  width: 100%
</style>
