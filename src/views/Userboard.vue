<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <div class="navbar-nav">
        <router-link class="navbar-brand" to="/">Sunny</router-link>
        <router-link class="nav-link" to="/user/cart"><i class="bi bi-cart-fill"><div class="cartTotal">{{ cartTotal }}</div></i>購物車</router-link>
        <router-link class="nav-link" to="/user/author">關於我們</router-link>
      </div>
    </div>
  </nav>
  <div class="container-fluid mt-3 position-relative">
    <ToastMessages></ToastMessages>
    <router-view @emit-remove-cart-item="removeCartItem" />
  </div>
</template>

<script>
import emitter from '@/methods/emitter'
import ToastMessages from '@/components/ToastMessages.vue'
export default {
  data () {
    return {
      cartTotal: 0
    }
  },
  components: {
    ToastMessages
  },
  provide () {
    return {
      emitter
    }
  },
  methods: {
    getCart () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(url).then((response) => {
        console.log(response)
        this.cartTotal = response.data.data.carts.length
      })
    },
    removeCartItem () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(url).then((response) => {
        console.log(response)
        this.cartTotal = response.data.data.carts.length
        console.log('emit2')
      })
    }
  },
  created () {
    this.getCart()
  }
}
</script>
