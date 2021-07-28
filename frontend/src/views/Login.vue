<template>
  <div class="login">
    <form>

    <h1>Connexion</h1>
      <Input id='signin' type='text' text='Pseudo ou E-mail'/>
      <Input id='password' type='password' text='Mot de Passe'/>
      <br />
      <div @click="login">
        <Button text="Connexion" />
      </div>
    </form>
  </div>
</template>
<script>
import Input from '../components/Input.vue'
import Button from '../components/Button.vue'

export default {
  components: {
    Input,
    Button
  },
  methods: {
    login() {
      console.log('Login ok');
      window.location.href='#/';
    }
  },
}
</script>

<style scoped lang="scss">
  .login {
    border-radius: 30px;
    font-family: 'Baloo Chettan 2', cursive;
    color: #F8F8F8;
    margin: auto;
    margin-top: 40px;
    max-width: 500px;
    height: 300px;
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
  }
</style>
