/* eslint no-restricted-imports: ["error"] */
import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import ShowMoreText from "react-show-more-text";
import {
  formatDate,
  formDataFunctions,
  getRouteFile,
  getRouteOficio,
} from "../../../../../helpers/SICM";
import { Tooltip } from "@material-ui/core";

const useRowStyles = makeStyles(() => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
}));

function Row(props) {
  const { row, formData, downloadFiles } = props;
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          {formDataFunctions.getEstado(formData, row.codigoEstado)}
        </TableCell>
        <TableCell>
          {row.codigoAccionNotificacion
            ? formDataFunctions.getAccionesNotificacion(
                formData,
                row.codigoAccionNotificacion
              )
            : formDataFunctions.getAcciones(formData, row.codigoAccion)}
        </TableCell>
        <TableCell>{formatDate(row.fecha)}</TableCell>
        <TableCell>{row.usuario}</TableCell>
        <TableCell>{row.pais}</TableCell>
        <TableCell>
          <ShowMoreText
            lines={1}
            more="Ver más"
            less="Ver menos"
            className="content-css"
            anchorClass="my-anchor-css-class"
            expanded={false}
            width={280}
            truncatedEndingComponent={"... "}
          >
            {row.observaciones}
          </ShowMoreText>
        </TableCell>
        <TableCell className="text-center">
          {row.adjunto !== null && row.adjunto !== "" && (
            <Tooltip title="Descargar Documentos">
            <IconButton
              size="small"
              className="fa fa-download"
              color="secondary"
              onClick={(e) => downloadFiles(row.adjunto)}
            ></IconButton>
            </Tooltip>
          )}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function LogList({ logs, formData }) {
  const downloadFiles = (files) => {
    files = files.split(",").reverse();
    const link = document.createElement("a");
    document.body.appendChild(link);

    for (let file of files) {
      link.setAttribute("target", "_blank");
      if (/^\d+-\d{4}$/i.test(file.split(".")[0])) {
        link.href = getRouteOficio(1, file);
      } else {
        link.href = getRouteFile(1, file);
      }
      link.setAttribute("download", file);
      link.click();
    }
    document.body.removeChild(link);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Estado</TableCell>
            <TableCell>Acción</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Usuario</TableCell>
            <TableCell>País</TableCell>
            <TableCell>Observaciones</TableCell>
            <TableCell>Documentos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!formData.loading &&
            logs.map((log, index) => (
              <Row
                key={index}
                row={log}
                index={index}
                formData={formData}
                downloadFiles={downloadFiles}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateProps = function (state, ownProps) {
  return {
    formData: state.formData,
    albaKeneth: state.albaKeneth,
    logs: ownProps.logs,
  };
};

export default connect(mapStateProps)(LogList);
