/* eslint no-restricted-imports: ["error"] */
import React, { useState, useEffect } from "react";
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
    },
  },
};

export function CreateUser({ user, handleChange, errors, roles, editMode }) {
  const classes = useStyles();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  async function getCountries() {
    try {
      const countries = await userService.getCountries();
      setCountries(countries);
    } catch (error) {
      console.log(error);
    }
  }

  async function getStates(country) {
    try {
      const states = await userService.getStates(country);
      setStates(states);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCities(state) {
    try {
      const cities = await userService.getCities(state);
      setCities(cities);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleChangeCountry(e) {
    const country = countries.find(
      (country) => country.paisCodigo === e.target.value
    );
    handleChange("countryID", { id: e.target.value, name: country?.paisName });
    getStates(e.target.value);
  }

  async function handleChangeState(e) {
    const state = states.find(
      (state) => state.divisionCodigo === e.target.value
    );
    handleChange("stateID", { id: e.target.value, name: state?.divisonName });
    getCities(e.target.value);
  }

  function handleChangeCity(e) {
    const city = cities.find((city) => city.cityCodigo === e.target.value);
    handleChange("cityID", { id: e.target.value, name: city?.cityName });
  }

  function handleChangeMenu(event) {
    const {
      target: { value },
    } = event;
    handleChange("rolesID", value);
  }

  useEffect(() => {
    getCountries();
    if (user.countryID !== "") {
      getStates(user.countryID);
    }
    if (user.stateID !== "") {
      getCities(user.stateID);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <form noValidate autoComplete="off" className={classes.container}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            id="email"
            label="Email"
            placeholder="Ingrese email del usuario"
            value={user.email}
            onChange={(e) => handleChange(e.target.id, e.target.value)}
            className={classes.textField}
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email && errors.email}
            disabled={editMode}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            id="firstName"
            label="Nombres"
            placeholder="Ingrese nombres del usuario"
            value={user.firstName}
            onChange={(e) => handleChange(e.target.id, e.target.value)}
            className={classes.textField}
            variant="outlined"
            error={!!errors.firstName}
            helperText={errors.firstName && errors.firstName}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            id="lastName"
            label="Apellidos"
            placeholder="Ingrese apellidos del usuario"
            value={user.lastName}
            onChange={(e) => handleChange(e.target.id, e.target.value)}
            className={classes.textField}
            variant="outlined"
            error={!!errors.lastName}
            helperText={errors.lastName && errors.lastName}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl className={classes.textField}>
            <InputLabel id="generoLbl" className="ml-4">
              Género
            </InputLabel>
            <Select
              labelId="generoLbl"
              id="gender"
              value={user.gender}
              label="País"
              variant="outlined"
              onChange={(e) => handleChange("gender", e.target.value)}
              error={!!errors.gender}
            >
              <MenuItem value={0}>Masculino</MenuItem>
              <MenuItem value={1}>Femenino</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            id="phoneNumber"
            label="Número de Teléfono"
            placeholder="Ingrese número telefónico del usuario"
            value={user.phoneNumber}
            onChange={(e) => handleChange(e.target.id, e.target.value)}
            className={classes.textField}
            variant="outlined"
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber && errors.phoneNumber}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            id="department"
            label="Unidad"
            placeholder="Ingrese unidad del usuario"
            value={user.department}
            onChange={(e) => handleChange(e.target.id, e.target.value)}
            className={classes.textField}
            variant="outlined"
            error={!!errors.department}
            helperText={errors.department && errors.department}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            id="company"
            label="Compañía"
            placeholder="Ingrese Compañía del usuario"
            value={user.company}
            onChange={(e) => handleChange(e.target.id, e.target.value)}
            className={classes.textField}
            variant="outlined"
            error={!!errors.company}
            helperText={errors.company && errors.company}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            id="jobTitle"
            label="Título Profesional"
            placeholder="Ingrese Título del usuario"
            value={user.jobTitle}
            onChange={(e) => handleChange(e.target.id, e.target.value)}
            className={classes.textField}
            variant="outlined"
            error={!!errors.jobTitle}
            helperText={errors.jobTitle && errors.jobTitle}
          />
        </Grid>

        <Grid item xs={4}>
          <FormControl className={classes.textField}>
            <InputLabel id="paisLbl" className="ml-4">
              País
            </InputLabel>
            <Select
              labelId="paisLbl"
              id="countryID"
              value={user.countryID}
              label="País"
              variant="outlined"
              onChange={handleChangeCountry}
              error={!!errors.countryID}
            >
              {countries.map((country) => (
                <MenuItem value={country.paisCodigo} key={country.paisCodigo}>
                  {country.paisName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <FormControl className={classes.textField}>
            <InputLabel id="estadoLbl" className="ml-4">
              Estado
            </InputLabel>
            <Select
              labelId="estadoLbl"
              id="stateID"
              value={user.stateID}
              label="Estado"
              variant="outlined"
              onChange={handleChangeState}
              error={!!errors.stateID}
            >
              {states.map((state) => (
                <MenuItem
                  value={state.divisionCodigo}
                  key={state.divisionCodigo}
                >
                  {state.divisonName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <FormControl className={classes.textField}>
            <InputLabel id="ciudadLbl" className="ml-4">
              Ciudad
            </InputLabel>
            <Select
              labelId="ciudadLbl"
              id="cityID"
              value={user.cityID}
              label="Ciudad"
              variant="outlined"
              onChange={handleChangeCity}
              error={!!errors.cityID}
            >
              {cities.map((city) => (
                <MenuItem value={city.cityCodigo} key={city.cityCodigo}>
                  {city.cityName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <FormControl className={classes.textField}>
            <InputLabel id="rolesLbl" className="ml-4">
              Roles
            </InputLabel>

            <Select
              labelId="rolesLbl"
              id="rolesIdD"
              multiple
              value={user.rolesID}
              onChange={handleChangeMenu}
              input={<OutlinedInput label="Roles" />}
              renderValue={(selected) =>
                selected
                  .map((item) => roles.find((rol) => rol.id === item)?.name)
                  .join(",")
              }
              MenuProps={MenuProps}
            >
              {roles.map((rol) => (
                <MenuItem key={rol.id} value={rol.id}>
                  <Checkbox
                    checked={
                      user.rolesID.findIndex((item) => item === rol.id) > -1
                    }
                  />
                  <ListItemText primary={rol.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
}
