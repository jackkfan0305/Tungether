import React from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow"
import PauseIcon from "@material-ui/icons/Pause"
import SkipNextIcon from "@material-ui/icons/SkipNext"

const MusicPlayer = (props) => {
const songProgress = (props.time/props.duration) * 100;

  return (
    <Card>
      <Grid container alignItems="center">
        <Grid item align="center" xs={4}>
          <img src={props.image_url} height="100%" width="100%"></img>
        </Grid>
        <Grid item align="center" xs={8}>
          <Typography component="h5" variant="h5">
            {props.title}
          </Typography>
          <Typography color="textSecondary" component="h5" variant="subtitle1">
            {props.artist}
          </Typography>
          <div>
            <IconButton>
              {props.is_playing ? (
                <PauseIcon></PauseIcon>
              ) : (
                <PlayArrowIcon></PlayArrowIcon>
              )}
            </IconButton>
            <IconButton>
              <SkipNextIcon></SkipNextIcon>
            </IconButton>
          </div>
        </Grid>
      </Grid>
      <LinearProgress variant="determinate" value={songProgress}></LinearProgress>
    </Card>
  );
};

export default MusicPlayer;