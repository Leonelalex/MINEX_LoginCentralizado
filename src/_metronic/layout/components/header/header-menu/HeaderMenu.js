/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { checkIsActive } from "../../../../_helpers";
import { useHistory } from "react-router-dom";

function Menu({ nombre, url, icono_menu, hijos, layoutProps }) {
  const location = useLocation();
  const history = useHistory();

  const getMenuItemActive = (url) => {
    return checkIsActive(location, url) ? "menu-item-active" : "";
  };

  return hijos && hijos.length > 0 ? (
    <li
      data-menu-toggle={layoutProps.menuDesktopToggle}
      className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive(
        url
      )}`}
    >
      <a className="menu-link menu-toggle">
        <span className="menu-text">{nombre}</span>
        <i className="menu-arrow"></i>
      </a>
      <div className="menu-submenu menu-submenu-classic menu-submenu-left">
        <ul className="menu-subnav">
          {hijos.map((hijo) => (
            <Menu
              key={hijo.code}
              nombre={hijo.nombre}
              url={hijo.url}
              icono_menu={hijo.icono_menu}
              hijos={hijo.hijos}
              layoutProps={layoutProps}
            />
          ))}
        </ul>
      </div>
    </li>
  ) : (
    <li className={`menu-item menu-item-rel`}>
      <a
        href={url}
        className="menu-link"
        onClick={(e) => {
          e.preventDefault();
          history.push("/" + url);
        }}
      >
        <span className="menu-text">{nombre}</span>
      </a>
    </li>
  );
}

export function HeaderMenu({ layoutProps }) {
  const submenus = useSelector((state) => state.user.submenus);

  return (
    <div
      id="kt_header_menu"
      className={`header-menu header-menu-mobile ${layoutProps.ktMenuClasses}`}
      {...layoutProps.headerMenuAttributes}
    >
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {submenus &&
          submenus.map((submenu, index) => (
            <Menu
              key={"Submenu" + index}
              nombre={submenu.nombre}
              url={submenu.url}
              hijos={submenu.hijos}
              layoutProps={layoutProps}
            />
          ))}
      </ul>
    </div>
  );
}
