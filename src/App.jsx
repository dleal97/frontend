import "./App.css";
import { useEffect, useMemo, useState } from "react";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";
import axios from "axios";
import logoT from "./assets/logoT.png";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API_URL from "../environment.js";

function App() {
  const [timeOut, setTimeOut] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned] = useState("0 pts");
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();
  const username = location.state ? location.state.username : "";

  useEffect(() => {
    axios.get(`${API_URL}/questions`).then((response) => {
      setQuestions(response.data);
    });
  }, []);

  async function updateScore(username, nuevaPuntuacion) {
    try {
      await axios.put(`${API_URL}/end-game`, {
        username,
        newScore: nuevaPuntuacion,
      });
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  }

  async function handleRedirect(username, puntuacion) {
    const scoreNumber = parseInt(puntuacion.split(" ")[0], 10);
    return updateScore(username, scoreNumber).then(() =>
      navigate("/leaderboard", { state: { username } })
    );
  }

  /*
  const data = [
    {
      id: 1,
      question: "Rolex is a company that specializes in what type of product?",
      answers: [
        {
          text: "Phone",
          correct: false,
        },
        {
          text: "Watches",
          correct: true,
        },
        {
          text: "Food",
          correct: false,
        },
        {
          text: "Cosmetic",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "When did the website `Facebook` launch?",
      answers: [
        {
          text: "2004",
          correct: true,
        },
        {
          text: "2005",
          correct: false,
        },
        {
          text: "2006",
          correct: false,
        },
        {
          text: "2007",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "Who played the character of harry potter in movie?",
      answers: [
        {
          text: "Johnny Deep",
          correct: false,
        },
        {
          text: "Leonardo Di Caprio",
          correct: false,
        },
        {
          text: "Denzel Washington",
          correct: false,
        },
        {
          text: "Daniel Red Cliff",
          correct: true,
        },
      ],
    },
  ];
  */

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "100 pts" },
        { id: 2, amount: "200 pts" },
        { id: 3, amount: "300 pts" },
        { id: 4, amount: "500 pts" },
        { id: 5, amount: "1.000 pts" },
        { id: 6, amount: "2.000 pts" },
        { id: 7, amount: "4.000 pts" },
        { id: 8, amount: "8.000 pts" },
        { id: 9, amount: "16.000 pts" },
        { id: 10, amount: "32.000 pts" },
        { id: 11, amount: "64.000 pts" },
        { id: 12, amount: "125.000 pts" },
        { id: 13, amount: "250.000 pts" },
        { id: 14, amount: "500.000 pts" },
        { id: 15, amount: "1.000.000 pts" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber, moneyPyramid]);

  return (
    <>
      <div className="app">
        <div className="main">
          <div className="logo-header-interface">
            <img src={logoT} alt="UCOquiz logo" className="logo-interface" />
          </div>
          {timeOut ? (
            <div className="endGame">
              <h1 className="endText">Has ganado: {earned}</h1>
              <button
                className="toLeaderboard"
                onClick={() => handleRedirect(username, earned)}
              >
                Tabla de puntuaciones
              </button>
            </div>
          ) : (
            <>
              <div className="top">
                <div className="timer">
                  <Timer
                    setTimeOut={setTimeOut}
                    questionNumber={questionNumber}
                  />
                </div>
              </div>
              <div className="bottom">
                <Trivia
                  data={questions}
                  questionNumber={questionNumber}
                  setQuestionNumber={setQuestionNumber}
                  setTimeOut={setTimeOut}
                />
              </div>
            </>
          )}
        </div>
        <div className="pyramid">
          <ul className="moneyList">
            {moneyPyramid.map((m) => (
              <li
                className={
                  questionNumber === m.id
                    ? "moneyListItem  active"
                    : "moneyListItem"
                }
              >
                <span className="moneyListItemNumber">{m.id}</span>
                <span className="moneyListItemAmount">{m.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
