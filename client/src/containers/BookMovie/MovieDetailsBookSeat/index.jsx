import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Box, Typography } from '@mui/material';
import messages from '../../../assets/locales/messages';
import AlertDialog from '../../../components/AlertDialog';
import { getReservationsFilteredRequest } from '../../../store/Lookups/slice';
import { getCancelReservationSeatRequest, getReservationSeatRequest } from '../../../store/Movie/slice';
import CinemaChairGrid from './components/CinemaChairGrid';
import { dateFormat, getPartyTime } from './helper';

const MovieDetailsBookSeat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const { locale } = useSelector((state) => state.locale);
  const { movies: moviesLocale } = messages[locale];
  const { BookMovieForm: BookMovieFormLocale } = moviesLocale;

  const [queryParameter, setQueryParameter] = useState({});
  const [userBookSeat, setUserBookSeat] = useState(null);
  const [openDeleteSeatModal, setOpenDeleteSeatModal] = useState(false);
  const [openReserveSeatModal, setOpenReserveSeatModal] = useState(false);
  const [convertedDate, setConvertedDate] = useState(null);

  const handleClickOpenOnDeleteSeatModal = () => {
    setOpenDeleteSeatModal(true);
  };

  const handleClickOpenOnReserveSeatModal = () => {
    setOpenReserveSeatModal(true);
  };

  const handleClose = () => {
    setOpenDeleteSeatModal(false);
    setOpenReserveSeatModal(false);
    setUserBookSeat(null);
  };

  const handleConfirmOnDelete = () => {
    dispatch(getCancelReservationSeatRequest({ id: userBookSeat?.realSeatId, navigate }));
    // API DeleteSeat
    handleClose();
  };

  const handleConfirmOnReserve = () => {
    dispatch(
      getReservationSeatRequest({
        seatId: userBookSeat.id,
        movieId: queryParameter.movieId,
        hallId: queryParameter.hallId,
        partyTimeId: queryParameter.partyTimeId,
        reservationDate: convertedDate || searchParams.get('date'),
        navigate,
      })
    );
    // API reserve
    handleClose();
  };

  useEffect(() => {
    let convertedDate = null;
    if (searchParams.get('date')) {
      const date = new Date(searchParams.get('date'));
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      convertedDate = `${year}-${month}-${day}`;
      setConvertedDate(convertedDate);
    }
    const x = {
      movieId: searchParams.get('movieId'),
      hallId: searchParams.get('hallId'),
      partyTimeId: searchParams.get('partyTimeId'),
      reservationDate: convertedDate || searchParams.get('date'),
    };
    setQueryParameter(x);
    dispatch(getReservationsFilteredRequest(x));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userBookSeat) {
      if (userBookSeat.isReserved) {
        handleClickOpenOnDeleteSeatModal();
      } else if (!userBookSeat.isReserved) {
        handleClickOpenOnReserveSeatModal();
      }
    }
  }, [userBookSeat]);

  const getSelectedSeat = (seat) => {
    setUserBookSeat(seat);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 2 }}>
        {BookMovieFormLocale.TicketInfo}
      </Typography>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'around',
            alignItems: 'center',
            width: '100%',
            padding: '20px',
            paddingX: '40px',
            backgroundColor: '#172C49',
            borderRadius: '30px',
            mb: 2,
          }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              flex: 1,
              flexGrow: 1,
              marginBottom: 0,
            }}>
            {BookMovieFormLocale.selectedMovie}: {queryParameter.movieId}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, flex: 1, flexGrow: 1, marginBottom: 0 }}>
            {BookMovieFormLocale.date}: {dateFormat(queryParameter.reservationDate ?? new Date())}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'around',
            alignItems: 'center',
            width: '100%',
            backgroundColor: '#172C49',
            padding: '20px',
            paddingX: '40px',
            borderRadius: '30px',
          }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, flex: 1, flexGrow: 1, marginBottom: 0 }}>
            {BookMovieFormLocale.selectedHall}: {queryParameter.hallId}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, flexGrow: 1, flex: 1, marginBottom: 0 }}>
            {BookMovieFormLocale.time}: {getPartyTime(queryParameter.partyTimeId ?? 0)}
          </Typography>
        </Box>
      </Box>
      <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 2, mt: 6 }}>
        {BookMovieFormLocale.availableSeats}
      </Typography>
      <Box
        sx={{
          backgroundColor: '#172C49',
          borderRadius: '30px',
          padding: '20px',
        }}>
        <CinemaChairGrid getSelectedSeat={getSelectedSeat} hallId={parseInt(searchParams.get('hallId'))} />
      </Box>
      <AlertDialog
        open={openDeleteSeatModal}
        handleConfirm={handleConfirmOnDelete}
        handleClose={handleClose}
        title={BookMovieFormLocale.cancelReservationOnSeat}
        description={BookMovieFormLocale.cancelReservationOnSeatMessage}
      />
      <AlertDialog
        open={openReserveSeatModal}
        handleConfirm={handleConfirmOnReserve}
        handleClose={handleClose}
        title={BookMovieFormLocale.reservationOnSeat}
        description={BookMovieFormLocale.reservationOnSeatMessage}
      />
    </Box>
  );
};

export default MovieDetailsBookSeat;
