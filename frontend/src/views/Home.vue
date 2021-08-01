<template>
  <div class="home">
    <h1>Accueil</h1>
    <div class="notLogged" v-if="!isLogged">
      <p>Vous êtes déconnecté</p>
      <router-link to="/login">→ Page de connexion ←</router-link>
    </div>
    <div v-else>
      <div class="buttons">
        <button @click="updatePosts">Rafraichir</button>
        <button @click="$store.state.isBoxOpen = true">Nouveau</button>
      </div>
      <div v-if="$store.state.isBoxOpen">
        <div class="closePostBox">
        </div>
        <NewPostBox />
      </div>
      <div id="allPosts">
        <div v-for="item in allPosts" :key="item">
        <Posts :thePost="item" :allComments="commentsData" />
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
      allPosts: '',
      commentsData: '',
    }
  },
  computed: {
    ...mapState(['api', 'isLogged', 'user'])
  },
  beforeMount() {
    this.updatePosts()
  },
  methods: {
  updatePosts() {
    if (!localStorage.getItem("data")) {
          this.$store.state.isLogged = false
          this.$router.push('/login')
    }
      const localStorageData = JSON.parse(localStorage.getItem("data"))
      if (!localStorageData.token || !localStorageData.username || !localStorageData.id) {
          localStorage.removeItem('data'); 
          this.$store.state.isLogged = false
          this.$router.push('/login')
      }
    this.$store.state.isLogged = true;
    fetch(this.api + "post/", {
        method: "GET",
        headers: { 
            'Accept': 'application/json', 
            'Authorization': 'Bearer ' + (localStorageData.token), 
        },
      })
    .then(function(res) {
        if (res.ok) {
        return res.json();
        }
        throw new Error(res.status);
    })
    .then((data) => {
      this.allPosts = data.result.allPosts
      this.commentsData = data.result.allComment
    })
    .catch((error) => {
      this.$store.state.isLogged = false;
      console.log(error)
    }) 
    }
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
