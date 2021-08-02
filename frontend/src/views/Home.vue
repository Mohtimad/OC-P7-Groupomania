<template>
  <div class="home">
    <h1>Accueil</h1>
    <div class="notLogged" v-if="!user.isLogged">
      <p>Vous êtes déconnecté</p>
      <router-link to="/login">→ Page de connexion ←</router-link>
    </div>
    <div v-else>
      <div class="buttons">
        <button type="button" @click="newPostBoxSettings">Nouveau</button>
        <button type="button" @click="updateWallPosts">Rafraichir</button>
      </div>
      <div v-if="box.isOpen">
        <PostBox />
      </div>
      <div id="allPosts">
        <div v-for="(thePost, index) in allPosts[0]" :key="index">
        <Posts :thePost="thePost" :allComments="allComments" />
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Mixin } from '../mixins/boxSettings'
import { mapState } from 'vuex'
import PostBox from '../components/PostBox.vue'
import Posts from '../components/Posts.vue'
export default {
  name: 'Home',
  mixins: [Mixin],
  components: {
    PostBox,
    Posts
  },
  computed: {
    ...mapState(['api', 'user', 'box'])
  },
  data() {
    return {
      allPosts: '',
      allComments: '',
    }
  },
  beforeMount() {
    this.updateWallPosts()
  },
  methods: {
    updateWallPosts() {
      fetch(this.api.url + "/post" + '/', {
          method: "GET",
          headers: { 
              'Accept': 'application/json', 
              'Authorization': 'Bearer ' + (this.user.token), 
          },
        })
      .then(function(res) {
          if (res.ok) {
          return res.json();
          }
          throw new Error(res.status);
      })
      .then((data) => {
        this.allPosts = [data.result.allPosts]
        this.allComments = [data.result.allComments]
      })
      .catch((error) => {
        this.$store.state.user.isLogged = false;
        console.log(error)
      }) 
    },
  }
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
    #allPosts {
      display: flex;
      flex-direction: column-reverse;
    }
</style>
