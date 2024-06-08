import react from "react";
import { useState, useEffect } from "react";
import ApiCaller from "./ApiCaller.jsx";
import Spinner from "./Spinner";

import Modal from "./Modal.jsx";
import "../Styles/cards.css";
import "../Styles/buttonCustomStyle.css";
import "../Styles/backgroundForPokis.css";
export default function Cards({ pokimons, isLoading }) {
  const [showModal, setShowModal] = useState(false);
  const [singlePokimon, setSinglePokimon] = useState([]);

  function handleKnowMoreClick(ele) {
    setShowModal((prev) => !prev);
    setSinglePokimon(ele);
  }

  return (
    <>
      {isLoading && <Spinner />}

      <div className="cardContainer">
        {pokimons.map((ele) => (
          <div className={`card ${ele.types[0].type.name}`} key={ele.id}>
            <div className={`pokeID ${ele.types[0].type.name}`}>#{ele.id}</div>
            <div className="pokeImage">
              <img src={ele.image} />
            </div>
            <h1 className="pokeName">{ele.name}</h1>
            <p className="pokeType">
              Type:{" "}
              {ele.types[0].type.name.charAt(0).toUpperCase() +
                ele.types[0].type.name.slice(1)}
            </p>
            <div className="knowMoreBTN">
              <button
                className={`btn btn-4 hover-border-7`}
                onClick={() => handleKnowMoreClick(ele)}
              >
                <span className={`${ele.types[0].type.name}BTN`}>
                  Know More...
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <Modal data={singlePokimon} handleKnowMoreClick={handleKnowMoreClick} />
      )}
    </>
  );
}
