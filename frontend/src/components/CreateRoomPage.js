import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link, useNavigate } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Collapse } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

function CreateRoomPage(props) {
  const defaultProps = {
    votesToSkip: props.votesToSkip ? props.votesToSkip : 2,
    guestCanPause: props.guestCanPause ? props.guestCanPause : true,
    update: false,
    roomCode: null,
    updateCallback: () => {
      props.updateCallback() ? props.updateCallback() : () => {};
    },
    errorMsg: "",
    successMsg: "",
  };

  //props.votesToSkip ? props.votesToSkip : 2,

  const navigate = useNavigate();

  // const [guestCanPause, setguestCanPause] = useState(defaultProps.guestCanPause);
  // const [votesToSkip, setvotesToSkip] = useState(defaultProps.votesToSkip);

  const [state, setState] = useState(defaultProps);

  const handleVotesChange = () => {
    setState({ ...state, votesToSkip: event.target.value });
  };

  const handleGuestCanPauseChange = () => {
    setState({
      ...state,
      guestCanPause: event.target.value === "true" ? true : false,
    });
    // setguestCanPause(event.target.value === "true" ? true : false);
  };

  const handleRoomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: state.votesToSkip,
        guest_can_pause: state.guestCanPause,
      }),
    };

    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => navigate("/room/" + data.code));
  };

  const handleUpdateButtonPressed = () => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: state.votesToSkip,
        guest_can_pause: state.guestCanPause,
        code: props.roomCode,
      }),
    };

    fetch("/api/update-room", requestOptions).then((response) => {
      if (response.ok) {
        setState({ ...state, successMsg: "Room Updated Successfully!" });
      } else {
        setState({ ...state, errorMsg: "Error updating room..." });
      }
      props.updateCallback();
    });
  };

  const renderCreateButtons = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handleRoomButtonPressed}
          >
            Create A Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  };

  const renderUpdateButtons = () => {
    return (
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={handleUpdateButtonPressed}
        >
          Update Room
        </Button>
      </Grid>
    );
  };

  const title = props.update ? "Update Room" : "Create a Room";
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Collapse in={state.errorMsg != "" || state.successMsg != ""}>
          {state.successMsg != "" ? (
            <Alert
              severity="success"
              onClose={() => {
                setState({
                  ...state,
                  successMsg: "",
                });
              }}
            >
              {state.successMsg}
            </Alert>
          ) : (
            <Alert
              severity="error"
              onClose={() => {
                setState({
                  ...state,
                  errorMsg: "",
                });
              }}
            >
              {state.errorMsg}
            </Alert>
          )}
        </Collapse>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText component={"div"}>
            <div align="center">Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue={defaultProps.guestCanPause.toString()}
            onChange={handleGuestCanPauseChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type="number"
              onChange={handleVotesChange}
              defaultValue={state.votesToSkip}
              inputProps={{
                min: 1,
                style: { textAlign: "center" },
              }}
            />
            <FormHelperText component={"div"}>
              <div align="center">Votes Required To Skip Song</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        {props.update ? renderUpdateButtons() : renderCreateButtons()}
      </Grid>
    </Grid>
  );
}

export default CreateRoomPage;
