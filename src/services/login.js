import axios from "axios";
const baseUrl = "http://localhost:5001/api/users";

const login = async (credientials) => {
  const response = await axios.post(baseUrl, credientials);
  return response.data;
};

export default { login };
