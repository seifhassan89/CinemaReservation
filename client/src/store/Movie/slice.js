import { createSlice } from '@reduxjs/toolkit';

export const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    list: [],
    movieDetails: {},
    availableSeats: [],
    isSuccessfully: false,
  },
  reducers: {
    getMoviesListRequest: () => {},
    getMoviesListResponse: (state, action) => {
      state.list = action.payload.movies;
    },
    getMovieDetailsRequest: () => {},
    getMovieDetailsResponse: (state, action) => {
      state.movieDetails = action.payload;
    },
    getAvailableSeatsRequest: () => {},
    getAvailableSeatsResponse: (state, action) => {
      state.availableSeats = action.payload;
    },
    getCancelReservationSeatRequest: () => {},
    getCancelReservationSeatResponse: (state, action) => {
      state.isSuccessfully = action.payload;
    },
    getReservationSeatRequest: () => {},
    getReservationSeatResponse: (state, action) => {
      state.isSuccessfully = action.payload;
    },
  },
});

export const {
  getMoviesListRequest,
  getMoviesListResponse,
  getMovieDetailsRequest,
  getMovieDetailsResponse,
  getAvailableSeatsRequest,
  getAvailableSeatsResponse,
  getCancelReservationSeatRequest,
  getCancelReservationSeatResponse,
  getReservationSeatRequest,
  getReservationSeatResponse,
} = movieSlice.actions;
export default movieSlice.reducer;
