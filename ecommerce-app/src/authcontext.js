import React, { useEffect, useState } from "react";

import axios from "axios";

export const Usercontext = React.createContext({
  values: [],
  loading: Boolean,
  setdata: () => { },
  login: () => { }
});

export const Authcontextprovider = (props) => {
  const [data, setdata] = useState()
  const [loading, setloading] = useState(false)

  const config = {
    // credentials: "include",

    headers: {
      "Content-Type": "application/json",
    },
  };
  axios.defaults.withCredentials = true;



  const getsession = async () => {
    const { data } = await axios.get('/user/sessions')
    console.log(data)
    if (data.loggedIn) {
      setdata(data)

    }

    setloading(true)
  }

  const login = async (email, password) => {
    console.log(email, password)
    const { data } = await axios.post(
      `/api/users/login`,
      { email, password },
      config
    );
    setdata(data);
    setloading(true);
    return data;

  }




  useEffect(() => {
    getsession()

  }, []);
  return (
    <Usercontext.Provider
      value={{
        values: data,
        loading: loading,
        setdata: setdata,
        login: login,

      }}
    >
      {props.children}
    </Usercontext.Provider>
  );
}