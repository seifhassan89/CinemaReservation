import React from "react";
import { makeStyles } from "@mui/styles";
import { CircularProgress } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    zIndex: "10000000",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  bg: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    "& > *": {
      color: theme.palette.primary.main,
    },
  },
}));

const Loader = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.bg}>
        <CircularProgress />
      </div>
    </div>
  );
};

export default Loader;
