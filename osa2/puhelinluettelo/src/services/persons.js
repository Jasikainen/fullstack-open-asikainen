import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const del = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  console.log("request for deleting", request)
  return request.then((response) => response.data);
};

export default { getAll, create, del };
