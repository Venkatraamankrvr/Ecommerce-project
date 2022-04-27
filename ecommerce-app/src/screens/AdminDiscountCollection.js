import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

import { AdminHeader } from "./adminHeader";
import { Link } from "react-router-dom";
import Loader from "react-js-loader";
import React from "react";
import axios from "axios";
// import { getalldiscount } from "./API/imageApi";
// import { Header } from "../User/header";
import { useNavigate } from "react-router";

export const DiscountsCollection = () => {
  const [loading, setLoading] = useState(false)
  const [discount, setDiscount] = useState()
  const [tick, setTick] = useState();

  const fetchData = async () => {
    setLoading(true)
    const { data } = await axios.post('/api/admin/discount/discountlists')
    setDiscount(data)
    setLoading(false)
  }
  useEffect(() => { fetchData() }, [])

  const discountStatus = (startDate, endDate) => {
    if (startDate > new Date().toISOString()) {
      return "scheduled";
    } else if (endDate < new Date().toISOString()) {
      return "finished";
    } else {
      return "active";
    }
  };
  // function validateData(data) { }

  return (
    <>
      <ToastContainer />
      <AdminHeader />
      {loading && <div className={"item"} style={{ marginTop: '200px' }}>
        <Loader type="bubble-scale
" bgColor={"#000000"} title={"Loading Please wait ... :)"} color={'#000000'} size={100} />
      </div>}

      {discount && (
        <div className="main-content">
          <section className="flex">
            <div className="container-fluid">
              <div className="admin-content">
                <div className="admin-left-nav mt-20">
                  <ul>
                    <li>
                      {" "}
                      <Link to="/admincollection">Products</Link>
                    </li>
                    <li>
                      <Link to="/orderscollections">Orders</Link>
                    </li>
                    <li>
                      <Link className="active" to="/discountslists">
                        Discount
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="admin-right page-content">
                  <div className="products-list">
                    <div className="actions flex items-center">
                      <h3>Discounts</h3>
                      <Link
                        to="/creatediscount"
                        className="button button--hollow justify-end inline-block"
                      >
                        Create Discount
                      </Link>
                    </div>

                    <div className="added-products">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>S No.</th>
                            {/* <th>Select</th> */}
                            <th>Discount Code</th>
                            <th>Times Used</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {discount.map((oneDiscount, i) => {
                            return (
                              <tr key={i}>
                                <td>
                                  {i + 1}
                                </td>

                                <td>
                                  <Link to={`/editdiscounts/${oneDiscount._id}`}>
                                    <u>{oneDiscount.code}</u>
                                  </Link>
                                  <p>
                                    {oneDiscount.value}% off one-time purchase products
                                  </p>
                                </td>
                                <td>
                                  <span>{oneDiscount.counters}</span> used
                                </td>
                                <td>
                                  {new Date(oneDiscount.startDate)
                                    .toString()
                                    .split(" ")
                                    .splice(1, 3)
                                    .join(" ")}
                                </td>
                                <td>
                                  {new Date(oneDiscount.endDate)
                                    .toString()
                                    .split(" ")
                                    .splice(1, 3)
                                    .join(" ")}
                                </td>
                                <td>
                                  {discountStatus(oneDiscount.startDate, oneDiscount.endDate) === 'active' && <td className="color-green">Active</td>
                                  }                                  {discountStatus(oneDiscount.startDate, oneDiscount.endDate) === 'finished' && <td className="color-red">Finished</td>
                                  }                                  {discountStatus(oneDiscount.startDate, oneDiscount.endDate) === 'scheduled' && <td >Scheduled</td>
                                  }
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>

  )
}