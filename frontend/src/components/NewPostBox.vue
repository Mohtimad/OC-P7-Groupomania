<template>
      <div class="newPost">
      <form id="form">
        <header>
          <h2>Nouveau message<button @click="isBoxOpen = false" >x</button></h2>
          
        </header>
        <div class="imageNewPost">
          <label for="inputPicture"><img v-if="!image" src="../assets/plus_empty.png" alt=""><img v-else :src="image" /></label>
          <input name="image" @change="updatePicture" type="file" id="inputPicture" accept="image/png, image/jpg, image/jpeg">
        </div>
        <div class="newInput">
          <label for="title">Titre</label>
          <input name="title" v-model="title" minlength="3" maxlength="30" id="title" type="text" />
          <label for="comment">Commentaire</label>
          <input name="comment" v-model="comment" id="comment" type="text">
          <div>
            <button @click="uploadPost" type="button">Ajouter</button>
          </div>
        </div>
      </form>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'NewPostBox',
  computed: {
    ...mapState(['api', 'user', 'isBoxOpen'])
  },
  data() {
    return {
     image: "",
     comment: "",
     title: ""
    }
  },
  methods: {
    createImage(file) {
      const reader = new FileReader();
      const vm = this;
      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file)
    },
    updatePicture(e) {
      const file = e.target.files || e.dataTransfer.files;
      if (!file.length) {
        return 
      }
      this.image = file[0]
      this.createImage(file[0]);
    },
    uploadPost() {
    let formData = new FormData(document.getElementById("form"))
    formData.append('userId', this.user.id)
    formData.append('username', this.user.username)
     fetch(this.api + "post/", {
        method: "POST",
        headers: { 
            'Accept': 'application/json', 
            'Authorization': 'Bearer ' + (this.user.token), 
        },
        body: formData
      })
      .then((res) => {
          if (res.ok) {
              return res.json();
          }
          throw new Error(res.status);
      })
      .then(() => {
        this.$store.state.isBoxOpen = false;
        this.$parent.updatePosts()
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
}
</script>

<style scoped lang="scss">

  .newPost {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    max-width: 1290px;
    &::before {
      content: "";
      position: fixed;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
      background-color: white;
      opacity: .3;
    }
    header {
        position: absolute;
        top: -5px;
        button {
          position: absolute;
          right: 15px;
          }
    }
    form {
      z-index: 9999;
      position: fixed;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      padding: 20px;
      max-width: 80%;
      background-color: #607888;
      border: solid #284048;
      border-width: 4px 8px;
      border-radius: 30px;
      box-shadow: #575757 10px 10px 10px;
      button {
          margin-top: 10px;
      }
      .newInput {
        display: flex;
        flex-direction: column;
        text-align: center;
        padding: 20px;
        color: #F8F8F8;
      }
      .imageNewPost {
        height: 100px;
        width: 100px;
        border: solid #284048;
        border-radius: 10px;
        border-width: 2px;
        overflow: hidden;
        label
        img {
          width: 100%;
          height: 100%;
        }
        #inputPicture {
          display: none;
        }
      }
    }
  }
</style>
