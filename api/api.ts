import axios from "axios";

const expressApi = axios.create({
  baseURL: "/exportSvc",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default expressApi;
