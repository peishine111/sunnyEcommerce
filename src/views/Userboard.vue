<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <div class="navbar-nav">
        <router-link class="navbar-brand" to="/">Sunny</router-link>
        <router-link class="nav-link" to="/user/cart">購物車</router-link>
        <router-link class="nav-link" to="/user/author">認識Sunny</router-link>
        <router-link class="nav-link" to="/login">後臺管理</router-link>
      </div>
    </div>
  </nav>
  <div class="container-fluid mt-3 position-relative">
    <ToastMessages></ToastMessages>
    <router-view/>
  </div>
</template>

<script>
import emitter from '@/methods/emitter'
import ToastMessages from '@/components/ToastMessages.vue'
export default {
  components: {
    ToastMessages
  },
  provide () {
    return {
      emitter
    }
  },
  created () {
  }
}
</script>
