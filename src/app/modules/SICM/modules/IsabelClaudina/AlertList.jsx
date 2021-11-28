import React, { useState } from "react";
import { connect } from "react-redux";
// eslint-disable-next-line
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core/";
import { Collapse } from "@material-ui/core/";
import { IconButton } from "@material-ui/core/";
import { Table } from "@material-ui/core/";
import { TableBody } from "@material-ui/core/";
import { TableCell } from "@material-ui/core/";
import { TableContainer } from "@material-ui/core/";
import { TableHead } from "@material-ui/core/";
import { TableRow } from "@material-ui/core/";
import { Typography } from "@material-ui/core/";
import { Paper } from "@material-ui/core/";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Avatar } from "@material-ui/core/";
// eslint-disable-next-line
import HLink from "@material-ui/core/Link";
import { isabelClaudinaActions } from "../../../../../actions/SICM";
import { MyModal, Pagination } from "../../components";
import {
  formDataFunctions,
  formatDate,
  getRouteImgs,
  getRouteOficio,
} from "../../../../../helpers/SICM";
import { Bitacora } from "./";
import { MenuItem } from "@material-ui/core/";
import { Menu } from "@material-ui/core/";
import { ActionsIS } from "../Actions";
import { ActionsBoletinIS } from "../Actions";
import { Tooltip } from "@material-ui/core/";
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
  DELETE: "DELETE",
  NEW: "NEW",
  NONE: "NONE",
  VIEW: "VIEW",
  BITACORA: "BITACORA",
  SEGUIMIENTO: "SEGUIMIENTO",
};

function Row(props) {
  const { row, formData, index, handleNewBoletin, handleAlertActions } = props;
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const classes = useRowStyles();

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
        <TableCell>
          {" "}
          {formDataFunctions.getEstado(formData, row.estadoAlerta)}
        </TableCell>
        <TableCell>
          {row.fechaActivacion === null
            ? "No Activada"
            : formatDate(row.fechaActivacion)}
        </TableCell>

        <TableCell>
          <ShowMoreText
            lines={1}
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
        <TableCell>
          <HLink
            href={getRouteOficio(2, row.oficio)}
            target="_blank"
            id="oficio"
          >
            Oficio
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
                handleAlertActions(row, mode.BITACORA);
                handleClose();
              }}
            >
              Bitácora
            </MenuItem>

            <MenuItem
              onClick={(e) => {
                handleAlertActions(row, mode.SEGUIMIENTO);
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
                    <TableRow key={boletin.codigoBoletin}>
                      <TableCell>
                        <Avatar
                          src={
                            boletin.foto !== ""
                              ? getRouteImgs(2, boletin.foto)
                              : ""
                          }
                        />
                      </TableCell>
                      <TableCell>
                        {boletin.primerNombre} {boletin.segundoNombre}{" "}
                        {boletin.tercerNombre} {boletin.primerApellido}{" "}
                        {boletin.segundoApellido} {boletin.apellidoCasada}
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
                            color="secondary"
                            onClick={(e) => {
                              handleNewBoletin(boletin, mode.VIEW);
                            }}
                          ></IconButton>
                        </Tooltip>
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

function Alerts({ dispatch, isabelClaudina, formData }) {
  const { loading, alerts } = isabelClaudina;
  const [modalData, setModalData] = useState({
    open: false,
    alert: null,
    mode: mode.NONE,
  });
  const [boletinData, setBoletinData] = useState({
    open: false,
    boletin: null,
    mode: mode.NONE,
  });

  function handleClose() {
    setModalData({ ...modalData, open: false });
    setBoletinData({ ...boletinData, open: false, mode: mode.NONE });
  }

  function onPageChange(props) {
    dispatch(isabelClaudinaActions.getAlerts({ ...props }));
  }

  function handleNewBoletin(boletin, mode_) {
    setBoletinData({
      open: true,
      boletin,
      mode: mode_,
      code: boletin.codigoAlerta,
    });
  }

  function handleAlertActions(alert, mode) {
    setModalData({ open: true, alert: alert, mode });
  }

  function renderAlertMode() {
    switch (modalData.mode) {
      case mode.SEGUIMIENTO:
        return (
          <MyModal
            open={modalData.open}
            handleClose={handleClose}
            editMode={false}
          >
            <ActionsIS
              open={modalData.open}
              formData={formData}
              alert={modalData.alert}
              closeMenu={handleClose}
            />
          </MyModal>
        );
      case mode.BITACORA:
        return (
          <MyModal
            open={modalData.open}
            handleClose={handleClose}
            title={
              "Bitácora de acciones Alerta Isabel-Claudina " +
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
          <ActionsBoletinIS
            open={boletinData.open}
            formData={formData}
            alert={boletinData.alert}
            closeMenu={handleClose}
            boletin={boletinData.boletin}
          />
        );

      default:
        return null;
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Alerta</TableCell>
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
      <Pagination size={isabelClaudina.total} onPageChange={onPageChange} />
      {modalData.open && renderAlertMode()}
      {boletinData.open && renderBoletinMode()}
    </TableContainer>
  );
}

const mapStateProps = function(state) {
  return {
    formData: state.formData,
    isabelClaudina: state.isabelClaudina,
  };
};

const AlertList = connect(mapStateProps)(Alerts);
export { AlertList };
