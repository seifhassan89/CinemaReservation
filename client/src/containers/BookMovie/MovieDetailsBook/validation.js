import * as Yup from 'yup';

export const CREATE_EDIT_BOOK_SCHEMA = (BookMovieFormLocale, book) => {
  return Yup.object().shape({
    movieId: Yup.string(),
    hallId: Yup.string().required(BookMovieFormLocale?.validation.hallIdReq),
    date: Yup.date().required(BookMovieFormLocale?.validation.dateReq),
    partyTimeId: Yup.number().required(BookMovieFormLocale?.validation.partyTimeReq),
  });
};

export const getInitialValuesCreate = () => {
  return {
    movieId: null,
    hallId: null,
    date: '',
    partyTimeId: null,
  };
};
