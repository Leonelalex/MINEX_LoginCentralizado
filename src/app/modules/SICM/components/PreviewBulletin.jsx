import React, { Fragment } from "react";
// eslint-disable-next-line no-restricted-imports
import { makeStyles } from "@material-ui/core/styles";
import { getRouteImgs, formDataFunctions } from "../../../../helpers/SICM";

const useStyles = makeStyles({
  imagin: {
    width: "70px",
    height: "70px",
    borderRadius: "50px",
  },
});

function PreviewBulletin({ boletin, formData, alert }) {
  const classes = useStyles();
  return (
    <Fragment>
      <div>
        <h5>
          {boletin.foto && boletin.foto !== "" && (
            <img
              alt="Example Alt"
              src={
                boletin.foto && boletin.foto.base64
                  ? boletin.foto.base64
                  : getRouteImgs(alert, boletin.foto)
              }
              className={classes.imagin}
            />
          )}
          {""} {boletin.primerNombre} {boletin.segundoNombre}{" "}
          {boletin.tercerNombre} {boletin.primerApellido}{" "}
          {boletin.segundoApellido}
        </h5>
      </div>

      <div className="row mt-2">
        <div className="col-sm-5">
          <p className="font-weight-bold mb-0">Otros nombres, alias o apodos:</p>
        </div>

        <div className="col-sm-7">
          {boletin.alias === "" || boletin.alias === null
            ? "No indica"
            : boletin.alias}
        </div>
      </div>

      {boletin.codigoEstatus && (
        <div className="row mt-2">
          <div className="col-sm-5">
            <p className="font-weight-bold mb-0">Estado:</p>
          </div>
          <div className="col-sm-7">
            {formDataFunctions.getStatus(formData, boletin.codigoEstatus)}
          </div>
        </div>
      )}

      {boletin.codigoSituacion && (
        <div className="row mt-2">
          <div className="col-sm-5">
            <p className="font-weight-bold mb-0">Situación:</p>
          </div>
          <div className="col-sm-7">
            {formDataFunctions.getSituacion(formData, boletin.codigoSituacion)}
          </div>
        </div>
      )}

      <div className="row mt-2">
        <div className="col-sm-5">
          <p className="font-weight-bold mb-0">Color de cabello:</p>
        </div>
        <div className="col-sm-7">
          {formDataFunctions.getColorCabello(formData, boletin.colorCabello)}
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-sm-5">
          <p className="font-weight-bold mb-0">Tamaño de cabello:</p>
        </div>
        <div className="col-sm-7">
          {formDataFunctions.getTamanioCabello(
            formData,
            boletin.tamanioCabello
          )}
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-sm-5">
          <p className="font-weight-bold mb-0">Tipo de cabello:</p>
        </div>
        <div className="col-sm-7">
          {formDataFunctions.getTipoCabello(formData, boletin.tipoCabello)}
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-sm-5">
          <p className="font-weight-bold mb-0">Color de ojos:</p>
        </div>
        <div className="col-sm-7">
          {formDataFunctions.getColorOjos(formData, boletin.colorOjos)}
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-sm-5">
          <p className="font-weight-bold mb-0">Complexión:</p>
        </div>
        <div className="col-sm-7">
          {formDataFunctions.getComplexion(formData, boletin.complexion)}
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-sm-5">
          <p className="font-weight-bold mb-0">Tez (Color de piel):</p>
        </div>
        <div className="col-sm-7">
          {formDataFunctions.getTez(formData, boletin.tez)}
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-sm-5">
          <p className="font-weight-bold mb-0">Estatura:</p>
        </div>
        {boletin.estatura === "" ? (
          <div className="col-sm-7">No indica</div>
        ) : (
          <div className="col-sm-7">{boletin.estatura}cm</div>
        )}
      </div>

      <div className="row mt-2">
        <div className="col-sm-5">
          <p className="font-weight-bold mb-0">Sexo:</p>
        </div>
        <div className="col-sm-7">
          {formDataFunctions.getGenero(formData, boletin.genero)}
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-sm-5">
          <p className="font-weight-bold mb-0">Edad:</p>
        </div>

        {boletin.edad === "" || boletin.edad === null || boletin.edad === 0 ? (
          <div className="col-sm-7">No Indica</div>
        ) : (
          <div className="col-sm-7">{boletin.edad} años</div>
        )}
      </div>

      <div className="row mt-2">
        <div className="col-sm-5">
          <p className="font-weight-bold mb-0">Señas particulares:</p>
        </div>
        <div className="col-sm-7">
          {boletin.seniasParticulares === "" ||
          boletin.seniasParticulares === null
            ? "No indica"
            : boletin.seniasParticulares}
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-sm-5">
          <p className="font-weight-bold mb-0">Vestimenta:</p>
        </div>

        <div className="col-sm-7">
          {boletin.vestimenta === "" || boletin.vestimenta === null
            ? "No indica"
            : boletin.vestimenta}
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-sm-5">
          <p className="font-weight-bold mb-0">Nota:</p>
        </div>

        <div className="col-sm-7">
          {boletin.notas === "" || boletin.notas === null
            ? "No indica"
            : boletin.notas}
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-sm-5">
          <p className="font-weight-bold mb-0">Nombre del Padre:</p>
        </div>

        <div className="col-sm-7">
          {boletin.nombrePadre === "" || boletin.nombrePadre === null
            ? "No indica"
            : boletin.nombrePadre}
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-sm-5">
          <p className="font-weight-bold mb-0">Nombre de la Madre:</p>
        </div>

        <div className="col-sm-7">
          {boletin.nombreMadre === "" || boletin.nombreMadre === null
            ? "No indica"
            : boletin.nombreMadre}
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-sm-5">
          <p className="font-weight-bold mb-0">Responsable:</p>
        </div>

        <div className="col-sm-7">
          {boletin.responsable === "" || boletin.responsable === null
            ? "No indica"
            : boletin.responsable}
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-sm-5">
          <p className="font-weight-bold mb-0">Observaciones:</p>
        </div>

        <div className="col-sm-7">
          {boletin.observaciones === "" || boletin.observaciones === null
            ? "No indica"
            : boletin.observaciones}
        </div>
      </div>


    </Fragment>
  );
}

export { PreviewBulletin };