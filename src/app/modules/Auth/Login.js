import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormattedMessage, injectIntl } from "react-intl";
import { userActions } from "../../../actions/";
import { connect } from "react-redux";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";

const initialValues = {
  email: "",
  password: "",
};

function Login({ intl, dispatch, auth }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(
        intl.formatMessage({
          id: "AUTH.VALIDATION.EMAIL",
        })
      )
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    password: Yup.string().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD",
      })
    ),
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
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      dispatch(userActions.login(values.email, values.password));
    },
  });

  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      <div className="text-center mb-10 mb-lg-20 logo_login">
        <img
          alt="Logo"
          className="max-h-100px img-fluid"
          src={toAbsoluteUrl("/media/apps/logo.png")}
        />
      </div>
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.LOGIN.TITLE" />
        </h3>
        <p className="text-muted font-weight-bold">
          <FormattedMessage id="AUTH.LOGIN.SUBTITLE" />
        </p>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework"
      >
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder={intl.formatMessage({
              id: "AUTH.INPUT.EMAIL",
              defaultMessage: "Correo",
            })}
            type="email"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "email"
            )}`}
            name="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group fv-plugins-icon-container">
          <div className="input-group" id="show_hide_password">
            <input
              placeholder={intl.formatMessage({
                id: "AUTH.INPUT.PASSWORD",
                defaultMessage: "Contraseña",
              })}
              type={showPassword ? "text" : "password"}
              className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                "password"
              )}`}
              name="password"
              {...formik.getFieldProps("password")}
            />
            <div className="input-group-addon h-auto py-5">
              <i
                className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"}
                onClick={(e) => {
                  setShowPassword(!showPassword);
                }}
              />
            </div>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
          <Link
            to="/auth/forgot-password"
            className="text-dark-50 text-hover-primary my-3 mr-2"
            id="kt_login_forgot"
          >
            <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
          </Link>
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={auth.loading}
            className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
          >
            <span>
              <FormattedMessage id="AUTH.GENERAL.LOGIN_BUTTON" />
            </span>
            {auth.loading && (
              <span className="ml-3 spinner spinner-white"></span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

const mapStateProps = function(state) {
  return {
    auth: state.auth,
  };
};

export default injectIntl(connect(mapStateProps)(Login));
