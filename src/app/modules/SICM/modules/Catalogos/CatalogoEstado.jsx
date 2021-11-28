import React, { useEffect, useState } from "react";
import { DefaultTable } from "./";
import { formData } from "../../../../../services/SICM";
import { alertAction } from "../../../../../actions/SICM";
import { useDispatch } from "react-redux";
import { Switch } from "@material-ui/core/";
import { Checkbox } from "@material-ui/core/";

function CatalogoEstado() {
  const [estados, setEstados] = useState([]);
  const dispatch = useDispatch();

  let columns = [
    { title: "Nombre", field: "nombre" },
    { title: "Descripción", field: "descripcion" },
    {
      title: "Estado",
      field: "activo",
      editComponent: ({ value, onChange }) => {
        return value !== undefined ? (
          <Switch
            checked={value}
            color="primary"
            name="checkedB"
            inputProps={{ "aria-label": "primary checkbox" }}
            onChange={(event) => onChange(event.target.checked)}
          />
        ) : (
          <Switch
            checked={true}
            readOnly
            color="primary"
            name="checkedB"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        );
      },
      render: (data) => (
        <Switch
          checked={data.activo}
          color="primary"
          name="checkedB"
          inputProps={{ "aria-label": "primary checkbox" }}
          onChange={(event) => updateAccionEstados(data, event.target.checked)}
        />
      ),
    },
    {
      title: "Alba Keneth",
      field: "isAK",
      editComponent: ({ value = true, onChange }) => {
        return value !== undefined ? (
          <Checkbox
            checked={value}
            onChange={(event) => onChange(event.target.checked)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        ) : (
          <Checkbox
            checked={true}
            readOnly
            onChange={(event) => onChange(event.target.checked)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        );
      },
      render: (data) => <p>{data.isAK ? "Si" : "No"}</p>,
    },
    {
      title: "Isabel Claudina",
      field: "isIC",
      editComponent: ({ value = true, onChange }) => {
        return value !== undefined ? (
          <Checkbox
            checked={value}
            onChange={(event) => onChange(event.target.checked)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        ) : (
          <Checkbox
            checked={true}
            readOnly
            onChange={(event) => onChange(event.target.checked)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        );
      },
      render: (data) => <p>{data.isIC ? "Si" : "No"}</p>,
    },
  ];

  const getEstados = async () => {
    try {
      const data = await formData.getEstados();
      setEstados(data);
    } catch (error) {
      dispatch(alertAction.error("Error al obtener el estado"));
    }
  };

  async function updateAccionEstados(accion, estado) {
    try {
      const dataBody = {
        activo: estado,
        descripcion: accion.descripcion,
        nombre: accion.nombre,
        isAK: accion.isAK,
        isIC: accion.isIC,
      };
      const data = await formData.updateEstado(dataBody, accion.codigo);
      const estadoUpdate = [...estados];
      const index = accion.tableData.id;
      estadoUpdate[index] = { ...accion, activo: estado };
      setEstados(estadoUpdate);
      dispatch(alertAction.success(data.message));
    } catch (error) {
      dispatch(alertAction.error("Error al editar el estado"));
    }
  }

  async function estadoUpdate(estatus, codigo, resolve, reject) {
    if (!estatus.nombre) {
      reject("Error");
      dispatch(alertAction.error("El nombre no puede ser vacío"));
      return;
    }
    if (!estatus.descripcion) {
      reject("Error");
      dispatch(alertAction.error("La descripción no puede ser vacía"));
      return;
    }
    let index = estados.findIndex(
      (item) => item.nombre === estatus.nombre && item.codigo !== estatus.codigo
    );
    if (index !== -1) {
      reject("Error");
      dispatch(
        alertAction.error("Ya existe un Estado con el nombre ingresado")
      );
      return;
    }

    try {
      const data = await formData.updateEstado(estatus, estatus.codigo);
      const estadoUpdate = [...estados];
      const index = codigo.tableData.id;
      estadoUpdate[index] = estatus;
      setEstados(estadoUpdate);
      dispatch(alertAction.success(data.message));
    } catch (error) {
      dispatch(alertAction.error("Error al editar el estado"));
    }
    resolve();
  }

  async function removeEstado(estatus, resolve, reject) {
    try {
      const data = await formData.deleteEstado(estatus.codigo);
      const dataDelete = [...estados];
      const index = estatus.tableData.id;
      estatus.activo = false;
      dataDelete[index] = estatus;
      setEstados(dataDelete);
      dispatch(alertAction.success(data.message));
    } catch (error) {
      dispatch(alertAction.error("Error al desactivar el estado"));
    }
    resolve();
  }

  async function saveEstado(estatus, resolve, reject) {
    if (!estatus.nombre) {
      reject("Error");
      dispatch(alertAction.error("El nombre no puede ser vacío"));
      return;
    }
    if (!estatus.descripcion) {
      reject("Error");
      dispatch(alertAction.error("La descripción no puede ser vacía"));
      return;
    }
    let index = estados.findIndex((item) => item.nombre === estatus.nombre);
    if (index !== -1) {
      reject("Error");
      dispatch(
        alertAction.error("Ya existe un Estado con el nombre ingresado")
      );
      return;
    }
    try {
      const data = await formData.addEstado(estatus);
      estatus = {
        ...estatus,
        codigo: data.codigoEstado,
        activo: true,
        isAK: estatus.isAK !== undefined ? estatus.isAK : true,
        isIC: estatus.isIC !== undefined ? estatus.isIC : true,
      };

      setEstados([...estados, estatus]);
      dispatch(alertAction.success(data.message));
    } catch (error) {
      dispatch(alertAction.error("Error al guardar el nuevo estado"));
      console.log(error);
    }
    resolve();
  }

  useEffect(() => {
    getEstados();
    // eslint-disable-next-line
  }, []);

  return (
    <DefaultTable
      columns={columns}
      data={estados}
      handleRowAdd={saveEstado}
      handleRowUpdate={estadoUpdate}
      handleRowDelete={removeEstado}
      title="Catálogo de Estados de Boletín"
    />
  );
}

export { CatalogoEstado };
