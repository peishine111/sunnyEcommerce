<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <button type="button" class="getcoupon mx-5" @click="getCoupon">點我抽優惠券</button>
    <h3 class="d-inline-block mx-5">優惠券代碼:</h3>
    <h1 class="d-inline-block" v-text="this.coupon"></h1>
    <div class="row">
    <div class="row mt-4 col-md-6">
      <!-- 購物車列表 -->
      <div>
        <div class="sticky-top">
          <table class="table align-middle">
            <thead>
              <tr>
                <th>品名</th>
                <th style="width: 110px">數量</th>
                <th>單位</th>
                <th class="text-end">單價</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            <template v-if="cart.carts">
              <tr v-for="item in cart.carts" :key="item.id">
                <td>
                  {{ item.product.title }}
                  <div class="text-success" v-if="item.coupon">
                    已套用優惠券
                  </div>
                </td>
                <td>
                  <div class="input-group input-group-sm d-flex flex-direction-row">
                    <input type="number" class="form-control"
                      min="1"
                      :disabled="item.id === status.loadingItem"
                      @change="updateCart(item)"
                      v-model.number="item.qty">
                  </div>
                </td>
                <td><div class="input-group">/ {{ item.product.unit }}</div></td>
                <td class="text-end">
                  <small v-if="cart.final_total !== cart.total" class="text-success">折扣價：</small>
                  {{ $filters.currency(item.final_total) }}
                </td>
                <td>
                  <button type="button" class="btn btn-outline-danger btn-sm"
                          :disabled="status.loadingItem === item.id"
                          @click="removeCartItem(item.id)">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            </template>
            </tbody>
            <tfoot>
           <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">{{ $filters.currency(cart.total) }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{ $filters.currency(cart.final_total) }}</td>
            </tr>
            </tfoot>
          </table>
          <div class="input-group mb-3 input-group-sm">
            <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                套用優惠碼
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="text-success" v-if="cart.total===0">
                    您的購物車還是空的，請到首頁選購!
                  </div>
    </div>
    <div class="my-5 row justify-content-center col-md-6">
      <Form class="col-md-12" v-slot="{ errors }"
            @submit="createOrder">
        <div class="mb-3">
          <div class="form-floating mb-3">
            <Field type="email" class="form-control" id="floatingInputEmail"
            :class="{ 'is-invalid': errors['email'] }"  name="email"
            placeholder="請輸入 Email" rules="email|required"
            v-model="form.user.email"></Field>
            <label for="floatingInput">Email address</label>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>
        </div>

        <div class="mb-3">
          <div class="form-floating mb-3">
            <Field type="email" class="form-control" id="floatingInputName"
            :class="{ 'is-invalid': errors['姓名'] }" name="姓名"
            placeholder="請輸入姓名" rules="required"
            v-model="form.user.name"></Field>
            <label for="floatingInput">姓名</label>
            <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
          </div>
        </div>

        <div class="mb-3">
          <div class="form-floating mb-3">
            <Field type="email" class="form-control" id="floatingInputPhone"
            :class="{ 'is-invalid': errors['電話'] }" name="電話"
            placeholder="請輸入電話" rules="required"
            v-model="form.user.tel"></Field>
            <label for="floatingInput">電話</label>
            <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
          </div>
        </div>

        <div class="mb-3">
          <div class="form-floating mb-3">
            <Field type="email" class="form-control" id="floatingInputAddress"
            :class="{ 'is-invalid': errors['地址'] }" name="地址"
            placeholder="請輸入地址" rules="required"
            v-model="form.user.address"></Field>
            <label for="floatingInput">收件人地址</label>
            <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
          </div>
        </div>

        <div class="mb-3">
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingInput"
            placeholder="請輸入留言" rules="required"
            v-model="form.message">
            <label for="floatingInput">留言</label>
          </div>
        </div>
        <div class="text-end">
          <button class="btn btn-primary">送出訂單</button>
        </div>
      </Form>
    </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: ''
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      cart: {},
      coupon_code: '',
      coupon: '',
      isClick: true,
      cartTotal: 0
    }
  },
  methods: {
    getProducts () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(url).then((response) => {
        this.products = response.data.products
        console.log('products:', response)
        this.isLoading = false
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
      this.$http.post(url, { data: cart })
        .then((res) => {
          this.status.loadingItem = ''
          console.log(res)
          this.getCart()
        })
    },
    getCart () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = true
      this.$http.get(url).then((response) => {
        console.log(response)
        this.cart = response.data.data
        this.cartTotal = response.data.data.carts.length
        this.isLoading = false
      })
    },
    updateCart (item) {
      console.log('updateCart', item)
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.isLoading = true
      this.status.loadingItem = item.id
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.$http.put(url, { data: cart }).then((res) => {
        console.log(res)
        this.status.loadingItem = ''
        this.getCart()
      })
    },
    removeCartItem (id) {
      this.status.loadingItem = id
      console.log(id)
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.isLoading = true
      this.$http.delete(url).then((response) => {
        this.$httpMessageState(response, '移除購物車品項')
        this.status.loadingItem = ''
        this.getCart()
        this.isLoading = false
        this.$emit('emit-remove-cart-item')
        console.log('emit1')
      })
    },
    addCouponCode () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`
      const coupon = {
        code: this.coupon_code
      }
      this.isLoading = true
      this.$http.post(url, { data: coupon }).then((response) => {
        this.$httpMessageState(response, '加入優惠券')
        this.getCart()
        this.isLoading = false
      })
    },
    createOrder () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`
      const order = this.form
      this.$http.post(url, { data: order })
        .then((res) => {
          console.log(res)
          const orderId = res.data.orderId
          this.$router.push(`/user/checkout/${orderId}`)
        })
    },
    getCoupon () {
      if (this.isClick === true) {
        this.isClick = false
        const num = Math.floor(Math.random() * 3)
        console.log(num)
        if (num === 0 || num === 1) {
          this.coupon = '週年慶9折'
        } else if (num === 2) {
          this.coupon = '週年慶5折'
        }
      }
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  }
}
</script>
