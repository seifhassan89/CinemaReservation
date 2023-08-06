import { axiosInstance } from '.';

const getMovies = async (params) => await axiosInstance.get('/movies', { params });

const getMovieDetails = async (id) => await axiosInstance.get(`/movies/${id}`);

const getAvailableSeats = async ({ movieId, date, hallId, partyTimeId }) =>
  await axiosInstance.get(`/reservations/filtered`, { movieId, date, hallId, partyTimeId });

const getCancelSeat = async (id) => await axiosInstance.delete(`/reservations/${id}`);

const getBookDetails = async ({ hallId, movieId, partyTimeId, seatId, reservationDate }) =>
  await axiosInstance.post(`/reservations`, {
    hallId: +hallId,
    movieId: +movieId,
    partyTimeId: +partyTimeId,
    seatId: +seatId,
    reservationDate,
  });

export { getMovies, getMovieDetails, getAvailableSeats, getCancelSeat, getBookDetails };
