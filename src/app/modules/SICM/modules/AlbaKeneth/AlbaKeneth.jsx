/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint no-restricted-imports: ["error"] */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  Switch,
  Redirect,
  Link,
  Route,
  useParams,
  useHistory,
} from "react-router-dom";
import { CreateAlert, Bitacora } from "./";
import {
  formDataAction,
  albaKenethAction,
  alertAction,
} from "../../../../../actions/SICM";
import { TopActions } from "../Actions";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import {
  CardBody,
  Card,
} from "../../../../../_metronic/_partials/controls/Card";
import { findService } from "../../../../../services/SICM";
import { alertTypeConstants } from "../../../../../constants/SICM";
import AlertList from "./AlertList.jsx";
import CardHeader from "@material-ui/core/CardHeader";
import AddIcon from "@material-ui/icons/Add";
import { getDateFormat } from "../../../../../helpers/SICM";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "90%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  rootForm: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    color: "white",
  },
}));

function AlbaKeneth_({ dispatch }) {
  useEffect(() => {
    dispatch(formDataAction.getFormData());
  }, [dispatch]);

  return (
    <Switch>
      <Route exact path="/SICM/AlbaKeneth" component={Dashboard} />
      <Route exact path="/SICM/AlbaKeneth/create" component={CreateAlert} />
      <Route exact path="/SICM/AlbaKeneth/bitacora" component={Bitacora} />
      <Route exact path="/SICM/AlbaKeneth/bitacora/:id" component={Bitacora} />
      <Route exact path="/SICM/AlbaKeneth/bitacora" component={Bitacora} />
      <Route exact path="/SICM/AlbaKeneth/:id" component={Dashboard} />
      <Redirect to="/SICM/AlbaKeneth" />
    </Switch>
  );
}

function Dashboard_({ formData, dispatch }) {
  const classes = useStyles();
  const currentDate = getDateFormat();
  const [filtro, setFiltro] = useState({
    estado: -1,
    fechaActivacionIni: currentDate,
    fechaActivacionFin: currentDate,
    fechaDesactivacionIni: currentDate,
    fechaDesactivacionFin: currentDate,
    activeinitDate: false,
    activeEndDate: false,
    codigoAlerta: "",
    numeroCaso: "",
    codigoOficio: "",
  });
  const [body, setBody] = useState({});
  const [showButton, setShowButton] = useState(false);
  const [menu, setMenu] = useState(1);
  const { id } = useParams();
  const history = useHistory();

  const handleChangeState = (id, value) => {
    setFiltro({ ...filtro, [id]: value });
  };

  const handleChange = (event) => {
    setFiltro({ ...filtro, [event.target.id]: event.target.value });
  };

  const handleReset = (e) => {
    setFiltro({
      ...filtro,
      estado: -1,
      fechaActivacionIni: currentDate,
      fechaActivacionFin: currentDate,
      fechaDesactivacionIni: currentDate,
      fechaDesactivacionFin: currentDate,
      codigoAlerta: "",
      numeroCaso: "",
      codigoOficio: "",
    });
  };

  const getAlerts = () => {
    const body = {
      codigoAlerta: filtro.codigoAlerta,
      numeroCaso: filtro.numeroCaso,
      codigoOficio: filtro.codigoOficio,
    };
    if (filtro.estado !== -1) {
      body.estado = filtro.estado;
    }
    // if (filtro.situacion !== -1) {
    //   body.situacion = filtro.situacion;
    // }
    if (filtro.activeinitDate) {
      body.fechaActivacionIni = filtro.fechaActivacionIni + "T00:00:00.000Z";
      body.fechaActivacionFin = filtro.fechaActivacionFin + "T23:59:59.000Z";
    }
    if (filtro.activeEndDate) {
      body.fechaDesactivacionIni =
        filtro.fechaDesactivacionIni + "T00:00:00.000Z";
      body.fechaDesactivacionFin =
        filtro.fechaDesactivacionFin + "T23:59:59.000Z";
    }
    setBody(body);
    dispatch(albaKenethAction.getAlerts({ page: 1, size: 10, body }));
    history.push(`/SICM/AlbaKeneth`);
  };

  const search = async (alertCode) => {
    try {
      const alert = await findService.getAlert(alertCode);
      if (alert.tipoAlerta !== alertTypeConstants.ALBAKENETH) {
        dispatch(alertAction.error("Alerta no encontrada"));
        return;
      }
      dispatch(albaKenethAction.searchAlert(alert));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(albaKenethAction.getAlerts({ page: 1, size: 10, body: {} }));
  }, [dispatch]);

  useEffect(() => {
    if (id !== null && id !== undefined) {
      setMenu(1);
      search(id);
    }
    // eslint-disable-next-line
  }, [id]);

  return (
    <Card>
      <CardHeader
        title="Alertas Alba-Keneth"
        action={
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => setMenu(menu === 1 ? 2 : 1)}
          >
            {menu === 1 ? "Últimas acciones" : "Ver Alertas"}
          </Button>
        }
      ></CardHeader>
      {menu === 1 ? (
        <CardBody className="mb-10">
          <FormControlLabel
            control={
              <Checkbox
                checked={filtro.activeinitDate}
                name="checkedB"
                color="primary"
                onChange={(e) => {
                  handleChangeState("activeinitDate", e.target.checked);
                }}
              />
            }
            label="Filtrar por fecha de activación"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filtro.activeEndDate}
                name="checkedB"
                color="primary"
                onChange={(e) => {
                  handleChangeState("activeEndDate", e.target.checked);
                }}
              />
            }
            label="Filtrar por fecha de desactivación"
          />

          <div className="row mb-4">
            <div className={"col-12 " + classes.rootForm}>
              <FormControl style={{ width: "20ch" }}>
                <InputLabel id="estado">Estado</InputLabel>
                <Select
                  labelId="estado"
                  id="estado"
                  value={filtro.estado}
                  onChange={(e) => handleChangeState("estado", e.target.value)}
                >
                  <MenuItem value={-1}>Todas</MenuItem>
                  {/* Se filtran los estados para eliminar el codigo 1 que solo se utiliza en Isabel Claudina */}
                  {formData.estadosAlerta &&
                    formData.estadosAlerta
                      .filter((estado) => estado.codigoEstado !== 1)
                      .map((estado) => (
                        <MenuItem
                          value={estado.codigoEstado}
                          key={estado.codigoEstado}
                        >
                          {estado.nombre}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
              <TextField
                id="codigoAlerta"
                label="No. de Alerta"
                value={filtro.codigoAlerta}
                onChange={handleChange}
                style={{ width: "20ch" }}
              />
              <TextField
                id="numeroCaso"
                label="No. de Caso"
                value={filtro.numeroCaso}
                onChange={handleChange}
                style={{ width: "20ch" }}
              />
              <TextField
                id="codigoOficio"
                label="No. de Oficio"
                value={filtro.codigoOficio}
                onChange={handleChange}
                style={{ width: "20ch" }}
              />
              {filtro.activeinitDate && (
                <React.Fragment>
                  <FormControl>
                    <TextField
                      label="Inicio Fecha Activación"
                      className={classes.textField}
                      value={filtro.fechaActivacionIni}
                      onChange={(e) =>
                        handleChangeState("fechaActivacionIni", e.target.value)
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      type="date"
                      InputProps={{
                        inputProps: { max: getDateFormat() },
                      }}
                    ></TextField>
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="Fin Fecha Activación"
                      className={classes.textField}
                      value={filtro.fechaActivacionFin}
                      onChange={(e) =>
                        handleChangeState("fechaActivacionFin", e.target.value)
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      type="date"
                      InputProps={{
                        inputProps: { max: getDateFormat() },
                      }}
                    ></TextField>
                  </FormControl>
                </React.Fragment>
              )}
              {filtro.activeEndDate && (
                <React.Fragment>
                  <FormControl>
                    <TextField
                      label="Inicio Fecha Desactivación"
                      className={classes.textField}
                      value={filtro.fechaDesactivacionIni}
                      onChange={(e) =>
                        handleChangeState(
                          "fechaDesactivacionIni",
                          e.target.value
                        )
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      type="date"
                      InputProps={{
                        inputProps: { max: getDateFormat() },
                      }}
                    ></TextField>
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="Fin Fecha Desativación"
                      className={classes.textField}
                      value={filtro.fechaDesactivacionFin}
                      onChange={(e) =>
                        handleChangeState(
                          "fechaDesactivacionFin",
                          e.target.value
                        )
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      type="date"
                      InputProps={{
                        inputProps: { max: getDateFormat() },
                      }}
                    ></TextField>
                  </FormControl>
                </React.Fragment>
              )}
              <Button
                style={{ width: "16ch" }}
                variant="contained"
                color="secondary"
                onClick={getAlerts}
              >
                Buscar
              </Button>
              <Button
                style={{ width: "14ch", margin: "1rem" }}
                variant="contained"
                type="reset"
                value="reset"
                className={classes.primary}
                onClick={handleReset}
              >
                Limpiar
              </Button>
            </div>
          </div>
          <AlertList body={body} />
        </CardBody>
      ) : (
        <CardBody>
          <TopActions tipo={1} formData={formData} />
        </CardBody>
      )}
      <Link to="/SICM/AlbaKeneth/create">
        <Fab
          color="primary"
          variant="extended"
          className={classes.fab}
          onMouseOver={(e) => setShowButton(true)}
          onMouseOut={(e) => setShowButton(false)}
        >
          <AddIcon />
          <Slide direction="left" in={showButton} mountOnEnter unmountOnExit>
            <div>Registrar Alerta</div>
          </Slide>
        </Fab>
      </Link>
    </Card>
  );
}

const mapStateProps = function(state) {
  return {
    formData: state.formData,
    albaKeneth: state.albaKeneth,
  };
};

const AlbaKeneth = connect(mapStateProps)(AlbaKeneth_);
const Dashboard = connect(mapStateProps)(Dashboard_);
export { AlbaKeneth };
