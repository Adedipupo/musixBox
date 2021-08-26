import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import { PropTypes } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > span': {
        margin: theme.spacing(2),
      },
    },
  })
);

interface Props {
  color?: PropTypes.Color | 'action' | 'disabled';
  name: string;
  fontSize?: 'inherit' | 'default' | 'small' | 'large';
}

export default function Icons(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Icon fontSize={props.fontSize} color={props.color}>
        {props.name}
      </Icon>
    </div>
  );
}
