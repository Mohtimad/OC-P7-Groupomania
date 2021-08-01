<template>
  <div class="register">
    <form @keyup="validForm" id="form">
        <h1>Inscription</h1>
        <div v-if="isLogged">
          <p>Vous êtes déjà connecté !</p>
        </div>
        <div v-else>
          <div class="input">
            <label for="username">Nom d'utilisateur</label>
            <input id="username" type="text" v-model="registerForm.username" />
          </div>
          <div class="input">
            <label for="email">E-mail</label>
            <input id="email" type="email" v-model="registerForm.email" />
          </div>
          <div class="input">
            <label for="password">Mot de Passe</label>
            <input id="password" type="password" v-model="registerForm.password" />
          </div>
          <button @click="register" type="button" :disabled="submitDisabled">Valider</button>
          <p v-if="alertError" id="alert">{{ alertMsg }}</p>
         </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "Register",
  data () {
    return {
      registerForm : {
        username: '',
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
      const regexUsername = /^[a-zA-Z.,'\-àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]*.{3,20}$/;
      const regexEmail = /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;
      if (regexUsername.test(this.registerForm.username) &&
          regexEmail.test(this.registerForm.email) &&
          regexPassword.test(this.registerForm.password))
          {this.submitDisabled = false; this.alertError = false}
      else {
        this.submitDisabled = true
        this.alertError = true
        this.alertMsg = ""
        if (this.registerForm.username && !regexUsername.test(this.registerForm.username)) {
          this.alertMsg += "Nom d'utilisateur incorrect\n" }
        if (this.registerForm.email && !regexEmail.test(this.registerForm.email)) {
          this.alertMsg += "E-mail incorrect\n" }
        if (this.registerForm.password && !regexPassword.test(this.registerForm.password)) {
          this.alertMsg += "Mot de Passe incorrect\nMin. 8 + [a-z] + [A-Z] + [0-9] + [!/?% ...]" }
        }
    },
    register() {
      const reqData = {
            method: "POST",
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(this.registerForm)
        }
      if (!this.isLogged) {
        fetch(this.api + "auth/register", reqData)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
            throw new Error(res.status);
        })
        .then((data) => {
          console.log(data)
          fetch(this.api + "auth/login", reqData)
          .then(function(res) {
              if (res.ok) {
                  return res.json();
              }
              throw new Error(res.status);
          })
          .then((data) => {
            this.$store.state.isLogged = true;
            let localStorageData = {
              token: data.token,
              username: data.username,
              id: data.id,
              isAdmin : data.isAdmin
            }
            localStorage.setItem('data', JSON.stringify(localStorageData))
            this.$router.push('/')
          })
        })
        .catch((err) => {
          console.log(err)
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
