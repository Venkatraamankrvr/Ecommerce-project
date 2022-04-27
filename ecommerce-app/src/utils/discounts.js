import axios from "axios"
// import products from '../Data/Product';
import { useState } from "react"

export const HandleAddCoupon = async (cartData) => {
  // console.log(cartData);
  const { data } = await axios.post('/api/admin/discount/verifyCoupon', { cartData })
  if (data) {
    let CurrentCoupon = data.code
    if (CurrentCoupon) {
      if (data.status === "enable") {
        data.startDate = Date.parse(data.startDate)
        data.endDate = Date.parse(data.endDate)


        if (new Date().getTime() > data.startDate && new Date().getTime() < data.endDate) {

          let discountValue = data.value / 100
          if (data.products1.length === 0) {

            // all products
            cartData.products.map(p => p.productId.NewPrice = p.productId.price * discountValue)
            cartData.products.map(p => p.productId.discountValue = discountValue)
            cartData.products.map(p => p.productId.discountCode = CurrentCoupon)


          }

          else {
            //   // specific one

            const cartProductId = cartData.products.map(product => product.productId._id.toString())

            const discountProductId = data.products1.map(product => product.productId._id.toString())

            const comparison = (arr1, arr2) => {
              const finalArray = [];
              arr1.forEach((e1) => arr2.forEach((e2) => {
                if (e1 === e2) {
                  finalArray.push(e1)

                }
              }))

              return finalArray;
            }
            const discountableProductIds = comparison(cartProductId, discountProductId)
            let nonDiscountableProductIds = cartProductId.filter((el) => !discountableProductIds.includes(el));
            if (discountableProductIds.length === 0) {
              cartData.error = `There is no discountable product for this "${cartData.couponCode}" Coupon in Your Cart`
              cartData.couponCode = '';
              cartData.discount = [];
              return cartData
            } else {
              let discountableproductdetails = [];
              cartData.products.forEach((e1) => {
                discountableProductIds.forEach((e2) => {
                  if (e1.productId._id === e2) {
                    discountableproductdetails.push(e1)
                    e1.productId.NewPrice = e1.productId.price * discountValue
                    e1.productId.discountCode = CurrentCoupon
                    e1.productId.discountValue = discountValue
                  }
                })
              })
              let nonDiscountableproductdetails = [];
              cartData.products.forEach((e1) => {
                nonDiscountableProductIds.forEach((e2) => {
                  if (e1.productId._id === e2) {
                    nonDiscountableproductdetails.push(e1)
                    e1.productId.NewPrice = 0
                    e1.productId.discountCode = ""
                    e1.productId.discountValue = 0
                  }
                })
              })


            }

          }
          let totalAmount = Math.round(cartData.products.map((product) => (product.productId.price - product.productId.NewPrice) * product.quantity).reduce((sum, product) => sum + product, 0))

          cartData.bill = totalAmount;

          return cartData
        }
        else {
          // coupon time is expired 
          console.log('coupon time is expired ');
          cartData.error = `"${cartData.couponCode}" coupon were Expired`
          cartData.couponCode = ''
          cartData.discount = []
          return cartData

        }

      }
      else {
        // status is disabled 
        console.log('status of discount is disable');
        cartData.error = `"${cartData.couponCode}" coupon were disabled`
        cartData.couponCode = ''
        cartData.discount = []
        return cartData

      }

    } else {
      // coupon does not exists


      cartData.couponCode = ''
      cartData.discount = []
      cartData.error = "coupon does not exists"
      return cartData
    }
  }



}
