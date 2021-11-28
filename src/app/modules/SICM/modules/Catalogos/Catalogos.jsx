import React from "react";
import { CardHeader } from "@material-ui/core/";
import {
  CardBody,
  Card,
} from "../../../../../_metronic/_partials/controls/Card";
import {
  CatalogoSituacion,
  CatalogoEstado,
  CatalogoAcciones,
  CatalogoParametros,
} from "./";
import { Accordion } from "@material-ui/core/";
import { AccordionSummary } from "@material-ui/core/";
import { AccordionDetails  } from "@material-ui/core/";
import { Typography } from "@material-ui/core/";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function Catalogos() {
  return (
    <Card>
      <CardHeader title="Gestión de Catálogos"></CardHeader>
      <CardBody>
        <div style={{ width: "100%" }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Catálogo de Situaciones Especiales</Typography>
            </AccordionSummary>
            <AccordionDetails >
              <CatalogoSituacion />
            </AccordionDetails >
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Catálogo de Estados de Boletín</Typography>
            </AccordionSummary>
            <AccordionDetails >
              <CatalogoEstado />
            </AccordionDetails >
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Catálogo de Acciones de Notificación</Typography>
            </AccordionSummary>
            <AccordionDetails >
              <CatalogoAcciones />
            </AccordionDetails >
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Parámetros Globales</Typography>
            </AccordionSummary>
            <AccordionDetails >
              <CatalogoParametros />
            </AccordionDetails >
          </Accordion>
        </div>

        {/* <Grid container spacing={4}>
          <Grid item xs={12}>
            <CatalogoSituacion />
          </Grid>
          <Grid item xs={12}>
            <CatalogoEstado />
          </Grid>
          <Grid item xs={12}>
            <CatalogoAcciones />
          </Grid>
          <Grid item xs={12}>
            <CatalogoParametros />
          </Grid>
        </Grid> */}
      </CardBody>
    </Card>
  );
}

export { Catalogos };
