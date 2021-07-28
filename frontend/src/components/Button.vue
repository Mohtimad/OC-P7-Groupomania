<template>
    <div class="button">
        <button>{{ text }}</button>
    </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: {
        type: String
    }
}
}
</script>

<style lang="scss">
    button {
        width: 100%;
    }
</style>