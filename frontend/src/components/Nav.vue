<template>
    <nav id="nav">
        <span v-if="$store.state.isLogged">
            <router-link to="/">Accueil</router-link> |
            <router-link to="/profile">{{ user.username }}</router-link> | 
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
  name: 'Nav',
  computed : {
    ...mapState(['user','isLogged'])
  },
  methods: {
    logout (){
      if (localStorage.getItem("data")) {
        localStorage.removeItem('data');
      }
      this.$store.state.isLogged = false
      this.$router.push('/login')
    }
  },
}

</script>

<style lang="scss">
    #nav {
        padding-right: 40px;
        display: flex;
        justify-content: flex-end;
        transform: skewX(45deg);
        font-size: .9rem;
    }
    .logout-button {
      cursor: pointer;
      text-decoration: underline;
    }
    .router-link-exact-active {
      color: #8ed8e6;
      font-weight: bold;
    }
</style>