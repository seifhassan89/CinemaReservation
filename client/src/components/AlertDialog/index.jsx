import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import messages from '../../assets/locales/messages';

export default function AlertDialog({ open, handleConfirm, handleClose, title, description, RenderBody }) {
  const { locale } = useSelector((state) => state.locale);
  const { shared } = messages[locale];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title" sx={{ color: 'text.input', fontWeight: '700' }}>
        {title}
      </DialogTitle>
      <DialogContent>
        {!RenderBody && (
          <DialogContentText id="alert-dialog-description" sx={{ color: 'text.input' }}>
            {description}
          </DialogContentText>
        )}
        {RenderBody && RenderBody}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm} sx={{ '&:hover': { color: 'success.main' } }}>
          {shared?.confirm}
        </Button>
        <Button onClick={handleClose}>{shared?.cancel}</Button>
      </DialogActions>
    </Dialog>
  );
}
