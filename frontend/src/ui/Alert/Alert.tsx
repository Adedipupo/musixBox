import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

type ALERT = 'success' | 'error';

interface Props {
  alertType: ALERT;
  alertMsg: string;
  open: boolean;
  onClose: () => void;
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedAlerts(props: Props) {
  const classes = useStyles();

  // const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  //   setOpenAlert(false);
  // };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Snackbar open={props.open} autoHideDuration={6000} onClose={() => props.onClose()}>
          <Alert onClose={() => props.onClose()} severity={props.alertType}>
            {props.alertMsg}
          </Alert>
        </Snackbar>
      </div>
    </React.Fragment>
  );
}
