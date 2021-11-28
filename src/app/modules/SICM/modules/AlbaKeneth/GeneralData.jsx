/* eslint no-restricted-imports: ["error"] */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FileInputComponent from "react-file-input-previews-base64";
import { getDateFormat } from "../../../../../helpers/SICM";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  Button,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "20px",
  },
  buttons: {
    marginLeft: "auto",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  textField: {
    minWidth: "90%",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

function GeneralData({
  formData,
  alert,
  handleChange,
  handleSetAdjunto,
  isEdit,
  errors,
}) {
  const classes = useStyles();

  return (
    <form noValidate autoComplete="off" className={classes.container}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4}>
          <TextField
            id="codigoAlerta"
            label="Número de Alerta"
            placeholder="Ingrese Número de alerta"
            value={alert.codigoAlerta}
            onChange={handleChange}
            className={classes.textField}
            required
            error={!!errors.codigoAlerta}
            helperText={errors.codigoAlerta && errors.codigoAlerta}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            id="codigoOficio"
            label="Número de Oficio"
            placeholder="Ingrese número de oficio"
            value={alert.codigoOficio}
            onChange={handleChange}
            className={classes.textField}
            required
            error={!!errors.codigoOficio}
            helperText={errors.codigoOficio && errors.codigoOficio}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            id="numeroCaso"
            label="Número de Caso"
            placeholder="Ingrese Número de caso"
            className={classes.textField}
            value={alert.numeroCaso}
            onChange={handleChange}
          />
        </Grid>
        <div style={{ width: "100%" }}></div>
        {!isEdit && (
          <Grid item xs={12} sm={4}>
            <TextField
              id="fecha"
              label="Fecha de oficio"
              type="date"
              defaultValue={alert.fecha}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
              InputProps={{
                inputProps: { max: getDateFormat() },
              }}
            />
          </Grid>
        )}

        <Grid item xs={12} sm={4}>
          <FormControl className={classes.textField}>
            <InputLabel htmlFor="state">Departamento</InputLabel>
            <Select
              native
              inputProps={{
                name: "state",
                id: "state",
              }}
              id="state"
              value={alert.state}
              onChange={handleChange}
            >
              {formData.departamentos.map((value, index) => (
                <option key={index} value={value.codigO_DIVISION}>
                  {value.descripcion}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.textField}>
            <InputLabel htmlFor="codigoMunicipio">Municipio</InputLabel>
            <Select
              native
              inputProps={{
                name: "codigoMunicipio",
                id: "codigoMunicipio",
              }}
              id="codigoMunicipio"
              value={alert.codigoMunicipio}
              onChange={handleChange}
            >
              {formData.municipios
                .filter(
                  (codigoMunicipio) =>
                    // eslint-disable-next-line
                    codigoMunicipio.codigO_DIVISION == alert.state
                )
                .map((value, index) => (
                  <option key={index} value={value.codigO_CIUDAD}>
                    {value.descripcion}
                  </option>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <div style={{ width: "100%" }}></div>

        <Grid item xs={12}>
          <TextField
            id="direccion"
            label="Dirección de desaparición"
            placeholder="Ingrese dirección de desaparición"
            className={classes.textField}
            margin="normal"
            value={alert.direccion}
            onChange={handleChange}
            inputProps={{ maxLength: 150 }}
            helperText={`${alert.direccion.length}/150`}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="observaciones"
            label="Observaciones"
            placeholder="Ingrese observaciones"
            className={classes.textField}
            margin="normal"
            value={alert.observaciones}
            onChange={handleChange}
            inputProps={{ maxLength: 1000 }}
            helperText={`${alert.observaciones.length}/1000`}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="denunciante"
            label="Denunciante"
            placeholder="Ingrese denunciante"
            className={classes.textField}
            margin="normal"
            value={alert.denunciante}
            onChange={handleChange}
            inputProps={{ maxLength: 150 }}
            helperText={`${alert.denunciante.length}/150`}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.textField}>
            <FileInputComponent
              labelText=""
              labelStyle={{ fontSize: 14 }}
              multiple={false}
              imagePreview={false}
              callbackFunction={async (file_arr) => {
                handleSetAdjunto(file_arr);
              }}
              buttonComponent={
                <Button variant="contained" color="secondary">
                  Seleccionar Oficio
                </Button>
              }
            />
          </FormControl>
          <InputLabel className="mt-4" error={!!errors.oficio}>
            {alert.oficio != null
              ? alert.oficio.name
              : errors.oficio && errors.oficio}
          </InputLabel>
        </Grid>
      </Grid>
    </form>
  );
}

export { GeneralData };
