import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import "../Styles/backgroundBody.css";

// "https://raw.githubusercontent.com/avy10/assestsForNSReactProjects/main/pokedex/backgroundImages/pokemon-1513925_1920.jpg",
const backgroundImages = [
  "https://raw.githubusercontent.com/avy10/assestsForNSReactProjects/main/pokedex/backgroundImages/bulbasaur-7400820_1920.jpg",
  "https://raw.githubusercontent.com/avy10/assestsForNSReactProjects/main/pokedex/backgroundImages/pokemon-1624022_1920.jpg",
  "https://raw.githubusercontent.com/avy10/assestsForNSReactProjects/main/pokedex/backgroundImages/pokeball-5128709_1920.jpg",
  "https://raw.githubusercontent.com/avy10/assestsForNSReactProjects/main/pokedex/backgroundImages/pexels-abhishek-rana-4188296.jpg",
  "https://raw.githubusercontent.com/avy10/assestsForNSReactProjects/main/pokedex/backgroundImages/pokemon-4771238_1920.jpg",
  "https://raw.githubusercontent.com/avy10/assestsForNSReactProjects/main/pokedex/backgroundImages/toys-5353951_1920.jpg",
];

export default function BackgroundBody() {
  const [index, setIndex] = useState(0);
  let keyInt = setInterval(() => {
    clearInterval(keyInt);
    setIndex((prev) => (prev + 1) % backgroundImages.length);
  }, 15000);
  return ReactDOM.createPortal(
    <>
      <div className="backgroundBody">
        <img src={backgroundImages[index]} />
      </div>
      <div
        className="backgroundOverlay"
      ></div>
    </>,
    document.body,
  );
}
