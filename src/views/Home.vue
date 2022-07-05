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
  <div class="container-fluid">
    <div class="container">
      <img class="img-fluid rounded mx-auto d-block mt-5" src="https://upload.cc/i1/2022/07/02/mtsYDH.png" alt="">
      <div class="row" d-flex>
      <div class="col-md-3" v-for="item in productsPurification" :key="item.id">
      <div class="card h-100 my-3" style="width: 18rem;">
      <img :src="item.imageUrl" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title ">{{ item.title }}</h5>
        <p class="card-text">{{ item.description }}</p>
        <a href="#" class="btn btn-primary"
          :disabled="this.status.loadingItem === item.id"
          @click="addCart(item.id)">加到購物車</a>
      </div>
      </div>
      </div>
      </div>
    </div>
    <div class="container">
      <img class="img-fluid rounded mx-auto d-block mt-5" src="https://upload.cc/i1/2022/07/05/KBRNvh.png" alt="">
      <div class="row" d-flex >
      <div class="col-md-3" v-for="item in productsEnergyHealing" :key="item.id">
      <div class="card h-100 my-3 text-center" style="width: 18rem;">
      <img :src="item.imageUrl" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title ">{{ item.title }}</h5>
        <p class="card-text"> {{ item.description }} </p>
        <a href="#" class="btn btn-primary"
          :disabled="this.status.loadingItem === item.id"
          @click="addCart(item.id)">加到購物車</a>
      </div>
      </div>
      </div>
      </div>
    </div>
    <div class="container">
      <img class="img-fluid rounded mx-auto d-block mt-5" src="https://upload.cc/i1/2022/07/05/FTUa4m.png" alt="">
      <div class="row" d-flex>
      <div class="col-md-3" v-for="item in productsMeditation" :key="item.id">
      <div class="card h-100 my-3" style="width: 18rem;">
      <img :src="item.imageUrl" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title ">{{ item.title }}</h5>
        <p class="card-text">{{ item.description }}</p>
        <a href="#" class="btn btn-primary"
          :disabled="this.status.loadingItem === item.id"
          @click="addCart(item.id)">加到購物車</a>
      </div>
      </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data () {
    return {
      products: {},
      productsPurification: {},
      productsMeditation: {},
      productsEnergyHealing: {},
      status: {
        loadingItem: ''
      }
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
    addCart (id) {
      console.log(id)
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty: 1
      }
      this.$http.post(url, { data: cart })
        .then((res) => {
          this.status.loadingItem = ''
          console.log(res)
          this.getCart()
        })
    }
  },
  created () {
    console.log(process.env.VUE_APP_API, process.env.VUE_APP_PATH)
    this.getProducts()
  }
}
</script>
