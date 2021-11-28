/* eslint no-restricted-imports: ["error"] */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import FileInputComponent from "react-file-input-previews-base64";
import Divider from "@material-ui/core/Divider";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  Grid,
  InputAdornment,
  Button,
  Tooltip,
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

function PhysicalData({ formData, alert, handleSetBoletines, errors }) {
  const classes = useStyles();
  const { boletines } = alert;

  function renderedSelect(values) {
    return values.map((value) => (
      <option key={value.codigo} value={value.codigo}>
        {value.nombre}
      </option>
    ));
  }

  function handleNewBoletin(event) {
    event.preventDefault();
    const joined = boletines.concat({
      show: true,
      primerNombre: "",
      segundoNombre: "",
      primerApellido: "",
      segundoApellido: "",
      tercerNombre: "",
      edad: "",
      foto: null,
      boletin: null,
      colorCabello: formData.colorCabello[0].codigo,
      tipoCabello: formData.tipoCabello[0].codigo,
      tamanioCabello: formData.tamanioCabello[0].codigo,
      colorOjos: formData.colorOjos[0].codigo,
      complexion: formData.complexion[0].codigo,
      tez: formData.tez[0].codigo,
      vestimenta: "",
      estatura: "",
      genero: formData.generos[0].codigO_GENERO,
      seniasParticulares: "",
      notas: "",
      nombrePadre: "",
      nombreMadre: "",
      alias: "",
      observaciones: "",
      responsable: "",
    });
    handleSetBoletines(joined);
  }

  function handleShowBolletin(event, index) {
    event.preventDefault();
    const items = [...boletines];
    const item = { ...boletines[index] };

    item.show = !item.show;
    items[index] = item;
    handleSetBoletines(items);
  }

  function handleChange(event, index) {
    const items = [...boletines];
    const item = { ...boletines[index] };

    item[event.target.id] = event.target.value;
    items[index] = item;
    handleSetBoletines(items, index, event.target.id);
  }

  function handleSetImg(img, index) {
    const items = [...boletines];
    const item = { ...boletines[index] };
    item.foto = img;
    items[index] = item;
    handleSetBoletines(items);
  }

  function handleSetImgBoletin(img, index) {
    const items = [...boletines];
    const item = { ...boletines[index] };
    item.boletin = img;
    items[index] = item;
    handleSetBoletines(items);
  }

  function handleChangeNumber(event, index) {
    const items = [...boletines];
    const item = { ...boletines[index] };
    const value = event.target.value === "" ? 0 : event.target.value;
    item[event.target.id] = isNaN(value)
      ? item[event.target.id]
      : Number.parseInt(value);
    items[index] = item;
    handleSetBoletines(items, index, event.target.id);
  }

  function handleDeleteBoletin(index) {
    const items = [...boletines];
    items.splice(index, 1);
    handleSetBoletines(items);
  }
  function handleUpperCase(e) {
    e.target.value = ("" + e.target.value).toUpperCase();
  }

  return (
    <form noValidate autoComplete="off">
      <div>
        <Button color="primary" variant="contained" onClick={handleNewBoletin}>
          Agregar Boletín
        </Button>
      </div>
      {boletines.map((boletin, index) => (
        <div key={index} className="mt-4">
          <Divider />
          <div style={{ display: "flex" }}>
            <h6 className="mt-4">Boletín No. {index + 1}</h6>
            <IconButton
              aria-label="expand row"
              size="medium"
              color="primary"
              style={{ marginLeft: "auto" }}
              onClick={(e) => {
                handleShowBolletin(e, index);
              }}
            >
              {boletin.show ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
            <Tooltip title="Eliminar Boletín">
            <IconButton
              size="medium"
              className="fa fa-trash"
              style={{ color: "red" }}
              onClick={(e) => handleDeleteBoletin(index)}
            ></IconButton>
            </Tooltip>
          </div>
          {boletin.show && (
            <Grid container spacing={1}>
              <Grid item xs={6} sm={3}>
                <TextField
                  id="primerNombre"
                  label="Primer nombre"
                  placeholder="Ingrese primer nombre"
                  className={classes.textField}
                  margin="none"
                  value={boletin.primerNombre}
                  onChange={(e) => handleChange(e, index)}
                  error={
                    !!(
                      errors.boletines[index] &&
                      errors.boletines[index].primerNombre
                    )
                  }
                  helperText={
                    errors.boletines[index] &&
                    errors.boletines[index].primerNombre &&
                    errors.boletines[index].primerNombre
                  }
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
                  value={boletin.segundoNombre}
                  onChange={(e) => handleChange(e, index)}
                  error={
                    !!(
                      errors.boletines[index] &&
                      errors.boletines[index].segundoNombre
                    )
                  }
                  helperText={
                    errors.boletines[index] &&
                    errors.boletines[index].segundoNombre &&
                    errors.boletines[index].segundoNombre
                  }
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
                  value={boletin.tercerNombre}
                  onChange={(e) => handleChange(e, index)}
                  error={
                    !!(
                      errors.boletines[index] &&
                      errors.boletines[index].tercerNombre
                    )
                  }
                  helperText={
                    errors.boletines[index] &&
                    errors.boletines[index].tercerNombre &&
                    errors.boletines[index].tercerNombre
                  }
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
                  value={boletin.primerApellido}
                  onChange={(e) => handleChange(e, index)}
                  error={
                    !!(
                      errors.boletines[index] &&
                      errors.boletines[index].primerApellido
                    )
                  }
                  helperText={
                    errors.boletines[index] &&
                    errors.boletines[index].primerApellido &&
                    errors.boletines[index].primerApellido
                  }
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
                  value={boletin.segundoApellido}
                  onChange={(e) => handleChange(e, index)}
                  error={
                    !!(
                      errors.boletines[index] &&
                      errors.boletines[index].segundoApellido
                    )
                  }
                  helperText={
                    errors.boletines[index] &&
                    errors.boletines[index].segundoApellido &&
                    errors.boletines[index].segundoApellido
                  }
                  onInput={handleUpperCase}
                />
              </Grid>
              <div style={{ width: "100%" }}></div>
              <Grid item xs={6} sm={4}>
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="colorCabello">
                    Color de Cabello
                  </InputLabel>
                  <Select
                    native
                    inputProps={{
                      name: "colorCabello",
                      id: "colorCabello",
                    }}
                    id="colorCabello"
                    value={boletin.colorCabello}
                    onChange={(e) => handleChangeNumber(e, index)}
                  >
                    {renderedSelect(formData.colorCabello)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="tamanoCabello">
                    Tamaño de Cabello
                  </InputLabel>
                  <Select
                    native
                    inputProps={{
                      name: "tamanioCabello",
                      id: "tamanioCabello",
                    }}
                    id="tamanioCabello"
                    value={boletin.tamanioCabello}
                    onChange={(e) => handleChangeNumber(e, index)}
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
                    onChange={(e) => handleChangeNumber(e, index)}
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
                    onChange={(e) => handleChangeNumber(e, index)}
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
                    onChange={(e) => handleChangeNumber(e, index)}
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
                    onChange={(e) => handleChangeNumber(e, index)}
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
                    endAdornment: (
                      <InputAdornment position="end">cm</InputAdornment>
                    ),
                  }}
                  value={boletin.estatura}
                  onChange={(e) => handleChangeNumber(e, index)}
                  error={
                    !!(
                      errors.boletines[index] &&
                      errors.boletines[index].estatura
                    )
                  }
                  helperText={
                    errors.boletines[index] &&
                    errors.boletines[index].estatura &&
                    errors.boletines[index].estatura
                  }
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
                    onChange={(e) => handleChangeNumber(e, index)}
                    id="genero"
                  >
                    {formData.generos.map((genero) => (
                      <option
                        key={genero.codigO_GENERO}
                        value={genero.codigO_GENERO}
                      >
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
                  onChange={(e) => handleChangeNumber(e, index)}
                  error={
                    !!(errors.boletines[index] && errors.boletines[index].edad)
                  }
                  helperText={
                    errors.boletines[index] &&
                    errors.boletines[index].edad &&
                    errors.boletines[index].edad
                  }
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
                  onChange={(e) => handleChange(e, index)}
                  
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
                  onChange={(e) => handleChange(e, index)}
                 
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
                  onChange={(e) => handleChange(e, index)}
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
                  onChange={(e) => handleChange(e, index)}
                  onInput={handleUpperCase}
                  error={
                    !!(
                      errors.boletines[index] &&
                      errors.boletines[index].nombreMadre
                    )
                  }
                  helperText={
                    errors.boletines[index] &&
                    errors.boletines[index].nombreMadre &&
                    errors.boletines[index].nombreMadre
                  }
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
                  onChange={(e) => handleChange(e, index)}
                  onInput={handleUpperCase}
                  error={
                    !!(
                      errors.boletines[index] &&
                      errors.boletines[index].nombrePadre
                    )
                  }
                  helperText={
                    errors.boletines[index] &&
                    errors.boletines[index].nombrePadre &&
                    errors.boletines[index].nombrePadre
                  }
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
                  onChange={(e) => handleChange(e, index)}
                  onInput={handleUpperCase}
                  error={
                    !!(
                      errors.boletines[index] &&
                      errors.boletines[index].responsable
                    )
                  }
                  helperText={
                    errors.boletines[index] &&
                    errors.boletines[index].responsable &&
                    errors.boletines[index].responsable
                  }
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
                  onChange={(e) => handleChange(e, index)}
                  onInput={handleUpperCase}
                  error={
                    !!(
                      errors.boletines[index] &&
                      errors.boletines[index].alias
                    )
                  }
                  helperText={
                    errors.boletines[index] &&
                    errors.boletines[index].alias &&
                    errors.boletines[index].alias
                  }
                  margin="none"
                
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  id="observaciones"
                  label="Observaciones"
                  placeholder="Ingrese observaciones"
                  multiline
                  className={classes.marginInput}
                  value={boletin.observaciones}
                  onChange={(e) => handleChange(e, index)}
                  onInput={handleUpperCase}
                  inputProps={{maxLength: 1000}}
                  helperText={`${boletin.observaciones.length}/1000` }
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl className={classes.textField}>
                  <FileInputComponent
                    labelText=""
                    labelStyle={{ fontSize: 14 }}
                    multiple={false}
                    callbackFunction={(file) => {
                      handleSetImg(file, index);
                    }}
                    buttonComponent={
                      <Button variant="contained" color="secondary">
                        Foto
                      </Button>
                    }
                    accept="image/*"
                    defaultFiles={!boletin.foto ? [] : [boletin.foto.base64]}
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
                      // handleSetAdjunto(file_arr[0].base64);
                      handleSetImgBoletin(file, index);
                    }}
                    buttonComponent={
                      <Button variant="contained" color="primary">
                        Boletín
                      </Button>
                    }
                    accept="image/*"
                    defaultFiles={
                      !boletin.boletin ? [] : [boletin.boletin.base64]
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          )}
        </div>
      ))}
    </form>
  );
}

export { PhysicalData };
