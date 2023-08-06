import * as React from "react";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";

import { StyledTableCell } from "./components/StyledTableCell";
import { StyledTableRow } from "./components/StyledTableRow";
import EmptyState from "../EmptyState";

export default function CustomizedTables({
  headerKeys,
  data,
  fields,
  navigate,
  navigateTo,
  navArray,
  locale,
}) {
  const { skeletonObject, canShowEmptyState } = useSelector(
    (state) => state.loader
  );

  const renderTableContent = () => {
    if (skeletonObject?.table) {
      return [1, 2, 3].map((num) => (
        <StyledTableRow key={num}>
          {fields.map((field, index) => (
            <StyledTableCell key={index}>
              <Skeleton />
            </StyledTableCell>
          ))}
        </StyledTableRow>
      ));
    } else {
      return data?.map((row, index) => (
        <StyledTableRow key={index}>
          {fields.map((field, fieldIndex) => {
            let zeroIndexAttributes = {};
            let navAttributes = {};
            if (fieldIndex === 0) {
              zeroIndexAttributes = {
                component: "th",
                scope: "row",
              };
            }
            const navIndex = navArray.findIndex((nav) => nav.field === field);
            if (navIndex > -1) {
              // this field has navigation
              navAttributes = {
                className: "pointer",
                onClick: () => {
                  navigate(
                    navArray[navIndex].path?.replace(
                      navArray[navIndex].toReplace,
                      row[navArray[navIndex].with]
                    )
                  );
                },
              };
            }
            return (
              <StyledTableCell
                key={fieldIndex}
                {...zeroIndexAttributes}
                {...navAttributes}
              >
                {row[field] ? row[field] : "__"}
              </StyledTableCell>
            );
          })}
        </StyledTableRow>
      ));
    }
  };

  return (
    <>
      {data?.length || skeletonObject?.table ? (
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "secondary.main",
            borderRadius: "20px 20px 0 0",
          }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {headerKeys?.map((headerKey, index) => (
                  <StyledTableCell key={index}>
                    {locale[headerKey]}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{renderTableContent()}</TableBody>
          </Table>
        </TableContainer>
      ) : (
        canShowEmptyState && <EmptyState />
      )}
    </>
  );
}
