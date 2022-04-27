import { useEffect, useState } from "react"

import { AdminHeader } from "./adminHeader"
import { Link } from "react-router-dom"
import Loader from "react-js-loader";
import axios from "axios"

export const AdminOrdersCollections = () => {
  const [loading, setLoading] = useState(false)
  const [orderslists, setOrdersList] = useState()
  const fetchUserInfo = async () => {
    setLoading(true)
    const { data } = await axios.get('/user/orders/orderslists')
    setOrdersList(data)
    setLoading(false)
  }

  useEffect(() => { fetchUserInfo() }, [])
  return (<>
    <AdminHeader />
    {loading && <div className={"item"} style={{ marginTop: '200px' }}>
      <Loader type="bubble-top" bgColor={"#000000"} title={"Loading Please wait ... :)"} color={'#000000'} size={100} />
    </div>}
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
            <div className="products-list">
              <div className="actions flex items-center">
                <h3>Orders</h3>
              </div>
              <div className="added-products">
                <table className="table">
                  <thead>
                    <tr>
                      <th>S. No</th>
                      <th>Order No.</th>
                      <th>Date</th>
                      <th>Payment Status</th>
                      <th>Fulfillment Status</th>
                      <th>Items</th>
                      <th className="text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>{orderslists &&
                    orderslists.orderList.map((order, i) => <tr key={i}>
                      <td>{i + 1}</td>
                      <td><Link to={`/AdminOrdersDetailsPage/${order.OrderNo}`}><u>#{order.OrderNo}</u></Link></td>
                      <td>{new Date(order.createdate)
                        .toString()
                        .split(" ")
                        .splice(1, 3)
                        .join(" ")}</td>
                      <td>{order.paymentstatus}</td>
                      <td>{order.fulfilmentstatus}</td>
                      <td>{order.info.map(i => i.quantity).reduce(((a, b) => a + b), 0)} items</td>
                      <td className="text-right">${order.total}</td>
                    </tr>)

                  }

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>)
}