import { Avatar, Grid, Skeleton, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import messages from '../../../assets/locales/messages';
import EmptyState from '../../../components/EmptyState';
import { setAppBarTitle } from '../../../store/AppHelpers/slice';
import { getMovieDetailsRequest, getMovieDetailsResponse } from '../../../store/Movie/slice';
import BookButton from './components/BookButton';

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { locale } = useSelector((state) => state.locale);
  const { movieDetails } = useSelector((state) => state.movie);
  const { skeletonObject, canShowEmptyState } = useSelector((state) => state.loader);
  const { movieDetailsLocale } = messages[locale]?.movies;

  useEffect(() => {
    dispatch(setAppBarTitle(movieDetailsLocale?.movieProfile));
    dispatch(getMovieDetailsRequest(id));

    return () => {
      dispatch(getMovieDetailsResponse({}));
    };
  }, [dispatch, id, locale, movieDetailsLocale]);

  return (
    <>
      {!!Object.keys(movieDetails).length || skeletonObject?.profile ? (
        <Grid
          container
          sx={{
            backgroundColor: 'secondary.main',
            p: 4,
            borderRadius: '20px',
          }}>
          <Grid item xs={12} sm={6} md={3} lg={2} sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
            {skeletonObject?.profile ? (
              <Skeleton variant="circular" width={120} height={120} />
            ) : (
              <Avatar
                alt={movieDetails?.name}
                src={movieDetails?.imageUrl}
                sx={{
                  bgcolor: 'primary.main',
                  width: 120,
                  height: 120,
                  color: 'text.primary',
                  fontSize: '3rem',
                }}
              />
            )}
          </Grid>
          <Grid item container xs={12} sm={6} md={6} lg={8}>
            <Grid item xs={12}>
              <Typography variant="body0">
                {skeletonObject?.profile ? <Skeleton width={'200px'} /> : movieDetails?.name || '--'}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            lg={2}
            sx={{
              display: 'flex',
              justifyContent: {
                xs: 'center',
                md: 'flex-end',
              },
              alignItems: 'flex-start',
              mt: {
                xs: 5,
                md: 0,
              },
            }}>
            <BookButton />
          </Grid>
        </Grid>
      ) : ( 
        canShowEmptyState && <EmptyState />
      )}
    </>
  );
};

export default MovieDetails;
