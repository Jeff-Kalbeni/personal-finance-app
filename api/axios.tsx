import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.231.80:3030/api",
});
