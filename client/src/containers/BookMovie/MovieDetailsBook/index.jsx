import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Grid, Skeleton, Typography } from '@mui/material';
import { useFormik } from 'formik';
import messages from '../../../assets/locales/messages';
import Autocomplete from '../../../components/Autocomplete';
import Button from '../../../components/Button';
import CustomDatePicker from '../../../components/DatePicker';
import {
  getHallsRequest,
  getHallsResponse,
  getPartyTimesRequest,
  getPartyTimesResponse,
} from '../../../store/Lookups/slice';
import { PARTY_TIMES } from '../../../utils/Constants';
import { CREATE_EDIT_BOOK_SCHEMA, getInitialValuesCreate } from './validation';

const MovieDetailsBook = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { locale } = useSelector((state) => state.locale);
  const { skeletonObject } = useSelector((state) => state.loader);
  const { halls, partyTimes } = useSelector((state) => state.lookups);
  const { movies: moviesLocale } = messages[locale];
  const { BookMovieForm: BookMovieFormLocale } = moviesLocale;

  const [today, setToday] = useState(new Date());
  const [mappedPartyTimeOptions, setMappedPartyTimeOptions] = useState([]);

  useEffect(() => {
    // Get LookUps and set default values
    dispatch(getHallsRequest({ movieId: id }));
    setFieldValue('movieId', id);
    setFieldTouched('movieId');
    setFieldValue('date', today);
    setFieldTouched('date');

    return () => {
      dispatch(getHallsResponse([]));
      dispatch(getPartyTimesResponse([]));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { values, setFieldValue, handleSubmit, setFieldTouched, dirty, isValid } = useFormik({
    initialValues: getInitialValuesCreate(),
    // null here represent the book object in the edit mode => Out of scope for now
    validationSchema: CREATE_EDIT_BOOK_SCHEMA(BookMovieFormLocale, null),
    onSubmit: async ({ movieId, partyTimeId, date, hallId }) => {
      const queryParams = {
        movieId,
        partyTimeId,
        date,
        hallId,
      };
      navigate(`/movies/${movieId}/book/seat?${new URLSearchParams(queryParams).toString()}`);
    },
  });

  useEffect(() => {
    if (values.hallId) {
      dispatch(
        getPartyTimesRequest({
          movieId: id,
          hallId: values.hallId,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.hallId]);

  useEffect(() => {
    if (partyTimes?.length > 0) {
      const mappedPartyTimeOptions = partyTimes.map((partyTime) => {
        return {
          id: partyTime.id,
          name: partyTime.from,
        };
      });
      setMappedPartyTimeOptions(mappedPartyTimeOptions);
    }
  }, [partyTimes]);

  return (
    <Grid
      container
      sx={{
        backgroundColor: 'secondary.main',
        p: 4,
        borderRadius: '20px',
      }}
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off">
      <Typography variant="body0">{skeletonObject?.profile ? <Skeleton width={'200px'} /> : 'Book Online'}</Typography>
      <Grid
        container
        sx={{
          backgroundColor: 'secondary.main',
          p: 4,
          borderRadius: '20px',
        }}>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ borderBottom: 1, mb: 2 }}>
            {BookMovieFormLocale.halls}
          </Typography>
          <Autocomplete
            options={halls}
            placeholder={BookMovieFormLocale.selectHall}
            onChange={(value) => {
              setFieldTouched('hallId');
              setFieldValue('hallId', value);
            }}
            value={values['hallId']}
            name={'HallId'}
            multiple={false}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            marginY: '50px',
          }}>
          <Typography variant="h6" sx={{ borderBottom: 1, mb: 2 }}>
            {BookMovieFormLocale.date}
          </Typography>
          {/* TODO: Disable past days from Today */}
          <CustomDatePicker
            date={values['date'] || today}
            setDate={(value) => {
              setFieldTouched('date');
              setFieldValue('date', value);
              setToday(value);
            }}
            required={true}
            id={'date'}
            name={'date'}
            label={BookMovieFormLocale.date}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ borderBottom: 1, mb: 2 }}>
            {BookMovieFormLocale.time}
          </Typography>
          <Autocomplete
            options={mappedPartyTimeOptions || PARTY_TIMES}
            placeholder={BookMovieFormLocale.time}
            onChange={(value) => {
              setFieldTouched('partyTimeId');
              setFieldValue('partyTimeId', value);
            }}
            value={values['partyTimeId']}
            name={'partyTimeId'}
            multiple={false}
            disabled={mappedPartyTimeOptions?.length === 0}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            label={BookMovieFormLocale.checkSeat}
            sx={{
              py: '0.5rem',
              px: '2.5rem',
              mt: '1rem',
              '&:hover': {
                opacity: 0.9,
                backgroundColor: 'primary.main',
              },
            }}
            color={'primary'}
            disabled={!dirty || !isValid}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MovieDetailsBook;
