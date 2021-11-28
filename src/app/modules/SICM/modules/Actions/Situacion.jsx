/* eslint no-restricted-imports: ["error"] */
import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Email from "@material-ui/icons/Email";
import { useFormik } from "formik";
import * as yup from "yup";
import { alertAction } from "../../../../../actions/SICM";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import LinearProgress from "@material-ui/core/LinearProgress";
import { actionsService, fileService } from "../../../../../services/SICM";
import {
  Fab,
  TextField,
  OutlinedInput,
  Chip,
  FormHelperText,
  IconButton,
  Button,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";

const validationSchema = yup.object({
  email: yup
    .string("Ingrese correo electrónico")
    .email("Ingrese correo electrónico válido")
    .required("El correo no puede ser vacío"),
});

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "20px",
  },
  buttons: {
    marginLeft: "auto",
  },
  textField: {
    minWidth: "90%",
  },
  input: {
    minWidth: "100%",
    marginBottom: 15,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "90%",
    maxWidth: "90%",
  },
}));

const _Situacion = ({ codigo, closeMenu, formData, alert, boletin }) => {
  const classes = useStyles();
  const [emails, setEmails] = useState([]);
  const [email, setEmail] = useState("");
  const [situacion, setSituacion] = useState({
    comentarios: "",
    situacion: boletin.codigoSituacion,
    estatus: boletin.codigoEstatus,
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [situacionAlerta, setSituacionAlerta] = useState([]);
  const [estadoAlerta, setEstadoAlerta] = useState([]);
  const dispatch = useDispatch();

  const handleDeleteEmail = (index) => {
    const _emails = [...emails];
    _emails.splice(index, 1);
    setEmails(_emails);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      setEmails(emails.concat(values.email));
      setEmail("");
      actions.resetForm();
    },
  });

  const uploadFiles = (event) => {
    setFiles([...files, ...Array.from(event.target.files)]);
  };

  const handleDeleteFile = (index) => {
    const items = [...files];
    items.splice(index, 1);
    setFiles(items);
  };

  const handleChange = (event) => {
    setSituacion({ ...situacion, [event.target.id]: event.target.value });
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setLoading(true);
    let fileNames;
    try {
      if (alert === 1) {
        fileNames = await fileService.sendDocsAB(files);
      } else {
        fileNames = await fileService.sendDocsIS(files);
      }
      const body = {
        ...situacion,
        correosAdicionales: emails.join(","),
        adjuntos: fileNames.join(","),
      };
      const resp = await actionsService.situacionAB(codigo, body);
      boletin.codigoSituacion = situacion.situacion;
      boletin.codigoEstatus = situacion.estatus;
      dispatch(alertAction.success(resp.message));
      closeMenu();
    } catch (error) {
      dispatch(alertAction.error(error));
      setLoading(false);
    }
  };

  const handleChangeSituacion = (event) => {
    setSituacion({ ...situacion, situacion: Number(event.target.value) });
  };

  const handleChangeEstado = (event) => {
    setSituacion({ ...situacion, estatus: Number(event.target.value) });
  };

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      formik.handleSubmit();
    }
  };

  useEffect(() => {
    if (alert === 1) {
      setSituacionAlerta(
        formData.situacion_alerta.filter(
          (situacion) => situacion.isAK && situacion.activo
        )
      );
      setEstadoAlerta(
        formData.estatusAlerta.filter((estado) => estado.isAK && estado.activo)
      );
    } else {
      setSituacionAlerta(
        formData.situacion_alerta.filter(
          (situacion) => situacion.isIC && situacion.activo
        )
      );
      setEstadoAlerta(
        formData.estatusAlerta.filter((estado) => estado.isIC && estado.activo)
      );
    }
    // eslint-disable-next-line
  }, []);

  return (
    <form
      noValidate
      autoComplete="off"
      className={classes.container}
      onSubmit={formik.handleSubmit}
    >
      <div className="row">
        <div className="col-12">
          <h4>Cambio de Situación</h4>
        </div>
        <div className="col-12">
          <TextField
            label="Comentarios"
            value={situacion.comentarios}
            id="comentarios"
            onChange={handleChange}
            multiline
            rows={4}
            variant="outlined"
            className={classes.input}
          />
        </div>
        <div className="col-12">
          <FormControl variant="outlined" className={classes.input}>
            <InputLabel id="situacion-select-label">Situación</InputLabel>
            <Select
              labelId="situacion-select-label"
              id="situacion"
              onChange={handleChangeSituacion}
              label="Situación"
              value={situacion.situacion}
            >
              {situacionAlerta.map((situacion) => (
                <MenuItem key={situacion.codigo} value={situacion.codigo}>
                  {situacion.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-12">
          <FormControl variant="outlined" className={classes.input}>
            <InputLabel id="situacion-select-label">Estado</InputLabel>
            <Select
              labelId="situacion-select-label"
              id="estatus"
              onChange={handleChangeEstado}
              label="Estado"
              value={situacion.estatus}
            >
              {estadoAlerta.map((status) => (
                <MenuItem key={status.codigo} value={status.codigo}>
                  {status.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-12">
          <OutlinedInput
            id="email"
            placeholder="Correo electrónico"
            className={classes.input}
            // margin="dense"
            onKeyDown={keyPress}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              formik.handleChange(e);
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  className="fa fa-plus"
                  color="primary"
                  onClick={formik.handleSubmit}
                ></IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText
            error={formik.touched.email && Boolean(formik.errors.email)}
          >
            {formik.touched.email && formik.errors.email}
          </FormHelperText>

          {emails.map((email, index) => (
            <Chip
              key={index}
              icon={<Email />}
              label={email}
              onClick={(e) => {}}
              onDelete={(e) => {
                handleDeleteEmail(index);
              }}
              style={{ margin: 10 }}
            />
          ))}
        </div>
        <div className="col-12">
          <label htmlFor="upload-files">
            <input
              style={{ display: "none" }}
              id="upload-files"
              name="upload-files"
              type="file"
              multiple
              onChange={uploadFiles}
            />
            <Fab
              color="secondary"
              size="small"
              component="span"
              aria-label="add"
              variant="extended"
            >
              <AttachFileIcon /> Seleccionar archivos
            </Fab>
          </label>
        </div>
        <div className="col-12">
          {files.map((file, index) => (
            <Chip
              key={index}
              icon={<AttachFileIcon />}
              label={file.name}
              onDelete={(e) => {
                handleDeleteFile(index);
              }}
              style={{ margin: 10 }}
            />
          ))}
        </div>
        {!loading ? (
          <div className="col-12" style={{ display: "flex" }}>
            <Button
              style={{ marginLeft: "auto" }}
              variant="contained"
              color="primary"
              onClick={handleSave}
            >
              Cambiar Situación
            </Button>
          </div>
        ) : (
          <div className="col-12">
            <LinearProgress />
          </div>
        )}
      </div>
    </form>
  );
};

const mapStateProps = function(state, ownProps) {
  return {
    formData: state.formData,
    codigo: ownProps.codigo,
    closeMenu: ownProps.closeMenu,
  };
};
const Situacion = connect(mapStateProps)(_Situacion);

export { Situacion };
