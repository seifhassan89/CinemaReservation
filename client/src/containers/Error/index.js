import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";

import messages from "../../assets/locales/messages";

const Error = () => {
  const { locale } = useSelector((state) => state.locale);
  const { shared } = messages[locale];

  return (
    <Typography color={"error"} variant="h1" textAlign={"center"}>
      {shared?.notFound}
    </Typography>
  );
};

export default Error;
