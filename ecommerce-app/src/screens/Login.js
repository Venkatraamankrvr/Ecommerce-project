import '../components/css/style.css'

import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";

import { Footer } from './Footer';
import { Header } from './Header';
import { Usercontext } from '../authcontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const { login, setdata } = useContext(Usercontext);
  const [userData, setUserData] = useState()
  const [loading, setloading] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const navigate = useNavigate()
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios.defaults.withCredentials = true;





  const fetchUserInfo = async () => {
    setdata(undefined)
    const { data } = await axios.get('/user/sessions')
    // setUserData(data.user)

    console.log(data)

    if (!data.loggedIn) {
      setloading(true)
    }
    if (data.loggedIn) {
      if (data.isAdmin) {
        navigate('/admincollection')
      } else if (!data.isAdmin) {
        navigate('/collections')
      }
      else {
        navigate('/')
      }
      setloading(true)


    }




  }

  useEffect(() => {
    fetchUserInfo()
    // const logindata = fetchUserInfo()
    // console.log(logindata);
  }, [])

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password)
      console.log(data)
      if (data.isAdmin) {
        navigate('/admincollection')
      } else if (!data.isAdmin) {
        navigate('/collections')
      } else {
        navigate('/')
      }
    } catch (error) {
      toast.error('Inputs are invalid')
    }
  }

  return (
    <>

      <ToastContainer limit={1} position="top-center" autoClose={2000} />
      {loading &&
        <div className="main-content">
          <Header />
          <section>
            <div className="form-container sign-up-container">
              <form onSubmit={submitHandler}>
                <h1>Login</h1>
                <div className="form-control">
                  <label htmlFor="name">Email Address</label>
                  <input
                    type="email"
                    placeholder=""
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-control">
                  <label htmlFor="name">Enter Password</label>
                  <input
                    type="password"
                    placeholder=""
                    required
                    minLength="6"
                    value={password}
                    onChange={e => setPassowrd(e.target.value)} />
                </div>
                <button className="button button--hollow justify-end inline-block mb">Login</button>
              </form>
            </div>
          </section>
          <Footer />
        </div>
      }</>
  )
}
