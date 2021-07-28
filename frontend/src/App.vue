<template>
  <div id="app">
    <Header />
    <Main />
    <Footer />
  </div>
</template>

<script>
import Header from './components/sections/Header.vue'
import Main from './components/sections/Main.vue'
import Footer from './components/sections/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Main,
    Footer,
  },
  data() {
    return {
      login: true
    }
  },
}
</script>

<style lang="scss">

* {
  font-family: 'Baloo Chettan 2', cursive;
  a {
    color: #F8F8F8;
    &:hover {
      color: #C8D0D0
    }
  }
}

/* set the height to 100% of the viewport */
#app {
  background-color: #788898;
  margin: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1920px;
}
main {
  flex: 1;
}
</style>
