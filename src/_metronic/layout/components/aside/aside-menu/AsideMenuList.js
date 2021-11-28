/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import { userActions } from "../../../../../actions";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu &&
          "menu-item-active"} menu-item-open menu-item-not-hightlighted`
      : "";
  };

  function loadingMenu() {
    dispatch(userActions.setTokenRequest());
  }

  return (
    <>
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        <li
          className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Home.svg")} />
            </span>
            <span className="menu-text">Inicio</span>
          </NavLink>
        </li>

        <li className="menu-section ">
          <h4 className="menu-text">Aplicaciones</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        {/* <li
          className={`menu-item ${getMenuItemActive("/user-profile", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/user-profile">
            <span className="svg-icon menu-icon">
              <SVG
                src={toAbsoluteUrl(
                  "/media/svg/icons/Communication/Add-user.svg"
                )}
              />
            </span>
            <span className="menu-text">Perfil de Usuario</span>
          </NavLink>
        </li> */}
        <li
          className={`menu-item menu-item-submenu ${getMenuItemActive(
            "/error",
            true
          )}`}
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/error">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")} />
            </span>{" "}
            <span className="menu-text">Aplicaciones</span>
            <i className="menu-arrow" />
          </NavLink>
          <div className="menu-submenu ">
            <i className="menu-arrow" />
            <ul className="menu-subnav">
              <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Aplicaciones</span>
                </span>
              </li>
              {user &&
                user.sistems.map((sistem) => {
                  return (
                    <li
                      className={`menu-item ${getMenuItemActive(
                        "/" + sistem.siglas
                      )}`}
                      aria-haspopup="true"
                      key={sistem.siglas}
                    >
                      <NavLink
                        className="menu-link"
                        to={`/${sistem.siglas}`}
                        onClick={loadingMenu}
                      >
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">{sistem.sistema}</span>
                      </NavLink>
                    </li>
                  );
                })}
            </ul>
          </div>
        </li>

        <li className="menu-item" aria-haspopup="true">
          <NavLink className="menu-link" to="/logout">
            <span className="svg-icon menu-icon">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Navigation/Sign-out.svg")}
              />
            </span>
            <span className="menu-text">Cerrar Sesión</span>
          </NavLink>
        </li>
      </ul>
    </>
  );
}
