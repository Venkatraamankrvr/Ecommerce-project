import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Header } from "./Header"
// import { Link } from "react-router-dom";
import Loader from "react-js-loader";
// import Message from "../components/LoadingError/Error";
import React from 'react'
// import ReactLoading from 'react-loading';
// import Toast from "../components/LoadingError/Toast";
import axios from "axios";
// import { register } from "../Redux/Actions/userActions";
import { useNavigate } from "react-router-dom";

export const Register = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const signinHandler = async (email, password) => {

    const data = await axios.post(
      `/api/users`,
      { email, password },
      config
    );

  }



  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {


      toast.error("Password does not match")


    }
    else {

      try {
        setLoading(true)
        const data = await signinHandler(email, password)
        setLoading(false)
        toast.success(' New User signed in successfully')
        console.log(data);
        setTimeout(() => {

          navigate('/')
        }, 3000)
      } catch (error) {

        const errors = error.response && error.response.data.message
          ? error.response.data.message
          : error.message
        setLoading(false)
        toast.error(errors)
      }
    }

  }






  return (<section>
    <Header />
    <ToastContainer limit={1} position='top-center' autoClose={1500} />

    {/* {error && <Message variant="alert-danger">{error}</Message>} */}

    {loading && <div className={"item"} style={{ marginTop: '200px' }}>
      <Loader type="bubble-loop
" bgColor={"#000000"} title={"Loading Please wait ... :)"} color={'#000000'} size={100} />
    </div>}
    <div className="form-container sign-up-container">
      <form onSubmit={submitHandler}>
        <h1>Create Account</h1>
        <div className="form-control">
          <label htmlFor="name">Email Address</label>
          <input type="email"
            placeholder=""
            required
            value={email}
            onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-control">
          <label htmlFor="name">Enter Password</label>
          <input type="password"
            placeholder=""
            required
            minLength="6"
            value={password}
            onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="form-control">
          <label htmlFor="name">Confirm Password</label>
          <input type="password" required minLength='6' placeholder="" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        </div>
        <button className="button checkout_btn button--hollow" type="submit">
          Sign Up
        </button>
        {/* {signup && } */}

      </form>
    </div>
  </section>)
}