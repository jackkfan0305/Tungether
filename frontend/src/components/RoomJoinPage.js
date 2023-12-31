import React, { Component, useState, useCallback, useEffect } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";

function RoomJoinPage() {
  const initialState = {
    roomCode: "",
    error: "",
  };
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState(initialState);

  const roomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomData.roomCode,
      }),
    };
    fetch("/api/join-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          navigate(`/room/${roomData.roomCode}`);
        } else {
          setRoomData({ ...roomData, error: "Room Not Found" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTextFieldChange = (e) => {
    setRoomData({ ...roomData, roomCode: e.target.value });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          error={roomData.error != ""} //expects a boolean, need to fix
          label="Code"
          placeholder="Enter a Room Code"
          value={roomData.roomCode}
          helperText={roomData.error}
          variant="outlined"
          onChange={handleTextFieldChange}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          commponent={Link}
          onClick={roomButtonPressed}
        >
          Enter Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}

export default RoomJoinPage;
