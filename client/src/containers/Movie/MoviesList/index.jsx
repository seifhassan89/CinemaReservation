import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import imagePlaceHolder from '../../../assets/Images/image-placeholder.png';
import messages from '../../../assets/locales/messages';
import Table from '../../../components/Table';
import { setAppBarMobileContent, setAppBarTitle, toggleShowFilters } from '../../../store/AppHelpers/slice';
import { getMoviesListRequest, getMoviesListResponse } from '../../../store/Movie/slice';
import { ROUTES_PATHS } from '../../../utils/RoutesPaths';

const Movies = () => {
  const dispatch = useDispatch();

  const { locale } = useSelector((state) => state.locale);
  const { list: moviesList } = useSelector((state) => state.movie);
  const { movies: moviesLocale, shared } = messages[locale];

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMoviesListRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  useEffect(() => {
    dispatch(setAppBarTitle(moviesLocale?.appBarTitle));
    dispatch(
      setAppBarMobileContent([
        {
          icon: <FilterListOutlinedIcon fontSize="small" />,
          label: shared?.appBar.filters,
          onClick: () => {
            dispatch(toggleShowFilters());
          },
        },
      ])
    );

    return () => {
      dispatch(setAppBarMobileContent([]));
      dispatch(getMoviesListResponse({ movies: [] }));
    };
  }, [dispatch, moviesLocale, shared]);

  const rows = useMemo(() => {
    return moviesList?.map((movie) => ({
      id: movie.id,
      name: (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="null">{movie.name || '__'}</Typography>
        </Box>
      ),
      imageUrl: (
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <img
              src={movie.imageUrl}
              alt={movie.name}
              style={{ width: '10%', height: '10%' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = imagePlaceHolder;
              }}
            />
          </Grid>
        </Grid>
      ),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviesList, locale]);

  const fields = ['name', 'imageUrl'];

  return (
    <Box
      sx={{
        paddingBottom: '100px',
      }}>
      <Table
        headerKeys={fields}
        data={rows}
        fields={fields}
        navigate={navigate}
        navArray={[
          {
            field: 'imageUrl', // field clickable in table to navigate on click
            path: ROUTES_PATHS.movieDetails, // path to navigate to
            toReplace: ':id', // part to replace in path
            with: 'id', // field in target object to replace the path part with
          },
        ]}
        locale={moviesLocale?.table}
      />
    </Box>
  );
};

export default Movies;
