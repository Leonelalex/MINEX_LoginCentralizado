/* eslint no-restricted-imports: ["error"] */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Email from "@material-ui/icons/Email";
import { useFormik } from "formik";
import * as yup from "yup";
import { alertAction, albaKenethAction } from "../../../../../actions/SICM";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import LinearProgress from "@material-ui/core/LinearProgress";
import { actionsService, fileService } from "../../../../../services/SICM";
import { alertTypeConstants, alertState } from "../../../../../constants/SICM";
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
  input2: {
    minWidth: "90%",
    marginBottom: 5,
  },
}));

const Desactivar = ({ codigo, closeMenu, alert }) => {
  const classes = useStyles();
  const [emails, setEmails] = useState([]);
  const [email, setEmail] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState("");
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
      if (alert.tipoAlerta === alertTypeConstants.ALBAKENETH) {
        fileNames = await fileService.sendDocsAB(files);
      } else {
        fileNames = await fileService.sendDocsIS(files);
      }
      const body = {
        comentarios,
        correosAdicionales: emails.join(","),
        adjuntos: fileNames.join(","),
      };
      const resp = await actionsService.desactivarAB(codigo, body);
      dispatch(alertAction.success(resp.message));
      dispatch(
        albaKenethAction.updateAlert({
          ...alert,
          estadoAlerta: alertState.DESACTIVADA,
        })
      );
      closeMenu();
    } catch (error) {
      dispatch(alertAction.error(error));
      setLoading(false);
    }
  };

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      formik.handleSubmit();
    }
  };

  return (
    <form
      noValidate
      autoComplete="off"
      className={classes.container}
      onSubmit={formik.handleSubmit}
    >
      <div className="row">
        <div className="col-12">
          <h4>Desactivar Alerta</h4>
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
          <OutlinedInput
            id="email"
            placeholder="Correo electrónico"
            className={classes.input}
            // margin="dense"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              formik.handleChange(e);
            }}
            onKeyDown={keyPress}
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

        <div className="col-12">
          <FormHelperText id="standard-weight-helper-text">
            Escriba el No. de Alerta: {alert.codigoAlerta} para confirmar
          </FormHelperText>
          <OutlinedInput
            id="desactivar"
            name="verify"
            className={classes.input}
            margin="dense"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
          />
        </div>
        {!loading ? (
          <div className="col-12" style={{ display: "flex" }}>
            <Button
              style={{ marginLeft: "auto" }}
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={alert.codigoAlerta !== confirmation}
            >
              Desactivar Alerta
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

export { Desactivar };
