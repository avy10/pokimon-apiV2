import React from "react";
import { useEffect } from "react";
import BackgroundBody from "./Components/BackgroundBody.jsx";
import "./App.css";
import Header from "./Components/Header.jsx";
import Main from "./Components/Main.jsx";

export default function App() {
  useEffect(() => {
    const num = 126;
    let hours = Math.floor(num / 60);
    let minutes = num % 60;
    return `${hours}:${minutes}`;
    // console.log(`${hours}:${minutes}`);
  }, []);
  return (
    <>
      <BackgroundBody />
      <Header />
      <Main />
    </>
  );
}

/*  */
