import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import { AdminHeader } from "./adminHeader";
import { Header } from "./Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { getimages } from "../utils/imageUpload";
import { useForm } from "react-hook-form";

export const EditProducts = () => {
  const [specificProduct, setSpecificProduct] = useState()
  const navigate = useNavigate();
  const [image, setimage] = useState({});
  const { id } = useParams();

  // const dispatch = useDispatch();
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



  async function fetchSingleProduct(id) {
    const { data } = await axios.get(`/api/admin/${id}`);
    setSpecificProduct(data)
    setimage(data.image)
  }

  useEffect(() => {
    console.log(id);
    fetchSingleProduct(id)
  }, [id]);

  const imageuUploadHandler = async (e) => {
    const file = e.target.files[0];
    const img = await getimages(file);
    console.log(img.data);
    setimage(img.data);
  };


  console.log(image, "--------------------")
  const formSubmithandler = async (data) => {
    console.log(image)
    data.image = image;
    if (Object.keys(data.image).length === 0) {
      toast.error('No image found')
      return
    } else {

      try {
        const result = await axios.post(`/api/admin/updateproduct`, {
          products1: data,
          id,
        });
        toast.info("Product updated successfully")
        setTimeout(() => {

          navigate('/admincollection')
        }, 3000)
      } catch (error) {
        console.log(error);

        console.log('Sku must be unique');
        if (!toast.isActive(toastId.current))
          toastId.current = toast.error(`SKU already exists`, Toastobjects)
      }
      console.log(data);
    }
  };


  return (
    <>
      <AdminHeader />
      < ToastContainer />

      <div className="main-content">
        {specificProduct && (
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
                      <h3>{specificProduct.name}</h3>
                      <button
                        href="admin-collection.html"
                        form="updateform"
                        className="button button--hollow justify-end inline-block"
                        onSubmit={handleSubmit(formSubmithandler)}
                      >
                        Update
                      </button>
                    </div>
                    <div className="edit-product">
                      <div className="flex">
                        <div className="product-lineitems form-section">
                          <form
                            id="updateform"
                            onSubmit={handleSubmit(formSubmithandler)}
                          >
                            <div className="form-control">
                              <label htmlFor="product-name">Product Name</label>
                              <input
                                type="text"
                                required
                                defaultValue={specificProduct.name}
                                {...register("name", {
                                  required: true,
                                })}
                              />{" "}
                              {errors.name && (
                                <p className="error1">*Please enter the name</p>
                              )}
                            </div>
                            <div className="form-control">
                              <label htmlFor="sku">SKU</label>
                              <input
                                type="text"
                                required
                                defaultValue={specificProduct.sku}
                                {...register("sku", {
                                  required: true,
                                })}
                              />
                              {errors.sku && (
                                <p className="error1">*Please enter the sku</p>
                              )}
                            </div>
                            <div className="flex">
                              <div className="form-control pr-10">
                                <label htmlFor="price">Price ($)</label>
                                <input
                                  type="text"
                                  required
                                  defaultValue={Number(specificProduct.price)}
                                  {...register("price", {
                                    required: true,
                                    pattern: {},
                                  })}
                                />
                                {errors.price && (
                                  <p className="error1">
                                    *Please enter the price
                                  </p>
                                )}
                              </div>
                              <div className="form-control pl-10">
                                <label htmlFor="inventory">Inventory</label>
                                <input
                                  type="text"
                                  required
                                  defaultValue={specificProduct.countInStock}
                                  {...register("countInStock", {
                                    required: true,
                                    pattern: {},
                                  })}
                                />
                                {errors.inventory && (
                                  <p className="error1">
                                    *Please enter the inventory
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="form-control">
                              <label htmlFor="status">Product Status</label>
                              <div className="mt-10">
                                <span className="pr-20">
                                  <input
                                    type="radio"
                                    required
                                    defaultChecked={
                                      specificProduct.status === "available"
                                        ? true
                                        : false
                                    }
                                    value="available"
                                    {...register("status")}
                                  />{" "}
                                  Active
                                </span>
                                <span>
                                  <input
                                    type="radio"
                                    required
                                    defaultChecked={
                                      specificProduct.status === "available"
                                        ? false
                                        : true
                                    }
                                    value="unavailable"
                                    {...register("status")}
                                  //{...register("inactive")}
                                  />{" "}
                                  Inactive
                                </span>
                              </div>
                            </div>
                            <div className="form-control">
                              <label htmlFor="description">Description</label>
                              <textarea
                                cols="5"
                                rows="10"
                                required
                                defaultValue={specificProduct.description}
                                {...register("description", {
                                  required: true,
                                })}
                              />
                              {errors.description && (
                                <p className="error1">
                                  *Please enter the description
                                </p>
                              )}
                            </div>
                            <button
                              form="updateform"
                              className="button button--hollow justify-end inline-block"
                              type="submit"
                            >
                              Update
                            </button>
                          </form>
                        </div>
                        <div className="product-imageitem">
                          <div id="wrapper">
                            <label htmlFor="description">Product Image</label>
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
                                      onChange={imageuUploadHandler}
                                      required
                                    />
                                    Drop file here or click to upload
                                  </label>
                                ) : (
                                  <img
                                    src={image}
                                    // src = {image ? image:product.images}
                                    alt="images"
                                    onClick={() => { setimage({}) }}
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
        )}
      </div>
    </>)
}