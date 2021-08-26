import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import useMusicPlayer from '../../../hooks/useMusicPlayer';

interface Props {
  isVolume?: boolean;
  value: number;
  handleChange?: (e: any) => void;
  onScrub?: (e: number) => void;
}
const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: '500px',
  },
});

export default function ContinuousSlider(props: Props) {
  const { audio } = useMusicPlayer();
  const classes = useStyles();
  const [value, setValue] = React.useState<number>(audio.current.volume * 100);
  React.useEffect(() => {
    setValue(audio.current.volume * 100);
  }, [audio, audio.current.volume]);
  const handleChange = (event: any, newValue: number | number[]) => {
    if (typeof newValue === 'number') props.handleChange?.(newValue / 100);
    setValue(newValue as number);
  };

  return (
    <div className={classes.root}>
      {props.isVolume ? (
        <Grid container spacing={2}>
          <Grid item>
            <VolumeDown />
          </Grid>
          <Grid item xs>
            <Slider value={value} onChange={handleChange} aria-labelledby='continuous-slider' />
          </Grid>
          <Grid item>
            <VolumeUp />
          </Grid>
        </Grid>
      ) : (
        <Slider value={props.value} step={0.01} onChange={handleChange} aria-labelledby='continuous-slider' />
      )}
    </div>
  );
}
