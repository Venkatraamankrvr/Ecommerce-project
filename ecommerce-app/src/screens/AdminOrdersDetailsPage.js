import { useEffect, useState } from "react"

import { AdminHeader } from "./adminHeader"
import { Link } from "react-router-dom"
import axios from "axios"
import { useParams } from "react-router"

export const AdminOrdersDetailsPage = () => {
  const [userId, setUserId] = useState()
  const [orderNumber, setOrderNumber] = useState()
  const [singleOrderDetails, setSingleOrderDetails] = useState()
  const { orderno } = useParams()
  const fetchData = async () => {
    const { data } = await axios.post('/user/orders/orderDetails', { orderno })
    setUserId(data.OrderDetails.userId._id)
    setSingleOrderDetails(data)
  }

  const getMyOrdersHandler = async (userId) => {
    const { data } = await axios.post('/user/orders/myOrdersPage', { userId: userId })
    setOrderNumber(data.OrderDetails.length + 1);

  }



  useEffect(() => {
    fetchData()
    getMyOrdersHandler(userId)


  }, [userId])
  const gettingTime = (time) => {
    const date = new Date(time);
    // const month = date.toLocaleString("default", { month: "short" });
    let milliseconds = date.getTime();
    const timeString12hr = new Date(date + milliseconds + "Z").toLocaleTimeString(
      "en-US",
      {
        timeZone: "UTC",
        hour12: true,
        hour: "numeric",
        minute: "numeric",
      }
    );

    return timeString12hr
  }

  // console.log(timeString);
  return (<>
    <AdminHeader />
    <section className="flex">
      <div className="container-fluid">
        <div className="admin-content">
          <div className="admin-left-nav mt-20">
            <ul>
              <li><Link to="/admincollection">Products</Link></li>
              <li><Link className="active" to="/orderscollections">Orders</Link></li>
              <li><Link to="/discountslists">Discount</Link></li>
            </ul>
          </div>
          <div className="admin-right page-content">
            {singleOrderDetails &&
              <div className="products-list">
                <div className="actions flex items-center">
                  <h3>#{singleOrderDetails.OrderDetails.OrderNo}</h3>
                </div>
                <div className="actions flex items-center flex-start">
                  <span>{
                    new Date(singleOrderDetails.OrderDetails.createdate)
                      .toString()
                      .split(" ")
                      .splice(1, 3)
                      .join(" ")} at {gettingTime(singleOrderDetails.OrderDetails.createdate)}</span>
                </div>
                <div className="view-orders">
                  <div className="main-cart-wrapper">
                    <div className="cart__items cart__block">
                      <div className="line-items">
                        <table className="table">
                          {singleOrderDetails.OrderDetails.info.map(i => <tr>
                            <td>
                              <div className="image-wrapper">
                                <img className="line-item__image" src={i.image} alt={i.name} />
                              </div>
                            </td>
                            <td>
                              <h2 className="line-item-title">
                                <Link to="product.html" className="cart__product-title">
                                  {i.name}                                </Link>
                              </h2>
                              <label htmlFor="">SKU: <span>{i.productId}</span></label>
                            </td>
                            <td>
                              ${i.actualPrice} × <span>{i.quantity}</span>
                            </td>
                            <td>
                              ${i.actualPrice * i.quantity}.00
                            </td>
                          </tr>)}

                        </table>
                      </div>
                      <div className="order__details-wrap mt-10">
                        <div className="flex">
                          <h4>Paid</h4>
                        </div>
                        <div className="flex border-t">
                          <span>Subtotal</span>
                          <span>{singleOrderDetails.OrderDetails.info.map(i => i.quantity).reduce(((a, b) => a + b), 0)} item</span>
                          <span>${singleOrderDetails.OrderDetails.subTotal}.00</span>
                        </div>
                        <div className="flex">
                          <span>Shipping</span>
                          <span>Standard (0 kg)</span>
                          <span>$0.00</span>
                        </div>
                        <div className="flex">
                          <span>Tax</span>
                          <span>GST 0%</span>
                          <span>$0.00</span>
                        </div>
                        <div className="flex">
                          <span>Discount</span>
                          <span>{singleOrderDetails.OrderDetails.discountCode ? singleOrderDetails.OrderDetails.discountCode : 'No Discounts Applied'}</span>
                          <span>${singleOrderDetails.OrderDetails.subTotal - singleOrderDetails.OrderDetails.total}.00</span>
                        </div>
                        <div className="flex">
                          <span><strong>Total</strong></span>
                          <span><strong>${singleOrderDetails.OrderDetails.total}.00</strong></span>
                        </div>
                        <div className="flex border-t">
                          <span>Paid by customer</span>
                          <span>${singleOrderDetails.OrderDetails.total}.00</span>
                        </div>
                        <div className="mt-20">
                          <button className="button update_btn" type="submit">Fulfill Item</button>
                          <Link to="#" className="button checkout_btn button--hollow">Create Shipping Label</Link>
                        </div>
                      </div>
                    </div>
                    <div className="cart__details cart__block add-margin">
                      <div className="order__details-wrap">
                        <h4>Customer</h4>
                        <p><Link to="#">{singleOrderDetails.OrderDetails.data.userName}</Link></p>
                        <p>{orderNumber} orders</p>
                        <p className="evenly-align">
                          <span className="cart-total-quantity">{singleOrderDetails.OrderDetails.info.map(i => i.quantity).reduce(((a, b) => a + b), 0)} items</span>
                        </p>
                      </div>
                      <div className="order__details-wrap mt-10">
                        <div className="flex">
                          <h4>Contact Information</h4>
                          <Link to="#"><u>Edit</u></Link>
                        </div>
                        <p><Link to="#">{singleOrderDetails.OrderDetails.data.userEmail}</Link></p>
                        <p>{singleOrderDetails.OrderDetails.data.userContactNumber}</p>
                      </div>
                      <div className="order__details-wrap mt-10">
                        <div className="flex">
                          <h4>Shipping Address</h4>
                          <Link to="#"><u>Edit</u></Link>
                        </div>
                        <p>{singleOrderDetails.OrderDetails.data.shippingName}</p>
                        <p>{singleOrderDetails.OrderDetails.data.shippingAddress}</p>
                        <p>{singleOrderDetails.OrderDetails.data.shippingPostalCode}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  </>)
}