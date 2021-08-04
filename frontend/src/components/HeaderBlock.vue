<template>
  <header>
      <div class="banner-line-top">
        <div class="grayLine">
          <div id="logo">
            <a href="#/"><img src="../assets/logo.png" alt="Logo Groupomania"></a>
          </div>
        </div>
      </div>
      <div class="banner-line-bottom">
        <NavBar />
      </div>
  </header>
</template>

<script>
import NavBar from './NavBar.vue'
export default {
  name: 'HeaderBloc',
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
  header {
    margin-top: -10px;
    z-index: 0;
    max-width: 1920px;
    width: 100%;
    overflow: hidden;
    .banner-line-top {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 60px;
      background-color: #284048
    }
    .grayLine {
      height: 30px;
      background-color: #607888;
      border-bottom: solid #B8B8C0 2px;
      border-top: solid #505050 2px;
      #logo {
        height: 100%;
        width: 100%;
        position: relative;
        margin-left: 20px;
        img {
            position: absolute;
            height: 100%;
        }
      }
    }
    .banner-line-bottom {
      position: relative;
        min-height: 40px;
        background-color: #284048;
        width: 90%;
        transform: skewX(-45deg);
        left: -20px;
        border-radius: 0 0 30px 0;
      }
  }
</style>