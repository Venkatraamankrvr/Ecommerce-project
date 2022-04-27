import { AdminHeader } from "./adminHeader"
import { Link } from "react-router-dom"

export const AdminDiscountPage = () => {
  return <div className="main-content">

    <AdminHeader />

    <section className="flex">
      <div className="container-fluid">
        <div className="admin-content">
          <div className="admin-left-nav mt-20">
            <ul>
              <li><Link to="/admin">Products</Link></li>
              <li><Link to="/orderscollections">Orders</Link></li>
              <li><Link className="active" to="/discountslists">Discount</Link></li>
            </ul>
          </div>
          <div className="admin-right page-content">
            <div className="products-list">
              <div className="actions flex items-center">
                <h3>Discounts</h3>
                <Link to="/creatediscount" className="button button--hollow justify-end inline-block">Create Discount</Link>
              </div>
              <div className="actions flex items-center flex-start">
                <span><span id="count">1</span> selected</span>
                <Link to="edit-discount.html" className="white-btn items-center">Edit Discounts</Link>
              </div>
              <div className="added-products">
                <table className="table">
                  <thead>
                    <tr>
                      <th><input type="checkbox" defaultChecked id="select-all" /></th>
                      <th>Discount Code</th>
                      <th>Times Used</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><input type="checkbox" defaultChecked name="discount-item" /></td>
                      <td><Link to="edit-discount.html"><u>TRYNEW</u></Link>
                        <p>20% off one-time purchase products</p>
                      </td>
                      <td><span>0</span> used</td>
                      <td>April 14, 2022</td>
                      <td>April 21, 2022</td>
                      <td>Scheduled</td>
                    </tr>
                    <tr>
                      <td><input type="checkbox" name="discount-item" /></td>
                      <td><Link to="edit-discount.html"><u>WELCOME</u></Link>
                        <p>25% off one-time purchase products</p>
                      </td>
                      <td><span>10</span> used</td>
                      <td>March 01, 2022</td>
                      <td>March 31, 2022</td>
                      <td className="color-green">Active</td>
                    </tr>
                    <tr>
                      <td><input type="checkbox" name="discount-item" /></td>
                      <td><Link to="edit-discount.html"><u>FEB14</u></Link>
                        <p>20% off one-time purchase products</p>
                      </td>
                      <td><span>48</span> used</td>
                      <td>February 14, 2022</td>
                      <td>February 16, 2022</td>
                      <td className="color-red">Expired</td>
                    </tr>
                    <tr>
                      <td><input type="checkbox" name="discount-item" /></td>
                      <td><Link to="edit-discount.html"><u>REPUBLIC22</u></Link>
                        <p>15% off one-time purchase products</p>
                      </td>
                      <td><span>55</span> used</td>
                      <td>January 26, 2022</td>
                      <td>January 26, 2022</td>
                      <td className="color-red">Expired</td>
                    </tr>
                    <tr>
                      <td><input type="checkbox" name="discount-item" /></td>
                      <td><Link to="edit-discount.html"><u>Pongal2022</u></Link>
                        <p>15% off one-time purchase products</p>
                      </td>
                      <td><span>56</span> used</td>
                      <td>January 14, 2022</td>
                      <td>January 18, 2022</td>
                      <td className="color-red">Expired</td>
                    </tr>
                    <tr>
                      <td><input type="checkbox" name="discount-item" /></td>
                      <td><Link to="edit-discount.html"><u>NEWYEAR2022</u></Link>
                        <p>30% off one-time purchase products</p>
                      </td>
                      <td><span>100</span> used</td>
                      <td>January 01, 2022</td>
                      <td>January 08, 2022</td>
                      <td className="color-red">Expired</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer className="footer bg-white">
      <div className="container-fluid">
        This is footer section
      </div>
    </footer>
  </div>
}