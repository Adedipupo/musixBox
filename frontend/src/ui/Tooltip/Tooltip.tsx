import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles, Theme } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';

export default function TriggersTooltips(props: any) {
  const LightTooltip = withStyles((theme: Theme) => ({
    tooltip: {
      backgroundColor: '#2dceec',
      color: 'white',
      boxShadow: theme.shadows[1],
      fontSize: 14,
      width: 'fit-content',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      padding: 5,
    },
  }))(Tooltip);

  return (
    <div>
      <Grid item>
        <div>
          <LightTooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={props.handleTooltipClose}
            open={props.open}
            disableFocusListener
            disableTouchListener
            title={props.active ? props.activeTitle : props.inactiveTitle}
          >
            <div></div>
          </LightTooltip>
        </div>
      </Grid>
    </div>
  );
}
