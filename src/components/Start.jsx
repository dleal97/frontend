import { useRef } from "react";
import logo from "../assets/logo.png";

export default function Start({ setUsername, setPassword }) {
  const inputRef = useRef();
  const inputRefPass = useRef();

  const handleClick = () => {
    inputRef.current.value && setUsername(inputRef.current.value);
    inputRefPass.current.value && setPassword(inputRefPass.current.value);
  };

  return (
    <div className="main">
      <div className="logo-header">
        <img src={logo} alt="Logo de UCOquiz" className="logo"></img>
      </div>
      <div className="start">
        <input className="startInput" placeholder="username" ref={inputRef} />
        <input
          className="passInput"
          placeholder="password"
          ref={inputRefPass}
        />
        <button className="startButton" onClick={handleClick}>
          Comenzar
        </button>
      </div>
    </div>
  );
}
