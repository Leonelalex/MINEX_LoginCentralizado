import React, { useEffect, useState } from "react";
import { DefaultTable } from "./";
import { formData } from "../../../../../services/SICM";
import { alertAction } from "../../../../../actions/SICM";
import { useDispatch } from "react-redux";

function CatalogoParametros() {
  const [parametros, setParametros] = useState([]);
  const dispatch = useDispatch();

  let columns = [
    { title: "Nombre", field: "nombre", editable: "never" },
    { title: "Valor", field: "valor" },
  ];

  const getParametros = async () => {
    try {
      const data = await formData.getParametros();
      setParametros(data);
    } catch (error) {
      console.log(error);
    }
  };

  async function parametroUpdate(parametro, codigo, resolve) {
    try {
      const data = await formData.updateParametro(codigo.codigo, parametro);
      const _parametros = [...parametros];
      const index = codigo.tableData.id;
      _parametros[index] = parametro;
      setParametros(_parametros);
      dispatch(alertAction.success(data.message));
    } catch (error) {
      console.log(error);
      dispatch(alertAction.error("Error al actualizar el parámetro"));
    }
    resolve();
  }

  useEffect(() => {
    getParametros();
  }, []);

  return (
    <DefaultTable
      columns={columns}
      data={parametros}
      handleRowUpdate={parametroUpdate}
      title="Parámetros Globales"
      isDeletable={true}
    />
  );
}

export { CatalogoParametros };
