import React, { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"

import { AdminHeader } from "./adminHeader"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { Link } from "react-router-dom"
import axios from "axios"
import { useForm } from "react-hook-form";

export const EditDiscount = () => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [discountData, setDiscountData] = useState()
  const [selectedProduct, setSelectedProduct] = useState({})
  const [specific, setSpecific] = useState(false)
  const [addedProduct, setAddedProduct] = useState({})
  const [couponId, setCouponId] = useState()
  const [products, setProducts] = useState()
  const [loading, setLoading] = useState(true)

  const { id } = useParams()
  const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 4000,
  }
  // const toastId = React.useRef(null)
  // const productList = useSelector((state) => state.productList)
  // const { loading, error, products } = productList

  const fetchDatas = async () => {
    setLoading(true)
    const { data } = await axios.get('/api/products')
    setProducts(data)
    setLoading(false)

  }


  let listOfProduct = products
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(listProduct())

  // }, [dispatch])


  const addSpecificProduct = () => {
    let tempObj = { ...selectedProduct }
    setAddedProduct(tempObj)
  }
  const handleFormSubmit = (e) => {
    e.preventDefault()
    const { code_string, value, start_date, end_date, status, products } = e.target.elements
    const productID = Object.keys(addedProduct)
    if (specific && productID.length === 0) {
      toast.error("Please add a product for Specific Discount")
      // console.log('there is no product added')
      return false
    }
    let arr = []
    productID.map((id) => {
      arr.push({ productId: id })
    })
    const object = {
      value: value.value,
      startDate: start_date.value,
      endDate: end_date.value,
      status: status.value,
      products1: products.value === [] ? [] : arr,
      code: code_string.value,
    }
    console.log(object);
    axios.post('/api/admin/discount/updatediscounts', { object, couponId })
    toast.success('Discount updated successfully')
    setTimeout(() => {

      navigate('/discountslists')
    }, 3000)
  }


  const addSelectedProduct = (e, product) => {
    let tempObj = { ...selectedProduct }
    console.log(tempObj, selectedProduct)
    if (e.target.checked) {
      tempObj[product._id] = product
    } else {
      delete tempObj[product._id]
    }
    setSelectedProduct(tempObj)
  }

  const removeAddedProduct = (product) => {
    let selectedObj = { ...selectedProduct }
    let addedObj = { ...addedProduct }
    delete selectedObj[product]
    delete addedObj[product]
    setSelectedProduct(selectedObj)
    setAddedProduct(selectedObj)
  }

  const fetchData = async (id) => {
    const { data } = await axios.post('/api/admin/discount/onecoupondetails', { id: id })
    setCouponId(data._id)
    setDiscountData(data)
    let addedProduct = {}
    data.products1.map((value, index) => {
      addedProduct[value.productId._id] = { ...data.products1[index].productId }
    })
    if (Object.keys(addedProduct).length) {
      setAddedProduct(addedProduct)
      setSelectedProduct(addedProduct)
    }
  }

  useEffect(() => { fetchData(id) }, [id])


  useEffect(() => {
    fetchDatas()

  }, []);
  const getDates = (datess) => {
    let date = new Date(datess);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    return (year + '-' + month + '-' + dt)
  }
  const removecoupon = async (couponId) => {
    const { data } = await axios.post('/api/admin/discount/deletecoupon', { id: couponId })
  }
  const couponDeleteHandler = () => {
    removecoupon(couponId)
    navigate('/discountslists')
  }
  const discountStatus = (startDate, endDate) => {
    if (startDate > new Date().toISOString()) {
      return "scheduled";
    } else if (endDate < new Date().toISOString()) {
      return "finished";
    } else {
      return "active";
    }
  };

  return (<>
    <AdminHeader />
    <ToastContainer limit={1} position='top-center' autoClose={1500} />
    <section className="flex">
      <div className="container-fluid">
        <div className="admin-content">
          <div className="admin-left-nav mt-20">
            <ul>
              <li><Link to="/admincollection">Products</Link></li>
              <li><Link to="/orderscollections">Orders</Link></li>
              <li><Link className="active" to="/discountslists">Discount</Link></li>
            </ul>
          </div>
          <form onSubmit={handleFormSubmit} className="admin-right page-content">
            {discountData &&
              <div className="products-list">
                <div className="actions flex items-center">
                  <h3>{discountData.code}</h3>
                </div>
                <div className="view-orders">
                  <div className="main-cart-wrapper">
                    <div className="cart__items cart__block">
                      <div className="form-inline">
                        <div className="order__details-wrap">
                          <div className="flex">
                            <div className="w-50 pr-10">
                              <h4>Discount code</h4>
                              <input type="text" placeholder="" className="" name="code_string"
                                defaultValue={discountData.code}
                                required
                              />
                            </div>
                            <div className="w-50 pl-10">
                              <h4>Discount Value (in %)</h4>
                              <input type="text" placeholder="" className=""
                                defaultValue={discountData.value}
                                required
                                name="value" />
                            </div>
                          </div>
                          <div className="mt-10">
                            <h4>Status</h4>
                            <div className="">
                              <label htmlFor="enable">
                                <input
                                  type="radio"
                                  className="input-text"

                                  defaultChecked={
                                    discountData.status === "enable"
                                      ? true
                                      : false
                                  }
                                  id="enable"
                                  required
                                  name="status"
                                  value={'enable'}


                                />
                                Enable
                              </label>
                            </div>
                            <div className="mt-10">
                              <label htmlFor="disable">
                                <input
                                  type="radio"
                                  required
                                  id="disable"

                                  className="input-text"
                                  defaultChecked={
                                    discountData.status === "disable"
                                      ? true
                                      : false
                                  }
                                  value={'disable'}

                                  name="status" />
                                Disable
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="order__details-wrap mt-20">
                          <div className="">
                            <h4>Applies to</h4>
                            <div className="">
                              <label htmlFor="all">
                                <input
                                  type="radio"
                                  className="input-text"
                                  id="all"

                                  defaultChecked={
                                    discountData.products1.length === 0
                                      ? true
                                      : false
                                  }
                                  value={"all"}
                                  required
                                  name="products"
                                  onChange={() => { setAddedProduct({}); setSelectedProduct({}); setSpecific(false); }}

                                />
                                All Products
                              </label>
                            </div>
                            <div className="mt-10">
                              <label htmlFor="specific">
                                <input
                                  type="radio"
                                  className="input-text"
                                  id="specific"
                                  defaultChecked={
                                    discountData.products1.length > 0
                                      ? true
                                      : false
                                  }
                                  required
                                  value={"specific"}
                                  onClick={() => { setShowModal(true); setSpecific(true) }}
                                  name="products"
                                />
                                Specific products
                              </label>
                            </div>
                          </div>

                          {Object.keys(addedProduct).length !== 0 && Object.keys(addedProduct).map((product, i) => <table className="table">
                            <tbody key={i}>
                              <tr>
                                <td>
                                  <span className="admin-list-img">
                                    <img
                                      src={addedProduct[product]?.image}
                                      alt={addedProduct[product]?.name}
                                    />
                                  </span>
                                </td>
                                <td>
                                  <div className="">
                                    <Link to="edit-product.html"><u>{addedProduct[product]?.name}</u></Link>
                                  </div>
                                </td>
                                <td className="text-right" onClick={() => removeAddedProduct(product)}><u>Remove</u></td>
                              </tr>
                            </tbody>
                          </table>
                          )}
                          <div className="mt-20 discount-period">
                            <h4>Active Dates</h4>
                            <div className="flex">
                              <div className="w-50 pr-10">
                                <label htmlFor="">Start Date</label>

                                <input type="date" placeholder="" className=""
                                  defaultValue={getDates(discountData.startDate)
                                  }
                                  required
                                  name="start_date" />
                              </div>
                              <div className="w-50 pl-10">
                                <label htmlFor="">End Date</label>
                                <input type="date" placeholder="" className=""
                                  defaultValue={getDates(discountData.endDate)}
                                  required
                                  name="end_date" />
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                      <div className="mt-20">
                        <button className="button checkout_btn button--hollow" type="submit">Save</button>
                        <button className="button update_btn" onClick={() => couponDeleteHandler()}>Delete</button>
                      </div>
                    </div>
                    <div class="cart__details cart__block add-margin">
                      <div class="order__details-wrap">
                        <h3>Summary</h3>
                        <div class="border-t mt-10">
                          <div class="flex mt-20">
                            <p><strong>Cart Offer</strong></p>
                            {discountStatus(discountData.startDate, discountData.endDate) === 'active' && <td className="color-green">Active</td>
                            }                                  {discountStatus(discountData.startDate, discountData.endDate) === 'finished' && <td className="color-red">Finished</td>
                            }                                  {discountStatus(discountData.startDate, discountData.endDate) === 'scheduled' && <td >Scheduled</td>
                            }
                          </div>
                        </div>
                        <ul class="list-items">
                          <li>{discountData.value}% off products</li>
                          <li>Active from {new Date(discountData.startDate).toString().split(" ").splice(1, 3).join(" ")}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </form>
          {showModal &&
            <div id="show-modal">
              <div className="overlay" onClick={() => setShowModal(false)}></div>
              <div className="admin-right page-content">
                <div className="products-list">
                  <div className="actions flex items-center">
                    <h3>Add products</h3>
                  </div>
                  <div className="added-products border-t">
                    <div className="overflow-auto">
                      <table className="table mt-20">
                        <thead>
                          <tr>
                            <th>CheckBox</th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Inventory</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listOfProduct.map((product, i) => <tr key={i}>
                            <td><input
                              required
                              onChange={(e) => addSelectedProduct(e, product)}
                              checked={Object.keys(selectedProduct).includes(product._id)}
                              style={{ margin: "20px" }}
                              type="checkbox" name="prod-item" /></td>
                            <td><span className="admin-list-img"><img src={product.image} alt={product.image} /></span></td>
                            <td>
                              <div className="">
                                <Link to=""><u>{product.name}</u></Link>
                              </div>
                              <span>SKU: <span>{product.sku}</span></span>
                            </td>
                            <td>{product.price}</td>
                            <td>{product.countInStock}</td>
                          </tr>)}

                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="mt-20">
                    <button className="button checkout_btn button--hollow" onClick={() => addSpecificProduct()}  >
                      Add Products
                    </button>
                    <button className="button update_btn" id="close-modal" type="submit" onClick={() => setShowModal(false)} >Close</button>
                  </div>
                </div>
              </div>
            </div>
          }

        </div>
      </div >
    </section >
    <Footer />
  </>)
}