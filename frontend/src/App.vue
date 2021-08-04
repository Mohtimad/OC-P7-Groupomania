<template>
  <div id="app">
    <HeaderBlock />
    <div v-if="boxPost.value != 'closed'"><DialogBoxPost /></div>
      <main>
        <router-view/>
      </main>
    <FooterBlock />
  </div>
</template>

<script>
import DialogBoxPost from './components/DialogBoxPost'
import HeaderBlock from './components/HeaderBlock.vue'
import FooterBlock from './components/FooterBlock.vue'

import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    HeaderBlock,
    FooterBlock,
    DialogBoxPost
  },  
  computed: {
    ...mapState(['boxPost'])
  },
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
  }
</style>
