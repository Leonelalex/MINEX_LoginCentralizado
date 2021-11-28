/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import objectPath from "object-path";
import { useHtmlClassService } from "../../../_core/MetronicLayout";
import { toAbsoluteUrl } from "../../../../_helpers";
import Popover from "@material-ui/core/Popover";

export function UserProfileDropdown() {
  const user = useSelector((state) => state.auth.user);
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      light:
        objectPath.get(uiService.config, "extras.user.dropdown.style") ===
        "light",
    };
  }, [uiService]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      {user && (
        <div id="dropdown-toggle-user-profile">
          <div
            className={
              "btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2 mt-3"
            }
            aria-describedby={id}
            onClick={handleClick}
          >
            <span className="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3">
              {user.firstName} {user.lastName}
            </span>
            <span className="symbol symbol-35 symbol-light-success">
              <span className="symbol-label font-size-h5 font-weight-bold">
                {user.firstName[0]}
              </span>
            </span>
          </div>
        </div>
      )}
      {user && (
        <Popover
          className="p-0 m-0 dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl"
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <>
            {layoutProps.light && (
              <>
                <div className="d-flex align-items-center p-8 rounded-top">
                  <div className="symbol symbol-md bg-light-primary mr-3 flex-shrink-0">
                    <img
                      src={toAbsoluteUrl("/media/users/300_21.jpg")}
                      alt=""
                    />
                  </div>
                  <div className="text-dark m-0 flex-grow-1 mr-3 font-size-h5">
                    {user.firstname} {user.lastname}
                  </div>
                </div>
                <div className="separator separator-solid"></div>
              </>
            )}

            {!layoutProps.light && (
              <div
                className="d-flex align-items-center justify-content-between flex-wrap p-8 bgi-size-cover bgi-no-repeat rounded-top"
                style={{
                  backgroundImage: `url(${toAbsoluteUrl(
                    "/media/misc/bg-1.jpg"
                  )})`,
                }}
              >
                <div className="symbol bg-white-o-15 mr-3">
                  <span className="symbol-label text-success font-weight-bold font-size-h4">
                    {user.firstName[0]}
                  </span>
                </div>
                <div className="text-white m-0 flex-grow-1 mr-3 font-size-h5">
                  {user.firstName} {user.lastName}
                </div>
              </div>
            )}
          </>

          <div className="navi navi-spacer-x-0 pt-5">
            <Link
              to="/user-profile"
              className="navi-item px-8 cursor-pointer"
              onClick={handleClose}
            >
              <div className="navi-link">
                <div className="navi-icon mr-2">
                  <i className="flaticon2-calendar-3 text-success" />
                </div>
                <div className="navi-text">
                  <div className="font-weight-bold cursor-pointer">
                    Mi Perfil
                  </div>
                  <div className="text-muted">Ver información de la cuenta</div>
                </div>
              </div>
            </Link>

            {/* <a className="navi-item px-8">
              <div className="navi-link">
                <div className="navi-icon mr-2">
                  <i className="flaticon2-mail text-warning"></i>
                </div>
                <div className="navi-text">
                  <div className="font-weight-bold">Mensajes</div>
                  <div className="text-muted">Mensajes y tareas</div>
                </div>
              </div>
            </a> */}
            <div className="navi-separator mt-3"></div>
            <div className="navi-footer  px-8 py-5">
              <Link
                to="/logout"
                className="btn btn-light-primary font-weight-bold"
              >
                Cerrar sesión
              </Link>
            </div>
          </div>
        </Popover>
      )}
    </div>
  );
}
