import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DefaultTable } from "./";
import { formData } from "../../../../../services/SICM";
import { alertAction } from "../../../../../actions/SICM";
import { Switch } from "@material-ui/core/";
import { Checkbox } from "@material-ui/core/";

function CatalogoSituacion() {
  const [situaciones, setSituaciones] = useState([]);
  const dispatch = useDispatch();

  let columns = [
    {
      title: "Nombre",
      field: "nombre",
    },
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
          onChange={(event) =>
            updateAccionSituaciones(data, event.target.checked)
          }
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
            onChange={(event) => onChange(event.target.checked)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        );
      },
      render: (data) => <p>{data.isIC ? "Si" : "No"}</p>,
    },
  ];

  const getSituaciones = async () => {
    try {
      const data = await formData.getSituacion();
      setSituaciones(data);
    } catch (error) {
      console.log(error);
      dispatch(alertAction.error("Error al obtener la situación"));
    }
  };

  async function updateAccionSituaciones(accion, situacion) {
    try {
      const dataBody = {
        activo: situacion,
        descripcion: accion.descripcion,
        nombre: accion.nombre,
        isAK: accion.isAK,
        isIC: accion.isIC,
      };
      const data = await formData.updateSituacion(dataBody, accion.codigo);
      const situacionUpdate = [...situaciones];
      const index = accion.tableData.id;
      situacionUpdate[index] = { ...accion, activo: situacion };
      setSituaciones(situacionUpdate);
      dispatch(alertAction.success(data.message));
    } catch (error) {
      dispatch(alertAction.error("Error al editar la situación"));
    }
  }

  async function situacionUpdate(situacion, codSituacion, resolve, reject) {
    if (!situacion.nombre) {
      reject("Error");
      dispatch(alertAction.error("El nombre no puede ser vacío"));
      return;
    }
    if (!situacion.descripcion) {
      reject("Error");
      dispatch(alertAction.error("La descripción no puede ser vacía"));
      return;
    }
    let index = situaciones.findIndex(
      (item) =>
        item.nombre === situacion.nombre && item.codigo !== situacion.codigo
    );
    if (index !== -1) {
      reject("Error");
      dispatch(
        alertAction.error("Ya existe una Situación con el nombre ingresado")
      );
      return;
    }
    try {
      const data = await formData.updateSituacion(
        situacion,
        codSituacion.codigo
      );

      const situacionUpdate = [...situaciones];
      const index = codSituacion.tableData.id;
      situacionUpdate[index] = situacion;
      setSituaciones(situacionUpdate);
      dispatch(alertAction.success(data.message));
    } catch (error) {
      dispatch(alertAction.error("Error al actualizar la situación"));
    }
    resolve();
  }

  async function removeSituacion(situacion, resolve, reject) {
    try {
      const data = await formData.deleteSituacion(situacion.codigo);
      const dataDelete = [...situaciones];
      const index = situacion.tableData.id;
      situacion.activo = false;
      dataDelete[index] = situacion;
      setSituaciones(dataDelete);
      dispatch(alertAction.success(data.message));
    } catch (error) {
      console.log(error);
      dispatch(alertAction.error("Error al desactivar la situación"));
    }
    resolve();
  }

  async function saveSituacion(situacion, resolve, reject) {
    if (!situacion.nombre) {
      reject("Error");
      dispatch(alertAction.error("El nombre no puede ser vacío"));
      return;
    }
    if (!situacion.descripcion) {
      reject("Error");
      dispatch(alertAction.error("La descripción no puede ser vacía"));
      return;
    }
    let index = situaciones.findIndex(
      (item) => item.nombre === situacion.nombre
    );
    if (index !== -1) {
      reject("Error");
      dispatch(
        alertAction.error("Ya existe una Situación con el nombre ingresado")
      );
      return;
    }
    try {
      const data = await formData.addSituacion(situacion);
      situacion = {
        ...situacion,
        codigo: data.codigoSituacion,
        activo: true,
        isAK: situacion.isAK !== undefined ? situacion.isAK : true,
        isIC: situacion.isIC !== undefined ? situacion.isIC : true,
      };
      setSituaciones([...situaciones, situacion]);
      dispatch(alertAction.success(data.message));
    } catch (error) {
      console.log(error);
      dispatch(alertAction.error("Error al guardar la situación"));
    }
    resolve();
  }

  useEffect(() => {
    getSituaciones();
    // eslint-disable-next-line
  }, []);

  return (
    <DefaultTable
      columns={columns}
      data={situaciones}
      handleRowAdd={saveSituacion}
      handleRowUpdate={situacionUpdate}
      handleRowDelete={removeSituacion}
      title="Catálogo de Situaciones Especiales"
      text="¿Desea desactivar la situación?"
    />
  );
}

export { CatalogoSituacion };
