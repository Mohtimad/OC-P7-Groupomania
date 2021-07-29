import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user : {
      id: '',
      username : '',
      token: '',
    },
    api: 'http://localhost:3000/api/',
    isLogged: false,
  },
  mutations: {
  IS_LOGGED(state, payload) {
      state.isLogged = payload.data
      console.log(payload.data)
  }
  },
  actions: {
  },
  modules: {
  }
})
