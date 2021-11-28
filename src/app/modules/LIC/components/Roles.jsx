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
import Button from "@material-ui/core/Button";
import { Pagination, MyModal, Permitions, Menus } from "./";
import { userService } from "../services";
import { CircularProgress } from "@material-ui/core";

const useRowStyles = makeStyles(() => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
}));

export function Roles({ systemId }) {
  const [rows, setRows] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [viewMenus, setViewMenus] = useState(false);
  const [viewPermitions, setViewPermitions] = useState(false);
  const [role, setRole] = useState(-1);

  const classes = useRowStyles();

  useEffect(() => {
    getRoles();
    // eslint-disable-next-line
  }, []);

  function onPageChange(props) {
    setRows(
      items.slice((props.page - 1) * props.size, props.page * props.size)
    );
  }

  async function getRoles() {
    setLoading(true);
    try {
      const roles = await userService.getRolesSystem(systemId);
      setTotal(roles.length);
      setRows(roles.slice(0, 10));
      setItems(roles);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  function handleViewMenus(index) {
    setViewMenus(true);
    setRole(index);
  }

  function handleViewPermitions(index) {
    setViewPermitions(true);
    setRole(index);
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
            <TableCell>Sistema</TableCell>
            <TableCell className="text-center">Menús</TableCell>
            <TableCell className="text-center">Permisos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="text-center">
          {rows.map((row, index) => (
            <TableRow className={classes.root} key={index}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.system.nameSystem}</TableCell>
              <TableCell className="text-center">
                <Button
                  color="primary"
                  size="small"
                  variant="outlined"
                  onClick={() => handleViewMenus(index)}
                >
                  Ver Menús
                </Button>
              </TableCell>
              <TableCell className="text-center">
                <Button
                  color="primary"
                  size="small"
                  variant="outlined"
                  onClick={() => handleViewPermitions(index)}
                >
                  Ver Permisos
                </Button>
              </TableCell>
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

      {viewMenus && (
        <MyModal
          open={viewMenus}
          handleClose={() => setViewMenus(false)}
          title={"Menus del Rol " + items[role].name}
          editMode={false}
        >
          <Menus roleId={items[role].id}></Menus>
        </MyModal>
      )}

      {viewPermitions && (
        <MyModal
          open={viewPermitions}
          handleClose={() => setViewPermitions(false)}
          title={"Permisos del Rol " + items[role].name}
          editMode={false}
        >
          <Permitions roleId={items[role].id}></Permitions>
        </MyModal>
      )}
    </TableContainer>
  );
}
