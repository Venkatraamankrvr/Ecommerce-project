import { Link, UseHistory } from "react-router-dom";
import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
// import ReactLoading from 'react-loading';
// import { addToCart, getCartItems } from "../Redux/Actions/cartActions";
import { checkInventory, productVerification } from "../common/common";
import { useDispatch, useSelector } from 'react-redux';

import { Footer } from "./Footer";
import { Header } from "./Header";
// import ReactLoading from 'react-loading';
// import Toast from "../components/LoadingError/Toast";
import { Usercontext } from "../authcontext";
import axios from 'axios'
// import { listProductDetails } from '../Redux/Actions/productActions';
// import { session } from "../Redux/Actions/userActions";
import { useNavigate } from 'react-router-dom';
// import products from '../Data/Product';
import { useParams } from "react-router";

// let history = useHistory()
export const SingleProduct = () => {
  const [product, setProduct] = useState()
  // const [userId, setuserId] = useState()
  const { values } = useContext(Usercontext);

  const userId = (values._id)

  let navigate = useNavigate();
  const [qty, setQty] = useState(1)
  const { productid } = useParams()
  let productId = productid
  const toastId = React.useRef(null)

  const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 4000,
  }

  if (values) {

    // console.log(values);
  }
  else {
    navigate('/')
  }


  const fetchData = async (id) => {
    const { data } = await axios.get(`/api/products/${id}`)
    setProduct(data);
  }

  const addToBagHandler = async (e) => {

    e.preventDefault()
    const error = await productVerification(userId, productId, qty)
    if (error) {




      toast.dark("Product added")
    } else {
      toast.error('invalid quantity')
    }
  }


  useEffect(() => {
    fetchData(productId)
  }, [productId])

  return (
    <div className="main-content">
      <Header />
      <ToastContainer limit={1} position="top-center" autoClose={1000} />
      <section>
        <div className="container">
          <div className="product-template page-content">
            <h2>Product Details</h2>
            <div className="product-details row">
              <div className="product-wrap">
                {product && (<>
                  <div className="product-single">
                    <div className="product-media">
                      <img src={product.image} alt="" className="product-img-size" />
                    </div>
                    <div className="product-info">
                      <div className="right-side">
                        <span className="product-sku">SKU: {product.sku}</span>
                        <h3 className="product-title main-title">{product.name}</h3>
                        <div className="price">
                          <div className="regular-price">
                            <span><span className="money" data-currency-usd="$200.00">${product.price}</span></span>
                          </div>
                        </div>
                        <div className="">

                          {product.countInStock > 0 ? (<><h3 style={{ color: 'green' }}>InStock</h3>
                            <div className="line-item-quantity">
                              <span className="line-item__quantity-text">Quantity:</span>
                              <input type="text" name="" size="4" id="" value={qty} onChange={e => setQty(e.target.value)} min="1"
                                step="1" />
                            </div>
                            <div className="product-add">
                              <button onClick={addToBagHandler} className="button button--alt" name="add" id="add" type="submit">
                                Add to Bag

                              </button>
                            </div>
                          </>) : (<> <h3 style={{ color: 'red' }}>Out Of Stock</h3>

                          </>)}
                        </div>


                      </div>
                    </div>
                  </div>
                  <div className="desc-wrap">
                    <h4>Description</h4>
                    <div className="detail-desc">
                      {product.description}
                    </div>
                  </div>
                </>)}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}