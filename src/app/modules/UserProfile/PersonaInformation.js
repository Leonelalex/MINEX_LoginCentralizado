import React from "react";
import { useSelector, shallowEqual, connect } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

function PersonaInformation(props) {
  const user = useSelector((state) => state.auth.user, shallowEqual);

  // UI Helpers
  const initialValues = {
    firstname: user.firstName,
    lastName: user.lastName,
    companyName: user.companyName,
    phoneNumber: user.phoneNumber,
    email: user.email,
    jobTitle: user.jobTitle,
    department: user.department,
    city: user.city,
    state: user.state,
    country: user.country,
  };

  const Schema = Yup.object().shape({
    pic: Yup.string(),
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    companyName: Yup.string(),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string()
      .email("Wrong email format")
      .required("Email is required"),
    website: Yup.string(),
  });
  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };
  const formik = useFormik({
    initialValues,
    validationSchema: Schema,
  });

  return (
    <form className="card card-custom card-stretch">
      <div className="card-header py-3">
        <div className="card-title align-items-start flex-column">
          <h3 className="card-label font-weight-bolder text-dark">
            Informacion Personal
          </h3>
        </div>
      </div>
      <div className="form">
        <div className="card-body">
          <div className="row">
            <label className="col-xl-3"></label>
            <div className="col-lg-9 col-xl-6">
              <h5 className="font-weight-bold mb-6">Informacion General</h5>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">Nombres</label>
            <div className="col-lg-9 col-xl-6">
              <input
                type="text"
                placeholder="First name"
                className={`form-control form-control-lg form-control-solid ${getInputClasses(
                  "firstname"
                )}`}
                name="firstname"
                {...formik.getFieldProps("firstname")}
                disabled
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              Apellidos
            </label>
            <div className="col-lg-9 col-xl-6">
              <input
                type="text"
                placeholder="Last name"
                className={`form-control form-control-lg form-control-solid ${getInputClasses(
                  "lastName"
                )}`}
                name="lastName"
                {...formik.getFieldProps("lastName")}
                disabled
              />
            </div>
          </div>
          <div className="row">
            <label className="col-xl-3"></label>
            <div className="col-lg-9 col-xl-6">
              <h5 className="font-weight-bold mt-10 mb-6">
                Informacion de contacto
              </h5>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">Telefono</label>
            <div className="col-lg-9 col-xl-6">
              <div className="input-group input-group-lg input-group-solid">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-phone"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className={`form-control form-control-lg form-control-solid ${getInputClasses(
                    "phone"
                  )}`}
                  name="phone"
                  {...formik.getFieldProps("phoneNumber")}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">Correo</label>
            <div className="col-lg-9 col-xl-6">
              <div className="input-group input-group-lg input-group-solid">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-at"></i>
                  </span>
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  className={`form-control form-control-lg form-control-solid ${getInputClasses(
                    "email"
                  )}`}
                  name="email"
                  {...formik.getFieldProps("email")}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">Puesto</label>
            <div className="col-lg-9 col-xl-6">
              <input
                type="text"
                className={`form-control form-control-lg form-control-solid`}
                {...formik.getFieldProps("jobTitle")}
                disabled
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              Dirección
            </label>
            <div className="col-lg-9 col-xl-6">
              <input
                type="text"
                className={`form-control form-control-lg form-control-solid`}
                {...formik.getFieldProps("department")}
                disabled
              />
            </div>
          </div>
          <div className="row">
            <label className="col-xl-3"></label>
            <div className="col-lg-9 col-xl-6">
              <h5 className="font-weight-bold mt-10 mb-6">Ubicación</h5>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">País</label>
            <div className="col-lg-9 col-xl-6">
              <input
                type="text"
                className={`form-control form-control-lg form-control-solid`}
                {...formik.getFieldProps("country")}
                disabled
              />
            </div>
          </div>{" "}
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">Estado</label>
            <div className="col-lg-9 col-xl-6">
              <input
                type="text"
                className={`form-control form-control-lg form-control-solid`}
                {...formik.getFieldProps("state")}
                disabled
              />
            </div>
          </div>{" "}
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">Ciudad</label>
            <div className="col-lg-9 col-xl-6">
              <input
                type="text"
                className={`form-control form-control-lg form-control-solid`}
                {...formik.getFieldProps("city")}
                disabled
              />
            </div>
          </div>
        </div>
        {/* end::Body */}
      </div>
      {/* end::Form */}
    </form>
  );
}

export default connect(null, null)(PersonaInformation);
