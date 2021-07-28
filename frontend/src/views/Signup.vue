<template>
  <div class="signup">
    <form id="form">
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
      const form = document.getElementById('form')
      const user = {
        username: form.username.value,
        email: form.email.value,
        password: form.password.value
      }
      fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(user)
        })
        .then(function(res) {
          if (!res.ok) {
            throw new Error(res.status);
          }
        })
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
