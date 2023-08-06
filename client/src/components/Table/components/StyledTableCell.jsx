import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.iconHover,
    color: theme.palette.text.primary,
    fontSize: "0.9rem",
    paddingLeft: "3rem",
    paddingTop: "1.5rem",
  },
  [`&.${tableCellClasses.body}`]: {
    paddingLeft: "3rem",
    fontSize: "1rem",
  },
}));
