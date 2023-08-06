import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar as CustomizedSnackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import { showHideSnackbar } from "../../store/Snackbar/slice";
import "./Snackbar.scss";

export const Snackbar = () => {
  const dispatch = useDispatch();
  const [msgsArr, setMsgsArr] = useState([]);
  const { showSnackbar } = useSelector((state) => state.snackbar);
  const { message } = useSelector((state) => state.snackbar);
  const { type } = useSelector((state) => state.snackbar);

  useEffect(() => {
    setMsgsArr(message ? message.split(",") : []);
  }, [message]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(
      showHideSnackbar({
        isOpen: false,
        type,
        message,
      })
    );
  };

  return (
    <div className="snackbar_container">
      {msgsArr.map((msg, i) => (
        <CustomizedSnackbar
          open={showSnackbar}
          autoHideDuration={msgsArr.length > 1 ? 5000 : 3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          key={i}
          className={`alert_no_${i + 1}`}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleClose}
            severity={type}
            action={false}
          >
            <span>{msg}</span>
          </MuiAlert>
        </CustomizedSnackbar>
      ))}
    </div>
  );
};

export default Snackbar;
