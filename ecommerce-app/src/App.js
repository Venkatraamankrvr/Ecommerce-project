import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { AdminCollections, AdminOrdersCollections } from './screens/AdminOrdersCollections';
import { AuthenticateAdmin, Authenticateuser } from './protect'
// import { Route, Router, BrowserRouter as Routes } from "react-router-dom";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AdminCollection } from './screens/AdminCollections';
import { AdminComponent } from './screens/AdminDashBoard';
import { AdminDiscountPage } from './screens/AdminDiscount';
import { AdminOrdersDetailsPage } from './screens/AdminOrdersDetailsPage';
import { CartScreen } from './screens/CartScreen';
import { Checkout } from './screens/Checkout';
import { CreateDiscount } from './screens/AdminCreateDiscount';
import { DiscountsCollection } from './screens/AdminDiscountCollection';
import { EditDiscount } from './screens/AdminEditDiscounts';
import { EditProducts } from './screens/AdminEditProduct';
// import { BrowserRouter } from 'react-router-dom';
import { HomeScreen } from './screens/HomeScreen';
import { Login } from './screens/Login';
import { MyOrdersPage } from './screens/MyOrdersPage';
// import { LoginComponent } from './components/loginComponents/LoginComponent';
import { NotFound } from './screens/NotFound';
import { OrderDetails } from './screens/OrderDetails';
import { OrderSuccess } from './screens/OrderSuccess';
import { OrdersList } from './screens/OrdersList';
import { Register } from './screens/Register';
// import { ShopSection } from './components/homeComponents/ShopSection';
import { SingleProduct } from './screens/SingleProduct';
import { useSelector } from 'react-redux';

// import { Router } from 'react-router';
// import { Route, BrowserRouter as Router, Switch } from "react-router-dom";


// import logo from './logo.svg';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' exact={true} element={<NotFound />} />
          <Route path='/admin' element={<AuthenticateAdmin component={AdminComponent} />} />
          <Route path='/admindiscountpage' element={<AuthenticateAdmin component={AdminDiscountPage} />} />
          <Route path='/creatediscount' element={<AuthenticateAdmin component={CreateDiscount} />} />
          <Route path="/collections" element={<Authenticateuser component={HomeScreen} />} />
          <Route path="/products/:productid" element={<Authenticateuser component={SingleProduct} />} />
          <Route path="/cart" element={<Authenticateuser component={CartScreen} />} />
          <Route path='/checkout' element={<Authenticateuser component={Checkout} />} />
          <Route path='/discountslists' element={<AuthenticateAdmin component={DiscountsCollection} />} />
          <Route path='/editdiscounts/:id' element={<AuthenticateAdmin component={EditDiscount} />} />
          <Route path='/orderscollections' element={<AuthenticateAdmin component={AdminOrdersCollections} />} />
          <Route path='/AdminOrdersDetailsPage/:orderno' element={<AdminOrdersDetailsPage />} />
          <Route path='/checkout/:orderno' element={<Authenticateuser component={Checkout} />} />
          <Route path='/orderdetails/:orderno' element={<Authenticateuser component={OrderDetails} />} />
          <Route path='/ordersuccess/:orderno' element={<Authenticateuser component={OrderSuccess} />} />
          <Route path='/orderslist' element={<Authenticateuser component={OrdersList} />} />
          <Route path='/admincollection' element={<AuthenticateAdmin component={AdminCollection} />} />
          <Route path='/editproducts/:id' element={<EditProducts />} />
          <Route path='/myorderspage/:userId' element={<Authenticateuser component={MyOrdersPage} />} />

        </Routes>
      </BrowserRouter>
      {/* <HomeScreen></HomeScreen> */}
    </div>
  );
}
export default App;
