import { alertTypeConstants } from "../../constants/SICM";

const getColorCabello = (formData, codigo) => {
  try {
    // eslint-disable-next-line
    return formData.colorCabello.find((cabello) => cabello.codigo == codigo)
      .nombre;
  } catch (error) {
    return "Sin selección";
  }
};

const getTipoCabello = (formData, codigo) => {
  try {
    // eslint-disable-next-line
    return formData.tipoCabello.find((cabello) => cabello.codigo == codigo)
      .nombre;
  } catch (error) {
    return "Sin selección";
  }
};

const getColorOjos = (formData, codigo) => {
  try {
    // eslint-disable-next-line
    return formData.colorOjos.find((ojo) => ojo.codigo == codigo).nombre;
  } catch (error) {
    return "Sin selección";
  }
};

const getComplexion = (formData, codigo) => {
  try {
    // eslint-disable-next-line
    return formData.complexion.find((complexion) => complexion.codigo == codigo)
      .nombre;
  } catch (error) {
    return "Sin selección";
  }
};

const getSituacion = (formData, codigo) => {
  try {
    // eslint-disable-next-line
    return formData.situacion_alerta.find(
      (situacion) => situacion.codigo === codigo
    ).nombre;
  } catch (error) {
    return "Sin selección";
  }
};

const getEstado = (formData, codigo) => {
  try {
    // eslint-disable-next-line
    return formData.estadosAlerta.find(
      (estado) => estado.codigoEstado === codigo
    ).nombre;
  } catch (error) {
    return "Sin selección";
  }
};

const getTamanioCabello = (formData, codigo) => {
  try {
    // eslint-disable-next-line
    return formData.tamanioCabello.find((tamanio) => tamanio.codigo === codigo)
      .nombre;
  } catch (error) {
    return "Sin selección";
  }
};

const getTez = (formData, codigo) => {
  try {
    // eslint-disable-next-line
    return formData.tez.find((tez) => tez.codigo === codigo).nombre;
  } catch (error) {
    return "Sin selección";
  }
};

const getGenero = (formData, codigo) => {
  try {
    // eslint-disable-next-line
    return formData.generos.find((genero) => genero.codigO_GENERO === codigo)
      .descripcion;
  } catch (error) {
    return "Sin selección";
  }
};

const getMunicipio = (formData, codigo) => {
  try {
    return formData.municipios.find(
      // eslint-disable-next-line
      (municipio) => municipio.codigO_CIUDAD == codigo
    ).descripcion;
  } catch (error) {
    return "Sin selección";
  }
};

const getDepartamento = (formData, codigo) => {
  try {
    return formData.departamentos.find(
      (departamento) =>
        // eslint-disable-next-line
        departamento.codigO_DIVISION ==
        formData.municipios.find(
          // eslint-disable-next-line
          (municipio) => municipio.codigO_CIUDAD == codigo
        ).codigO_DIVISION
    ).descripcion;
  } catch (error) {
    return "Sin selección";
  }
};

const getStatus = (formData, codigo) => {
  try {
    return formData.estatusAlerta.find((estatus) => estatus.codigo === codigo)
      .nombre;
  } catch (error) {
    return "Sin selección";
  }
};

const getAcciones = (formData, codigo) => {
  try {
    return formData.accionesAlerta.find((accion) => accion.codigo === codigo)
      .nombre;
  } catch (error) {
    return "Sin selección";
  }
};

const getAccionesNotificacion = (formData, codigo) => {
  try {
    return formData.accionesNotificacion.find(
      (accion) => accion.codigo === codigo
    ).nombre;
  } catch (error) {
    return "Sin selección";
  }
};

const getTipoAlerta = (codigo) => {
  switch (codigo) {
    case alertTypeConstants.ISABELCLAUDINA:
      return "Isabel-Claudina";
    case alertTypeConstants.ALBAKENETH:
      return "Alba-Keneth";
    default:
      return "Otra";
  }
};

const formDataFunctions = {
  getColorCabello,
  getColorOjos,
  getTipoCabello,
  getComplexion,
  getSituacion,
  getEstado,
  getTamanioCabello,
  getTez,
  getGenero,
  getMunicipio,
  getDepartamento,
  getStatus,
  getAcciones,
  getTipoAlerta,
  getAccionesNotificacion,
};

export { formDataFunctions };
