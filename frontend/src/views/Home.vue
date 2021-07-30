<template>
  <div class="home">
    <h1>Accueil</h1>
    <div class="notLogged" v-if="$store.state.isLogged">
      <p>Vous êtes déconnecté</p>
      <router-link to="/login">→ Page de connexion ←</router-link>
    </div>
    <div v-else>
      <div class="buttons">
        <button>Rafraichir</button>
        <button @click="newPostBox = true">Nouveau</button>
      </div>
      <div v-if="newPostBox">
        <div class="closePostBox">
          <button @click="newPostBox = false">Fermer</button>
        </div>
        <NewPostBox />
      </div>
      <div>
        <Posts />
  <Posts />
  <Posts />
  <Posts />
      </div>
    </div>
  </div>
</template>

<script>
import NewPostBox from '../components/NewPostBox.vue'
import Posts from '../components/Posts.vue'
export default {
  name: 'Home',
  components: {
    NewPostBox,
    Posts
  },
  data() {
    return {
      newPostBox : false
    }
  },
}
</script>

<style scoped lang="scss">
    .closePostBox {
      width: 100%;
      text-align: center;
      position: fixed;
      z-index: 9999;
      color: #742e2e;
    }
    .buttons {
      text-align: center;
      margin: 10px;
    }
    .notLogged {
      text-align: center;
      color: #742e2e;
    }
</style>
