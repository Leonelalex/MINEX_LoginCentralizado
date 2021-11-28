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
import { Pagination, MyModal, Menus, Permitions } from "../../components";
import { alertActions } from "../../../../../actions";
import { userService } from "../../services";
import { CircularProgress } from "@material-ui/core";
import { CreateRole } from "./";
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

export function Roles() {
  const [rows, setRows] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [viewMenus, setViewMenus] = useState(false);
  const [viewPermitions, setViewPermitions] = useState(false);
  const [role, setRole] = useState(-1);
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const [editRole, setEditRole] = useState({
    menus: [],
    permisos: [],
    name: "",
    description: "",
    sistemaId: "",
    system: {},
  });
  const [createRole, setCreateRole] = useState(false);

  const classes = useRowStyles();

  useEffect(() => {
    getRoles();
  }, []);

  function onPageChange(props) {
    setRows(
      items.slice((props.page - 1) * props.size, props.page * props.size)
    );
  }

  async function getRoles() {
    setLoading(true);
    try {
      const roles = await userService.getRoles();
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

  function handleCreateRole() {
    setCreateRole(true);
    setErrors({});
    setEditRole({
      menus: [],
      permisos: [],
      name: "",
      description: "",
      sistemaId: "",
      system: {},
    });
  }

  function handleEditRole(role, index) {
    setEditMode(true);
    setCreateRole(true);
    setEditRole({ ...role, sistemaId: role.system.systemId });
    setRole(index);
    setErrors({});
  }

  function handleChange(id, value) {
    let editRoleTemp;
    if (id === "system")
      editRoleTemp = {
        ...editRole,
        [id]: value,
        menus: [],
        permisos: [],
        sistemaId: value.systemId,
      };
    else if (id === "systemEdit")
      editRoleTemp = {
        ...editRole,
        system: value,
        sistemaId: value.systemId,
      };
    else editRoleTemp = { ...editRole, [id]: value };
    setEditRole(editRoleTemp);
  }

  async function handleSave() {
    const tempErrors = {};
    let hasError = false;
    if (editRole.name === "") {
      tempErrors.name = "Campo obligatorio";
      hasError = true;
    }

    if (editRole.description === "") {
      tempErrors.description = "Campo obligatorio";
      hasError = true;
    }

    if (editRole.sistemaId === "") {
      tempErrors.sistemaId = "Campo obligatorio";
      hasError = true;
    }

    if (hasError) {
      setErrors(tempErrors);
      return;
    }
    setErrors({});

    try {
      let sendRole = { ...editRole };
      delete sendRole.system;
      if (editMode) {
        delete sendRole.id;
        await userService.updateRole(sendRole, editRole.id);
        sendRole.id = editRole.id;
      } else {
        const newRole = await userService.createRole(sendRole);
        sendRole.id = newRole.codigo;
      }
      const rowsTemp = [...rows];
      const itemsTemp = [...items];

      sendRole = {
        ...sendRole,
        system: { ...editRole.system, nameSystem: editRole.system.systemName },
      };

      if (editMode) {
        const index = rowsTemp.findIndex((row) => row.id === editRole.id);
        itemsTemp[role] = sendRole;
        rowsTemp[index] = sendRole;
        dispatch(alertActions.success("Rol actualizado con éxtio"));
      } else {
        rowsTemp.unshift(sendRole);
        itemsTemp.unshift(sendRole);
        itemsTemp.pop();
        dispatch(alertActions.success("Rol creado con éxito"));
      }
      setRows(rowsTemp);
      setItems(itemsTemp);
      setCreateRole(false);
      setEditMode(false);
      setRole(-1);
    } catch (error) {
      dispatch(alertActions.error(error));
    }
  }

  return (
    <Card>
      <CardHeader
        title="Roles"
        action={
          <Button
            color="secondary"
            variant="contained"
            onClick={handleCreateRole}
          >
            Crear Rol
          </Button>
        }
      ></CardHeader>
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
                  <TableCell>Nombre</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Sistema</TableCell>
                  <TableCell className="text-center">Menús</TableCell>
                  <TableCell className="text-center">Permisos</TableCell>
                  <TableCell className="text-center">Acciones</TableCell>
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
                    <TableCell className="text-center">
                      <Tooltip title="Editar Rol">
                        <IconButton
                          size="small"
                          className="fa fa-edit"
                          color="secondary"
                          onClick={() => handleEditRole(row, index)}
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

        {createRole && (
          <MyModal
            open={createRole}
            handleClose={() => setCreateRole(false)}
            title="Crear Rol"
            editMode={true}
            width="sm"
            handleSave={handleSave}
          >
            <CreateRole
              role={editRole}
              handleChange={handleChange}
              errors={errors}
            ></CreateRole>
          </MyModal>
        )}
      </CardBody>
    </Card>
  );
}
