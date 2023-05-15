import axios from "axios";


const instance = axios.create({
  withCredentials: true,
  baseURL: "https://project-backend1.herokuapp.com/api/v1",
  headers: {
    responseType: "application/json",
  },
});
// instance.defaults.withCredentials = true;
export default instance;
