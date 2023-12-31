import React, { Component, useEffect, useState } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

function HomePage() {
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    async function userInRoom() {
      fetch("/api/user-in-room")
        .then((response) => response.json())
        .then((data) => {
          setRoomCode(data.code);
        });
    }
    userInRoom();
  }, []);

  function handleCallBack(){
    setRoomCode(null)
  }

  function renderHomePage() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            Tungether
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/join" component={Link}>
              Join A Room
            </Button>
            <Button color="secondary" to="/create" component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            roomCode ? (<Navigate to={`/room/${roomCode}`} />) : renderHomePage()
          }
        />
        <Route exact path="/join" element={<RoomJoinPage />} />
        <Route exact path="/create" element={<CreateRoomPage />} />
        <Route path="/room/:roomCode" element={<Room parentCallBack={handleCallBack}></Room>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default HomePage;
