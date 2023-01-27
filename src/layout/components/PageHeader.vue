<template>
  <div class="header-cont">
    <div class="left">
      <h1>
        <router-link to="/">{{ t('sitename') }}</router-link>
      </h1>
    </div>
    <div class="right flex-center">
      <div class="lang gap">
        <span class="item" :class="{ active: locale === 'zh-cn' }" @click="changeLanguage('zh-cn')"
          >简体中文</span
        >
        /
        <span class="item" :class="{ active: locale === 'en' }" @click="changeLanguage('en')"
          >EN</span
        >
      </div>
      <template v-if="isLogin">
        <div class="gap">
          <router-link to="/personal/message">
            <el-badge :is-dot="!!unReadCount">
              <el-icon>
                <message />
              </el-icon>
            </el-badge>
          </router-link>
        </div>
        <el-dropdown trigger="click" @command="handleCommand">
          <div class="flex-center cursor">
            {{ username }}
            <el-icon>
              <caret-bottom />
            </el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="toPersonal">{{
                t('header.personalCenter')
              }}</el-dropdown-item>
              <el-dropdown-item command="toLogout">{{ t('header.logout') }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <template v-else-if="$route.name !== 'Login'">
        <router-link to="/login">{{ t('header.login') }}</router-link>
      </template>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
// import { logout } from '@/apis/login'
const { locale, t } = useI18n()
// 语言切换
const changeLanguage = (lang) => {
  locale.value = lang
  localStorage.setItem('locale', lang)
}

const store = useStore()
const isLogin = computed(() => store.getters['user/isLogin'])
const userInfo = computed(() => store.state.user.userInfo)
const username = computed(() => userInfo.value?.name)
const unReadCount = computed(() => userInfo.value?.unReadCount)

store.dispatch('user/refreshInfo')

const router = useRouter()
const commands = {
  toPersonal: () => {
    router.push('/personal')
  },
  toLogout: () => {
    logout().then((res) => {
      if (res.code == 200) {
        store.commit('user/clearToken')
        store.commit('user/clearUserInfo')
        router.push('/login')
      }
    })
  }
}
function handleCommand(command) {
  commands[command] && commands[command]()
}
</script>
<style lang="scss">
.header-cont {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 100%;

  a {
    color: inherit;
    text-decoration: none;
  }
  h1 {
    margin: 0;
    font-size: 20px;
  }
  .gap {
    margin-right: 20px;
  }
  .right {
    .lang {
      font-size: 14px;
      .item {
        cursor: pointer;
        &.active {
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
  }
  .el-dropdown {
    color: inherit;
  }
}
</style>
