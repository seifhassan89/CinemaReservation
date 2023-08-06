import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Layout from '../components/Layout';
import Login from '../containers/Auth/Login';
import Error from '../containers/Error';
import { ROUTES_PATHS } from '../utils/RoutesPaths';

import Movies from '../containers/Movie/MoviesList';
import MovieDetails from '../containers/Movie/MovieDetails';
import MovieDetailsBook from '../containers/BookMovie/MovieDetailsBook';
import MovieDetailsBookSeat from '../containers/BookMovie/MovieDetailsBookSeat';

const AppRoutes = () => {
  const { admin } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES_PATHS.login} element={!!admin?.email ? <Navigate to={ROUTES_PATHS.movies} /> : <Login />} />
        <Route element={!!admin?.email ? <Layout /> : <Navigate to={ROUTES_PATHS.login} />}>
          <Route path={ROUTES_PATHS.movies}>
            <Route index element={<Movies />} />
            <Route path={ROUTES_PATHS.movieDetails} element={<MovieDetails />} />
            <Route path={ROUTES_PATHS.movieDetailsBook} element={<MovieDetailsBook />} />
            <Route path={ROUTES_PATHS.movieDetailsBookSeat} element={<MovieDetailsBookSeat />} />
          </Route>
          <Route path={'*'} element={<Error />} />
        </Route>
        <Route path={ROUTES_PATHS.root} element={<Navigate to={ROUTES_PATHS.movies} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
