import React from 'react';
import {
  Snackbar,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { SNACKBAR_SHOW } from "../redux/actions/snackbarAction";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => {
  return <MuiAlert elevation={10} variant="standard" {...props} />;
};

const SnackBar = () => {
  const snackBar = useSelector((state) => state.snackBar);
  const dispatch = useDispatch();
  
  return(
    <div>
      <Snackbar
        open={snackBar.show}
        autoHideDuration={snackBar.data.duration}
        onClose={() => {
          dispatch(SNACKBAR_SHOW({ show: false, data:{ severity: "success", duration: 0, message: ""}}));
        }}
      >
        <Alert
          onClose={() => {
            dispatch(SNACKBAR_SHOW({ show: false, data:{ severity: "success", duration: 0, message: ""}}));
          }}
          severity={snackBar.data.severity}
        >
          {snackBar.data.message}
        </Alert>
      </Snackbar>
    </div>
  )
};

export default SnackBar;
