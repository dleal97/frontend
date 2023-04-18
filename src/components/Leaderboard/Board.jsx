import React, { useState } from "react";
import Profiles from "./Profiles";
import { Leaderboard } from "./Database";
import leaderboard from "../assets/leaderboard.png";

export default function Board() {
  const [period, setPeriod] = useState(0);

  /*
  const handleClick = (e) => {
     
    setPeriod(e.target.dataset.id)
  }
  */

  return (
    <div className="main">
      <div className="logo-header">
        <img className="logo-leaderboard" src={leaderboard} alt="Logo in leaderboard"></img>
      </div>
      <div className="board">
        <Profiles Leaderboard={between(Leaderboard, period)}></Profiles>
        <button className="Inicio"> Volver al Inicio </button>
      </div>
    </div>
  );
} 

function between(data, between) {
  const today = new Date();
  const previous = new Date(today);
  previous.setDate(previous.getDate() - (between + 1));

  let filter = data.filter((val) => {
    let userDate = new Date(val.dt);
    if (between === 0) return val;
    return previous <= userDate && today >= userDate;
  });

  // sort with asending order
  return filter.sort((a, b) => {
    if (a.score === b.score) {
      return b.score - a.score;
    } else {
      return b.score - a.score;
    }
  });
}
