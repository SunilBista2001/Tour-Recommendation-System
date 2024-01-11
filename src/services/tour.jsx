import AxiosService from "./AxiosService";

export const getTourByCollaborativeAlgorithm = async () => {
  const response = await AxiosService.get("api/v1/user");
  return response.data;
};

export const createTour = async (data) => {
  const response = await AxiosService.post("api/v1/tour", data);
  return response.data;
};

export const getTours = async () => {
  const response = await AxiosService.get("api/v1/tour");
  return response.data;
};

export const getTour = async (id) => {
  const response = await AxiosService.get(`api/v1/tour/${id}`);
  return response.data;
};

export const updateTour = async (id, data) => {
  const response = await AxiosService.patch(`api/v1/tour/${id}`, data);
  return response.data;
};

export const deleteTour = async (id) => {
  const response = await AxiosService.delete(`api/v1/tour/${id}`);
  return response.data;
};
