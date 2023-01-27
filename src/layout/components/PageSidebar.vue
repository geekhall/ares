<template>
  <div class="page-sidebar">
    <div class="collape-bar">
      <el-icon class="cursor" @click="isCollapse = !isCollapse">
        <expand v-if="isCollapse" />
        <fold v-else />
      </el-icon>
    </div>
    <el-menu :default-active="defaultActive" router class="sidemenu" :collapse="isCollapse">
      <el-sub-menu v-for="(item, i) in treeData" :key="i" :index="item.path">
        <template #title>
          <el-icon v-if="item.icon"><component :is="item.icon"></component></el-icon>
          <span>{{ t(`menu.${item.name}`) }}</span>
        </template>
        <template v-for="(child, ci) in item.children" :key="ci">
          <el-menu-item :index="child.path">
            <el-icon><component :is="child.icon"></component></el-icon>
            {{ t(`menu.${child.name}`) }}
          </el-menu-item>
        </template>
      </el-sub-menu>
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useStore()
const { t } = useI18n()
const treeData = computed(() => store.state.menuTree)
const defaultActive = computed(() => route.path || treeData.value[0].path)
const isCollapse = ref(false)
</script>
<style lang="scss">
$side-width: 200px;
.page-sidebar {
  .sidemenu.el-menu,
  .sidemenu .el-sub-menu > .el-menu {
    --el-menu-text-color: #ccc;
    --el-menu-hover-bg-color: #060251;
    --el-menu-border-color: transparent;
    --el-menu-bg-color: #000;
    .el-menu-item {
      &.is-active {
        background-color: var(--el-menu-hover-bg-color);
      }
    }
  }
  .sidemenu.el-menu:not(.el-menu--collapse) {
    width: $side-width;
  }
  .collape-bar {
    color: #fff;
    font-size: 16px;
    line-height: 36px;
    text-align: center;

    .c-icon {
      cursor: pointer;
    }
  }
}
</style>
