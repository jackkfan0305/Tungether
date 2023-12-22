import React, {Component} from 'react';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import Room from "./Room";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";


export default class HomePage extends Component{
    constructor(props){
        super(props);
    }
    
    render() {
        return (
          <Router>
            <Routes>
              <Route exact path="/">
                
              </Route>
              <Route exact path="/join" element={<RoomJoinPage/>} />
              <Route exact path="/create" element={<CreateRoomPage/>} />
              <Route exact path="/room/:roomCode" element={<Room/>}></Route>
            </Routes>
          </Router>
        );
      }
}