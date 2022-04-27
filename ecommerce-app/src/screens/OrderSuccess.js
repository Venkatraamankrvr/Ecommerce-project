import { useContext, useEffect, useState } from "react"

import { EmailFormation } from "../utils/email"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { Link } from "react-router-dom"
import ReactDOMServer from "react-dom/server";
import { Usercontext } from "../authcontext"
import axios from "axios"
import { useParams } from "react-router"

export const OrderSuccess = () => {

  const [userId, setUserId] = useState()
  const { orderno } = useParams()
  const { values } = useContext(Usercontext);


  const fetchData = async (userId) => {
    const { data } = await axios.post('/api/carts/deletedocumentcart', { userId: userId })
  }

  const getOrderDetailsHandler = async (orderno) => {
    const { data } = await axios.post('/user/orders/orderDetails', { orderno })
    setUserId(data.OrderDetails.userId._id)
    const messageHtml = ReactDOMServer.renderToString(
      <EmailFormation />

    );
    console.log(messageHtml);
  }
  const makeOrder = async (orderno) => {

    const paymentStatus = await axios.post('/user/orders/paymentstatus', { orderno })
    console.log(paymentStatus, 'payment');
  }
  useEffect(() => {
    if (values) {
      setUserId(values._id)
    }
    fetchData(userId)
    makeOrder(orderno)
    getOrderDetailsHandler(orderno)
  }, [orderno, userId, values])
  return (
    <div className="main-content">

      <Header />

      <section>
        <div className="container">
          <div className="checkout-template page-content">
            <h2>Thank you</h2>
            <div className="checkout-details row">
              <div className="checkout-wrap">
                <div className="checkout-section">
                  <div className="contact-info">

                    <div className="fieldset">
                      <h3>Order Placed</h3>
                      <p className="mt-20">Thank you for placing your order.</p>
                      <p className="mt-20">Your order no.: <Link

                        to={`/orderdetails/${orderno}`}

                        onClick={() => getOrderDetailsHandler(orderno)}> <u>{orderno}</u></Link>. You can check your order <Link to={`/orderdetails/${orderno}`} onClick={getOrderDetailsHandler}><u>details</u></Link> here.</p>
                    </div>


                    <div className="action-btn">
                      <Link to={`/myorderspage/${userId}`} className="button button--hollow">My Orders</Link>
                      <Link to="/collections" className="button secondary-btn">Continue Shopping</Link>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />

    </div>
  )
}