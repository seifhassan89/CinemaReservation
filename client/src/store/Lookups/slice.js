import { createSlice } from '@reduxjs/toolkit';

export const lookupsSlice = createSlice({
  name: 'lookups',
  initialState: {
    halls: [],
    seats: [],
    partyTimes: [],
    reservedSeats: [],
  },
  reducers: {
    getHallsRequest: () => {},
    getHallsResponse: (state, action) => {
      state.halls = action.payload;
    },
    getPartyTimesRequest: () => {},
    getPartyTimesResponse: (state, action) => {
      state.partyTimes = action.payload;
    },
    getSeatsRequest: () => {},
    getSeatsResponse: (state, action) => {
      state.seats = action.payload;
    },
    getReservationsFilteredRequest: () => {},
    getReservationsFilteredResponse: (state, action) => {
      state.reservedSeats = action.payload;
    },
  },
});

export const {
  getHallsRequest,
  getHallsResponse,
  getPartyTimesRequest,
  getPartyTimesResponse,
  getSeatsRequest,
  getSeatsResponse,
  getReservationsFilteredRequest,
  getReservationsFilteredResponse,
} = lookupsSlice.actions;
export default lookupsSlice.reducer;
