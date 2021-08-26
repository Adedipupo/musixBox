import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
// import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Loader from '../Loader/Loader';

interface Props {
  open: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })
);
const BackdropRoller = (props: Props) => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={props.open}>
      <Loader />
    </Backdrop>
  );
};

export default BackdropRoller;
