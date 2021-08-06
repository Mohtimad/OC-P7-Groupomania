<template>
  <div class="profil">
    <h1>{{ user.username }}</h1>
    <form id="form-profil" @keyup="checkForm">
      <div class="form-block">
        <h2>Modifier vos données</h2>
        <label for="newUsername">Nom d'utilisateur</label>
        <input
          v-model="newUsername"
          name="newUsername"
          id="newUsername"
          type="text"
        />
        <label for="newEmail">E-mail</label>
        <input v-model="newEmail" name="newEmail" id="newEmail" type="text" />
        <label for="password1">Confirmer mot de passe</label>
        <input
          v-model="password1"
          name="password1"
          id="password1"
          type="password"
        />
        <button
          :disabled="buttonEditDisable"
          type="button"
          @click="editAccount"
        >
          Modifier
        </button>
        <p class="alert">{{ alertMsg }}</p>
      </div>
      <div class="form-block delete-block">
        <h2>Supprimer le compte</h2>
        <label for="password2">Confirmer mot de passe</label>
        <input
          v-model="password2"
          name="password2"
          id="password2"
          type="password"
        />
        <button
          :disabled="buttonDeleteDisable"
          type="button"
          @click="deleteAccount"
        >
          Supprimer
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Profil",
  computed: {
    ...mapState(["user", "api"]),
  },
  data() {
    return {
      buttonDeleteDisable: true,
      buttonEditDisable: true,
      newUsername: "",
      newEmail: "",
      password1: "",
      password2: "",
      alertMsg: "",
    };
  },
  methods: {
    checkForm() {
      const regexUsername =
        /^[a-zA-Z.,'\-àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]*.{3,20}$/;
      const regexEmail =
        /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;
      this.buttonDeleteDisable = regexPassword.test(this.password2)
        ? false
        : true;
      if (
        ((regexUsername.test(this.newUsername) && !this.newEmail) ||
          (regexEmail.test(this.newEmail) && !this.newUsername) ||
          (regexEmail.test(this.newEmail) &&
            regexUsername.test(this.newUsername))) &&
        regexPassword.test(this.password1)
      ) {
        this.buttonEditDisable = false;
        this.alertMsg = "";
      } else {
        this.buttonEditDisable = true;
        this.alertMsg = "";
        if (this.newUsername && !regexUsername.test(this.newUsername)) {
          this.alertMsg = "Nom d'utilisateur incorrect\n";
        }
        if (this.newEmail && !regexEmail.test(this.newEmail)) {
          this.alertMsg += "E-mail incorrect\n";
        }
        if (this.password1 && !regexPassword.test(this.password1)) {
          this.alertMsg += "Mot de Passe incorrect";
        }
      }
    },
    submitData(reqMethod, formData) {
      fetch(this.api.url + "/auth" + "/", {
        method: reqMethod,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.user.token,
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error(res.status);
        })
        .then(() => {
          if (reqMethod == "DELETE") {
            this.$store.state.user.isLogged = false;
            if (localStorage.getItem("data")) {
              localStorage.removeItem("data");
            }
            this.$router.push("/login");
          } else {
            let localStorageData = JSON.parse(localStorage.getItem("data"));
            this.user.username = this.newUsername;
            (localStorageData.username = this.newUsername),
              localStorage.setItem("data", JSON.stringify(localStorageData));
            this.newUsername = "";
            this.newEmail = "";
            this.password1 = "";
            this.password2 = "";
          }
        })
        .catch((err) => {
          console.log(err);
          this.alertMsg = err;
        });
    },
    editAccount() {
      const reqMethod = "PUT";
      let formData = {
        userId: this.user.id,
        password: this.password1,
      };
      if (this.newUsername) {
        formData["username"] = this.newUsername;
      }
      if (this.newEmail) {
        formData["email"] = this.newEmail;
      }
      this.submitData(reqMethod, formData);
    },
    deleteAccount() {
      const reqMethod = "DELETE";
      let formData = {
        userId: this.user.id,
        password: this.password2,
      };
      this.submitData(reqMethod, formData);
    },
  },
};
</script>

<style scoped lang="scss">
.profil {
  margin: auto;
  text-align: center;
  max-width: 500px;
  h2 {
    text-shadow: black 1px 1px 5px;
  }
  .form-block {
    margin: 20px;
    padding-bottom: 30px;
    background-color: #181f44d2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    input {
      text-align: center;
      margin-bottom: 10px;
    }
    label {
      color: white;
    }
    .alert {
      font-size: 0.9rem;
      font-weight: bold;
      white-space: pre-line;
      color: #c44c4c;
    }
  }
  .delete-block {
    h2 {
      color: #c44c4c;
    }
  }
}
</style>