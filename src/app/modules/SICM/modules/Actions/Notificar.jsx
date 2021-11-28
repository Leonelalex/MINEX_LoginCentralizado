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
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import { formDataFunctions } from "../../../../../helpers/SICM";
import {
  Fab,
  TextField,
  OutlinedInput,
  Chip,
  FormHelperText,
  IconButton,
  Button,
  InputAdornment,
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
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
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

const _Notificar = ({ codigo, closeMenu, alert, formData }) => {
  const classes = useStyles();
  const [emails, setEmails] = useState([]);
  const [email, setEmail] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [acciones, setAcciones] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [accionesNotificacion, setAccionesNotificacion] = useState([]);
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
    setComentarios(event.target.value);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      let fileNames;
      if (alert.tipoAlerta === 1) {
        fileNames = await fileService.sendDocsAB(files);
      } else {
        fileNames = await fileService.sendDocsIS(files);
      }
      const body = {
        comentarios,
        correosAdicionales: emails.join(","),
        adjuntos: fileNames.join(","),
        acciones,
      };
      const resp = await actionsService.notificarAB(codigo, body);
      dispatch(alertAction.success(resp.message));
      closeMenu();
    } catch (error) {
      dispatch(alertAction.error(error));
      setLoading(false);
    }
  };

  const handleChangeAcciones = (event) => {
    setAcciones(event.target.value.map((value) => Number.parseInt(value)));
  };

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      formik.handleSubmit();
    }
  };

  useEffect(() => {
    if (alert.tipoAlerta === 1) {
      setAccionesNotificacion(
        formData.accionesNotificacion.filter(
          (accion) => accion.isAK && accion.activo
        )
      );
    } else {
      setAccionesNotificacion(
        formData.accionesNotificacion.filter(
          (accion) => accion.isIC && accion.activo
        )
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
          <h4>Notificar a autoridades</h4>
        </div>
        <div className="col-12">
          <TextField
            label="Comentarios"
            value={comentarios}
            onChange={handleChange}
            multiline
            rows={4}
            variant="outlined"
            className={classes.input}
          />
        </div>
        <div className="col-12">
          <FormControl variant="outlined" className={classes.input}>
            <InputLabel id="acciones-select-label">
              Acciones de Notificación
            </InputLabel>
            <Select
              labelId="acciones-select-label"
              id="estatus"
              multiple
              value={acciones}
              onChange={handleChangeAcciones}
              MenuProps={MenuProps}
              label="Acciones de Notificación"
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((select) => (
                    <Chip
                      key={select}
                      label={formDataFunctions.getAccionesNotificacion(
                        formData,
                        select
                      )}
                      className={classes.chip}
                    />
                  ))}
                </div>
              )}
            >
              {accionesNotificacion.map((accion) => (
                <MenuItem key={accion.codigo} value={accion.codigo}>
                  <Checkbox checked={acciones.indexOf(accion.codigo) > -1} />
                  <ListItemText primary={accion.nombre} />
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
          <label htmlFor="upload-photo">
            <input
              style={{ display: "none" }}
              id="upload-photo"
              name="upload-photo"
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
              Enviar Notificación
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
    alert: ownProps.alert,
  };
};

const Notificar = connect(mapStateProps)(_Notificar);
export { Notificar };
