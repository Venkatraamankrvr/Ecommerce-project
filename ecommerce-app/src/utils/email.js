import axios from "axios"
import { useEffect } from "react";

export const EmailFormation = () => {



  const getOrderDetailsHandler = async (orderno) => {
    const { data } = await axios.post('/user/orders/orderDetails', { orderno })
    console.log(data);
  }

  useEffect(() => {
    getOrderDetailsHandler(100013)
  }, [])
  return <div>hi from email</div>
}