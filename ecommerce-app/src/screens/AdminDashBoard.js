import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { AdminHeader } from "./adminHeader";
import { Header } from "./Header"
import { Link } from "react-router-dom"
import axios from "axios";
import { getimages } from "../utils/imageUpload";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

export const AdminComponent = () => {
  const navigate = useNavigate()
  const [image, setimage] = useState({});
  const toastId = React.useRef(null)
  const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 4000,
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const img = await getimages(file);
    setimage(img.data);
  };
  const formSubmithandler = async (data) => {
    data.image = image;

    if (Object.keys(data.image).length === 0) {
      toast.error('No image found')
      return
    }
    else {

      try {
        const result = await axios.post(`/api/admin/createproduct`, { products: data });
        console.log(result);
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.success(`Added Successfully!`, Toastobjects)
        }
        console.log('jbimagesssk;nmkpmpijmpompokop');
        console.log(data);
        toast.success("Product Created Successfully!")
        setTimeout(() => {
          navigate('/admincollection')

        }, 3000)
      } catch (error) {
        console.log('hihihih----');
        toast.error('Sku Already Exists')
      }
    }


  };
  return (<>
    <AdminHeader />
    <ToastContainer limit={1} position='top-center' autoClose={3000} />
    <div className="main-content">
      <section className="flex">
        <div className="container-fluid">
          <div className="admin-content">
            <div className="admin-left-nav mt-20">
              <ul>
                <li><Link className="active" to="/admincollection">Products</Link></li>
                <li><Link to="/orderscollections">Orders</Link></li>
                <li><Link to="/discountslists">Discount</Link></li>
              </ul>
            </div>
            <div className="admin-right page-content">
              <div className="products-list">
                <div className="actions flex items-center">
                  <h3 >Add Product</h3>

                </div>
                <div className="edit-product">
                  <div className="flex">
                    <div className="product-lineitems form-section">
                      <form onSubmit={handleSubmit(formSubmithandler)}>
                        <div className="form-control">
                          <label htmlFor="product-name">Product Name</label>
                          <input type="text"
                            required
                            placeholder=""
                            {...register("name", {
                              required: true,
                            })}
                          />{" "}
                          {errors.name && (
                            <p className="error1">*Please Enter the Product Name</p>
                          )}
                        </div>
                        <div className="form-control">
                          <label htmlFor="sku">SKU</label>
                          <input type="text"
                            required
                            placeholder=""
                            {...register("sku", {
                              required: true,
                            })}
                          />{" "}
                          {errors.sku && (
                            <p className="error1">*Please Enter the Valid SKU</p>
                          )}
                        </div>
                        <div className="flex">
                          <div className="form-control pr-10">
                            <label htmlFor="price">Price ($)</label>
                            <input type="text"
                              required
                              placeholder=""
                              {...register("price", {
                                required: true,
                              })}
                            />{" "}
                            {errors.price && (
                              <p className="error1">*Please Enter the Product Price</p>
                            )}
                          </div>
                          <div className="form-control pl-10">
                            <label htmlFor="inventory">Inventory</label>
                            <input type="text"
                              required
                              placeholder=""
                              {...register("countInStock", {
                                required: true,
                              })}
                            />{" "}
                            {errors.countInStock && (
                              <p className="error1">*Please Enter the Inventory</p>
                            )}
                          </div>
                        </div>
                        <div className="form-control">
                          <label htmlFor="status">Product Status</label>
                          <div className="mt-10" >
                            <span className="pr-20"><input type="radio"
                              value="available"
                              required
                              name="status"
                              {...register("status")}
                            />{" "}
                              Active</span>
                            <span><input type="radio" name="status"
                              required
                              value="unavailable"
                              {...register("status")}
                            />{" "}
                              Inactive</span>
                          </div>
                        </div>
                        <div className="form-control">
                          <label htmlFor="description">Description</label>
                          <textarea cols="5" rows="10"
                            {...register("description", {
                              required: true,
                            })}
                          >
                          </textarea>{" "}
                          {errors.description && (
                            <p className="error1">*Please Enter Product description</p>
                          )}
                        </div>
                        <button to="admin-collection.html" type="submit" className="button button--hollow justify-end inline-block">Save</button>
                      </form>
                    </div>
                    <div className="product-imageitem">
                      <div id="wrapper">
                        <label htmlFor="description">Product Image</label>
                        {/* <div className="mt-10">
                          <div className="drop-zone">
                            <span className="drop-zone__prompt">
                              Drop file here or click to upload
                            </span>
                            <input type="file" name="myFile" className="drop-zone__input" />
                          </div>
                        </div> */}
                        <div className="mt-10">
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {Object.keys(image).length !== 0
                                ? "Click image to remove"
                                : ""}
                            </span>
                            {Object.keys(image).length === 0 ? (
                              <label
                                htmlFor="image-file"
                                className="drop-zone"
                              >
                                <input
                                  type="file"
                                  id="image-file"
                                  className="drop-zone__input"
                                  onChange={uploadFileHandler}
                                  required
                                />
                                Drop file here or click to upload
                              </label>
                            ) : (
                              <img
                                src={`/images/${image}`}
                                alt="images"
                                onClick={() => setimage({})}
                                className="drop-zone"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
  </>)
}