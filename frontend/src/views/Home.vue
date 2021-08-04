<template>
  <div class="home">
    <h1>Accueil</h1>
    <div class="not-logged" v-if="!user.isLogged">
      <p>Vous êtes déconnecté</p>
      <router-link to="/login">→ Page de connexion ←</router-link>
    </div>
    <div v-else>
      <div class="buttons">
        <button type="button" @click="boxPost.value = 'new-post_0'">Nouveau</button>
        <button type="button" @click="updateWallPosts">Rafraichir</button>
      </div>
      <div class="all-posts">
        <div v-for="(thisPost, index) in allPosts[0]" :key="index">
        <PostBlock :thisPost="thisPost" :allComments="allComments" />
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PostBlock from '../components/PostBlock.vue'
export default {
  name: 'Home',
  components: {
    PostBlock
  },
  computed: {
    ...mapState(['api', 'user', 'boxPost'])
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
        console.log(this.allComments)
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
    .buttons {
      text-align: center;
      margin: 10px;
    }
    .not-logged {
      text-align: center;
      color: #742e2e;
    }
    .all-posts {
      display: flex;
      flex-direction: column-reverse;
    }
</style>
