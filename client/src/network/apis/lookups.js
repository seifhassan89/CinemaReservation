import { axiosInstance } from './';

const getHalls = async (params) => await axiosInstance.get(`/halls/movie/${params.movieId}`);

const getPartyTimes = async (params) =>
  await axiosInstance.get(`/partyTimes/movie/${params.movieId}/hall/${params.hallId}`);

const getSeats = async (params) => await axiosInstance.get('/seats', { params });

const getReservedSeat = async (params) => await axiosInstance.get('/reservations/filtered', { params });

export { getHalls, getSeats, getReservedSeat, getPartyTimes };
