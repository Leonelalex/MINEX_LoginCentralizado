/* eslint no-restricted-imports: ["error"] */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { albaKenethAction } from "../../../../../actions/SICM";
import { GeneralData, PhysicalData, Preview, Steps, Difusion } from "./";
import { Button, CircularProgress } from "@material-ui/core";
import {
  CardFooter,
  CardBody,
  CardHeader,
  Card,
} from "../../../../../_metronic/_partials/controls/Card";
import {
  getDateFormat,
  validGeneralData,
  validBoletinesData,
} from "../../../../../helpers/SICM";

const steps = ["Información General", "Boletines", "Difusión", "Revisión"];
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

function CreateAlert_({ dispatch, formData, albaKeneth }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({ boletines: [] });
  const [emails, setEmails] = useState([]);
  const [alert, setAlert] = useState({
    codigoAlerta: "",
    direccion: "",
    codigoMunicipio: 0,
    codigoOficio: "",
    oficio: null,
    observaciones: "",
    misiones: new Map(),
    misionesArray: [],
    fecha: getDateFormat(),
    state: 0,
    country: 0,
    boletines: [],
    paises: [],
    correosAdicionales: "",
    numeroCaso: "",
    difusionInternacional: true,
    denunciante: "",
  });

  useEffect(() => {
    if (!formData.loading && !formData.hasError) {
      const departamento = formData.departamentos[0].codigO_DIVISION;
      setAlert({
        ...alert,
        state: departamento,
        codigoMunicipio: formData.municipios.find(
          // eslint-disable-next-line
          (codigoMunicipio) => codigoMunicipio.codigO_DIVISION == departamento
        ).codigO_CIUDAD,
      });
    }
    // eslint-disable-next-line
  }, [formData]);

  useEffect(() => {
    if (activeStep === steps.length - 1 && albaKeneth.created) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    // eslint-disable-next-line
  }, [albaKeneth]);

  function handleNext() {
    if (activeStep === 0) {
      const errors = validGeneralData(alert);
      if (errors !== null) {
        setErrors(errors);
        return;
      }
      setErrors({ boletines: [] });
    }

    if (activeStep === 1) {
      const errors = validBoletinesData(alert);
      if (errors !== null) {
        setErrors(errors);
        return;
      }

      // if (alert.boletines.length === 0) {
      //   dispatch(alertAction.error("Debe existir al menos un boletín"));
      //   return;
      // }
      setErrors({ boletines: [] });
    }

    if (activeStep === steps.length - 1) {
      dispatch(albaKenethAction.addAlert(alert));
      return;
    }

    if (activeStep === steps.length - 2) {
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
      setAlert({
        ...alert,
        misionesArray,
        correosAdicionales: emails.join(","),
      });
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  function handleReset() {
    setActiveStep(0);
  }

  function handleChange(event) {
    event.target.id === "state"
      ? setAlert({
          ...alert,
          [event.target.id]: event.target.value,
          codigoMunicipio: formData.municipios.find(
            (codigoMunicipio) =>
              // eslint-disable-next-line
              codigoMunicipio.codigO_DIVISION == event.target.value
          ).codigO_CIUDAD,
        })
      : setAlert({ ...alert, [event.target.id]: event.target.value });
    const _errors = { ...errors };
    delete _errors[event.target.id];
    setErrors(_errors);
  }

  function handleChangeCheck(event) {
    setAlert({ ...alert, [event.target.id]: event.target.checked });
  }

  function handleSetAdjunto(oficio) {
    setAlert({ ...alert, oficio });
    const _errors = { ...errors };
    delete _errors.oficio;
    setErrors(_errors);
  }

  function handleSetBoletines(boletines, index, id) {
    const _errors = [...errors.boletines];
    if (_errors[index]) {
      const error = { ..._errors[index] };
      delete error[id];
      _errors[index] = error;
      setErrors({ boletines: _errors });
    }

    setAlert({ ...alert, boletines });
  }

  function handleSetMisiones(value) {
    setAlert({ ...alert, misiones: value });
  }

  function handleSetPaises(value) {
    setAlert({ ...alert, paises: value });
  }

  function renderForm() {
    switch (activeStep) {
      case 0:
        return (
          <GeneralData
            formData={formData}
            alert={alert}
            handleChange={handleChange}
            handleSetAdjunto={handleSetAdjunto}
            errors={errors}
          />
        );
      case 1:
        return (
          <PhysicalData
            formData={formData}
            alert={alert}
            handleSetBoletines={handleSetBoletines}
            errors={errors}
          />
        );
      case 2:
        return (
          <Difusion
            formData={formData}
            alert={alert}
            handleSetMisiones={handleSetMisiones}
            handleSetPaises={handleSetPaises}
            emails={emails}
            setEmails={setEmails}
            handleChangeInt={handleChangeCheck}
          />
        );
      default:
        return <Preview formData={formData} alert={alert} />;
    }
  }

  function getTitle() {
    switch (activeStep) {
      case 0:
        return "Datos Generales Alerta Alba-Keneth";
      case 1:
        return "Boletines Alerta Alba-Keneth";
      case 2:
        return "Difusión Alerta Alba-Keneth";
      default:
        return "Revisión Alerta Alba-Keneth";
    }
  }

  return (
    <div className="container-fluid">
      <div style={{ display: "flex" }}>
        <Link to="/SICM/AlbaKeneth/" style={{ marginLeft: "auto" }}>
          <Button color="default">Cancelar</Button>
        </Link>
      </div>
      <Steps
        steps={steps}
        handleNext={handleNext}
        handleBack={handleBack}
        handleReset={handleReset}
        activeStep={activeStep}
      />
      <div className={classes.root}>
        <Card>
          <CardHeader title={getTitle()} />
          <CardBody>
            {formData.loading ? (
              <div style={{ position: "relative" }}>
                <CircularProgress style={{ marginLeft: "50%" }} />
              </div>
            ) : (
              renderForm()
            )}
          </CardBody>
          <CardFooter>
            {albaKeneth.loading ? (
              <div style={{ position: "relative" }}>
                <CircularProgress style={{ marginLeft: "50%" }} />
              </div>
            ) : activeStep === steps.length ? (
              <div style={{ display: "flex" }}>
                <Link to="/SICM/AlbaKeneth/" style={{ marginLeft: "auto" }}>
                  <Button color="secondary">Ver Alertas</Button>
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex" }}>
                <Button
                  style={{ marginLeft: "auto" }}
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Anterior
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? "Guardar" : "Siguiente"}
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

const mapStateProps = function(state, ownProps) {
  return {
    formData: state.formData,
    albaKeneth: state.albaKeneth,
  };
};

const CreateAlert = connect(mapStateProps)(CreateAlert_);
export { CreateAlert };
