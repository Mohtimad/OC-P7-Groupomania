<template>
    <div id="logo">
        <a href="#/"><img src="../../public/logo.png" alt="Logo Groupomania"></a>
    </div>
</template>

<script>
export default {
  name: 'Logo'
}
</script>

<style lang="scss">
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
</style>