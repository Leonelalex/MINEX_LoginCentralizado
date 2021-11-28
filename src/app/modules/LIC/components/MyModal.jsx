/* eslint no-restricted-imports: ["error"] */
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

function MyModal({
  open,
  handleClose,
  title,
  children,
  handleSave,
  editMode,
  buttonTitle,
  width,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth={width || "md"}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {editMode && (
          <Button variant="contained" color="primary" onClick={handleSave}>
            {buttonTitle || "Guardar"}
          </Button>
        )}
        <Button variant="contained" onClick={handleClose}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export { MyModal };
