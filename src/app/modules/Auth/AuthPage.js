/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, Switch, Redirect } from "react-router-dom";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";
import { ContentRoute } from "../../../_metronic/layout";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import "../../../_metronic/_assets/sass/pages/login/classic/login-1.scss";
import { LanguageSelectorDropdown } from "../../../_metronic/layout/components/extras/dropdowns/LanguageSelectorDropdown";
import { FormattedMessage } from "react-intl";

export function AuthPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div
          className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white"
          id="kt_login"
        >
          <div
            className="login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-10"
            style={{
              backgroundImage: `url(${toAbsoluteUrl("/media/apps/bg.jpg")})`,
            }}
          >
            <div className="d-flex flex-row-fluid flex-column justify-content-between">
              <Link to="/" className="flex-column-auto mt-5 pb-lg-0 pb-10">
                <img
                  alt="Logo"
                  className="max-h-100px img-fluid"
                  src={toAbsoluteUrl("/media/apps/logo.svg")}
                />
              </Link>
              <div className="flex-column-fluid d-flex flex-column justify-content-center">
                <h3 className="font-size-h1 mb-5 text-white">
                  <FormattedMessage id="AUTH.HOME.TITLE" />
                </h3>
                <p className="font-weight-lighter text-white opacity-80">
                  <FormattedMessage id="AUTH.HOME.APPNAME" />
                </p>
                <img
                  alt="Logo"
                  className="img-fluid mt-10"
                  src={toAbsoluteUrl("/media/apps/mapa.png")}
                />
              </div>
              <div className="d-none flex-column-auto d-lg-flex justify-content-between">
                <div className="opacity-70 font-weight-bold	text-white">
                  <p>
                    Copyright &copy; {new Date().getFullYear()} Ministerio de
                    Relaciones Exteriores - All Rights Reserved
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column flex-row-fluid position-relative p-7 overflow-hidden">
            <div className="text-right">
              <LanguageSelectorDropdown />
            </div>
            <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
              <Switch>
                <ContentRoute path="/auth/login" component={Login} />
                <ContentRoute
                  path="/auth/forgot-password"
                  component={ForgotPassword}
                />
                <Redirect from="/auth" exact={true} to="/auth/login" />
                <Redirect to="/auth/login" />
              </Switch>
            </div>
            <div className="d-flex d-lg-none flex-column-auto flex-column flex-sm-row justify-content-between align-items-center mt-5 p-5">
              <div className="text-dark-50 font-weight-bold order-2 order-sm-1 my-2">
                <p>
                  Copyright &copy; {new Date().getFullYear()} Ministerio de
                  Relaciones Exteriores - All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
