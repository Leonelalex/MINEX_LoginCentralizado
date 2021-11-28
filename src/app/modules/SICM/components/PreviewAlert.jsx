import React, { Fragment } from "react";
import { formDataFunctions, formatDate} from "../../../../helpers/SICM";

function PreviewAlert({ alert, formData }) {
  return (
    <Fragment>
      <div className="row">
        <div className="col-12">
          <h4> No. de Alerta : {alert.codigoAlerta}</h4>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-sm-5">
          <p className="font-weight-bold mb-0">Número de Oficio:</p>
        </div>
        <div className="col-sm-7">{alert.codigoOficio}</div>
      </div>

      <div className="row mt-2">
        <div className="col-sm-5">
          <p className="font-weight-bold mb-0">Número de Caso:</p>
        </div>
        <div className="col-sm-7">{alert.numeroCaso}</div>
      </div>

      {alert.estadoAlerta && (
        <div className="row mt-2">
          <div className="col-sm-5">
            <p className="font-weight-bold mb-0">Estado:</p>
          </div>
          <div className="col-sm-7">
            {formDataFunctions.getEstado(formData, alert.estadoAlerta)}
          </div>
        </div>
      )}

      <div className="row mt-2">
        <div className="col-sm-5">
          <p className="font-weight-bold mb-0">Fecha:</p>
        </div>
        <div className="col-sm-7">
          {alert.fechaActivacion ? (
            formatDate(alert.fechaActivacion)
          ) : (
            <div>{formatDate(alert.fecha)}</div>
          )}
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-sm-5">
          <p className="font-weight-bold mb-0">Departamento:</p>
        </div>
        <div className="col-sm-7">
          {formDataFunctions.getDepartamento(formData, alert.codigoMunicipio)}
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-sm-5">
          <p className="font-weight-bold mb-0">Municipio:</p>
        </div>
        <div className="col-sm-7">
          {formDataFunctions.getMunicipio(formData, alert.codigoMunicipio)}
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-sm-5">
          <p className="font-weight-bold mb-0">Direccción:</p>
        </div>
        <div className="col-sm-7">
          {" "}
          {alert.direccion === "" ? "No indica" : alert.direccion}
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-sm-5">
          <p className="font-weight-bold mb-0"> Observaciones:</p>
        </div>
        <div className="col-sm-7">
          {alert.observaciones === "" ? "No indica" : alert.observaciones}
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-sm-5">
          <p className="font-weight-bold mb-0"> Denunciante:</p>
        </div>
        <div className="col-sm-7">
          {alert.denunciante === "" ? "No indica" : alert.denunciante}
        </div>
      </div>
    </Fragment>
  );
}

export { PreviewAlert };
