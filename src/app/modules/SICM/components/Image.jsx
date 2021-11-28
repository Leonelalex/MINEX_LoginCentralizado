import React from "react";
import "./style.css";
import { Modal } from "@material-ui/core/";
// eslint-disable-next-line no-restricted-imports
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop } from "@material-ui/core/";
import { Fade } from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Image({ url, handleClose }) {
  const classes = useStyles();

  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={true}>
        <img
          className="image"
          src={url}
          onClick={handleClose}
          alt="Sin Imagen"
        />
      </Fade>
    </Modal>
  );
}
export { Image };
