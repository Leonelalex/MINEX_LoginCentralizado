/* eslint no-restricted-imports: ["error"] */
import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { albaKenethAction, alertAction } from "../../../../../actions/SICM";
import { albaKenethService } from "../../../../../services/SICM";
import { GeneralData, Preview, Steps, Difusion } from "./";
import { Button, CircularProgress } from "@material-ui/core";
import {
  CardFooter,
  CardBody,
  CardHeader,
  Card,
} from "../../../../../_metronic/_partials/controls/Card";
import { validGeneralData } from "../../../../../helpers/SICM";

const steps = ["Información General", "Difusión", "Revisión"];
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

function EditAlert_({ dispatch, formData, albaKeneth, activeAlert }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [emails, setEmails] = useState(
    activeAlert.correosAdicionales === ""
      ? []
      : activeAlert.correosAdicionales.split(",")
  );
  const [alert, setAlert] = useState({
    codigoAlerta: "",
    direccion: "",
    codigoMunicipio: 0,
    codigoOficio: "",
    oficio: null,
    observaciones: "",
    misionesArray: [],
    fecha: "2021-05-24",
    hora: "07:30",
    numeroCaso: "",
    state: formData.municipios.find(
      // eslint-disable-next-line
      (municipio) => municipio.codigO_CIUDAD == activeAlert.codigoMunicipio
    ).codigO_DIVISION,
    country: 0,
    boletines: [],
    ...getPaises(activeAlert.sicmAlertaMisiones),
    ...activeAlert,
  });

  function getPaises(misiones) {
    const misionesMap = new Map();
    const paises = [];
    misiones.forEach((mision) => {
      const codigoMision = mision.codigoMision;
      const misionData = formData.misiones.find(
        (mision) => mision.iD_MISION_EXTERIOR === codigoMision
      );
      if (misionesMap.has(misionData.codigO_PAIS)) {
        misionesMap.get(misionData.codigO_PAIS).push(misionData.nombrE_MISION);
      } else {
        misionesMap.set(misionData.codigO_PAIS, [misionData.nombrE_MISION]);
        const index = formData.paises.findIndex(
          (pais) => pais.codigO_PAIS === misionData.codigO_PAIS
        );
        paises.push(index);
      }
    });
    return { misiones: misionesMap, paises };
  }

  function handleNext() {
    if (activeStep === 0) {
      const errors = validGeneralData(alert);
      if (errors !== null) {
        setErrors(errors);
        return;
      }
      setErrors({ boletines: [] });
    }

    if (activeStep === steps.length - 1) {
      editAlert();
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

  async function editAlert() {
    const editAlert = {
      codigoAlerta: alert.codigoAlerta,
      direccion: alert.direccion,
      codigoMunicipio: alert.codigoMunicipio,
      codigoOficio: alert.codigoOficio,
      oficio: alert.oficio,
      observaciones: alert.observaciones,
      misiones: alert.misionesArray,
      correosAdicionales: alert.correosAdicionales,
      numeroCaso: alert.numeroCaso,
    };
    setLoading(true);
    try {
      await albaKenethService.updateAlert(editAlert, alert.codigo);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      dispatch(
        albaKenethAction.updateAlert({
          ...alert,
          oficio: alert.codigoAlerta + ".pdf",
        })
      );
      dispatch(alertAction.success("Alerta editada con éxito"));
    } catch (error) {
      console.error(error);
      dispatch(alertAction.error("Error al editar alerta"));
    }
    setLoading(false);
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
  }

  function handleChangeCheck(event) {
    setAlert({ ...alert, [event.target.id]: event.target.checked });
  }

  function handleSetAdjunto(oficio) {
    setAlert({ ...alert, oficio });
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
            isEdit={true}
            errors={errors}
          />
        );
      case 1:
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
        return "Datos Generales";
      case 1:
        return "Difusión";
      default:
        return "Revisión";
    }
  }

  return (
    <div className="container-fluid">
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
            {loading ? (
              <div style={{ position: "relative" }}>
                <CircularProgress style={{ marginLeft: "50%" }} />
              </div>
            ) : (
              activeStep !== steps.length && (
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
              )
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
    activeAlert: ownProps.activeAlert,
  };
};

const EditAlert = connect(mapStateProps)(EditAlert_);
export { EditAlert };
