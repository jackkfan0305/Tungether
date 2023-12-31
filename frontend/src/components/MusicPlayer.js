import React from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious"

const MusicPlayer = (props) => {
  const songProgress = (props.time / props.duration) * 100;
  //const prevVotes = props.votes;

  const pauseSong = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };

    fetch("/spotify/pause", requestOptions);
  };

  const playSong = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };

    fetch("/spotify/play", requestOptions);
  };

  const skipSong = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    fetch("/spotify/skip", requestOptions);
  };

  const prevSong = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    fetch("/spotify/previous", requestOptions);
  }

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
            <IconButton onClick={() => {prevSong()}}>
            {props.votes_previous} / {" "}  
            {props.votes_required_previous}
              <SkipPreviousIcon>
              </SkipPreviousIcon>
              
            </IconButton>
            <IconButton onClick={()=>{props.is_playing ? pauseSong() : playSong()}}>
              {props.is_playing ? (
                <PauseIcon></PauseIcon>
              ) : (
                <PlayArrowIcon></PlayArrowIcon>
              )}
            </IconButton>
            <IconButton onClick={()=> {skipSong()}}>
              <SkipNextIcon></SkipNextIcon>
              {props.votes_skip} / {" "}
              {props.votes_required_skip}
            </IconButton>
          </div>
        </Grid>
      </Grid>
      <LinearProgress
        variant="determinate"
        value={songProgress}
      ></LinearProgress>
    </Card>
  );
};

export default MusicPlayer;
