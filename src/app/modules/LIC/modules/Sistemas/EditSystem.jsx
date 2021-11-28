/* eslint no-restricted-imports: ["error"] */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  textField: {
    minWidth: "100%",
    margin: "10px",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

export function EditSystem({ system, handleChange, errors }) {
  const classes = useStyles();

  return (
    <form noValidate autoComplete="off" className={classes.container}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            label="Siglas"
            value={system.siglas}
            className={classes.textField}
            variant="outlined"
            disabled
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="systemName"
            label="Nombre"
            placeholder="Ingrese el nombre del sistema"
            value={system.systemName}
            onChange={handleChange}
            className={classes.textField}
            required
            variant="outlined"
            error={!!errors.systemName}
            helperText={errors.systemName && errors.systemName}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="description"
            label="Descripción"
            placeholder="Ingrese descripción"
            value={system.description}
            onChange={handleChange}
            className={classes.textField}
            required
            variant="outlined"
            error={!!errors.description}
            helperText={errors.description && errors.description}
          />
        </Grid>
      </Grid>
    </form>
  );
}
