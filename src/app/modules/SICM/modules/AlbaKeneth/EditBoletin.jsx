/* eslint no-restricted-imports: ["error"] */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FileInputComponent from "react-file-input-previews-base64";
import { getRouteImgs } from "../../../../../helpers/SICM";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  Grid,
  InputAdornment,
  Button,
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
    minWidth: "85%",
  },
  marginInput:{
    minWidth: "95%"
  },
  margin:{
    minWidth: "90%"
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

function CreateBoletin({ formData, boletin, setBoletin, errors, setErrors }) {
  const classes = useStyles();

  function renderedSelect(values) {
    return values.map((value) => (
      <option key={value.codigo} value={value.codigo}>
        {value.nombre}
      </option>
    ));
  }

  function handleChange(event) {
    const _errors = { ...errors };
    delete _errors[event.target.id];
    setErrors(_errors);
    setBoletin({ ...boletin, [event.target.id]: event.target.value });
  }

  function handleSetImg(id, img) {
    setBoletin({ ...boletin, [id]: img });
  }

  function handleChangeNumber(event) {
    const _errors = { ...errors };
    delete _errors[event.target.id];
    setErrors(_errors);
    const value = event.target.value === "" ? 0 : event.target.value;
    setBoletin({
      ...boletin,
      [event.target.id]: isNaN(value)
        ? boletin[event.target.id]
        : Number.parseInt(value),
    });
  }
  function handleUpperCase(e) {
    e.target.value = ("" + e.target.value).toUpperCase();
  }

  return (
    <form noValidate autoComplete="off">
      <Grid container spacing={1}>
        <Grid item xs={6} sm={3}>
          <TextField
            id="primerNombre"
            label="Primer nombre"
            placeholder="Ingrese primer nombre"
            className={classes.textField}
            margin="none"
            value={boletin.primerNombre}
            onChange={handleChange}
            error={!!errors.primerNombre}
            helperText={errors.primerNombre && errors.primerNombre}
            onInput={handleUpperCase}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            id="segundoNombre"
            label="Segundo nombre"
            placeholder="Ingrese segundo nombre"
            className={classes.textField}
            margin="none"
            value={boletin.segundoNombre.toUpperCase()}
            onChange={handleChange}
            error={!!errors.segundoNombre}
            helperText={errors.segundoNombre && errors.segundoNombre}
            onInput={handleUpperCase}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            id="tercerNombre"
            label="Otros nombres"
            placeholder="Ingrese otros nombres"
            className={classes.textField}
            margin="none"
            value={boletin.tercerNombre.toUpperCase()}
            onChange={handleChange}
            error={!!errors.tercerNombre}
            helperText={errors.tercerNombre && errors.tercerNombre}
            onInput={handleUpperCase}
          />
        </Grid>
        <div style={{ width: "100%" }}></div>
        <Grid item xs={6} sm={3}>
          <TextField
            id="primerApellido"
            label="Primer apellido"
            placeholder="Ingrese primer apellido"
            className={classes.textField}
            margin="none"
            value={boletin.primerApellido.toUpperCase()}
            onChange={handleChange}
            error={!!errors.primerApellido}
            helperText={errors.primerApellido && errors.primerApellido}
            onInput={handleUpperCase}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            id="segundoApellido"
            label="Segundo apellido"
            placeholder="Ingrese segundo apellido"
            className={classes.textField}
            margin="none"
            value={boletin.segundoApellido.toUpperCase()}
            onChange={handleChange}
            error={!!errors.segundoApellido}
            helperText={errors.segundoApellido && errors.segundoApellido}
            onInput={handleUpperCase}
          />
        </Grid>
        <div style={{ width: "100%" }}></div>
        <Grid item xs={6} sm={4}>
          <FormControl className={classes.textField}>
            <InputLabel htmlFor="colorCabello">Color de Cabello</InputLabel>
            <Select
              native
              inputProps={{
                name: "colorCabello",
                id: "colorCabello",
              }}
              id="colorCabello"
              value={boletin.colorCabello}
              onChange={handleChangeNumber}
            >
              {renderedSelect(formData.colorCabello)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={4}>
          <FormControl className={classes.textField}>
            <InputLabel htmlFor="tamanoCabello">Tamaño de Cabello</InputLabel>
            <Select
              native
              inputProps={{
                name: "tamanioCabello",
                id: "tamanioCabello",
              }}
              id="tamanioCabello"
              value={boletin.tamanioCabello}
              onChange={handleChangeNumber}
            >
              {renderedSelect(formData.tamanioCabello)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={4}>
          <FormControl className={classes.textField}>
            <InputLabel htmlFor="tipoCabello">Tipo de Cabello</InputLabel>
            <Select
              native
              inputProps={{
                name: "tipoCabello",
                id: "tipoCabello",
              }}
              id="tipoCabello"
              value={boletin.tipoCabello}
              onChange={handleChangeNumber}
            >
              {renderedSelect(formData.tipoCabello)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={4}>
          <FormControl className={classes.textField}>
            <InputLabel htmlFor="colorOjos">Color de Ojos</InputLabel>
            <Select
              native
              inputProps={{
                name: "colorOjos",
                id: "colorOjos",
              }}
              id="colorOjos"
              value={boletin.colorOjos}
              onChange={handleChangeNumber}
            >
              {renderedSelect(formData.colorOjos)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={4}>
          <FormControl className={classes.textField}>
            <InputLabel htmlFor="complexion">Complexión</InputLabel>
            <Select
              native
              inputProps={{
                name: "complexion",
                id: "complexion",
              }}
              id="complexion"
              value={boletin.complexion}
              onChange={handleChangeNumber}
            >
              {renderedSelect(formData.complexion)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={4}>
          <FormControl className={classes.textField}>
            <InputLabel htmlFor="tez">Tez</InputLabel>
            <Select
              native
              inputProps={{
                name: "tez",
                id: "tez",
              }}
              id="tez"
              value={boletin.tez}
              onChange={handleChangeNumber}
            >
              {renderedSelect(formData.tez)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            id="estatura"
            label="Estatura"
            className={classes.textField}
            InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            }}
            value={boletin.estatura}
            onChange={handleChangeNumber}
            error={!!errors.estatura}
            helperText={errors.estatura && errors.estatura}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <FormControl className={classes.textField}>
            <InputLabel htmlFor="genero">Sexo</InputLabel>
            <Select
              native
              inputProps={{
                name: "genero",
                id: "genero",
              }}
              value={boletin.genero}
              onChange={handleChangeNumber}
              id="genero"
            >
              {formData.generos.map((genero) => (
                <option key={genero.codigO_GENERO} value={genero.codigO_GENERO}>
                  {genero.descripcion}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            id="edad"
            label="Edad"
            placeholder="Ingrese edad"
            className={classes.textField}
            margin="none"
            value={boletin.edad}
            onChange={handleChangeNumber}
            error={!!errors.edad}
            helperText={errors.edad && errors.edad}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="seniasParticulares"
            label="Señas Particulares"
            placeholder="Ingrese señas particulares"
            multiline
            className={classes.marginInput}
            value={boletin.seniasParticulares}
            onChange={handleChange}
            error={!!errors.seniasParticulares}
            helperText={errors.seniasParticulares && errors.seniasParticulares}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="vestimenta"
            label="Vestimenta"
            placeholder="Ingrese vestimenta"
            multiline
            className={classes.marginInput}
            value={boletin.vestimenta}
            onChange={handleChange}
            error={!!errors.vestimenta}
            helperText={errors.vestimenta && errors.vestimenta}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="notas"
            label="Notas"
            placeholder="Ingrese notas"
            multiline
            className={classes.marginInput}
            value={boletin.notas}
            onChange={handleChange}
            inputProps={{maxLength: 150}}
            helperText={`${boletin.notas.length}/150` }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="nombreMadre"
            label="Nombre de la madre"
            placeholder="Ingrese el nombre de la madre"
            multiline
            className={classes.margin}
            value={boletin.nombreMadre}
            onChange={handleChange}
            onInput={handleUpperCase}
            error={!!errors.nombreMadre}
            helperText={errors.nombreMadre && errors.nombreMadre}
            margin="none"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="nombrePadre"
            label="Nombre del padre"
            placeholder="Ingrese el nombre del padre"
            multiline
            className={classes.margin}
            value={boletin.nombrePadre}
            onChange={handleChange}
            onInput={handleUpperCase}
            error={!!errors.nombrePadre}
            helperText={errors.nombrePadre && errors.nombrePadre}
            margin="none"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="responsable"
            label="Nombre del responsable"
            placeholder="Ingrese el nombre del responsable"
            multiline
            className={classes.margin}
            value={boletin.responsable}
            onChange={handleChange}
            onInput={handleUpperCase}
            error={!!errors.responsable}
            helperText={errors.responsable && errors.responsable}
            margin="none"
       
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="alias"
            label="Otros nombres, alias o apodos"
            placeholder="Ingrese otros nombres, alias o apodos"
            multiline
            className={classes.margin}
            value={boletin.alias}
            onChange={handleChange}
            onInput={handleUpperCase}
            error={!!errors.alias}
            helperText={errors.alias && errors.alias}
            margin="none"
           
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            id="observaciones"
            label="Observaciones"
            placeholder="Ingrese observaciones"
            multiline
            value={boletin.observaciones}
            onChange={handleChange}
            onInput={handleUpperCase}
            className={classes.marginInput}
            inputProps={{maxLength: 150}}
            helperText={`${boletin.observaciones.length}/150` }
          />
        </Grid>

        <Grid item xs={6}>
          <FormControl className={classes.textField}>
            <FileInputComponent
              labelText=""
              labelStyle={{ fontSize: 14 }}
              multiple={false}
              callbackFunction={(file) => {
                handleSetImg("foto", file);
              }}
              buttonComponent={
                <Button variant="contained" color="secondary">
                  Foto
                </Button>
              }
              accept="image/*"
              defaultFiles={
                !boletin.foto
                  ? []
                  : [
                      boletin.foto.base64
                        ? boletin.foto.base64
                        : getRouteImgs(1, boletin.foto),
                    ]
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl className={classes.textField}>
            <FileInputComponent
              labelText=""
              labelStyle={{ fontSize: 14 }}
              multiple={false}
              callbackFunction={(file) => {
                handleSetImg("boletin", file);
              }}
              buttonComponent={
                <Button variant="contained" color="primary">
                  Boletín
                </Button>
              }
              accept="image/*"
              defaultFiles={
                !boletin.boletin
                  ? []
                  : [
                      boletin.boletin.base64
                        ? boletin.boletin.base64
                        : getRouteImgs(1, boletin.boletin),
                    ]
              }
            />
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
}

export { CreateBoletin };
