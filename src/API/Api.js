import axios from "axios";

// Set config defaults when creating the instance
export const axiosClient = axios.create({
  baseURL: `https://d135-182-183-15-37.ngrok-free.app/api`,
});

// Auth APIs
export const Login = (Data) => {
  return axiosClient.post(`user/signin`, Data);
};

export const Register = (Data) => {
  return axiosClient.post(`user/register`, Data);
};