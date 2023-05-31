import { useRef } from "react";
import logo from "../assets/logo.png";
import React from "react";
import "../App.css";
import { useNavigate } from "react-router";

export default function Start({ setUsername, setPassword }) {
  const inputRef = useRef();
  const inputRefPass = useRef();
  const navigate = useNavigate();

  const handleClick = () => {
    const username = inputRef.current.value;
    const password = inputRefPass.current.value;

    fetch(`http://localhost:3001/users/validate-user?username=${username}`)
      .then((response) => response.json())
      .then((data) => {
        if (data === true) {
          setUsername(username);
          setPassword(password);
        }
      });

    // if (username) {
    //   return navigate("/game");
    // }
    if (username) {
      return navigate("/game", { state: { username, password } });
    }
  };

  return (
    <div className="app">
      <div className="main">
        <div className="logo-header">
          <img src={logo} alt="Logo de UCOquiz" className="logo"></img>
        </div>
        <div className="start">
          <input className="startInput" placeholder="usuario" ref={inputRef} />
          <input
            className="passInput"
            placeholder="contraseña"
            ref={inputRefPass}
          />
          <button className="startButton" onClick={handleClick}>
            Comenzar
          </button>
        </div>
      </div>
    </div>
  );
}
