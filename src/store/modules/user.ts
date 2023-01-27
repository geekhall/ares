import { userInfo } from '~/apis/personal';
interface IState {
  token: string;
  userInfo: any;
}

export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {} // 用户基本信息
  },
  getters: {
    isLogin(state: any) {
      return !!state.token || !!localStorage.getItem('pm_token');
    }
  },
  mutations: {
    setToken(state: IState, token: string) {
      localStorage.setItem('pm_token', token);
      state.token = token;
    },
    clearToken(state: IState) {
      state.token = ''
      localStorage.removeItem('pm_token');
    },
    setUserInfo(state: IState, info: any) {
      state.userInfo = info || {};
    },
    clearUserInfo(state: IState) {
      state.userInfo = {};
    }
  },
  actions: {
    refreshInfo() {

    }
  }
};
