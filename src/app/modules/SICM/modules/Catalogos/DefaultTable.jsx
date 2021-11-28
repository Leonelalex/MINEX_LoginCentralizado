import React from "react";
import MaterialTable, { MTableToolbar } from "material-table";

const DefaultTable = ({
  columns,
  data,
  handleRowAdd,
  handleRowUpdate,
  handleRowDelete,
  text,
  isDeletable = false,
}) => {
  return (
    <MaterialTable
      // title={<MyNewTitle variant="h5" text={title} />}
      style={{ width: "100%" }}
      title=""
      columns={columns}
      data={data}
      localization={{
        header: {
          actions: "Acciones",
        },
        pagination: {
          labelDisplayedRows: "{from}-{to} de {count}",
          labelRowsSelect: "Filas",
          firstAriaLabel: "Primera página",
          firstTooltip: "Primera página",
          previousAriaLabel: "Página anterior",
          previousTooltip: "Página anterior",
          nextAriaLabel: "Página siguiente",
          nextTooltip: "Página siguiente",
          lastAriaLabel: "Última página",
          lastTooltip: "Última página",
        },
        toolbar: {
          searchTooltip: "Buscar",
          searchPlaceholder: "Buscar",
        },
        body: {
          addTooltip: "Agregar",
          editTooltip: "Editar",
          deleteTooltip: "Desactivar",
          editRow: {
            deleteText: text,
            cancelTooltip: "Cancelar",
            saveTooltip: "Guardar",
          },
        },
      }}
      options={{
        headerStyle: {
          borderBottomColor: "gray",
          borderBottomWidth: "3px",
          fontFamily: "verdana",
        },
        actionsColumnIndex: -1,
      }}
      editable={{
        isDeletable: (rowData) => !isDeletable,
        isDeleteHidden: (rowData) => isDeletable,
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            handleRowUpdate(newData, oldData, resolve, reject);
          }),
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            handleRowAdd(newData, resolve, reject);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            handleRowDelete(oldData, resolve, reject);
          }),
      }}
      components={{
        Toolbar: (props) =>
          !isDeletable ? <MTableToolbar {...props} /> : null,
      }}
    />
  );
};

export { DefaultTable };
