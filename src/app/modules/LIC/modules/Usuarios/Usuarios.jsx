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
import { alertActions } from "../../../../../actions";
import { Pagination, MyModal, AlertDialog } from "../../components";
import { userService } from "../../services";
import { CircularProgress } from "@material-ui/core";
import { CreateUser } from "./";
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

export function Usuarios() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [userEdit, setUserEdit] = useState(-1);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    userName: "",
    rolesID: [],
    jobTitle: "",
    department: "",
    company: "",
    city: "",
    cityID: "",
    state: "",
    stateID: "",
    country: "",
    countryID: "",
    gender: 0,
  });
  const [errors, setErrors] = useState({});
  const classes = useRowStyles();
  const [deleteMode, setDeleteMode] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    getRoles();
    getUsers({ page: 1, size: 10 });
  }, []);

  function onPageChange(props) {
    getUsers(props);
  }

  async function getUsers({ page, size }) {
    setLoading(true);
    try {
      const { users, total } = await userService.getUsers({ page, size });
      setTotal(total);
      setRows(users);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  async function getRoles() {
    try {
      const roles = await userService.getRoles();
      setRoles(roles);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(id, value) {
    if (id === "countryID") {
      setUser({
        ...user,
        [id]: value.id,
        country: value.name,
        stateID: "",
        state: "",
        cityID: "",
        city: "",
      });
    } else if (id === "stateID") {
      setUser({
        ...user,
        [id]: value.id,
        state: value.name,
        cityID: "",
        city: "",
      });
    } else if (id === "cityID") {
      setUser({ ...user, [id]: value.id, city: value.name });
    } else {
      setUser({ ...user, [id]: value });
    }
  }

  function handleCreateUser() {
    setCreateMode(true);
    setEditMode(false);
    setUser({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      userName: "",
      rolesID: [],
      jobTitle: "",
      department: "",
      company: "",
      city: "",
      cityID: "",
      state: "",
      stateID: "",
      country: "",
      countryID: "",
      gender: 0,
    });
  }

  function handleEdit(user, index) {
    setUser(user);
    setCreateMode(true);
    setEditMode(true);
    setUserEdit(index);
  }

  async function handleSave() {
    if (validateErrors(user)) {
      return;
    }
    setErrors({});
    try {
      let sendUser = { ...user };
      if (editMode) {
        delete sendUser.userId;
        await userService.updateUser(sendUser, user.userId);
        sendUser.userId = user.userId;
      } else {
        const newUser = await userService.createUser(sendUser);
        sendUser.userId = newUser.codigo;
      }
      sendUser.userName = sendUser.email;
      const usersTemp = [...rows];
      if (editMode) {
        usersTemp[userEdit] = sendUser;
        dispatch(alertActions.success("Usuario actualizado con éxito"));
      } else {
        usersTemp.unshift(sendUser);
        dispatch(alertActions.success("Usuario creado con éxito"));
      }
      setRows(usersTemp);
      setUserEdit(-1);
      setEditMode(false);
      setCreateMode(false);
      setUser({});
    } catch (error) {
      dispatch(alertActions.error(error));
    }
  }

  async function handleDelete(user, index) {
    setUserEdit(index);
    setUser(user);
    setDeleteMode(true);
  }

  async function deleteUser() {
    try {
      await userService.removeUser(user.userId);
      const usersTemp = [...rows];
      usersTemp.splice(userEdit, 1);
      setRows(usersTemp);
      setUser({});
      setUserEdit(-1);
      setDeleteMode(false);
      dispatch(alertActions.success("Usuario eliminado con éxito"));
    } catch (error) {
      dispatch(alertActions.error(error));
    }
  }

  function cancelDelete() {
    setUser({});
    setUserEdit(-1);
    setDeleteMode(false);
  }

  function validateErrors(user) {
    const tempErrors = {};
    let hasError = false;
    if (
      !/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i.test(
        user.firstName
      )
    ) {
      tempErrors.firstName = "Ingrese un nombre válido";
      hasError = true;
    }

    if (
      !/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i.test(
        user.lastName
      )
    ) {
      tempErrors.lastName = "Ingrese un nombre válido";
      hasError = true;
    }

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(user.email)) {
      tempErrors.email = "Ingrese un correo válido";
      hasError = true;
    }

    if (user.countryID === "" || user.country === "") {
      tempErrors.countryID = "Campo obligatorio";
      hasError = true;
    }

    if (user.stateID === "" || user.stateID === "") {
      tempErrors.stateID = "Campo obligatorio";
      hasError = true;
    }

    if (user.cityID === "" || user.city === "") {
      tempErrors.cityID = "Campo obligatorio";
      hasError = true;
    }
    setErrors(tempErrors);
    return hasError;
  }

  return (
    <Card>
      <CardHeader
        title="Usuarios"
        action={
          <Button
            color="secondary"
            variant="contained"
            onClick={handleCreateUser}
          >
            Crear Usuario
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
                  <TableCell>Usuario</TableCell>
                  <TableCell>Nombres</TableCell>
                  <TableCell>Apellidos</TableCell>
                  <TableCell>Departamento</TableCell>
                  {/* <TableCell className="text-center">Roles</TableCell>
                  <TableCell className="text-center">Sistemas</TableCell> */}
                  <TableCell className="text-center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="text-center">
                {rows.map((row, index) => (
                  <TableRow className={classes.root} key={index}>
                    <TableCell>{row.userName}</TableCell>
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>{row.department}</TableCell>
                    {/* <TableCell className="text-center">
                      <Button color="primary" size="small" variant="outlined">
                        Ver Roles
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button color="primary" size="small" variant="outlined">
                        Ver Sistemas
                      </Button>
                    </TableCell> */}
                    <TableCell className="text-center">
                      {/* <Tooltip title="Ver Usuario">
                        <IconButton
                          size="small"
                          className="fa fa-eye"
                          color="primary"
                        ></IconButton>
                      </Tooltip> */}
                      <Tooltip title="Editar Usuario">
                        <IconButton
                          onClick={() => handleEdit(row, index)}
                          size="small"
                          className="fa fa-edit"
                          color="secondary"
                        ></IconButton>
                      </Tooltip>
                      <Tooltip title="Desactivar Usuario">
                        <IconButton
                          size="small"
                          className="fa fa-trash"
                          style={{ color: "red" }}
                          onClick={() => handleDelete(row, index)}
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

        {createMode && (
          <MyModal
            open={createMode}
            handleClose={() => setCreateMode(false)}
            title="Crear Usuario"
            editMode={true}
            handleSave={handleSave}
          >
            <CreateUser
              user={user}
              handleChange={handleChange}
              errors={errors}
              roles={roles}
              editMode={editMode}
            ></CreateUser>
          </MyModal>
        )}

        {deleteMode ? (
          <AlertDialog
            isOpen={deleteMode}
            confirm={deleteUser}
            disagree={cancelDelete}
          />
        ) : null}
      </CardBody>
    </Card>
  );
}
