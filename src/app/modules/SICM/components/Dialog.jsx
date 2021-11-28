import React from "react";
import { Button } from "@material-ui/core/";
import { Dialog } from "@material-ui/core/";
import { DialogActions } from "@material-ui/core/";
import { DialogTitle } from "@material-ui/core/";

function AlertDialog({ isOpen, confirm, disagree }) {

  return (
    <Dialog
      open={isOpen}
      onClose={disagree}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"¿Desea eliminar el elemento?"}
      </DialogTitle>
      <DialogActions>
        <Button onClick={disagree} color="default">
          Cancelar
        </Button>
        <Button onClick={confirm} style={{ color: "red" }} autoFocus>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export { AlertDialog };
