<template>
    <nav id="nav-bar">
        <span v-if="user.isLogged">
            <router-link to="/">Accueil</router-link> |
            <router-link to="/profil">{{ user.username }}</router-link> | 
            <a class="logout-button" @click="logout">Déconnexion</a>
        </span>
        <span v-else>
            <router-link to="/register">S'inscrire</router-link> |
            <router-link to="/login">Se connecter</router-link>
        </span>
    </nav>
</template>

<script>

import { mapState } from 'vuex'
export default {
  name: 'NavBar',
  computed : {
    ...mapState(['user'])
  },
  methods: {
    logout() {
      this.$store.state.user.isLogged = false
      if (localStorage.getItem("data")) {
        localStorage.removeItem('data');
      }
      this.$router.push('/login')
    }
  },
}

</script>

<style lang="scss">
    #nav-bar {
      color: white;
        padding-right: 40px;
        display: flex;
        justify-content: flex-end;
        font-size: .9rem;
    }
    .logout-button {
      cursor: pointer;
      text-decoration: underline;
    }
    .router-link-exact-active {
      color: #ae2833;
      font-weight: bold;
    }
</style>