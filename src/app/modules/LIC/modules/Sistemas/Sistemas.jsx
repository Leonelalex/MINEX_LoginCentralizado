/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint no-restricted-imports: ["error"] */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CardHeader from "@material-ui/core/CardHeader";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { Pagination, MyModal, Roles } from "../../components";
import { userService } from "../../services";
import { CircularProgress } from "@material-ui/core";
import { EditSystem } from "./";
import { alertActions } from "../../../../../actions";
import {
  CardBody,
  Card,
} from "../../../../../_metronic/_partials/controls/Card";

const useRowStyles = makeStyles(() => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
}));

export function Sistemas() {
  const [rows, setRows] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [viewRoles, setViewRoles] = useState(false);
  const [system, setSystem] = useState(-1);
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const [editSystem, setEditSystem] = useState({
    systemName: "",
    description: "",
    systemId: -1,
  });

  const classes = useRowStyles();

  useEffect(() => {
    getSystems();
  }, []);

  function onPageChange(props) {
    setRows(
      items.slice((props.page - 1) * props.size, props.page * props.size)
    );
  }

  async function getSystems() {
    setLoading(true);
    try {
      const systems = await userService.getSystems();
      setTotal(systems.length);
      setRows(systems.slice(0, 10));
      setItems(systems);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  function handleViewRoles(index) {
    setViewRoles(true);
    setSystem(index);
  }

  function handleEdit(index) {
    setEditMode(true);
    setSystem(index);
    setEditSystem(items[index]);
  }

  function handleChange(event) {
    setEditSystem({ ...editSystem, [event.target.id]: event.target.value });
  }

  async function handleSave() {
    const tempErrors = {};
    let hasError = false;
    if (editSystem.systemName === "") {
      tempErrors.systemName = "Campo obligatorio";
      hasError = true;
    }

    if (editSystem.description === "") {
      tempErrors.description = "Campo obligatorio";
      hasError = true;
    }

    if (hasError) {
      setErrors(tempErrors);
      return;
    }
    setErrors({});

    try {
      const resp = await userService.updateSystem(editSystem.systemId, {
        systemName: editSystem.systemName,
        description: editSystem.description,
      });
      let tempItems = [...items];
      let tempRows = [...rows];
      let findIndex = tempRows.findIndex(
        (value) => value.systemId === editSystem.systemId
      );

      tempItems[system] = editSystem;
      tempRows[findIndex] = editSystem;

      setItems(tempItems);
      setRows(tempRows);
      setEditMode(false);
      dispatch(alertActions.success(resp.message));
    } catch (error) {
      dispatch(alertActions.error(error));
    }
  }

  return (
    <Card>
      <CardHeader title="Sistemas"></CardHeader>
      <CardBody>
        {loading ? (
          <div style={{ position: "relative" }}>
            <CircularProgress style={{ marginLeft: "50%" }} />
          </div>
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell>Siglas</TableCell>
                  <TableCell>Titulo</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell className="text-center">Roles</TableCell>
                  <TableCell className="text-center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="text-center">
                {rows.map((row, index) => (
                  <TableRow className={classes.root} key={index}>
                    <TableCell>{row.siglas}</TableCell>
                    <TableCell>{row.systemName}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        color="primary"
                        size="small"
                        variant="outlined"
                        onClick={() => handleViewRoles(index)}
                      >
                        Ver Roles
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">
                      <Tooltip title="Editar Sistema">
                        <IconButton
                          size="small"
                          className="fa fa-edit"
                          color="secondary"
                          onClick={() => handleEdit(index)}
                        ></IconButton>
                      </Tooltip>
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
          </TableContainer>
        )}

        {viewRoles && (
          <MyModal
            open={viewRoles}
            handleClose={() => setViewRoles(false)}
            title={"Roles del Sistema " + items[system].siglas}
            editMode={false}
          >
            <Roles systemId={items[system].systemId}></Roles>
          </MyModal>
        )}

        {editMode && (
          <MyModal
            open={editMode}
            handleClose={() => setEditMode(false)}
            title={"Editar Sistema " + items[system].siglas}
            editMode={true}
            width="sm"
            handleSave={handleSave}
          >
            <EditSystem
              errors={errors}
              system={editSystem}
              handleChange={handleChange}
            ></EditSystem>
          </MyModal>
        )}
      </CardBody>
    </Card>
  );
}
