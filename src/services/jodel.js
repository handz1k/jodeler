import axios from "axios";
const baseUrl = "http://localhost:5001/jodel";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const deleteJodel = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const addLike = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject);
  return request.data;
};

export default { getAll, create, deleteJodel, addLike, setToken };
