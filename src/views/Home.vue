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
  <div class="container-fluid">
    <div class="container">
      <img class="img-fluid rounded mx-auto d-block mt-5 banner1" src="https://imgur.com/hJ8Xq0s.png" alt="">
      <div class="row" d-flex>
      <div class="col-md-3" v-for="item in productsPurification" :key="item.id">
      <div class="card h-100 my-3">
      <img :src="item.imageUrl" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title ">{{ item.title }}</h5>
        <p class="card-text">{{ item.description }}</p>
        <button type="button" class="btn btn-secondary"
                        @click="getProduct(item.id)">
                  查看更多
                </button>
        <a href="#" class="btn btn-primary"
          :disabled="this.status.loadingItem === item.id"
          @click="addCart(item.id)">加到購物車</a>
      </div>
      </div>
      </div>
      </div>
    </div>
    <div class="container">
      <img class="img-fluid rounded mx-auto d-block mt-5 banner2" src="https://imgur.com/bmb8aaY.png" alt="">
      <div class="row" d-flex >
      <div class="col-md-3" v-for="item in productsEnergyHealing" :key="item.id">
      <div class="card h-100 my-3 text-center">
      <img :src="item.imageUrl" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title ">{{ item.title }}</h5>
        <p class="card-text"> {{ item.description }} </p>
        <button type="button" class="btn btn-secondary"
                        @click="getProduct(item.id)">
                  查看更多
                </button>
        <a href="#" class="btn btn-primary"
          :disabled="this.status.loadingItem === item.id"
          @click="addCart(item.id)">加到購物車</a>
      </div>
      </div>
      </div>
      </div>
    </div>
    <div class="container">
      <img class="img-fluid rounded mx-auto d-block mt-5 banner2" src="https://imgur.com/kKFy5ns.png" alt="">
      <div class="row" d-flex>
      <div class="col-md-3" v-for="item in productsMeditation" :key="item.id">
      <div class="card h-100 my-3">
      <img :src="item.imageUrl" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title ">{{ item.title }}</h5>
        <p class="card-text">{{ item.description }}</p>
        <button type="button" class="btn btn-secondary"
                        @click="getProduct(item.id)">
                  查看更多
                </button>
        <a href="#" class="btn btn-primary"
          :disabled="this.status.loadingItem === item.id"
          @click="addCart(item.id)">加到購物車</a>
      </div>
      </div>
      </div>
      </div>
    </div>
  </div>
  <div class="footer d-flex justify-content-center">
    <a href="#" class="my-5 d-block text-decoration-none link-dark">©2023 Sunny Cheng. All Rights Reserved.</a>
  </div>
  <div class="container-fluid mt-3 ">
    <ToastMessages></ToastMessages>
  </div>
</template>

<script>
// @ is an alias to /src
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
  data () {
    return {
      products: {},
      productsPurification: {},
      productsMeditation: {},
      productsEnergyHealing: {},
      status: {
        loadingItem: ''
      },
      cartTotal: 0
    }
  },
  name: 'Home',
  methods: {
    getProducts () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(url).then((response) => {
        this.productsPurification = response.data.products.filter((product) => product.category === '淨化')
        this.productsEnergyHealing = response.data.products.filter((product) => product.category === '能量療法')
        this.productsMeditation = response.data.products.filter((product) => product.category === '靜坐')
        console.log('products:', this.productsPurification)
      })
    },
    getProduct (id) {
      this.$router.push(`/user/product/${id}`)
    },
    addCart (id) {
      console.log(id)
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty: 1
      }
      this.isLoading = true
      this.$http.post(url, { data: cart })
        .then((res) => {
          this.isLoading = false
          this.$httpMessageState(res, '加入購物車')
          this.status.loadingItem = ''
          console.log(res)
          this.$router.push('/user/cart')
          this.getProducts()
        })
    },
    getCart () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(url).then((response) => {
        console.log(response)
        this.cartTotal = response.data.data.carts.length
      })
    }
  },
  created () {
    console.log(process.env.VUE_APP_API, process.env.VUE_APP_PATH)
    this.getProducts()
    this.getCart()
  }
}
</script>
