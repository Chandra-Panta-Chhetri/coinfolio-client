import axios from "./axios-config";
import { isNullOrUndefined } from "../utils";

const toUserTokenDTO = (userDTO) => ({
  user: {
    name: userDTO?.name,
    email: userDTO?.email,
    id: userDTO?.id
  },
  token: userDTO?.token
});

export const login = async (credentials) => {
  if (!isNullOrUndefined(credentials)) {
    const res = await axios.post(`/auth/login`, credentials);
    const user = toUserTokenDTO(res?.data);
    return user;
  }
  return null;
};

export const registerUser = async (newUser) => {
  if (!isNullOrUndefined(newUser)) {
    const res = await axios.post(`/auth/register`, newUser);
    const user = toUserTokenDTO(res?.data);
    return user;
  }
  return null;
};

export const getUserFromToken = async (token) => {
  if (!isNullOrUndefined(token)) {
    const res = await axios.get(`/auth/user`, {
      headers: {
        "X-Auth-Token": token
      }
    });
    const user = res?.data;
    return user;
  }
  return null;
};
