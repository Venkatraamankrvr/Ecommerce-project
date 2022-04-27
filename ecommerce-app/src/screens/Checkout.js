import { CheckInventory, deccrementInventoryQuantity, incrementInventoryQuantity } from '../common/common';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router"

import { Footer } from './Footer';
import { HandleAddCoupon } from '../utils/discounts';
import { Header } from './Header';
import { Link } from 'react-router-dom';
import Loader from "react-js-loader";
import { Usercontext } from '../authcontext';
import axios from 'axios'
import { useForm } from "react-hook-form";
import { useStripe } from "@stripe/react-stripe-js";

export const Checkout = () => {
  const [error, setError] = useState(false)
  const stripe = useStripe()
  const { values } = useContext(Usercontext);
  const navigate = useNavigate()
  const {
    register: registerForm,
    handleSubmit, reset,
    formState: { errors },
  } = useForm();
  const [discountState, setDiscountState] = useState(false)
  const [orderDetailsfromStripe, setOrderDetailsfromStripe] = useState()
  const [emptyPage, setEmptyPage] = useState(false)
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(true)
  const [cartData, setCartData] = useState({})
  const [totalAmount, setTotalAmount] = useState(0)
  const [orderDetails, setOrderDetails] = useState({})
  const orderno = useParams().orderno
  const toastId = React.useRef(null)
  const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 4000,
  }

  const discountCounterDecrement = async (discountCode) => {
    const { data } = await axios.post('/api/admin/discount/discountCountersDecrement', { discountCode })
  }

  const getOrderDetailsHandler = async (orderno) => {
    console.log('hihihih', orderno);
    const { data } = await axios.post('/user/orders/orderDetails', { orderno })
    console.log(data);
    setOrderDetailsfromStripe(data)
    console.log(data.OrderDetails.data)
    data.OrderDetails.info.map(p => incrementInventoryQuantity(p._id, p.quantity))

    reset(data.OrderDetails.data)
    if (data.OrderDetails.discountCode) {
      console.log(data.OrderDetails.discountCode);
      discountCounterDecrement(data.OrderDetails.discountCode)
    }
    return orderDetailsfromStripe
  }

  useEffect(() => {
    if (orderno) {
      getOrderDetailsHandler(orderno);
    }
  }, []);

  let userId = values._id
  const discountCounterIncrement = async (discountCode) => {
    const { data } = await axios.post('/api/admin/discount/discountCountersIncrement', { discountCode })
    console.log(data, 'excrvytbuyinujompk,l[----');
  }
  const getCartItems = async (id) => {
    // console.log('hlhnlin');
    setLoading(true)
    const { data } = await axios.get(`/api/carts/${id}`)
    console.log(data, 'excrvytbuyinujompk');
    if (data.products.length > 0) {

      if (data && data.couponCode) {

        const finalData = await HandleAddCoupon(data)
        // console.log(finalData);
        if (finalData) {
          setDiscountState(true)
          setCartData(finalData)
          setCode(finalData.couponCode)
          setLoading(false)
          setTotalAmount(Math.round(data.products.map((product) => (product.productId.price) * product.quantity).reduce((sum, product) => { return sum + product })))

        }
      } else {
        setDiscountState(false)
        setCartData(data)
        setLoading(false)
        setTotalAmount(Math.round(data.products.map((product) => (product.productId.price) * product.quantity).reduce((sum, product) => { return sum + product })))


      }
    }
    else {
      setEmptyPage(true)
    }

  }
  useEffect(() => {

    getCartItems(userId)

  }, [userId])


  // const handleFormSubmit = (e) => {
  //   e.preventDefault()
  //   console.log('hiii varutha');
  //   const { username1, username2, email1, email2, phonenum1, phonenum2, address1, address2, postalcode1, postalcode2 } = e.target.elements

  //   const object = {
  //     userName: username1.value,
  //     userEmail: email1.value,
  //     userPhone: phonenum1.value,
  //     userAddress: address1.value,
  //     userPostalCode: postalcode1.value,
  //     name: username2.value,
  //     email: email2.value,
  //     phone: phonenum2.value,
  //     address: address2.value,
  //     postalCode: postalcode2.value
  //   }
  //   console.log(object);
  // }

  let info = [];
  let stripeInput = [];
  // console.log(cartData);
  let cartDataArray = [];
  cartDataArray.push(cartData);

  if (Object.keys(cartData).length !== 0) {
    console.log(cartDataArray);
    const cartDatas = cartDataArray[0].products.forEach((product) => {
      const cartObject = {};
      const stripeObject = {};
      cartObject.name = product.productId.name;
      cartObject.actualPrice = product.productId.price;
      cartObject.image = product.productId.image;
      cartObject.quantity = product.quantity;
      cartObject.currency = "USD";
      cartObject.description = product.productId.description;
      cartObject.productId = product.productId.sku;
      cartObject.amount = cartData.bill;
      cartObject.discountCode = product.productId.discountCode;
      cartObject.discountValue = product.productId.discountValue;
      cartObject._id = product.productId._id;

      stripeObject.name = product.productId.name;
      stripeObject.amount = (product.productId.NewPrice ? product.productId.price - product.productId.NewPrice : product.productId.price) * 100;
      stripeObject.quantity = product.quantity;
      stripeObject.currency = "USD";
      stripeObject.description = product.productId.description;
      stripeInput.push(stripeObject)
      info.push(cartObject)
    })
  }

  const checkouthandler = async (datas) => {
    console.log(info, stripeInput, '----------------');
    const result = await CheckInventory(info, userId)
    console.log(cartData);
    console.log(result, '----------------------');

    if (result) {
      const toastId = toast.dark("Some Products in your Checkout is OutOfStock");
      setTimeout(() => {
        if (toast.isActive(toastId)) {
          toast.update(toastId, {
            render: "*Please Try Again to Buy... :(",
            onClose: () => {
              navigate('/cart')
            }
          })
        }
      }, 5000);

    }
    else {
      console.log('hihihih');

      try {

        if (cartData.couponCode) {
          console.log(cartData.couponCode);
          discountCounterIncrement(cartData.couponCode)

        }

        info.map(product =>
          deccrementInventoryQuantity(product._id, product.quantity)
        )


        const { data } = await axios.post('/user/orders/orderCheckout',
          {
            userId,
            info,
            datas,
            subTotal: totalAmount,
            total: cartData.bill,
            discountCode: cartData.couponCode
          })

        setLoading(true)
        const sessions = await axios.post("/api/stripe/payement", {
          lineitem: stripeInput, orderDetails: data
        });
        console.log(sessions.data.session.id);
        const { error } = await stripe.redirectToCheckout({
          sessionId: sessions.data.session.id,
        });
        console.log(error);
        setLoading(false)
        console.log('helooooo payment is true');
        console.log('payment3');
      } catch (error) {
        console.log(error, "Error occured while placing order checkout");
      }
    }

  }

  return (

    <div className="main-content">
      <Header />
      <ToastContainer limit={1} position="top-center" autoClose={5000} />
      {loading && <div className={"item"} style={{ marginTop: '200px' }}>
        <Loader type="rectangular-ping" bgColor={"#000000"} title={"Loading *Please wait ... :)"} color={'#000000'} size={100} />
      </div>
      }
      {error && <h1>products were not found</h1>}
      {emptyPage && !loading && <div className="center" style={{ marginTop: '200px' }}>
        <div>
          <h1 className="mb cart-template" >Your Cart is Empty</h1>
          <h3 className='button--center'><Link to='/collections' className="button checkout_btn button--hollow">SHOP NOW</Link></h3>
        </div>
      </div>}
      {!emptyPage && !loading && <section>
        <div className="container">
          <div className="checkout-template page-content">
            <h2>Checkout</h2>
            <div className="checkout-details row">
              <div className="checkout-wrap">
                <div className="checkout-section">
                  <div className="contact-info">
                    <form onSubmit={handleSubmit(checkouthandler)} id="form"
                    >
                      <div className="fieldset">
                        <h3>Contact information</h3>
                        <div className="field-input">
                          <label htmlFor="name">Name</label>
                          <span>
                            <input type="text" className="input-text" name="username1" placeholder="Enter your name"

                              // defaultValue={orderDetailsfromStripe && orderDetailsfromStripe.OrderDetails.data.userName}

                              {...registerForm("userName", {
                                required: true,
                              })}
                            />{" "}
                            {errors.userName && (
                              <p class="error1">*Please enter userName</p>
                            )}
                          </span>
                        </div>
                        <div className="field-input">
                          <label htmlFor="name">Email Id</label>
                          <span>
                            <input type="email" className="input-text" name="email1" placeholder="Enter your email id"

                              // defaultValue={orderDetailsfromStripe && orderDetailsfromStripe.OrderDetails.data.userEmail}

                              {...registerForm("userEmail", {
                                required: true,
                              })}
                            />{" "}
                            {errors.userEmail && (
                              <p class="error1">*Please enter the email address of the user</p>)}
                          </span>
                        </div>
                        <div className="field-input">
                          <label htmlFor="name">Phone</label>
                          <span>
                            <input type="num" className="input-text" placeholder="Enter your phone no." name="phonenum1" minLength="10"

                              // defaultValue={orderDetailsfromStripe && orderDetailsfromStripe.OrderDetails.data.userContactNumber}

                              {...registerForm("userContactNumber", {
                                required: true,
                              })}
                            />{" "}
                            {errors.userContactNumber && (
                              <p class="error1">*Please enter the contact number</p>)}
                          </span>
                        </div>
                        <div className="field-input">
                          <label htmlFor="name">Address</label>
                          <span>
                            <input type="text" className="input-text" placeholder="Enter your address" name="address1" required minLength="8"

                              // defaultValue={orderDetailsfromStripe && orderDetailsfromStripe.OrderDetails.data.userContactAddress}

                              {...registerForm("userContactAddress", {
                                required: true,
                              })}
                            />{" "}
                            {errors.userContactAddress && (
                              <p class="error1">*Please enter the user address</p>)}
                          </span>
                        </div>
                        <div className="field-input">
                          <label htmlFor="name">Postal Code</label>
                          <span>
                            <input type="text" className="input-text" placeholder="Enter your postal code" name="postalcode1" required minLength="6" maxLength="6"

                              // defaultValue={orderDetailsfromStripe && orderDetailsfromStripe.OrderDetails.data.userPostalCode}

                              {...registerForm("userPostalCode", {
                                required: true,
                              })}
                            />{" "}
                            {errors.userPostalCode && (
                              <p class="error1">*Please enter the postal address</p>)}
                          </span>
                        </div>
                      </div>

                      <div className="fieldset">
                        <h3>Shipping Address</h3>
                        <div className="field-input">
                          <label htmlFor="name">Name</label>
                          <span>
                            <input type="text" className="input-text" placeholder="Enter your name" name="username2" required minLength="3"

                              // defaultValue={orderDetailsfromStripe && orderDetailsfromStripe.OrderDetails.data.shippingName}

                              {...registerForm("shippingName", {
                                required: true,
                              })}
                            />{" "}
                            {errors.shippingName && (
                              <p class="error1">*Please enter the user details</p>)}

                          </span>
                        </div>
                        <div className="field-input">
                          <label htmlFor="name">Email Id</label>
                          <span>
                            <input type="email" className="input-text" placeholder="Enter your email id" name="email2" required

                              // defaultValue={orderDetailsfromStripe && orderDetailsfromStripe.OrderDetails.data.shippingEmail}

                              {...registerForm("shippingEmail", {
                                required: true,
                              })}
                            />{" "}
                            {errors.shippingEmail && (
                              <p class="error1">*Please enter the email address</p>)}
                          </span>
                        </div>
                        <div className="field-input">
                          <label htmlFor="name">Phone</label>
                          <span>
                            <input type="text" className="input-text" placeholder="Enter your phone no." name="phonenum2" required minLength="10"

                              // defaultValue={orderDetailsfromStripe && orderDetailsfromStripe.OrderDetails.data.shippingPhoneNumber}

                              {...registerForm("shippingPhoneNumber", {
                                required: true,
                              })}
                            />{" "}
                            {errors.shippingPhoneNumber && (
                              <p class="error1">*Please enter the contact address</p>)}
                          </span>
                        </div>
                        <div className="field-input">
                          <label htmlFor="name">Address</label>
                          <span>
                            <input type="text" className="input-text" placeholder="Enter your address" name="address2" required

                              // defaultValue={orderDetailsfromStripe && orderDetailsfromStripe.OrderDetails.data.shippingAddress}

                              {...registerForm("shippingAddress", {
                                required: true,
                              })}
                            />{" "}
                            {errors.shippingAddress && (
                              <p class="error1">*Please enter the shippingAddress </p>)}
                          </span>
                        </div>
                        <div className="field-input">
                          <label htmlFor="name">Postal Code</label>
                          <span>
                            <input type="text" className="input-text" placeholder="Enter your postal code" name="postalcode2" required minLength="6" maxLength='6'

                              // defaultValue={orderDetailsfromStripe && orderDetailsfromStripe.OrderDetails.data.shippingPostalCode}

                              {...registerForm("shippingPostalCode", {
                                required: true,
                              })}
                            />{" "}
                            {errors.shippingPostalCode && (
                              <p class="error1">*Please enter the postal address</p>)}
                          </span>
                        </div>
                        <div className="action-btn">
                          <button
                            className="button checkout_btn button--hollow" type="submit"
                            form="form"
                          >
                            Proceed To Payment
                          </button>
                          <Link to="/cart" className="button secondary-btn">Return to Cart</Link>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="order-summary-right">
                    <div className="order-summary__sections">
                      <div className="">
                        <div className="order-summary__section__content">
                          <table className="product-table">
                            <thead className="product-table__header">
                              <tr>
                                <th><span className="visually-hidden">Image</span></th>
                                <th><span className="visually-hidden">Description</span></th>
                                <th><span className="visually-hidden">Quantity</span></th>
                                <th><span className="visually-hidden">Price</span></th>
                              </tr>
                            </thead>
                            <tbody>
                              {!loading && cartData.length !== 0 && cartData.products.map((item, index) => <tr className="product" key={index} >
                                <td className="product__image" >
                                  <div className="product-thumbnail " >
                                    <div className="product-thumbnail__wrapper"  >
                                      <img alt={item.productId.name} className="product-thumbnail__image" src={item.productId.image} />
                                    </div>
                                    <span className="product-thumbnail__quantity">{item.quantity}</span>
                                  </div>
                                </td>
                                <td className="product__description" scope="row">
                                  <span className="product__description__name">{item.productId.name}</span>
                                  <span className="product__description__variant"></span>
                                </td>
                                <td className="product__quantity">
                                  <span className="visually-hidden">{item.quantity}</span>
                                </td>
                                <td className="product__price">
                                  <span className="order-summary__emphasis">

                                    {item.productId.discountCode && <div><del>${item.productId.price * item.quantity}</del></div>}
                                    {item.productId.discountCode && <div>${Math.round((item.productId.price - item.productId.NewPrice) * item.quantity)}</div>}
                                    {!item.productId.discountCode && <div>${item.productId.price * item.quantity}</div>}
                                  </span>
                                </td>
                              </tr>
                              )}

                            </tbody>
                          </table>
                        </div>

                        {!loading && cartData.length !== 0 && <>

                          <p className="no-margin evenly-align mt-20">
                            <span className="cart-total-quantity">{cartData.products.length} Items</span>
                            <span className="cart-total-price">
                              <span>${totalAmount}.00</span>
                            </span>
                          </p>
                          <div className="cart-subtotal evenly-align cart__total">
                            <span className="cart-subtotal__title">Discount</span>
                            <strong><span className="cart-subtotal__price">


                              ${cartData.couponCode ? <>{totalAmount - cartData.bill}</> : 0}.00
                            </span></strong>
                          </div>
                          <div className="cart-subtotal evenly-align cart__total">
                            <span className="cart-subtotal__title">Tax(GST-0%)</span>
                            <strong><span className="cart-subtotal__price">


                              $0.00
                            </span></strong>
                          </div>
                          <div className="cart-subtotal evenly-align cart__total">
                            <span className="cart-subtotal__title">Shipping</span>
                            <strong><span className="cart-subtotal__price">


                              $0.00
                            </span></strong>
                          </div>
                          <div className="cart-subtotal evenly-align cart__total">
                            <span className="cart-subtotal__title">Subtotal</span>
                            <strong><span className="cart-subtotal__price">
                              ${cartData.bill}
                              .00</span>
                            </strong>
                          </div>
                          <div className="cart__total evenly-align separator">
                            <span className="cart__total-text">Total:</span>
                            <strong className="cart__total-price text-lg">
                              <span>
                                {cartData.bill}
                              </span>
                              <span> USD</span>
                            </strong>
                          </div>
                        </>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>}
      <Footer />
    </div>
  )
}