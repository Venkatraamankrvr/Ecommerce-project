import '../components/css/style.css'

import { Footer } from './Footer';
import { Header } from './Header';
import React from 'react'
import { ShopSection } from '../components/homeComponents/ShopSection';

// import companyLogo from '../images/wigo-logo-img.png';

export const HomeScreen = () => {
  window.scrollTo(0, 0);

  return (
    <>
      <Header />
      <ShopSection />
      <Footer />
      {/* <SingleProduct /> */}
    </>
  )
}