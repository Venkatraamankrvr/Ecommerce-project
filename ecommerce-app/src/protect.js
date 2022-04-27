import React, { useContext, useEffect, useState } from "react";

import Loader from "react-js-loader";
import { Login } from "./screens/Login";
import { Navigate } from 'react-router';
import { NotFound } from './screens/NotFound';
import { Usercontext } from "./authcontext";
import { useSelector } from "react-redux";

export const Authenticateuser = ({ component: ReactComponent }) => {
  const { values, loading } = useContext(Usercontext);
  console.log(values)


  if (!loading) {
    return <div className={"item"} style={{ marginBottom: '200px' }}>
      <Loader type="box-rotate-x
" bgColor={"#000000"} title={"Loading Please wait ... :)"} color={'#000000'} size={130} />
    </div>
  } else if (values && !values.isAdmin) {
    console.log(values.isAdmin);
    return <ReactComponent />
  } else if (values && values.isAdmin) {
    return <NotFound />
  }
  else {
    return <Login />
  }

}
export const AuthenticateAdmin = ({ component: ReactComponent }) => {
  const { values, loading } = useContext(Usercontext);

  if (!loading) {
    return <div className={"item"} style={{ marginTop: '200px' }}>
      <Loader type="bubble-ping" bgColor={"#000000"} title={"Loading Please wait ... :)"} color={'#000000'} size={100} />
    </div>
  } else if (values && values.isAdmin) {

    return <ReactComponent />
  } else if (values && !values.isAdmin) {
    return <NotFound />
  }
  else {
    return <Login />
  }
}
