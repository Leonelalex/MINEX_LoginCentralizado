/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import clsx from "clsx";
import { toAbsoluteUrl } from "../../../../_helpers";
import { useLang, setLanguage } from "../../../../i18n";
import Popover from "@material-ui/core/Popover";

const languages = [
  {
    lang: "en",
    name: "English",
    flag: toAbsoluteUrl("/media/svg/flags/226-united-states.svg"),
  },
  {
    lang: "es",
    name: "Español",
    flag: toAbsoluteUrl("/media/svg/flags/098-guatemala.svg"),
  },
];

export function LanguageSelectorDropdown() {
  const lang = useLang();
  const currentLanguage = languages.find((x) => x.lang === lang);
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
      <div
        className="btn btn-icon btn-clean btn-dropdown btn-lg mr-1 mt-3"
        aria-describedby={id}
        onClick={handleClick}
      >
        <img
          className="h-25px w-25px rounded"
          src={currentLanguage.flag}
          alt={currentLanguage.name}
        />
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <ul className="navi navi-hover py-4">
          {languages.map((language) => (
            <li
              key={language.lang}
              className={clsx("navi-item", {
                active: language.lang === currentLanguage.lang,
              })}
            >
              <a
                href="#"
                onClick={() => setLanguage(language.lang)}
                className="navi-link"
              >
                <span className="symbol symbol-20 mr-3">
                  <img src={language.flag} alt={language.name} />
                </span>
                <span className="navi-text">{language.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </Popover>
    </div>
  );
}
