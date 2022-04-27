import { useEffect, useState } from "react";

import { Footer } from "./Footer"
import { Header } from "./Header"
import axios from "axios";
import { useParams } from "react-router";

export const OrderDetails = () => {
  const [OrderDetails, setOrderDetails] = useState()
  const [total, setTotal] = useState()
  let orderno = useParams().orderno
  console.log(orderno);
  const getOrderDetailsHandler = async (orderno) => {
    console.log('hihihih', orderno);
    const { data } = await axios.post('/user/orders/orderDetails', { orderno })
    console.log(data);
    setOrderDetails(data)
    return OrderDetails
  }




  // console.log(total);
  useEffect(() => {
    getOrderDetailsHandler(orderno)



  }, [])

  return (
    <div className="main-content">
      <Header />
      <section>
        <div className="container">
          {OrderDetails &&

            <div className="checkout-template page-content">
              <h2>Order #{OrderDetails.OrderDetails.OrderNo}</h2>
              <p>Placed on {new Date(OrderDetails.OrderDetails.createdate).toString().split(" ").splice(1, 3).join(" ")}</p>
              <div className="mt-20">
                <div className="flex">
                  <div className="address">
                    <h3>Billing Address</h3>
                    <p>{OrderDetails.OrderDetails.data.userName}</p>
                    <p>{OrderDetails.OrderDetails.data.userContactAddress},</p>
                    <p>{OrderDetails.OrderDetails.data.userPostalCode}</p>
                    <p className="mt-20"><strong>Payment Status: {OrderDetails.OrderDetails.paymentstatus}</strong></p>
                  </div>
                  <div className="address">
                    <h3>Shipping Address</h3>
                    <p>{OrderDetails.OrderDetails.data.shippingName}</p>
                    <p>{OrderDetails.OrderDetails.data.shippingAddress},</p>
                    <p>{OrderDetails.OrderDetails.data.shippingPostalCode}</p>
                    <p className="mt-20"><strong>Fulfillment Status: {OrderDetails.OrderDetails.fulfilmentstatus}</strong></p>
                  </div>
                </div>
              </div>
              <div className="my-orders row">
                <div className="orders-wrap">
                  <div className="orders-list">
                    <table>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>SKU</th>
                          <th className="text-right">Price</th>
                          <th>Quantity</th>
                          <th className="text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody>{OrderDetails.OrderDetails.info && OrderDetails.OrderDetails.info.map((product, i) => <tr key={i}>
                        <td>{product.name}</td>
                        <td>{product.productId}</td>

                        <td className="text-right"> ${!product.discountValue ? <>{product.actualPrice}</> : <> {Math.round(product.actualPrice - (product.actualPrice * product.discountValue))}</>}.00
                        </td>

                        {/* {discountStatus(oneDiscount.startDate, oneDiscount.endDate) === 'active' && <td className="color-green">Active</td>
                          } */}

                        {/* ${!product.discountValue ? <td className="text-right"> {product.actualPrice} </td> : <td className="text-right"> {Math.round(product.actualPrice - product.discountValue)}</td>}.00 */}

                        {/* ${product.discountValue && Math.round(product.actualPrice - product.discountValue)}.00 */}
                        <td>{product.quantity}</td>
                        <td className="text-right">$
                          {product.discountValue ?
                            <>{Math.round(product.actualPrice - (product.actualPrice * product.discountValue)) * product.quantity}
                            </> :
                            <>{product.actualPrice * product.quantity}
                            </>}.00
                        </td>
                      </tr>)}

                        <tr>
                          <td colSpan="4">Subtotal</td>
                          <td className="text-right">
                            ${OrderDetails.OrderDetails.subTotal}
                            .00</td>
                        </tr>
                        <tr>
                          <td colSpan="4">Shipping</td>
                          <td className="text-right">$0.00</td>
                        </tr>
                        <tr>
                          <td colSpan="4">Tax (GST)</td>
                          <td className="text-right">$0.00</td>
                        </tr>
                        <tr>
                          <td colSpan="4">Discount <span>(<strong>
                            {OrderDetails.OrderDetails.discountCode ? OrderDetails.OrderDetails.discountCode : 'No Discounts Applied'}
                          </strong>)</span></td>
                          <td className="text-right">-${OrderDetails.OrderDetails.subTotal - OrderDetails.OrderDetails.total}.00</td>
                        </tr>
                        <tr>
                          <td colSpan="4"><strong>Total</strong></td>
                          <td className="text-right"><strong>{OrderDetails.OrderDetails.total} <span>USD</span></strong></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </section>
      <Footer />
    </div >)
}