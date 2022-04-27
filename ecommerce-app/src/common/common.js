import axios from "axios"

export const CheckInventory = async (cartData, userId) => {
  const result = []
  console.log(cartData)
  await Promise.all(
    cartData.map(async (cart, index) => {
      const { data } = await axios.get(`/api/products/${cart._id}`)
      if (data.countInStock >= cart.quantity && data.status === 'available') {
        result.push(cart)
      }
    }))

  if (result.length === 0) {
    //delete entire cart collection
    console.log('delete entire cart collection');
    const { data } = await axios.post('/api/carts/deletedocumentcart', { userId: userId });
    console.log(data);

    return true;
  } else if (result.length !== cartData.length) {
    //Rewrite the product array in cart collection
    console.log('Rewrite the product array in cart collection');
    const { data } = await axios.get(`/api/carts/${userId}`)
    console.log(result);


    console.log(data);
    let final = []
    data.products.forEach((e) => {
      result.forEach((e1) => {
        if (e.productId._id === e1._id) {
          final.push(e)
        }
      })
    })
    console.log(final)
    const datas = await axios.post('/api/carts/cartUpdates', { userId: userId, products: final })
    console.log(datas);
    return true;
  }
  else {
    console.log('return nothing');
    return false
  }
  // return result
}

export const updateProductQuantity = async (productID, quantity) => {
  const result = []

  return result
}
export const deccrementInventoryQuantity = async (productID, quantity) => {
  console.log(productID, quantity);
  const { data } = await axios.post('/api/products/inventorydecrement', { productId: productID, quantity: quantity })
  console.log(data);
}

export const incrementInventoryQuantity = async (productID, quantity) => {
  console.log(productID, quantity);
  const { data } = await axios.post('/api/products/inventoryincrement', { productId: productID, quantity: quantity })
  console.log(data);
}

export const productVerification = async (userId, productId, quantity) => {
  const { data } = await axios.get(`/api/products/${productId}`)
  const canBuy = data.countInStock >= quantity && quantity > 0 && data.status === "available" && quantity % 1 === 0
  if (canBuy) {
    const { data } = await axios.post(`/api/carts/addtocart/${userId}`, { productId, quantity })
    return data.error = true
  } else {
    return data.error = false
  }
}


export const updateAllQuantity = async (userId, productId, qty, sku) => {
  const { data } = await axios.get(`/api/products/${productId}`)
  const canBuy = data.countInStock > qty && qty > 0 && data.status === "available" && qty % 1 === 0
  console.log(canBuy)
  if (canBuy) {
    const { data } = await axios.put(`/api/carts/${userId}`, { sku, qty })
  } else {
    return data.error = "Can't buy this quantity"
  }

}

