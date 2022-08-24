<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <div class="navbar-nav">
        <router-link class="navbar-brand" to="/">Sunny</router-link>
        <router-link class="nav-link" to="/user/cart"><i class="bi bi-cart-fill"></i>購物車</router-link>
        <router-link class="nav-link" to="/user/author">關於我們</router-link>
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
