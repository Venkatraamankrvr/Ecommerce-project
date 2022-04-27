import '../css/style.css'

import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Footer } from '../../screens/Footer';
import { Link } from "react-router-dom";
import Loader from "react-js-loader";
import { Usercontext } from '../../authcontext';
import axios from 'axios'

export const ShopSection = () => {
  const { values } = useContext(Usercontext)
  const [products, setProducts] = useState()
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    const { data } = await axios.get('/api/products')
    setProducts(data)
    setLoading(false)

  }

  useEffect(() => {
    fetchData()

  }, []);

  return (
    <div className="main-content">
      <section>
        <div className="container">
          <div className="product-collection page-content">
            <h2>Collections</h2>
            <div className="products-grid row">
              {loading && <div className={"item"} style={{ marginTop: '200px' }}>
                <Loader type="spinner-circle
" bgColor={"#000000"} title={"Loading Please wait ... :)"} color={'#000000'} size={130} />
              </div>}
              {products && products.map((product) => {
                if (product.status === 'available') {
                  return (
                    <div
                      className="grid-item"
                      key={product._id}
                    >
                      <div className="product-item">
                        <div className="product-image">
                          <Link to={`/products/${product._id}`}>
                            <div className="shopBack">
                              <img src={product.image} alt={product.name} className="image-wrapper1" />
                            </div>
                          </Link>
                        </div>
                        <div className="product-content">
                          <p>
                            <Link to={`/products/${product._id}`}>
                              {product.name}
                            </Link>
                          </p>
                          {product.countInStock === 0 && <p style={{ color: 'red' }}>Out of Stock</p>}
                          <div className="price">
                            <div className="regular-price">
                              <span><span className="money">${product.price}</span></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}