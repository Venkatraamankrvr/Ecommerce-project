import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { AdminHeader } from "./adminHeader";
import { Header } from "./Header";
import { Link } from "react-router-dom";
import Loader from "react-js-loader";
import axios from "axios";
import { useNavigate } from "react-router";

export const AdminCollection = () => {
  const [allProducts, setAllProducts] = useState()
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const toastid = React.useRef(null);
  const [loading, setLoading] = useState(false)
  const [countInNumber, setCountInNumber] = useState(false);
  const [index, setIndex] = useState();
  const [checked, setChecked] = useState(false);
  const [sku, setsku] = useState();

  // const productList = useSelector((state) => state.productList);
  // const { products } = productList;
  // const data = await dispatch(listProduct());
  const fetchData = async () => {
    setLoading(true)
    const { data } = await axios.get('/api/products')

    setAllProducts(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()

  }, []);

  return <>
    <AdminHeader />
    < ToastContainer />
    {loading && !allProducts && <div className={"item"} style={{ marginTop: '200px' }}>
      <Loader type="box-rectangular
" bgColor={"#000000"} title={"Loading Please wait ... :)"} color={'#000000'} size={100} />
    </div>}

    {
      allProducts && !loading && (
        <div className="main-content">
          <section className="flex">
            <div className="container-fluid">
              <div className="admin-content">
                <div className="admin-left-nav mt-20">
                  <ul>
                    <li>
                      <Link to="/admincollection" className="active">
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link to="/orderscollections">Orders</Link>
                    </li>
                    <li>
                      <Link to="/discountslists">Discount</Link>
                    </li>
                  </ul>
                </div>
                <div className="admin-right page-content">
                  <div className="products-list">
                    <div className="actions flex items-center">
                      <h3>Products</h3>
                      <Link
                        to="/admin"
                        className="button button--hollow justify-end inline-block"
                      >
                        Add Product
                      </Link>
                    </div>

                    <div className="added-products">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>S No.</th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>SKU</th>
                            <th>Price</th>
                            <th>Inventory</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allProducts.map((item, i) => {
                            return (
                              <React.Fragment key={item.sku}>
                                <tr key={i}>
                                  <td>
                                    {i + 1}
                                  </td>
                                  <td>
                                    <span className="admin-list-img">
                                      <img
                                        src={`/images/${item.image}`}
                                        alt=""
                                      />
                                    </span>
                                  </td>
                                  <td>
                                    <div className="">
                                      <Link to={`/editproducts/${item._id}`}>
                                        <u>{item.name}</u>
                                      </Link>
                                    </div>
                                  </td>
                                  <td>{item.sku}</td>
                                  <td>{item.price}</td>
                                  <td>{item.countInStock}</td>
                                  {item.status === "available" && (
                                    <td className="color-green">Active</td>
                                  )}
                                  {item.status === "unavailable" && (
                                    <td className="color-red">Inactive</td>
                                  )}
                                </tr>
                              </React.Fragment>
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
      )
    }


  </>
}