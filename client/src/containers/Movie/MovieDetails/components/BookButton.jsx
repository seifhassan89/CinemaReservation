import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import BookOnlineIcon from '@mui/icons-material/BookOnline';
import { useNavigate } from 'react-router-dom';
import messages from '../../../../assets/locales/messages';
import AlertDialog from '../../../../components/AlertDialog';
import { ROUTES_PATHS } from '../../../../utils/RoutesPaths';

const BookButton = () => {
  const { locale } = useSelector((state) => state.locale);
  const { movieDetails } = useSelector((state) => state.movie);
  const { movies } = messages[locale];
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    navigate(ROUTES_PATHS.movieDetailsBook.replace(':id', movieDetails?.id));

    handleClose();
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          color: 'success.main',
        }}
        onClick={handleClickOpen}>
        <BookOnlineIcon fontSize="small" sx={{ mr: 1 }} />
        <Typography
          variant="body1"
          sx={{
            pb: locale === 'ar' ? '4px' : '0',
            pt: locale === 'en' ? '2px' : '0',
          }}>
          {movies?.movieDetailsLocale.bookMovie}
        </Typography>
      </Box>
      <AlertDialog
        open={open}
        handleConfirm={handleConfirm}
        handleClose={handleClose}
        title={`${movies?.movieDetailsLocale.bookMovieModel} ${movieDetails?.name}${locale === 'ar' ? '؟' : '?'}`}
        description={movies?.movieDetailsLocale.bookNow}
      />
    </>
  );
};

export default BookButton;
