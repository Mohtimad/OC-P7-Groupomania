<template>
  <header>
      <div class="banner-line-top">
        <div class="grayLine">
          <Logo />
        </div>
      </div>
      <div class="banner-line-bottom">
        <Nav />
      </div>
  </header>
</template>

<script>
import Logo from '../Logo.vue'
import Nav from '../Nav.vue'
export default {
  name: 'Header',
  components: {
    Logo,
    Nav
  }
}
</script>

<style lang="scss">
  header {
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
    }
    .banner-line-bottom {
      position: relative;
        height: 40px;
        background-color: #284048;
        width: 75%;
        transform: skewX(-45deg);
        left: -20px;
        border-radius: 0 0 30px 0;
      }
  }
</style>