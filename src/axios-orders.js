import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-e094a.firebaseio.com/",
});

export default instance;
