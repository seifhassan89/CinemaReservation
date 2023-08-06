import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.iconHover,
  },
  // hide border
  "& td, & th": {
    border: 0,
  },
}));
