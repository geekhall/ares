import type { App } from 'vue'
import { createStore } from 'vuex'
import user from './modules/user'

const store = createStore({
  state: {
    count: 0,
    routeLoaded: false,
    firstRoute: null,
    menuTree: null,
  },
  getters: {
    tenTimes(state) {
      return state.count * 10
    }
  },
  mutations: {
    increment(state, payload) {
      console.log('mutation increment called: payload', payload);
      state.count += payload ? payload.amount : 1
    },
    decrement(state, payload) {
      console.log('mutation decrement called: payload', payload);
      state.count -= payload ? payload.amount : 1
    },
    setRouteLoaded(state, payload) {
      state.routeLoaded = payload
    },
    setFirstRoute(state, route) {
      state.firstRoute = route
    },
    setMenuTree(state, data) {
      state.menuTree = data
    }
  },
  actions: {
    incrementAsync(context, payload) {
      setTimeout(() => {
        const random = Math.random() * 1000
        if (random > 500) {
          context.commit('increment', payload)
        } else {
          context.commit('decrement', payload)
        }
      }, payload.delay)
    }
  },
  modules: {
    user
  }
})

export default store
