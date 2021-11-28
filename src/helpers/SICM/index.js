import { API_SICM, alertTypeConstants } from '../../constants/SICM';
export * from "./auth-header";
export * from "./handle-response";
export * from "./files";
export * from "./formData";
export * from './excelReport';

export function getDateFormat() {
  return new Date().toISOString().split("T")[0];
}

export function validGeneralData(alert) {
  const errors = {};
  let hasError = false;
  if (alert.codigoAlerta === "") {
    errors.codigoAlerta = "Ingrese el número de alerta";
  } else if (!/^\d+-\d{4}$/i.test(alert.codigoAlerta)) {
    errors.codigoAlerta = "Ingrese un número válido ";
    hasError = true;
  }
  if (alert.codigoOficio === "") {
    errors.codigoOficio = "Ingrese el número de oficio";
    hasError = true;
  }

  if (alert.oficio === null) {
    errors.oficio = "Seleccione el oficio";
    hasError = true;
  }
  // else if(alert.oficio.type !== "application/pdf"){
  //   errors.oficio = "Seleccione un archivo PDF";
  // }
  // else if(alert.oficio.size > 2048 * 2){
  //   errors.oficio = "El archivo no debe superar los 2 MB";
  // }
/* if (alert.direccion.length > 150) {
    errors.direccion = "Se a ingresado 150 caracteres";
    hasError = true;
  } */
/*  if (alert.observaciones.length > 1000) {
    errors.observaciones  = "Se a ingresado 1000 caracteres";
    hasError = true;
  }  */
  /* if (alert.denunciante.length >= 150) {
    errors.denunciante = "Se  excedió el limite de caracteres";
    hasError = true;
  }  */
  return hasError ? errors : null;
}

function validarNombre(nombre) {
  return !/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i.test(nombre);
}

export function validBoletinesData(alert) {
  const errors = { boletines: [] };
  let hasError = false;

  alert.boletines.forEach((boletin) => {
    const error = {};

    if (boletin.primerNombre !== "" && validarNombre(boletin.primerNombre)) {
      error.primerNombre = "Ingrese un nombre válido";
      hasError = true;
    }
    if (boletin.segundoNombre !== "" && validarNombre(boletin.segundoNombre)) {
      error.segundoNombre = "Ingrese un nombre válido";
      hasError = true;
    }
    if (boletin.tercerNombre !== "" && validarNombre(boletin.tercerNombre)) {
      error.tercerNombre = "Ingrese un nombre válido";
      hasError = true;
    }

    if (boletin.primerApellido !== "" && validarNombre(boletin.primerApellido)) {
      error.primerApellido = "El campo no puede ser vacío";
      hasError = true;
    }

    if (
      boletin.segundoApellido !== "" &&
      validarNombre(boletin.segundoApellido)
    ) {
      error.segundoApellido = "Ingrese un apellido válido";
      hasError = true;
    }

    if (boletin.estatura !== "" && boletin.estatura > 220) {
      error.estatura = "Ingrese estatura válida";
      hasError = true;
    }

    if (boletin.edad !== "" && boletin.edad > 17) {
      error.edad = "Ingrese una edad menor a 18";
      hasError = true;
    }

    if (boletin.nombreMadre !== "" && validarNombre(boletin.nombreMadre)) {
      error.nombreMadre = "Ingrese un nombre válido";
      hasError = true;
    }
  
    if(boletin.nombrePadre !== "" && validarNombre(boletin.nombrePadre)){
      error.nombrePadre ="Ingrese un nombre válido";
      hasError= true;
    }
    if(boletin.responsable !== "" && validarNombre(boletin.responsable)){
      error.responsable ="Ingrese un nombre válido";
      hasError= true;
    }
    if(boletin.alias !== "" && validarNombre(boletin.alias)){
      error.alias ="Ingrese un nombre válido";
      hasError= true;
    }

    errors.boletines.push(error);
  });
  return hasError ? errors : null;
}

export function validBoletin(boletin) {
  const error = {};
  let hasError = false;

  if (boletin.primerNombre !== "" && validarNombre(boletin.primerNombre)) {
    error.primerNombre = "El campo no puede ser vacío";
    hasError = true;
  }

  if (boletin.segundoNombre !== "" && validarNombre(boletin.segundoNombre)) {
    error.segundoNombre = "Ingrese un nombre válido";
    hasError = true;
  }
  if (boletin.tercerNombre !== "" && validarNombre(boletin.tercerNombre)) {
    error.tercerNombre = "Ingrese un nombre válido";
    hasError = true;
  }

  if (boletin.primerApellido !== "" && validarNombre(boletin.primerApellido)) {
    error.primerApellido = "El campo no puede ser vacío";
    hasError = true;
  }

  if (
    boletin.segundoApellido !== "" &&
    validarNombre(boletin.segundoApellido)
  ) {
    error.segundoApellido = "Ingrese un apellido válido";
    hasError = true;
  }

  if (boletin.estatura !== "" && boletin.estatura > 220) {
    error.estatura = "Ingrese estatura válida";
    hasError = true;
  }

  if (boletin.edad !== "" && boletin.edad > 17) {
    error.edad = "Ingrese una edad menor a 18";
    hasError = true;
  }

  if (boletin.nombreMadre !== "" && validarNombre(boletin.nombreMadre)) {
    error.nombreMadre = "Ingrese un nombre válido";
    hasError = true;
  }

  if(boletin.nombrePadre!== "" && validarNombre(boletin.nombrePadre)){
    error.nombrePadre ="Ingrese un nombre válido";
    hasError= true;
  }
  if(boletin.responsable !== "" && validarNombre(boletin.responsable)){
    error.responsable ="Ingrese un nombre válido";
    hasError= true;
  }
  if(boletin.alias !== "" && validarNombre(boletin.alias)){
    error.alias ="Ingrese un nombre válido";
    hasError= true;
  }

  return hasError ? error : null;
}

export function formatDate(fechaActivacion, language) {
  const date = new Date(fechaActivacion);
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timeZone: "America/Mexico_City",
  };
  const languageFormat = language === "en-US" ? "en-US" : "es-MX";
  return new Intl.DateTimeFormat(languageFormat, options).format(date);
}

export function getRouteImgs(id, img) {
  if (id === alertTypeConstants.ISABELCLAUDINA) {
    return `${API_SICM.fileService}/IC_Fotos/${img}`;
  }
  else {
    return `${API_SICM.fileService}/AK_Fotos/${img}`;
  }
}

export function getRouteFile(id, file) {
  if (id === alertTypeConstants.ISABELCLAUDINA) {
    return `${API_SICM.fileService}/IC_Docs/${file}`;
  }
  else {
    return `${API_SICM.fileService}/AK_Docs/${file}`;
  }
}

export function getRouteOficio(id, oficio) {
  if (id === alertTypeConstants.ISABELCLAUDINA) {
    return `${API_SICM.fileService}/IC_Oficios/${oficio}`;
  }
  else {
    return `${API_SICM.fileService}/AK_Oficios/${oficio}`;
  }
}