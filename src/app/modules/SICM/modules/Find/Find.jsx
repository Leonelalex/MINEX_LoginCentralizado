/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint no-restricted-imports: ["error"] */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import {
  CardBody,
  Card,
} from "../../../../../_metronic/_partials/controls/Card";
import { findService } from "../../../../../services/SICM";
// import { DataGrid } from "@material-ui/data-grid";
import { DataGrid } from '@mui/x-data-grid';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import { useSelector, useDispatch } from "react-redux";
import { formDataAction } from "../../../../../actions/SICM/";
import {
  formDataFunctions,
  formatDate,
  getRouteImgs,
} from "../../../../../helpers/SICM";
import {
  ActionsBoletin,
  ActionsBoletinIS,
  Actions,
  ActionsIS,
} from "../Actions";
import { Image } from "../../components";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "90%",
  },
  textField: {
    minWidth: "90%",
  },
  rootForm: {
    "& > *": {
      margin: theme.spacing(1),
      width: "20ch",
    },
  },
  footerGrid: {
    "& .MuiDataGrid-root": {
      fontSize: 25,
    },
    "& .MuiDataGrid-root .MuiDataGrid-footer": {
      display: "block",
    },
  },
}));

function NoDataComponent() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <h5>No se encontraron coincidencias</h5>
    </div>
  );
}

function Find() {
  const classes = useStyles();
  const formData = useSelector((store) => store.formData);
  const dispatch = useDispatch();
  const [filtro, setFiltro] = useState({
    primerNombre: "",
    segundoNombre: "",
    tercerNombre: "",
    primerApellido: "",
    segundoApellido: "",
    cui: "",
  });
  const [value, setValue] = useState("nombre");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);
  const [isInit, setIsInit] = useState(true);
  const [boletin, setBoletin] = useState({
    open: false,
    boletin: null,
    type: 0,
  });
  const [alert, setAlert] = useState({ open: false, alert: null, type: 0 });
  const [image, setImage] = useState(null);
  const columns = [
    {
      field: "foto",
      headerName: "Foto",
      width: 100,
      align: "center",
      disableClickEventBubbling: true,
      renderCell: ({ row }) => {
        const url = row.boletines.foto
          ? getRouteImgs(row.tipoAlerta, row.boletines.foto)
          : "";
        return <Avatar src={url} onClick={(e) => { viewImage(url)}} />;
      },
    },
    {
      field: "codigoAlerta",
      headerName: "No. Alerta",
      width: 130,
      disableClickEventBubbling: true,
      renderCell: ({ row }) => (
        <Link
          component="button"
          variant="body2"
          onClick={() => handleViewAlert(row)}
        >
          {row.codigoAlerta}
        </Link>
      ),
    },
    {
      field: "nombres",
      headerName: "Nombres",
      width: 220,
      valueGetter: ({ row }) =>
        ` 
        ${row.boletines.primerNombre || ""} 
        ${row.boletines.segundoNombre || ""} 
        ${row.boletines.tercerNombre || ""}
        `,
    },
    {
      field: "apellidos",
      headerName: "Apellidos",
      width: 220,
      valueGetter: ({ row }) =>
        `
        ${row.boletines.primerApellido || ""} 
        ${row.boletines.segundoApellido || ""} 
        ${row.boletines.apellidoCasada || ""}
        `,
    },
    {
      field: "tipo",
      headerName: "Tipo",
      width: 150,
      renderCell: ({ row }) => (
        <span style={{ color: row.tipoAlerta === 1 ? "#8C2C2C" : "#E92EBF" }}>
          {formDataFunctions.getTipoAlerta(row.tipoAlerta)}
        </span>
      ),
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 180,
      valueGetter: ({ row }) =>
        formDataFunctions.getEstado(formData, row.estadoAlerta),
    },
    {
      field: "situacion",
      headerName: "Situación",
      width: 280,
      valueGetter: ({ row }) =>
        formDataFunctions.getSituacion(formData, row.boletines.codigoSituacion),
    },
    {
      field: "fechaActivacion",
      headerName: "Fecha de Activación",
      width: 180,
      align: "center",
      valueGetter: ({ row }) => formatDate(row.fechaActivacion),
    },
  ];

  const handleChangeRadio = (event) => {
    setValue(event.target.value);
  };

  const handleChange = (e) => {
    setFiltro({ ...filtro, [e.target.id]: e.target.value });
  };

  const handlePageChange = (params) => {
    if (isInit) return;
    setPage(params);
    findPage(params + 1, pageSize);
  };

  const handlePageSizeChange = (params) => {
    setPageSize(params);
    if (isInit) return;
    findPage(page + 1, params);
  };

  const find = async () => {
    setIsInit(false);
    setPage(0);
    findPage(1, pageSize);
  };

  const submit = (e) => {
    if (e.key === "Enter") {
      find();
    }
  };

  const findPage = async (page, pageSize) => {
    setLoading(true);
    try {
      const params =
        value === "nombre"
          ? {
              primerNombre: filtro.primerNombre,
              segundoNombre: filtro.segundoNombre,
              tercerNombre: filtro.tercerNombre,
              primerApellido: filtro.primerApellido,
              segundoApellido: filtro.segundoApellido,
            }
          : {
              cui: filtro.cui,
            };

      const data = await findService.findPerson(params, page, pageSize);
      if (!data.alertas) {
        throw new Error("No se encontró ninguna coincidencia");
      }
      const rows = data.alertas.map((alert) => ({
        ...alert,
        id: alert.boletines.codigoBoletin,
      }));
      setRows(rows);
      setRowCount(data.total);
    } catch (error) {
      // console.error(error);
      setRows([]);
      setRowCount(0);
    }
    setLoading(false);
  };

  const onRowClick = ({ row }) => {
    setBoletin({
      open: true,
      boletin: row.boletines,
      type: row.tipoAlerta,
    });
  };

  const handleViewAlert = (row) => {
    setAlert({ open: true, alert: row, type: row.tipoAlerta });
  };

  const viewImage = (url) => {
    setImage(url);
  };

  function handleClose() {
    setBoletin({ open: false, boletin: null });
    setAlert({ open: false, alert: null });
    setImage(null);
  }

  const handleReset = (e) => {
    setFiltro({
      primerNombre: "",
      segundoNombre: "",
      tercerNombre: "",
      primerApellido: "",
      segundoApellido: "",
      cui: "",
    });
  };

  function handleUpperCase(e) {
    e.target.value = ("" + e.target.value).toUpperCase();
  }

  useEffect(() => {
    dispatch(formDataAction.getFormData());
  }, [dispatch]);

  return (
    <Card>
      <CardHeader title="Búsqueda de Alertas"></CardHeader>
      <CardBody>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="Búsqueda"
            name="busqueda"
            value={value}
            onChange={handleChangeRadio}
          >
            <FormControlLabel
              value="nombre"
              control={<Radio />}
              label="Buscar por nombre"
              style={{ width: "25ch" }}
            />
            <FormControlLabel
              value="cui"
              control={<Radio />}
              label="Buscar por CUI"
              style={{ width: "25ch" }}
            />
          </RadioGroup>
        </FormControl>
        <form onSubmit={find} className={classes.rootForm}>
          {value === "cui" ? (
            <TextField
              id="cui"
              label="Cui"
              // placeholder="Ingrese cui"
              // className={classes.textField}
              margin="none"
              value={filtro.cui}
              onChange={handleChange}
              onKeyPress={submit}
            />
          ) : (
            <React.Fragment>
              <TextField
                id="primerNombre"
                label="Primer nombre"
                // placeholder="Ingrese primer nombre"
                // className={classes.textField}
                margin="none"
                value={filtro.primerNombre}
                onKeyPress={submit}
                onChange={handleChange}
                onInput={handleUpperCase}
              />
              <TextField
                id="segundoNombre"
                label="Segundo nombre"
                // placeholder="Ingrese segundo nombre"
                // className={classes.textField}
                margin="none"
                value={filtro.segundoNombre}
                onKeyPress={submit}
                onChange={handleChange}
                onInput={handleUpperCase}
              />
              <TextField
                id="tercerNombre"
                label="Otros nombres"
                // placeholder="Ingrese otros nombres"
                // className={classes.textField}
                margin="none"
                value={filtro.tercerNombre}
                onKeyPress={submit}
                onChange={handleChange}
                onInput={handleUpperCase}
              />
              <TextField
                id="primerApellido"
                label="Primer apellido"
                // placeholder="Ingrese primer apellido"
                // className={classes.textField}
                margin="none"
                value={filtro.primerApellido}
                onKeyPress={submit}
                onChange={handleChange}
                onInput={handleUpperCase}
              />
              <TextField
                id="segundoApellido"
                label="Segundo apellido"
                // placeholder="Ingrese segundo apellido"
                // className={classes.textField}
                margin="none"
                value={filtro.segundoApellido}
                onKeyPress={submit}
                onChange={handleChange}
                onInput={handleUpperCase}
              />
            </React.Fragment>
          )}
          <Button
            style={{ width: "16ch" }}
            variant="contained"
            color="secondary"
            onClick={find}
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
        </form>
        {!isInit && (
          <div style={{ height: 400 }} className="mt-4">
            <DataGrid
              style={{ fontSize: 13 }}
              rows={rows}
              columns={columns}
              pagination
              page={page}
              pageSize={pageSize}
              rowCount={rowCount}
              onPageChange={handlePageChange}
              loading={loading}
              paginationMode="server"
              rowsPerPageOptions={[5, 10, 20, 50]}
              onPageSizeChange={handlePageSizeChange}
              onRowDoubleClick={onRowClick}
              // onRowClick={onRowClick}
              hideFooterSelectedRowCount
              components={{
                noRowsOverlay: NoDataComponent,
              }}
              hideFooterRowCount
            />
          </div>
        )}
      </CardBody>
      {boletin.boletin &&
        (boletin.type === 1 ? (
          <ActionsBoletin
            open={boletin.open}
            formData={formData}
            boletin={boletin.boletin}
            closeMenu={handleClose}
          />
        ) : (
          <ActionsBoletinIS
            open={boletin.open}
            formData={formData}
            boletin={boletin.boletin}
            closeMenu={handleClose}
          />
        ))}
      {image !== null && <Image url={image} handleClose={handleClose}></Image>}
      {alert.alert &&
        (alert.type === 1 ? (
          <Actions
            open={alert.open}
            formData={formData}
            alert={alert.alert}
            closeMenu={handleClose}
            ocultar={true}
          />
        ) : (
          <ActionsIS
            open={alert.open}
            formData={formData}
            alert={alert.alert}
            closeMenu={handleClose}
            ocultar={true}
          />
        ))}
    </Card>
  );
}

export { Find };
