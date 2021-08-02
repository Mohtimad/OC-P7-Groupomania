import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api: {
      url: 'http://localhost:3000/api',
      routeServer: '/',
      method: 'POST',
    },
    user : {
      isLogged: false,
      token: null,
      id: null,
      username : null,
      isAdmin: 0
    },
    box : {
      isOpen: false,
      imageInputActive : true,
      titleActive : true,
      commentActive: true,
      titleOfBox: 'The Box',
      title: '',
      comment: '',
      imageURL: '',
      postIdSelected: 0,
    },
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
