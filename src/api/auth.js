import axios from "./axios-config";

const separateUserToken = (userDTO) => ({
  user: {
    name: userDTO.name,
    email: userDTO.email,
    id: userDTO.id
  },
  token: userDTO.token
});

export const login = async (credentials) => {
  const res = await axios.post(`/auth/login`, credentials);
  return separateUserToken(res.data);
};

export const registerUser = async (newUser) => {
  const res = await axios.post(`/auth/register`, newUser);
  return separateUserToken(res.data);
};

export const getUserFromToken = async (token) => {
  const res = await axios.get(`/auth/user`, {
    headers: {
      "Auth-Token": token
    }
  });
  return res.data;
};
