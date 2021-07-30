<template>
    <div class="newPost">
      <form>
        <div class="imageNewPost">
          <label for="inputPicture"><img v-if="!image" src="../assets/plus_empty.png" alt=""><img v-else :src="image" /></label>
          <input @change="updatePicture" type="file" id="inputPicture" accept="image/png, image/jpg, image/jpeg">
        </div>
        <div class="newInput">
          <label for="title">Titre</label>
          <input minlength="3" maxlength="30" id="title" type="text" />
          <label for="comment">Commentaire</label>
          <input id="comment" type="text">
          <button>Ajouter</button>
        </div>
      </form>
    </div>
</template>

<script>
export default {
  name: 'NewPostBox',
  data() {
    return {
     image: "",
    }
  },
  methods: {
    createImage(file) {
      var reader = new FileReader();
      var vm = this;
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
      this.createImage(file[0]); 
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
      opacity: .8;
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
      margin: 50px;
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
