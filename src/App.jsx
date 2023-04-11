import "./App.css";
import { useEffect, useMemo, useState } from "react";
import Start from "./components/Start";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";
import axios from "axios";

function App() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [timeOut, setTimeOut] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned] = useState("$ 0");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/questions").then((response) => {
      console.log(response.data);
      setQuestions(response.data);
    });
  }, []);

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
        { id: 1, amount: "pts 100" },
        { id: 2, amount: "pts 200" },
        { id: 3, amount: "pts 300" },
        { id: 4, amount: "pts 500" },
        { id: 5, amount: "pts 1.000" },
        { id: 6, amount: "pts 2.000" },
        { id: 7, amount: "pts 4.000" },
        { id: 8, amount: "pts 8.000" },
        { id: 9, amount: "pts 16.000" },
        { id: 10, amount: "pts 32.000" },
        { id: 11, amount: "pts 64.000" },
        { id: 12, amount: "pts 125.000" },
        { id: 13, amount: "pts 250.000" },
        { id: 14, amount: "pts 500.000" },
        { id: 15, amount: "pts 1.000.000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber, moneyPyramid]);

  return (
    <div className="app">
      {!username || !password ? (
        <Start setUsername={setUsername} setPassword={setPassword} />
      ) : (
        <>
          <div className="main">
            {timeOut ? (
              <h1 className="endText">You earned: {earned}</h1>
            ) : (
              //-> Salto a leaderboard
              //-> Almaceno earned
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
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
