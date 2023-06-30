import axios from "axios";
import { GLOBAL_CONSTANTS } from "../constants";

export default axios.create({
  baseURL: `${GLOBAL_CONSTANTS.BACKEND_BASE_URL}/api/v1`
});
