import { Footer } from "./Footer"
import { Header } from "./Header"

export const OrdersList = () => {
  return (
    <div className="main-content">
      <Header />
      <section>
        <div class="container">
          <div class="checkout-template page-content">
            <h2>My Orders</h2>
            <div class="my-orders row">
              <div class="orders-wrap">
                <div class="orders-list">
                  <table>
                    <thead>
                      <tr>
                        <th>S. No</th>
                        <th>Order No.</th>
                        <th>Date</th>
                        <th>Payment Status</th>
                        <th>Fulfillment Status</th>
                        <th class="text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>01</td>
                        <td><a href="order-details.html"><u>#10001</u></a></td>
                        <td>Mar 01, 2022</td>
                        <td>Paid</td>
                        <td>Fulfilled</td>
                        <td class="text-right">$290</td>
                      </tr>
                      <tr>
                        <td>02</td>
                        <td><a href="order-details.html"><u>#10002</u></a></td>
                        <td>Mar 01, 2022</td>
                        <td>Paid</td>
                        <td>Fulfilled</td>
                        <td class="text-right">$290</td>
                      </tr>
                      <tr>
                        <td>03</td>
                        <td><a href="order-details.html"><u>#10003</u></a></td>
                        <td>Mar 01, 2022</td>
                        <td>Paid</td>
                        <td>Fulfilled</td>
                        <td class="text-right">$290</td>
                      </tr>
                      <tr>
                        <td>04</td>
                        <td><a href="order-details.html"><u>#10004</u></a></td>
                        <td>Mar 01, 2022</td>
                        <td>Paid</td>
                        <td>Fulfilled</td>
                        <td class="text-right">$290</td>
                      </tr>
                      <tr>
                        <td>05</td>
                        <td><a href="order-details.html"><u>#10005</u></a></td>
                        <td>Mar 01, 2022</td>
                        <td>Paid</td>
                        <td>Fulfilled</td>
                        <td class="text-right">$290</td>
                      </tr>
                      <tr>
                        <td>06</td>
                        <td><a href="order-details.html"><u>#10006</u></a></td>
                        <td>Mar 01, 2022</td>
                        <td>Paid</td>
                        <td>Fulfilled</td>
                        <td class="text-right">$290</td>
                      </tr>
                      <tr>
                        <td>07</td>
                        <td><a href="order-details.html"><u>#10007</u></a></td>
                        <td>Mar 01, 2022</td>
                        <td>Paid</td>
                        <td>Fulfilled</td>
                        <td class="text-right">$290</td>
                      </tr>
                      <tr>
                        <td>08</td>
                        <td><a href="order-details.html"><u>#10008</u></a></td>
                        <td>Mar 01, 2022</td>
                        <td>Paid</td>
                        <td>Fulfilled</td>
                        <td class="text-right">$290</td>
                      </tr>
                    </tbody>
                  </table>
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