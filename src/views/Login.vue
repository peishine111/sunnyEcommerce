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
  <div class="container mt-5">
    <form class="row justify-content-center" @submit.prevent="signIn">
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="Email address"
          required
          autofocus
          v-model="user.username"
          />
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="sr-only">Password</label>
          <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          required
          v-model="user.password"
          />
          </div>
          <div class="text-end mt-4">
              <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
            </div>
        </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signIn () {
      console.log('sign in')
      // console.log(this.user.password)
      const api = `${process.env.VUE_APP_API}/admin/signin`
      console.log(api)
      this.$http.post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data
            document.cookie = `hexToken=${token};expires=${new Date(expired)}`
            console.log(res)
            this.$router.push('/dashboard/products')
          }
        })
    }
  }
}
</script>
