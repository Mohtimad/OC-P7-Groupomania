<template>
    <div id="nav">
        <span v-if="login">
            <router-link to="/">Accueil</router-link> |
            <router-link to="/user">{{ pseudo }}</router-link> | 
            <router-link to="/logout"><span @click="logout">Déconnexion</span></router-link>
        </span>
        <span v-else>
            <router-link to="/signup">S'inscrire</router-link> |
            <router-link to="/login">Se connecter</router-link>
        </span>
    </div>
</template>

<script>
export default {
  name: 'Nav',
  props: {
    pseudo: {
      type: String,
      default: "Username"
    },
    login: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    logout() {
        this.login = false
    }
  }
}

</script>

<style lang="scss">
    #nav {
        padding-right: 50px;
        display: flex;
        justify-content: flex-end;
        transform: skewX(45deg);
    }
</style>