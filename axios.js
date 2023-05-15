import axios from "axios";


const instance = axios.create({
  withCredentials: true,
  // baseURL: "https://project-backend1.herokuapp.com/api/v1",
  baseURL: "http://10.3.202.99:3001/api/v1",
  // baseURL: "http://10.3.201.135:3001/api/v1",
    // baseURL: "http://localhost:3001/api/v1",
  headers: {
    responseType: "application/json",
    // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGY2N2MwZGJlNTY1ZWQ1MmYxYTUzZCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjU4OTc2NjgyLCJleHAiOjE2NjE1Njg2ODJ9.Lj9R5n39UHjge2w09hh0BwNR2ZzWw7Aqb0594U9z-jw',
    // Authorization: "Beare " + token,
  },
});
// instance.defaults.withCredentials = true;
export default instance;