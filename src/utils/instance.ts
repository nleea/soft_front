import axios from "axios";


const controller = new AbortController();

const instance = axios.create({
  baseURL: "http://18.218.203.26/",
  signal: controller.signal
});


export { instance, controller };
