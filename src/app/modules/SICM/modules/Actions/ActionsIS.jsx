import React, { useState, useEffect } from "react";
import {
  CardHeader,
  Grid,
  IconButton,
  CardContent,
  Tooltip,
} from "@material-ui/core";
import { Card } from "../../../../../_metronic/_partials/controls/Card";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { MenuItem } from "@material-ui/core/";
import { Menu } from "@material-ui/core/";
import { Button } from "@material-ui/core/";
import { Dialog } from "@material-ui/core/";
import { DialogActions } from "@material-ui/core/";
import { DialogContent } from "@material-ui/core/";
import { Notificar, Difundir, EditDifundir } from "./";
import { PreviewAlert } from "../../components";
import { alertState } from "../../../../../constants/SICM";

function ActionsIS({ formData, alert, closeMenu, open, ocultar = false }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const [actions, setActions] = useState([
    { name: "Notificar", code: "NOT", component: Notificar },
  ]);
  const [currentAction, setCurrentAction] = useState(actions[0]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (index) => {
    setCurrentAction(actions[index]);
    handleClose();
  };

  useEffect(() => {
    if (alert.estadoAlerta === alertState.REGISTRADA && !ocultar) {
      setActions([
        ...actions,
        { name: "Difundir", code: "DI", component: Difundir },
      ]);
    } else if (!ocultar && alert.estadoAlerta !== alertState.REGISTRADA) {
      setActions([
        ...actions,
        { name: "Editar Difusión", code: "EDI", component: EditDifundir },
      ]);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Dialog open={open} onClose={closeMenu} fullWidth={true} maxWidth="md">
      <DialogContent>
        <Card>
          <CardHeader
            action={
              <>
                <Tooltip title="Acciones">
                  <IconButton aria-label="settings" onClick={handleMenu}>
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  keepMounted
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  open={isOpen}
                  onClose={handleClose}
                >
                  {actions.map((action, index) => (
                    <MenuItem
                      key={action.code}
                      onClick={(e) => {
                        handleAction(index);
                      }}
                    >
                      {action.name}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            }
            title="Seguimiento de Alerta Isabel-Claudina"
          />
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <PreviewAlert alert={alert} formData={formData} />
              </Grid>
              <Grid item xs={12} sm={6}>
                {currentAction && (
                  <currentAction.component
                    codigo={alert.codigo}
                    closeMenu={closeMenu}
                    formData={formData}
                    alert={alert}
                  />
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={closeMenu}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export { ActionsIS };
