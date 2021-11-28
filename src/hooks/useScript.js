import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userService } from "../services";
import { SYSTEMS } from "../constants";
import { userActions } from "../actions";

const useScript = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let url = `${id}.bundle.js`;
    let script = null;
    async function getToken() {
      try {
        const sistems = await userService.getToken(SYSTEMS[id]);
        dispatch(userActions.setSubMenus(sistems[0].hijos || []));
        script = document.createElement("script");
        script.src = `/${url}`;
        script.async = true;
        document.body.appendChild(script);
      } catch (error) {
        console.log(error);
      }
    }

    getToken();
    return () => {
      if (script !== null) document.body.removeChild(script);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
};

export { useScript };
