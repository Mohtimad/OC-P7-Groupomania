<template>
  <div class="profile">
    <h1>{{ $store.state.user.username }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Profile'
}
</script>
