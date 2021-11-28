import React, { useEffect, useState } from "react";
import { DefaultTable } from "./";
import { formData } from "../../../../../services/SICM";
import { alertAction } from "../../../../../actions/SICM";
import { useDispatch } from "react-redux";
import { Switch } from "@material-ui/core/";
import { Checkbox } from "@material-ui/core/";

function CatalogoAcciones() {
  const [acciones, setAcciones] = useState([]);
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
          onChange={(event) => updateAccionEstado(data, event.target.checked)}
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

  const getAcciones = async () => {
    try {
      const data = await formData.getAccion();
      setAcciones(data);
    } catch (error) {
      dispatch(alertAction.error("Error al obtener las acciones"));
    }
  };

  async function updateAccionEstado(accion, estado) {
    try {
      const dataBody = {
        activo: estado,
        descripcion: accion.descripcion,
        nombre: accion.nombre,
        isAK: accion.isAK,
        isIC: accion.isIC,
      };
      const data = await formData.updateAccion(dataBody, accion.codigo);
      const estadoUpdate = [...acciones];
      const index = accion.tableData.id;
      estadoUpdate[index] = { ...accion, activo: estado };
      setAcciones(estadoUpdate);
      dispatch(alertAction.success(data.message));
    } catch (error) {
      dispatch(alertAction.error("Error al editar la acción"));
    }
  }

  async function updateAccion(accion, codigo, resolve, reject) {
    if (!accion.nombre) {
      reject("Error");
      dispatch(alertAction.error("El nombre no puede ser vacío"));
      return;
    }
    if (!accion.descripcion) {
      reject("Error");
      dispatch(alertAction.error("La descripción no puede ser vacía"));
      return;
    }
    let index = acciones.findIndex(
      (item) => item.nombre === accion.nombre && item.codigo !== accion.codigo
    );
    if (index !== -1) {
      reject("Error");
      dispatch(
        alertAction.error("Ya existe una Acción con el nombre ingresado")
      );
      return;
    }

    try {
      const data = await formData.updateAccion(accion, accion.codigo);
      const estadoUpdate = [...acciones];
      const index = codigo.tableData.id;
      estadoUpdate[index] = accion;
      setAcciones(estadoUpdate);
      dispatch(alertAction.success(data.message));
    } catch (error) {
      dispatch(alertAction.error("Error al editar la acción"));
    }
    resolve();
  }

  async function removeAccion(accion, resolve) {
    try {
      const data = await formData.deleteAccion(accion.codigo);
      const dataDelete = [...acciones];
      const index = accion.tableData.id;
      accion.activo = false;
      dataDelete[index] = accion;
      setAcciones(dataDelete);
      dispatch(alertAction.success(data.message));
    } catch (error) {
      dispatch(alertAction.error("Error al desactivar la acción"));
    }
    resolve();
  }

  async function saveAccion(accion, resolve, reject) {
    if (!accion.nombre) {
      reject("Error");
      dispatch(alertAction.error("El nombre no puede ser vacío"));
      return;
    }
    if (!accion.descripcion) {
      reject("Error");
      dispatch(alertAction.error("La descripción no puede ser vacía"));
      return;
    }
    let index = acciones.findIndex((item) => item.nombre === accion.nombre);
    if (index !== -1) {
      reject("Error");
      dispatch(
        alertAction.error("Ya existe una Acción con el nombre ingresado")
      );
      return;
    }

    try {
      const data = await formData.addAccion(accion);
      accion = {
        ...accion,
        codigo: data.codigoAccion,
        activo: true,
        isAK: accion.isAK !== undefined ? accion.isAK : true,
        isIC: accion.isIC !== undefined ? accion.isIC : true,
      };
      setAcciones([...acciones, accion]);
      dispatch(alertAction.success(data.message));
    } catch (error) {
      dispatch(alertAction.error("Error al guardar la nueva acción"));
      console.log(error);
    }
    resolve();
  }

  useEffect(() => {
    getAcciones();
    // eslint-disable-next-line
  }, []);

  return (
    <DefaultTable
      columns={columns}
      data={acciones}
      handleRowAdd={saveAccion}
      handleRowUpdate={updateAccion}
      handleRowDelete={removeAccion}
      title="Catálogo de Acciones de Notificación"
      text="¿Desea desactivar la acción?"
    />
  );
}

export { CatalogoAcciones };
