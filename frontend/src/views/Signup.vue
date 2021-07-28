<template>
  <div class="signup">
    <form>
        <h1>Inscription</h1>
        <Input id='username' type='text' text='Pseudo'/>
        <Input id='email' type='email' text='E-mail'/>
        <Input id='password' type='password' text='Mot de Passe'/>
        <br />
        <div @click="signup">
          <Button text="Inscription" />
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
    signup() {
      console.log('Singup ok');
      window.location.href='#/';
    }
  },
}
</script>

<style scoped lang="scss">
  .signup {
    border-radius: 30px;
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
