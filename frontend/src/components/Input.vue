<template>
    <div class="input">
        <label :for="id">{{ text }}</label>
        <input :id="id" :type="type" />
    </div>
</template>

<script>
export default {
  name: 'Input',
  props: ['id', 'type', 'text']
}
</script>

<style lang="scss">
.input {
    display: flex;
    flex-direction: column;
}
</style>