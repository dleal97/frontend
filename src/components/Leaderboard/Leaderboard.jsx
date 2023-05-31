//import Board from './components/Board';
import "./Style.css";
import React, { useState, useEffect } from "react";
import Profiles from "./Profiles";
import leaderboard from "../../assets/leaderboard.png";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../../App.css";

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [position, setPosition] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state ? location.state.username : "";

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/all")
      .then((response) => setUsers(response.data));
    axios
      .get(`http://localhost:3001/users/position?username=${username}`)
      .then((response) => setPosition(response.data.position));
  }, [username]);

  function handleClick() {
    return navigate("/login");
  }

  return (
    <div className="mainApp">
      <div className="mainBoard">
        <div className="logo-headerBoard">
          <img
            className="logo-leaderboard"
            src={leaderboard}
            alt="Logo in leaderboard"
          ></img>
        </div>
        <div className="board">
          <Profiles Leaderboard={users}></Profiles>
          <button className="Inicio" onClick={handleClick}>
            {" "}
            Volver al Inicio{" "}
          </button>
        </div>
        <div className="myPosition">
          <h1 className="positionText"> Tu posicion en la tabla: {position}</h1>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
