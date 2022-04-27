import './index.css';

import App from './App';
import { Authcontextprovider } from './authcontext';
import { Elements } from "@stripe/react-stripe-js";
// import { Provider } from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';
import { loadStripe } from "@stripe/stripe-js";
import reportWebVitals from './reportWebVitals';
// import { store } from './Redux/store';

export const stripepromise = loadStripe(
  "pk_test_51KXHmNSEDlcIS1XWzGXOAgxo4ndyu4Xi6qbsLghlfbXt3iyC1E9gId7s6tKkZxGrgldQb90QCGkLsrIARgcKV9FG000sNrL2SL"
);
ReactDOM.render(

  <Authcontextprovider>
    <Elements stripe={stripepromise}>
      <App />
    </Elements>
  </Authcontextprovider>

  , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
