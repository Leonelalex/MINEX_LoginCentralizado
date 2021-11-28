/* eslint no-restricted-imports: ["error"] */
import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Avatar from "@material-ui/core/Avatar";
import HLink from "@material-ui/core/Link";
import { Actions, ActionsBoletin } from "../Actions";
import { EditAlert, CreateBoletin, Bitacora } from "./";
import { albaKenethAction, alertAction } from "../../../../../actions/SICM";
import { Pagination, MyModal } from "../../components";
import { albaKenethService, fileService } from "../../../../../services/SICM";
import {
  formDataFunctions,
  validBoletin,
  formatDate,
  getRouteImgs,
  getRouteOficio,
} from "../../../../../helpers/SICM";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Tooltip from "@material-ui/core/Tooltip";
import ShowMoreText from "react-show-more-text";

const useRowStyles = makeStyles(() => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
}));

const mode = {
  EDIT: "EDIT",
  /* DELETE: "DELETE", */
  NEW: "NEW",
  NONE: "NONE",
  VIEW: "VIEW",
  BITACORA: "BITACORA",
};

function Row(props) {
  const { row, formData, handleNewBoletin, index, handleAlertActions } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    if (
      event.target.id !== "menuAlert" &&
      event.target.id !== "oficio" &&
      event.target.innerText !== "Ver menos" &&
      event.target.innerText !== "Ver más" &&
      anchorEl === null
    )
      setOpen(!open);
  };

  return (
    <React.Fragment>
      <TableRow
        onClick={handleClick}
        className={classes.root}
        style={{ background: index % 2 === 0 ? "#FEFAFA" : "white" }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <Tooltip title="Ocultar Boletín">
                <KeyboardArrowUpIcon />
              </Tooltip>
            ) : (
              <Tooltip title="Ver Boletín">
                <KeyboardArrowDownIcon />
              </Tooltip>
            )}
          </IconButton>
        </TableCell>
        <TableCell>{row.codigoAlerta}</TableCell>
        <TableCell>{row.numeroCaso}</TableCell>
        <TableCell>
          {formDataFunctions.getEstado(formData, row.estadoAlerta)}
        </TableCell>
        <TableCell>
          {row.fechaActivacion === null
            ? "No Activada"
            : formatDate(row.fechaActivacion)}
        </TableCell>

        <TableCell width="250">
          <ShowMoreText
            lines={2}
            more="Ver más"
            less="Ver menos"
            className="content-css"
            anchorClass="my-anchor-css-class"
            expanded={false}
            width={250}
            truncatedEndingComponent={"... "}
          >
            {row.observaciones}
          </ShowMoreText>
        </TableCell>
        <TableCell width="100">
          <HLink
            href={getRouteOficio(1, row.oficio)}
            target="_blank"
            id="oficio"
          >
            {row.codigoOficio}
          </HLink>
        </TableCell>

        <TableCell className="text-center">
          <Tooltip title="Acciones">
            <IconButton
              aria-controls="menu-appbar"
              aria-haspopup="true"
              id="menuAlert"
              onClick={handleMenu}
              color="inherit"
              className="fas fa-ellipsis-h"
              size="small"
            ></IconButton>
          </Tooltip>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            keepMounted
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            open={isOpen}
            onClose={handleClose}
          >
            <MenuItem
              onClick={(e) => {
                handleNewBoletin(row, mode.NEW);
                handleClose();
              }}
            >
              Agregar boletín
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                handleAlertActions(row, mode.EDIT);
                handleClose();
              }}
            >
              Editar alerta
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                handleAlertActions(row, mode.BITACORA);
                handleClose();
              }}
            >
              Bitácora
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                handleAlertActions(row, mode.VIEW);
                handleClose();
              }}
            >
              Seguimiento
            </MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
      <TableRow style={{ background: index % 2 === 0 ? "#FEFAFA" : "white" }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Boletines
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Foto</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Edad</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Situación</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.sicmBoletines.map((boletin) => (
                    <TableRow
                      key={boletin.codigoBoletin}
                      onDoubleClick={(e) =>
                        handleNewBoletin(boletin, mode.VIEW)
                      }
                    >
                      <TableCell>
                        <Avatar
                          src={
                            boletin.foto !== ""
                              ? getRouteImgs(1, boletin.foto)
                              : ""
                          }
                        />
                      </TableCell>
                      <TableCell>
                        {boletin.primerNombre} {boletin.segundoNombre}{" "}
                        {boletin.tercerNombre} {boletin.primerApellido}{" "}
                        {boletin.segundoApellido}{" "}
                      </TableCell>
                      <TableCell>
                        {boletin.edad === 0 ? "No indica" : boletin.edad}
                      </TableCell>
                      <TableCell>
                        {formDataFunctions.getStatus(
                          formData,
                          boletin.codigoEstatus
                        )}
                      </TableCell>
                      <TableCell>
                        {formDataFunctions.getSituacion(
                          formData,
                          boletin.codigoSituacion
                        )}
                      </TableCell>

                      <TableCell>
                        <Tooltip title="Seguimiento">
                          <IconButton
                            size="small"
                            className="fa fa-eye"
                            color="primary"
                            onClick={(e) => {
                              handleNewBoletin(boletin, mode.VIEW);
                            }}
                          ></IconButton>
                        </Tooltip>
                        <Tooltip title="Editar Boletín">
                          <IconButton
                            size="small"
                            className="fa fa-edit"
                            color="secondary"
                            onClick={(e) => {
                              handleNewBoletin(boletin, mode.EDIT);
                            }}
                          ></IconButton>
                        </Tooltip>
                        {/*   <IconButton
                          size="small"
                          className="fa fa-trash"
                          style={{ color: "red" }}
                          onClick={(e) => {
                            handleNewBoletin(boletin, mode.DELETE);
                          }}
                        ></IconButton> */}
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

function Alerts({ dispatch, albaKeneth, formData, body }) {
  const { loading, alerts } = albaKeneth;
  const [modalData, setModalData] = useState({
    open: false,
    alert: null,
    editMode: false,
    mode: mode.NONE,
  });
  const [boletinData, setBoletinData] = useState({
    open: false,
    boletin: null,
    mode: mode.NONE,
  });
  const [errors, setErrors] = useState({});

  function handleClose() {
    setModalData({ ...modalData, open: false });
    setBoletinData({ ...boletinData, open: false, mode: mode.NONE });
    setErrors({});
  }

  function onPageChange(props) {
    dispatch(albaKenethAction.getAlerts({ ...props, body }));
  }

  function handleEditAlert() {
    setModalData({ editMode: false, open: false, alert: null });
  }
  /* 
  async function removeBoletin() {
    try {
      const data = await albaKenethService.deleteBoletin(
        boletinData.boletin.codigoBoletin
      );
      setBoletinData({ ...boletinData, open: false, mode: mode.NONE });
      dispatch(
        albaKenethAction.deleteBoletin(
          boletinData.code,
          boletinData.boletin.codigoBoletin
        )
      );
      dispatch(alertAction.success("Boletín eliminado con éxito"));
    } catch (error) {
      console.log(error);
      dispatch(alertAction.error("Error al eliminar el boletín"));
    }
  }
 */
  /*  function notRemoveBoletin() {
    setBoletinData({ ...boletinData, open: false, mode: mode.NONE });
  } */

  function handleNewBoletin(boletin, mode_) {
    const newBoletin = {
      primerNombre: "",
      segundoNombre: "",
      primerApellido: "",
      segundoApellido: "",
      tercerNombre: "",
      edad: "",
      foto: null,
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
      fechaHora: "2021-06-30T12:04:06.403",
      nombrePadre: "",
      nombreMadre: "",
      alias: "",
      observaciones: "",
      responsable: "",
    };
    if (mode_ === mode.NEW) {
      setBoletinData({
        open: true,
        boletin: newBoletin,
        mode: mode_,
        code: boletin.codigo,
      });
      return;
    }
    setBoletinData({
      open: true,
      boletin,
      mode: mode_,
      code: boletin.codigoAlerta,
    });
  }

  async function handleSaveBoletin() {
    let errors = validBoletin(boletinData.boletin);
    if (errors !== null) {
      setErrors(errors);
      return;
    }
    let fotoImg = boletinData.boletin.foto,
      boletinImg = boletinData.boletin.boletin;
    if (boletinData.boletin.foto && boletinData.boletin.foto.base64) {
      let array = await fileService.sendImagesAB([
        boletinData.boletin.foto.file,
      ]);
      fotoImg = array[0];
    }
    if (boletinData.boletin.boletin && boletinData.boletin.boletin.base64) {
      let array = await fileService.sendImagesAB([
        boletinData.boletin.boletin.file,
      ]);
      boletinImg = array[0];
    }

    const boletin = {
      ...boletinData.boletin,
      foto: fotoImg,
      boletin: boletinImg,
      edad: boletinData.boletin.edad === "" ? 0 : boletinData.boletin.edad,
      estatura:
        boletinData.boletin.estatura === "" ? 0 : boletinData.boletin.estatura,
    };
    try {
      if (boletinData.mode === mode.EDIT) {
        delete boletin.codigoBoletin;
        await albaKenethService.updateBoletin(
          boletin,
          boletinData.boletin.codigoBoletin
        );
        boletin.codigoBoletin = boletinData.boletin.codigoBoletin;
        dispatch(
          albaKenethAction.updateBoletin(boletinData.code, {
            ...boletin,
            codigoBoletin: boletinData.boletin.codigoBoletin,
          })
        );
        dispatch(alertAction.success("Boletín editado con éxito"));
        setBoletinData({ ...boletinData, open: false, mode: mode.NONE });
      } else {
        const data = await albaKenethService.addBoletin(
          boletin,
          boletinData.code
        );
        dispatch(
          albaKenethAction.addBoletin(boletinData.code, {
            ...boletin,
            codigoBoletin: data.codigoBoletin,
            codigoAlerta: boletinData.code,
          })
        );
        dispatch(alertAction.success("Boletín agregado con éxito"));
        setBoletinData({ ...boletinData, open: false, mode: mode.NONE });
      }
    } catch (error) {
      console.log(error);
      dispatch(alertAction.error("Error al agregar o editar el boletín"));
    }
  }

  function handleAlertActions(alert, mode) {
    setModalData({ open: true, alert: alert, mode });
  }

  function renderAlertMode() {
    switch (modalData.mode) {
      case mode.VIEW:
        return (
          <Actions
            open={modalData.open}
            formData={formData}
            alert={modalData.alert}
            closeMenu={handleClose}
          />
        );
      case mode.EDIT:
        return (
          <MyModal
            open={modalData.open}
            handleClose={handleClose}
            title="Alerta Alba-Keneth"
            editMode={false}
            handleSave={handleEditAlert}
          >
            <EditAlert activeAlert={modalData.alert} />
          </MyModal>
        );
      case mode.BITACORA:
        return (
          <MyModal
            open={modalData.open}
            handleClose={handleClose}
            title={
              "Bitácora de acciones Alerta Alba-Keneth " +
              modalData.alert.codigoAlerta
            }
            editMode={false}
          >
            <Bitacora caso={modalData.alert.codigoAlerta} />
          </MyModal>
        );
      default:
        break;
    }
  }

  function renderBoletinMode() {
    switch (boletinData.mode) {
      case mode.VIEW:
        return (
          <ActionsBoletin
            open={boletinData.open}
            formData={formData}
            boletin={boletinData.boletin}
            closeMenu={handleClose}
          />
        );
      case mode.EDIT:
        return (
          <MyModal
            open={boletinData.open}
            handleClose={handleClose}
            title="Boletín Alerta Alba-Keneth"
            editMode={true}
            handleSave={handleSaveBoletin}
          >
            <CreateBoletin
              formData={formData}
              boletin={boletinData.boletin}
              setBoletin={setBoletin}
              errors={errors}
              setErrors={setErrors}
            />
          </MyModal>
        );
      /*  case mode.DELETE:
        return (
          <AlertDialog
            isOpen={true}
            confirm={removeBoletin}
            disagree={notRemoveBoletin}
          />
        ); */
      case mode.NEW:
        return (
          <MyModal
            open={boletinData.open}
            handleClose={handleClose}
            title="Boletín Alerta Alba-Keneth"
            editMode={true}
            handleSave={handleSaveBoletin}
          >
            <CreateBoletin
              formData={formData}
              boletin={boletinData.boletin}
              setBoletin={setBoletin}
              errors={errors}
              setErrors={setErrors}
            />
          </MyModal>
        );
      default:
        return null;
    }
  }

  function setBoletin(boletin) {
    setBoletinData({ ...boletinData, boletin });
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>No. Alerta</TableCell>
            <TableCell>No. Caso</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Observaciones</TableCell>
            <TableCell>Oficio</TableCell>
            <TableCell className="text-center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formData.formData &&
            !loading &&
            alerts.map((alert, index) => (
              <Row
                key={index}
                row={alert}
                formData={formData.formData}
                handleNewBoletin={handleNewBoletin}
                handleAlertActions={handleAlertActions}
                index={index}
              />
            ))}
        </TableBody>
      </Table>
      <Pagination size={albaKeneth.total} onPageChange={onPageChange} />
      {modalData.open && renderAlertMode()}
      {boletinData.open && renderBoletinMode()}
    </TableContainer>
  );
}

const mapStateProps = function(state, ownProps) {
  return {
    formData: state.formData,
    albaKeneth: state.albaKeneth,
    body: ownProps.body,
  };
};

export default connect(mapStateProps)(Alerts);
