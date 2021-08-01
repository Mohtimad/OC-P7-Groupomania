import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api: 'http://localhost:3000/api/',
    isLogged: false,
    isBoxOpen: false,
    user : {
      token: `${localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")).token : null}`,
      id: `${localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")).id : null}`,
      username : `${localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")).username : ''}`,
      isAdmin: `${localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")).isAdmin : 0}`
    },
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
