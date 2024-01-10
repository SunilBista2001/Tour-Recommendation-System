import AxiosService from "./AxiosService";

export const registerUser = async (data) => {
  const response = await AxiosService.post("/api/v1/signup", data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await AxiosService.post("/api/v1/login", data);
  localStorage.setItem("token", response.data.token);
  return response.data;
};

export const getMe = async () => {
  const response = await AxiosService.get("/api/v1/me");
  return response.data;
};

export const updateMe = async (data) => {
  const response = await AxiosService.patch("/api/v1/updateMe", data);
  return response.data;
};
