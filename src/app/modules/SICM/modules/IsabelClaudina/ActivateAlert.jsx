/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// eslint-disable-next-line
import { makeStyles } from "@material-ui/core/styles";
import {
  CardBody,
  Card,
} from "../../../../../_metronic/_partials/controls/Card";
import { CardHeader, Tooltip } from "@material-ui/core";
import { Paper } from "@material-ui/core/";
import { InputBase } from "@material-ui/core/";
import { IconButton } from "@material-ui/core/";
import { InputLabel } from "@material-ui/core/";
import SearchIcon from "@material-ui/icons/Search";
import { Box } from "@material-ui/core/";
import { Collapse } from "@material-ui/core/";
import { Table } from "@material-ui/core/";
import { TableBody } from "@material-ui/core/";
import { TableCell } from "@material-ui/core/";
import { TableContainer } from "@material-ui/core/";
import { TableHead } from "@material-ui/core/";
// eslint-disable-next-line
import HLink from "@material-ui/core/Link";
import { Avatar } from "@material-ui/core/";
import { TableRow } from "@material-ui/core/";
import { Typography } from "@material-ui/core/";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Button } from "@material-ui/core/";
import { Pagination, MyModal } from "../../components";
import { Difusion } from "./";
import {
  isabelClaudinaActions,
  alertAction,
} from "../../../../../actions/SICM";
import {
  findService,
  isabelClaudinaService,
} from "../../../../../services/SICM";
import { alertTypeConstants, alertState } from "../../../../../constants/SICM";
import { formDataFunctions } from "../../../../../helpers/SICM";

const useStyles = makeStyles((theme) => ({
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
  rootTable: {
    "& > *": {
      borderBottom: "unset",
    },
  },
}));

function Row(props) {
  const { row, openAlert, index, formData } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.rootTable}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.codigoAlerta}</TableCell>
        <TableCell>
          {row.fechaActivacion === null ? "No Activada" : row.fechaActivacion}
        </TableCell>
        <TableCell>{row.direccion}</TableCell>
        <TableCell>{row.observaciones}</TableCell>
        <TableCell>
          <HLink href="#" onClick={(e) => e.preventDefault()}>
            Oficio
          </HLink>
        </TableCell>

        <TableCell align="center">
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              openAlert(row, index);
            }}
          >
            Difundir
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Boletines
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Edad</TableCell>
                    <TableCell>Foto</TableCell>
                    <TableCell>Cabello</TableCell>
                    <TableCell>Ojos</TableCell>
                    <TableCell>Complexión</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.sicmBoletines.map((boletin) => (
                    <TableRow key={boletin.codigoBoletin}>
                      <TableCell>
                        {boletin.primerNombre} {boletin.segundoNombre}{" "}
                        {boletin.tercerNombre} {boletin.primerApellido}{" "}
                        {boletin.segundoApellido}{" "}
                      </TableCell>

                      <TableCell>{boletin.edad}</TableCell>
                      <TableCell>
                        <Avatar alt="Remy Sharp" src={boletin.foto} />
                      </TableCell>
                      <TableCell>
                        {formDataFunctions.getColorCabello(
                          formData,
                          boletin.colorCabello
                        )}{" "}
                        {formDataFunctions.getTipoCabello(
                          formData,
                          boletin.tipoCabello
                        )}
                      </TableCell>
                      <TableCell>
                        {formDataFunctions.getColorOjos(
                          formData,
                          boletin.colorOjos
                        )}
                      </TableCell>
                      <TableCell>
                        {formDataFunctions.getComplexion(
                          formData,
                          boletin.complexion
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function activateAlert({ dispatch, isabelClaudina, formData }) {
  // eslint-disable-next-line
  const classes = useStyles();
  // eslint-disable-next-line
  const [modalData, setModalData] = useState({
    alert: null,
    open: false,
    index: -1,
  });
  // eslint-disable-next-line
  const [emails, setEmails] = useState([]);
  // eslint-disable-next-line
  const [errors, setErrors] = useState({});
  // eslint-disable-next-line
  const [alertCode, setAlertCode] = useState("");
  // eslint-disable-next-line
  const [rows, setRows] = useState([]);
  // eslint-disable-next-line
  const [alert, setAlert] = useState({
    misiones: new Map(),
    misionesArray: [],
    paises: [],
    correosAdicionales: "",
  });

  function onPageChange({ page, size }) {
    dispatch(isabelClaudinaActions.getActiveAlerts({ page, size }));
  }

  async function handleActivateAlert() {
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
    };
    try {
      await isabelClaudinaService.activateAlert(modalData.alert.codigo, body);
      dispatch(isabelClaudinaActions.setActiveAlert(modalData.index));
      dispatch(alertAction.success("La alerta ha sido activada"));
      setModalData({ alert: null, open: false, index: -1 });
    } catch (error) {
      console.log(error);
    }
  }

  function handleClose() {
    setModalData({ alert: null, open: false, index: -1 });
    setAlert({
      oficio: null,
      misiones: new Map(),
      misionesArray: [],
      paises: [],
      correosAdicionales: "",
    });
  }

  function handleSetMisiones(value) {
    setAlert({ ...alert, misiones: value });
  }

  function handleSetPaises(value) {
    setAlert({ ...alert, paises: value });
  }

  function openAlert(alert, index) {
    setModalData({ alert, open: true, index });
  }

  async function search(e) {
    e.preventDefault();
    if (alertCode === "") {
      setErrors({ alertCode: "Ingrese el código" });
      return;
    }
    setErrors({});
    try {
      const alert = await findService.getAlert(alertCode);
      if (alert.tipoAlerta !== alertTypeConstants.ISABELCLAUDINA) {
        dispatch(alertAction.error("Alerta no encontrada"));
        setRows([]);
        return;
      }

      if (alert.estadoAlerta !== alertState.REGISTRADA) {
        dispatch(alertAction.error("La alerta ya fue activada"));
        setRows([]);
        return;
      }
      setRows([alert]);
    } catch (error) {
      console.error(error);
    }
  }

  // eslint-disable-next-line
  useEffect(() => {
    dispatch(isabelClaudinaActions.getActiveAlerts({ page: 1, size: 10 }));
    // eslint-disable-next-line
  }, []);

  // eslint-disable-next-line
  useEffect(() => {
    setRows(isabelClaudina.activeAlerts);
  }, [isabelClaudina.activeAlerts]);

  return (
    <Card>
      <CardHeader title="Activación Alertas Isabel-Claudina"></CardHeader>
      <CardBody>
        <div className="row mb-4">
          <div className="col-md-4 col-sm-6 col-12">
            <Paper component="form" className={classes.root} onSubmit={search}>
              <InputBase
                className={classes.input}
                placeholder="Buscar alerta por código"
                inputProps={{ "aria-label": "buscar alerta" }}
                value={alertCode}
                onChange={(e) => {
                  setAlertCode(e.target.value);
                  setErrors({});
                }}
              />
              <Tooltip title="Buscar">
                <IconButton
                  className={classes.iconButton}
                  aria-label="search"
                  onClick={search}
                >
                  <SearchIcon />
                </IconButton>
              </Tooltip>
            </Paper>
            <InputLabel className="mt-4" error={!!errors.alertCode}>
              {errors.alertCode && errors.alertCode}
            </InputLabel>
          </div>
          <div className="col-12 mt-4">
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Alerta</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Dirección</TableCell>
                    <TableCell>Observaciones</TableCell>
                    <TableCell>Oficio</TableCell>
                    <TableCell align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formData.formData &&
                    rows.map((alert, index) => (
                      <Row
                        key={index}
                        row={alert}
                        formData={formData.formData}
                        openAlert={openAlert}
                        index={index}
                      />
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination
              size={isabelClaudina.totalActive}
              onPageChange={onPageChange}
            />
            <MyModal
              open={modalData.open}
              handleClose={handleClose}
              title="Activación Alerta Isabel-Claudina"
              editMode={true}
              handleSave={handleActivateAlert}
              buttonTitle={"Difundir"}
            >
              {modalData.open && (
                <Difusion
                  formData={formData}
                  alert={alert}
                  handleSetMisiones={handleSetMisiones}
                  handleSetPaises={handleSetPaises}
                  emails={emails}
                  setEmails={setEmails}
                />
              )}
            </MyModal>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

const mapStateProps = function(state) {
  return {
    formData: state.formData,
    isabelClaudina: state.isabelClaudina,
  };
};

const ActivateAlert = connect(mapStateProps)(activateAlert);

export { ActivateAlert };
