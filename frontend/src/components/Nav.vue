<template>
    <nav id="nav">
        <span v-if="$store.state.isLoged">
            <router-link to="/">Accueil</router-link> |
            <a href="#">{{ $store.state.username }}</a> | 
            <router-link to="/logout"><span @click="logout">Déconnexion</span></router-link>
        </span>
        <span v-else>
            <router-link to="/signup">S'inscrire</router-link> |
            <router-link to="/login">Se connecter</router-link>
        </span>
    </nav>
</template>

<script>
export default {
  name: 'Nav',
  methods: {
    logout() {
        this.$store.state.isLoged = false
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
    #userNameLink {
      color: white;
    }
</style>