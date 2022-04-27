import { useEffect, useState } from "react"

import { Footer } from "./Footer"
import { Header } from "./Header"
import { Link } from "react-router-dom"
import Loader from "react-js-loader";
import axios from "axios"
import { useParams } from "react-router"

export const MyOrdersPage = () => {
  const [myOrders, setMyOrders] = useState()
  const [loading, setLoading] = useState(true)
  const [OrderDetails, setOrderDetails] = useState()
  const [emptyPage, setEmptyPage] = useState()

  const userId = useParams().userId
  const getMyOrdersHandler = async (userId) => {
    setLoading(true)
    const { data } = await axios.post('/user/orders/myOrdersPage', { userId: userId })
    console.log(data);
    if (data.OrderDetails.length === 0) {
      setEmptyPage(true);
      setLoading(false);
    }
    else {
      setEmptyPage(false);
      setLoading(false);


    }
    setMyOrders(data)
  }

  useEffect(() => {

    getMyOrdersHandler(userId)

  }, [])
  console.log((userId));
  return <>
    <Header />
    {loading && <Loader type="spinner-default
" bgColor={"#000000"} title={"Loading Please wait ... :)"} color={'#000000'} size={100} />}
    {emptyPage && <div className="center" style={{ marginTop: '200px', textAlign: 'center' }}>
      <div>
        <h1 className="mb cart-template" >Still Offers Going On...🎉<br /> Enjoy your 👇🏻 Shopping</h1>
        <h3 className='button--center'><Link to='/collections' className="button checkout_btn button--hollow">SHOP NOW</Link></h3>
      </div>
    </div>}
    {
      !emptyPage &&
      <section>
        <div className="container">
          <div className="checkout-template page-content">
            <h2>My Orders</h2>
            <div className="my-orders row">
              <div className="orders-wrap">
                <div className="orders-list">
                  <table>
                    <thead>
                      <tr>
                        <th>S. No</th>
                        <th>Order No.</th>
                        <th>Date</th>
                        <th>Payment Status</th>
                        <th>Fulfillment Status</th>
                        <th className="text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myOrders && myOrders.OrderDetails.map((product, i) => <tr key={i}>
                        <td>{i + 1}</td>
                        <td><Link to={`/orderdetails/${product.OrderNo}`}><u>#{product.OrderNo}</u></Link></td>
                        <td>{new Date(product.createdate).toString().split(" ").splice(1, 3).join(" ")}</td>
                        <td>{product.paymentstatus}</td>
                        <td>{product.fulfilmentstatus}</td>
                        <td className="text-right">${product.total}</td>
                      </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    }
    <Footer />
  </>
}