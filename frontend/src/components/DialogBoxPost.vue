<template>
  <div>
        <!-- for new post -->
        <div v-if="boxPost.value == 'new-post_0'" class="dialog-box-post">
          <form id="formPost">
            <div class="header-box">
            <h2>Nouveau</h2>
              </div>
              <div  v-if="image != ''" class="image-block">
                <img :src="image" />
              </div>
              <div class="inputs">
                <label for="title">Titre</label>
                <input name="title" id="title" type="text" />
                <label for="desc">Description</label>
                <input name="desc" id="desc" type="text">
              <div>
                  <input name="image" type="file" id="input-image" @change="updatePicture" accept="image/png, image/jpg, image/jpeg">
                  <input type="button" value="Choisir une image" onclick="document.getElementById('input-image').click();" />
                  <button @click="submitData" type="button">Valider</button>
                  <button type="button" @click="boxPost.value='closed'">Annuler</button>
              </div>
              </div>
          </form>`
      </div>
      
      <!-- for edit post-->
      <div v-else-if="boxPost.value.split('_')[0] === 'edit-post'" class="dialog-box-post">
          <form id="formPost">
            <div class="header-box">
            <h2>Modifier</h2>
              </div>
              <div class="image-block">
                <img :src="image" />
              </div>
              <div class="inputs">
                <label for="title">Titre</label>
                <input v-model="title" name="title" id="title" type="text" />
                <label for="desc">Description</label>
                <input  v-model="desc" name="desc" id="desc" type="text">
              <div>
                  <input name="image" type="file" id="input-image" @change="updatePicture" accept="image/png, image/jpg, image/jpeg">
                  <input type="button" value="Choisir une image" onclick="document.getElementById('input-image').click();" />
                  <button @click="submitData" type="button">Valider</button>
                  <button type="button" @click="boxPost.value = 'closed'">Annuler</button>
              </div>
              </div>
          </form>`
      </div>

            <!-- for delete post-->
      <div v-else-if="boxPost.value.split('_')[0] == 'delete-post'" class="dialog-box-post">
          <form id="formPost">
            <h2>Supprimer</h2>
              <div>
                  <button @click="submitData" type="button">Valider</button>
                  <button type="button" @click="boxPost.value = 'closed'">Annuler</button>
              </div>
          </form>
      </div>

            
      <!-- for new comment-->
      <div v-else-if="boxPost.value.split('_')[0] == 'new-comment'" class="dialog-box-post">
          <form id="formPost">
            <div class="header-box">
            <h2>Commenter</h2>
              </div>
              <div class="inputs">
                <label for="comment">Commentaire</label>
                <input v-model="comment" name="comment" id="comment" type="text">
              <div>
                  <button @click="submitData" type="button">Valider</button>
                  <button type="button" @click="boxPost.value = 'closed'">Annuler</button>
              </div>
              </div>
          </form>`
      </div>

            <!-- for edit comment-->
      <div v-else-if="boxPost.value.split('_')[0] == 'edit-comment'" class="dialog-box-post">
          <form id="formPost">
            <div class="header-box">
            <h2>Modifier</h2>
              </div>
              <div class="inputs">
                <label for="comment">Commentaire</label>
                <input name="comment" id="comment" type="text">
              <div>
                  <button @click="submitData" type="button">Valider</button>
                  <button type="button" @click="boxPost.value = 'closed'">Annuler</button>
              </div>
              </div>
          </form>`
      </div>

                  <!-- for delete post-->
      <div v-else-if="boxPost.value.split('_')[0] == 'delete-comment'" class="dialog-box-post">
          <form id="formPost">
            <h2>Supprimer</h2>
              <div>
                  <button @click="submitData" type="button">Valider</button>
                  <button type="button" @click="boxPost.value = 'closed'">Annuler</button>
              </div>
          </form>
      </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'DialogBoxPost',
  computed: {
    ...mapState(['api', 'user', 'boxPost'])
  },
  beforeMount() {
      const action = this.boxPost.value.split('_')[0]
      const actualElt = this.boxPost.value.split('_')[1]
      this.actualElt = parseInt(actualElt,10)
      switch (action) {
        case 'new-post':
          this.apiMethod = 'POST'
          this.apiRoute = '/post' + '/'
          break;
        case 'edit-post':
          var eltImage = document.querySelector('#post-id_'+actualElt+' img')
          this.title = document.querySelector('#post-id_'+actualElt+' h2').textContent
          eltImage.removeAttribute('value')
          this.image = eltImage.getAttribute('src')
          this.desc = document.querySelector('#post-id_'+actualElt+' .description').textContent
          this.apiMethod = 'PUT'
          this.apiRoute = '/post' + '/' + actualElt
          break;
        case 'delete-post':
          this.apiMethod = 'DELETE'
          this.apiRoute = '/post' + '/' + actualElt
          break;
        case 'new-comment':
          this.apiMethod = "POST"
          this.apiRoute = '/comment' + '/' + actualElt;
          break;
        case 'edit-comment':
          this.title = document.querySelector('#post-id_'+actualElt+' h2').textContent
          this.apiMethod = "PUT"
          this.apiRoute = '/comment' + '/' + actualElt
          break;
        case 'delete-comment':
          this.apiMethod = "DELETE"
          this.apiRoute = '/comment' + '/' + actualElt
          break;
      }
    },
  data() {
    return {
      image : '',
      title: '',
      desc: '',
      comment: '',
      apiRoute: '/',
      apiMethod: 'POST',
      actualElt: null,

    }
  },
  methods: {
    /* Check image */
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

    /* Submit */
    submitData() {
    let headers = { 'Authorization': 'Bearer ' + (this.user.token) }
    const action = this.boxPost.value.split('_')[0]
    let formData = {}
    if (action === 'new-post' || action === 'edit-post') {
      formData = new FormData(document.getElementById("formPost"))
      formData.append('userId', parseInt(this.user.id,10))
    } else {
      formData["userId"] = parseInt(this.user.id,10)
      if (action === 'edit-comment' || action === 'new-comment') {
        formData["comment"] = this.comment
      }
      formData = JSON.stringify(formData)
      headers['Accept'] = 'application/json, text/plain, */*'
      headers['Content-Type'] = 'application/json' 
    }
    console.log(formData)
    fetch(this.api.url + this.apiRoute, {
          method: this.apiMethod,
          headers: headers,
          body: formData
      })
      .then((res) => {
          if (res.ok) {
              return res.json();
          }
          throw new Error(res.status);
      })
      .then((res) => {
        console.log(res)
        this.boxPost.value = 'closed'
      })
      .catch((err) => {
          console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .dialog-box-post {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1290px;
    left: 50%;
    top: 15%;
    /* Opac background */
    &::before {
      content: "";
      position: fixed;
      top: 0; left: 0; right:  0; bottom: 0;
      width: 100%;
      height: 100%;
      background-color: #fff;
      opacity: .3;
    }
    .header-box {
      width: 100%;
    }
    form {
      z-index: 999;
      position: fixed;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      padding: 0 20px 20px 20px;
      background-color: #607888;
      border: solid #284048;
      border-width: 2px;
      border-radius: 3px;
      box-shadow: #575757 10px 10px 10px;
      .image-block {
        background-color: #ffffff;
        text-align: center;
        height: 200px;
        width: 200px;
        border: solid #284048;
        border-radius: 10px;
        border-width: 2px;
        overflow: hidden;
        img {
          max-width: 100%;
          max-height: 100%;
          cursor: pointer;
        }
      }
      .inputs {
        width: max-content;
        display: flex;
        flex-direction: column;
        text-align: center;
        padding: 20px;
        color: #F8F8F8;
        #input-image {
          display: none; 
        }
        button {
          margin-top: 10px;
        }
      }
    }
  }
</style>
