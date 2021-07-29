<template>
  <div class="register">
    <form @keyup="validForm" id="form">
        <h1>Inscription</h1>
        <div v-if="$store.state.isLogged">
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
          <button @click="register" type="submit" :disabled="submitDisabled">Valider</button>
          <p v-if="alertError" id="alert">{{ alertMsg }}</p>
         </div>
    </form>
  </div>
</template>

<script>
const axios = require('axios');
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
          this.alertMsg += "Mot de Passe incorrect\n( Min. 8 caractères avec maj. minuscule chiffre et caractères spécial" }
        }
    },
    register() {
      if (!this.$store.state.isLogged) {
        axios.post(this.api + "auth/register", this.registerForm)
        .then((res) => {
          console.log(res.status)
          if (res.status != 201) { throw new Error(res.statusText) }
          console.log(res)
          axios.post(this.api + "auth/login", this.registerForm)
          .then((res) => {
            this.$store.state.user.username = this.registerForm.username;
            this.$store.state.user.id = res.data.id;
            this.$store.state.user.token = res.data.token;
            this.$store.state.isLogged = true;
            localStorage.setItem('token', JSON.stringify({token: res.data.token}))
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
  .register {
    border-radius: 30px;
    color: #F8F8F8;
    margin: auto;
    margin-top: 40px;
    max-width: 500px;
    min-height: 300px;
    background-color: #607888;
    border: solid #284048;
    border-width: 4px 8px;
    form {
      text-align: center;
      margin: auto;
      width: 50%;
      display: flex;
      flex-direction: column;
    }
    .input {
    display: flex;
    flex-direction: column;
    }
    button {
      margin-top: 20px;
    }
    #alert {
      font-size: .8rem;
      font-weight: bold;
      white-space: pre-line;
      color: #742e2e;
    }
  }
</style>
