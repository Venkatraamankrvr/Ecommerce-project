import axios from "axios";

export const fetchUserInfo = async () => {
  const { data } = await axios.get('/user/sessions')
  let datas = await data;

  console.log(datas);
  return datas;
}
// fetchUserInfo()