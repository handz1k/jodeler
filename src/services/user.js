import axios from "axios";
const baseUrl = "http://localhost:5001/api/users";

const create = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { create };
