<template>
  <div id="app">
    <Header />
      <main>
        <router-view/>
      </main>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  }
}
</script>

<style lang="scss">
  * {
    font-family: 'Baloo Chettan 2', cursive;
  }
  a {
    color: #F8F8F8;
    &:hover {
      color: #C8D0D0
    }
  }
  p {
    padding: 0;
    margin: 0;
  }

  button {
    cursor: pointer;
  }

  h1,
  h2 {
    text-align: center;
    color: #F8F8F8;
    text-shadow: 1px 1px 2px #1f1e1e;
  }

  /* set the height to 100% of the viewport */
  #app {
    background-color: #788898;
    margin: 0;
    margin: auto;
    display: flex;
    flex-direction: column;
    min-height: 98vh;
    max-width: 1920px;
  }
  main {
    flex: 1;
    overflow: hidden;
    margin-top: 80px;
  }
</style>
