import React, { useState, useEffect } from "react";
import Profiles from "./Profiles";
import leaderboard from "../../assets/leaderboard.png";
import axios from "axios";
import { useNavigate } from "react-router";
import "../../App.css";

export default function Board({ username }) {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/users/all").then((response) => setUsers(response.data));
    axios.get("http://localhost:3001/users/position").then((response) => setUsers(response.data));
  }, []);

  function handleClick() {
    return navigate("/login");
  }

  return (
    <div className="mainBoard">
      <div className="logo-headerBoard">
        <img className="logo-leaderboard" src={leaderboard} alt="Logo in leaderboard"></img>
      </div>
      <div className="board">
        <Profiles Leaderboard={users}></Profiles>
        <button className="Inicio" onClick={handleClick}> Volver al Inicio </button>
      </div>
      <div className="myPosition">
        <h1 className="positionText"> Tu posicion en la tabla: </h1>
      </div>
    </div>
  );
} 

