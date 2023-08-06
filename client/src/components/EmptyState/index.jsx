import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";

import emptyListPlaceholder from "../../assets/Images/empty_data.svg";
import messages from "../../assets/locales/messages";

const EmptyState = () => {
  const { locale } = useSelector((state) => state.locale);
  const { shared } = messages[locale];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt: 15,
      }}
    >
      <img src={emptyListPlaceholder} alt="empty view" />
      <Typography variant="body0">{shared?.noData}</Typography>
    </Box>
  );
};

export default EmptyState;
