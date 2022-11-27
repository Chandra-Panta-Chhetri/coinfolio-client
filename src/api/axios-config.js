import axios from "axios";
import { URLS } from "../constants";

export default axios.create({
  baseURL: `${URLS.BACKEND_BASE_URL}/api`
});
