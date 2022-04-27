import axios from "axios";

export const getimages = async (file) => {
  let form = new FormData();

  form.append("images", file);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const result = await axios.post(`/api/admin/addimage`, form, config);
  return result;
};
