import { useRef } from "react";

export default function Start({ setUsername }) {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.value && setUsername(inputRef.current.value);
  };

  return (
    <div className="start">
      <input
        className="startInput"
        placeholder="nombre de usuario"
        ref={inputRef}
      />
      <button className="startButton" onClick={handleClick}>
        Comenzar
      </button>
    </div>
  );
}
