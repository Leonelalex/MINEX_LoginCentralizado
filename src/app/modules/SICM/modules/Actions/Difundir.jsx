import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
// eslint-disable-next-line no-restricted-imports
import { makeStyles } from "@material-ui/core/styles";
import Email from "@material-ui/icons/Email";
import { useFormik } from "formik";
import { alertAction } from "../../../../../actions/SICM";
import { isabelClaudinaService } from "../../../../../services/SICM";
import * as yup from "yup";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  Grid,
  Chip,
  FormHelperText,
  Input,
  MenuItem,
  ListItemText,
  Checkbox,
  Tooltip,
  IconButton,
  InputAdornment,
  Button,
  LinearProgress
} from "@material-ui/core";

const MenuProps = {
  PaperProps: {
    style: {
      // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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
  backButton: {
    marginRight: theme.spacing(1),
  },
  textField: {
    minWidth: "90%",
  },
  input: {
    marginLeft: 10,
    minWidth: "90%",
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
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

function Difundir({ formData, codigo, closeMenu }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [misiones, setMisiones] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [isGlobal, setIsGlobal] = React.useState(true);
  const [emails, setEmails] = useState([]);
  const [alert, setAlert] = useState({
    misiones: new Map(),
    misionesArray: [],
    paises: [],
    correosAdicionales: "",
  });

  useEffect(() => {
    const items = [];
    const itemsSelectMisiones = new Map();

    alert.paises.forEach((index) => {
      const pais = formData.paises[index];
      const findMisiones = formData.misiones.filter(
        // eslint-disable-next-line
        (mision) => mision.codigO_PAIS == pais.codigO_PAIS
      );
      items.push({
        name: pais.descripcion,
        misiones: findMisiones,
        codigo: pais.codigO_PAIS,
      });
      itemsSelectMisiones.set(
        pais.codigO_PAIS,
        alert.misiones.get(pais.codigO_PAIS) ||
        findMisiones.map((mision) => mision.nombrE_MISION)
      );
    });
    setMisiones(items);
    handleSetMisiones(itemsSelectMisiones);
    // eslint-disable-next-line
  }, [alert.paises]);

  const handleChange = (event) => {
    handleSetPaises(event.target.value);
  };

  const handleChangeMisiones = (event, index) => {
    const items = new Map(alert.misiones.set(index, event.target.value));
    handleSetMisiones(items);
  };

  async function handleActivateAlert() {
    setLoading(true);
    const misionesArray = [];
    alert.misiones.forEach((pais) => {
      if (pais.length > 0) {
        pais.forEach((mision) => {
          const misionFind = formData.misiones.find(
            (value) => value.nombrE_MISION === mision
          );
          misionesArray.push(misionFind.iD_MISION_EXTERIOR);
        });
      }
    });

    const body = {
      correosAdicionales: emails.join(","),
      misiones: misionesArray,
      difusionInternacional: isGlobal
    };
    try {
      await isabelClaudinaService.activateAlert(codigo, body);
      dispatch(alertAction.success("La alerta ha sido difundida"));
      closeMenu();
    } catch (error) {
      dispatch(alertAction.error(error));
      setLoading(false);
    }
  }

  const renderMisiones = (mision, index) => {
    return (
      <Grid cols={12} xs={12} item key={index}>
        <FormControl className={classes.formControl}>
          <InputLabel id="misionesLbl">{mision.name}</InputLabel>
          <Select
            labelId="misionesLbl"
            id="misiones"
            multiple
            value={alert.misiones.get(mision.codigo)}
            onChange={(e) => handleChangeMisiones(e, mision.codigo)}
            input={<Input />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {mision.misiones.map((mision) => (
              <MenuItem
                key={mision.iD_MISION_EXTERIOR}
                value={mision.nombrE_MISION}
              >
                <Checkbox
                  checked={
                    alert.misiones
                      .get(mision.codigO_PAIS)
                      .indexOf(mision.nombrE_MISION) > -1
                  }
                />
                <Tooltip title={mision.nombrE_MISION}>
                  <ListItemText>
                    <div
                      style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                      {mision.nombrE_MISION}
                    </div>
                  </ListItemText>
                </Tooltip>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    );
  };

  const handleDeleteEmail = (index) => {
    const _emails = [...emails];
    _emails.splice(index, 1);
    setEmails(_emails);
  };

  function handleSetMisiones(value) {
    setAlert({ ...alert, misiones: value });
  }

  function handleSetPaises(value) {
    setAlert({ ...alert, paises: value });
  }

  const renderDifusion = () => {
    return (
      !isGlobal && (
        <React.Fragment>
          <Grid item cols={12} xs={12}>
            <h5>Misiones</h5>
          </Grid>
          <Grid item cols={12} xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id="paisesLbl">Paises</InputLabel>
              <Select
                labelId="paisesLbl"
                id="paises"
                multiple
                value={alert.paises}
                onChange={handleChange}
                input={<Input id="select-paises" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={formData.paises[value].descripcion}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {formData.paises.map(({ codigO_PAIS, descripcion }, index) => (
                  <MenuItem key={codigO_PAIS} value={index}>
                    <Checkbox checked={alert.paises.indexOf(index) > -1} />
                    <Tooltip title={descripcion}>
                      <ListItemText>
                        <div
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {descripcion}
                        </div>
                      </ListItemText>
                    </Tooltip>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item cols={12} xs={12}>
            <Grid container>
              {misiones.map((mision, index) =>
                mision.misiones.length > 0
                  ? renderMisiones(mision, index)
                  : null
              )}
            </Grid>
          </Grid>
          <div style={{ width: "100%" }}></div>
        </React.Fragment>
      )
    );
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

  return (
    <form
      noValidate
      autoComplete="off"
      className={classes.container}
      onSubmit={formik.handleSubmit}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={isGlobal}
            name="checkedB"
            color="primary"
            onChange={(e) => {
              setIsGlobal(e.target.checked);
            }}
          />
        }
        label="Difusión internacional"
      />
      <Grid container spacing={1}>
        {renderDifusion()}
        <Grid item cols={12} xs={12} style={{ marginTop: 20 }}>
          <h5>Correos electrónicos</h5>
        </Grid>
        <Grid item cols={12} xs={12} sm={6}>
          <Input
            id="email"
            placeholder="Correo electrónico"
            className={classes.input}
            margin="dense"
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
        </Grid>
        <Grid item cols={12} xs={12}>
          {emails.map((email, index) => (
            <Chip
              key={index}
              icon={<Email />}
              label={email}
              onClick={(e) => { }}
              onDelete={(e) => {
                handleDeleteEmail(index);
              }}
              style={{ margin: 10 }}
            />
          ))}
        </Grid>
        {!loading ? (
          <div className="col-12" style={{ display: "flex" }}>
            <Button
              style={{ marginLeft: "auto" }}
              variant="contained"
              color="primary"
              onClick={handleActivateAlert}
            >
              Difundir
            </Button>
          </div>
        ) : (
          <div className="col-12">
            <LinearProgress />
          </div>
        )}
      </Grid>
    </form>
  );
}

export { Difundir };
