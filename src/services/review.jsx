import AxiosService from "./AxiosService";

export const createReview = async (tourId, data) => {
  const response = await AxiosService.post(
    `api/v1/tour/${tourId}/reviews`,
    data
  );
  return response.data;
};

export const updateReview = async (id, data) => {
  const response = await AxiosService.patch(`api/v1/reviews/${id}`, data);
  return response.data;
};

export const deleteReview = async (id) => {
  const response = await AxiosService.delete(`api/v1/reviews/${id}`);
  return response.data;
};
