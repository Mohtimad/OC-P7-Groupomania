<template>
  <div class="login">
    <form @keyup="validForm" id="form">
        <h1>Connection</h1>
        <div v-if="$store.state.isLogged">
          <p>Vous êtes déjà connecté !</p>
        </div>
        <div v-else>
          <div class="input">
            <label for="email">E-mail</label>
            <input id="email" type="email" v-model="registerForm.email" />
          </div>
          <div class="input">
            <label for="password">Mot de Passe</label>
            <input id="password" type="password" v-model="registerForm.password" />
          </div>
          <button @click="login" type="button" :disabled="submitDisabled">Valider</button>
          <p v-if="alertError" id="alert">{{ alertMsg }}</p>
         </div>
    </form>
  </div>
</template>

<script>
const axios = require('axios');
import { mapState } from 'vuex'
export default {
  name: "Login",
  data () {
    return {
      registerForm : {
        email: '',
        password: ''
      },
      submitDisabled : true,
      alertError: false,
      alertMsg: "",
    }
  },
  computed: {
    ...mapState(['api', 'isLogged'])
  },
  components: {
  }, 
  methods: {
    validForm() {
      const regexEmail = /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;
      if (regexEmail.test(this.registerForm.email) &&
          regexPassword.test(this.registerForm.password))
          {this.submitDisabled = false; this.alertError = false}
      else {
        this.submitDisabled = true
        this.alertError = true
        this.alertMsg = ""
        if (this.registerForm.email && !regexEmail.test(this.registerForm.email)) {
          this.alertMsg += "E-mail incorrect\n" }
        if (this.registerForm.password && !regexPassword.test(this.registerForm.password)) {
          this.alertMsg += "Mot de Passe Syntaxe\nMin. 8 caractères\n+ Majuscule, Minuscule\nChiffre et Caractère" }
        }
    },
    login() {
      if (!this.$store.state.isLogged) {
        axios.post(this.api + "auth/login", this.registerForm)
        .then((res) => {
          console.log(res.status)
          if (res.status != 200) { throw new Error(res.statusText) }
          this.$store.state.user.username = res.data.username;
          this.$store.state.user.id = res.data.id;
          this.$store.state.user.token = res.data.token;
          this.$store.state.isLogged = true;
          localStorage.setItem('token', JSON.stringify({token: res.data.token}))
          this.$router.push('/')
        })
        .catch((err) => {
          console.log(err)
            this.submitDisabled = true
            this.registerForm.email = ""
            this.registerForm.password = ""
            this.alertMsg = err
            this.alertError = true

        })
      } else {
        this.alertError = true
        this.alertMsg = "Vous êtes déjà connecté"}
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../sass/auth.scss";
</style>
