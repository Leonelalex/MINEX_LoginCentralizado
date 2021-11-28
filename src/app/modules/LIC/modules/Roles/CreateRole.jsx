/* eslint no-restricted-imports: ["error"] */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { userService } from "../../services";
import {
  TextField,
  Grid,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  textField: {
    minWidth: "100%",
    margin: "10px",
    maxWidth: "100%",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      maxWidth: 250,
    },
  },
};

export function CreateRole({ role, handleChange, errors }) {
  const classes = useStyles();

  const [menusItems, setMenusItems] = useState([]);
  const [permisosItems, setPermisosItems] = useState([]);

  const [systems, setSystems] = useState([]);
  const menusList = useSelector((state) => state.licData.menus);
  const permitionsList = useSelector((state) => state.licData.permitions);

  const handleChangeMenu = (event) => {
    const {
      target: { value },
    } = event;
    handleChange("menus", value);
  };

  const handleChangePermisos = (event) => {
    const {
      target: { value },
    } = event;
    handleChange("permisos", value);
  };

  const handleSetSystem = (event) => {
    const menus = menusList.find(
      (menu) => menu.systemId === event.target.value
    );
    const permitions = permitionsList.filter(
      (permition) => permition.systemId === event.target.value
    );
    const system = systems.find(
      (system) => system.systemId === event.target.value
    );
    setMenusItems(menus ? menus.data : []);
    setPermisosItems(permitions);
    // handleChange("sistemaId", event.target.value);
    handleChange("system", system);
  };

  const handleSetMenusAndPermitions = (systems) => {
    if (role.sistemaId === "") return;
    const menus = menusList.find((menu) => menu.systemId === role.sistemaId);
    const permitions = permitionsList.filter(
      (permition) => permition.systemId === role.sistemaId
    );
    const system = systems.find((system) => system.systemId === role.sistemaId);
    setMenusItems(menus ? menus.data : []);
    setPermisosItems(permitions);
    handleChange("systemEdit", system);
  };

  async function getSystems() {
    try {
      const systems = await userService.getSystems();
      setSystems(systems);
      handleSetMenusAndPermitions(systems);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSystems();
    // eslint-disable-next-line
  }, []);

  return (
    <form noValidate autoComplete="off" className={classes.container}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            id="name"
            label="Nombre"
            placeholder="Ingrese el nombre del Rol"
            value={role.name}
            onChange={(e) => handleChange(e.target.id, e.target.value)}
            className={classes.textField}
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name && errors.name}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="description"
            label="Descripción"
            placeholder="Ingrese descripción"
            value={role.description}
            onChange={(e) => handleChange(e.target.id, e.target.value)}
            className={classes.textField}
            variant="outlined"
            error={!!errors.description}
            helperText={errors.description && errors.description}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl className={classes.textField}>
            <InputLabel id="sistemaLbl" className="ml-4">
              Sistema
            </InputLabel>
            <Select
              labelId="sistemaLbl"
              id="sistemaId"
              value={role.sistemaId}
              label="Sistema"
              variant="outlined"
              onChange={handleSetSystem}
              error={!!errors.sistemaId}
            >
              {systems.map((system) => (
                <MenuItem value={system.systemId} key={system.siglas}>
                  {system.systemName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl className={classes.textField}>
            <InputLabel id="menusLbl" className="ml-4">
              Menus
            </InputLabel>

            <Select
              labelId="menusLbl"
              id="menus"
              multiple
              value={role.menus}
              onChange={handleChangeMenu}
              input={<OutlinedInput label="Menus" />}
              renderValue={(selected) =>
                selected
                  .map(
                    (item) =>
                      menusItems.find((menu) => menu.menuId === item)?.menuName
                  )
                  .join(",")
              }
              MenuProps={MenuProps}
              disabled={role.sistemaId === ""}
            >
              {menusItems.map((menu) => (
                <MenuItem key={menu.menuId} value={menu.menuId}>
                  <Checkbox
                    checked={
                      role.menus.findIndex((item) => item === menu.menuId) > -1
                    }
                  />
                  <ListItemText primary={menu.menuName} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl className={classes.textField}>
            <InputLabel id="permisosLbl" className="ml-4">
              Permisos
            </InputLabel>

            <Select
              labelId="permisosLbl"
              id="permisos"
              multiple
              value={role.permisos}
              onChange={handleChangePermisos}
              input={<OutlinedInput label="Permisos" />}
              renderValue={(selected) =>
                selected
                  .map(
                    (item) =>
                      permisosItems.find(
                        (permiso) => permiso.idPermition === item
                      )?.codePermition
                  )
                  .join(",")
              }
              MenuProps={MenuProps}
              disabled={role.sistemaId === ""}
            >
              {permisosItems.map((permiso) => (
                <MenuItem key={permiso.idPermition} value={permiso.idPermition}>
                  <Checkbox
                    checked={
                      role.permisos.findIndex(
                        (item) => item === permiso.idPermition
                      ) > -1
                    }
                  />
                  <ListItemText primary={permiso.codePermition} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
}
