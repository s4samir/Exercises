/*
 * Authored by Samir Kishore
 */
import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";

export default function ResultDialog({ result, onClose }) {
  const handleClose = () => {};
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={!!result}
    >
      <DialogTitle id="simple-dialog-title">{`Game ${result}`}</DialogTitle>
      <DialogActions>
        <Button autoFocus onClick={onClose} color="primary">
          Play again!!
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ResultDialog.propTypes = {
  result: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
