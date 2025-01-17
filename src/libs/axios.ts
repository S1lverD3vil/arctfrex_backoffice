import { env } from "@/constants/env";
import Axios from "axios";

const axios = Axios.create({
  baseURL: env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axios;
