/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint no-restricted-imports: ["error"] */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Pagination } from "./";
import { userService } from "../services";
import { CircularProgress } from "@material-ui/core";

const useRowStyles = makeStyles(() => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
}));

export function Menus({ roleId }) {
  const [rows, setRows] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const classes = useRowStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  useEffect(() => {
    getMenus();
    // eslint-disable-next-line
  }, []);

  function onPageChange(props) {
    setRows(
      items.slice((props.page - 1) * props.size, props.page * props.size)
    );
  }

  async function getMenus() {
    setLoading(true);
    try {
      const roles = await userService.getMenusRole(roleId);
      setTotal(roles.length);
      setRows(roles.slice(0, 10));
      setItems(roles);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return loading ? (
    <div style={{ position: "relative" }}>
      <CircularProgress style={{ marginLeft: "50%" }} />
    </div>
  ) : (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Descripción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="text-center">
          {rows.map((row, index) => (
            <TableRow className={classes.root} key={index}>
              <TableCell>{row.menuName}</TableCell>
              <TableCell>{row.menuDescription}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        size={total}
        onPageChange={onPageChange}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    </TableContainer>
  );
}
