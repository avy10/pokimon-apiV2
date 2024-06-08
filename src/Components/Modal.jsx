import React from "react";
import ReactDOM from "react-dom";
import "../Styles/modal.css";
export default function Modal({ data, handleKnowMoreClick }) {
  return ReactDOM.createPortal(
    <>
      <div className={`avyy ${data.type}`}>
        <div className="leftCard">
          <div className="leftImgContainer">
            <img src={data.image} />
          </div>
          <div className="name">
            <p>{data.name}</p>
          </div>
        </div>
        <div className={`rightCard ${data.type}`}>
          <RightCardLeft weight={data.weight} height={data.height} />
          <RightCardCenter arr={data.stats} />
          <RightCardRight arr={data.stats} />
        </div>
        <button
          className={`closeBTN ${data.type}BTN`}
          onClick={() => handleKnowMoreClick([])}
        >
          X
        </button>
      </div>

      <div
        className="avyoverlay"
        onClick={(event) => event.stopPropagation()}
      ></div>
    </>,
    document.body,
  );
}

function RightCardLeft({ weight, height }) {
  return (
    <div className="rightCardLeft">
      <div className="contentWrap">
        <h2 className="key">Weight:</h2>
        <p className="value">{weight}</p>
      </div>
      <div className="contentWrap">
        <h2 className="key">Height:</h2>
        <p className="value">{height}</p>
      </div>
    </div>
  );
}

function RightCardCenter({ arr }) {
  return (
    <div className="rightCardCenter">
      {arr.map((ele, index) => (
        <>
          <div className="contentWrap">
            <h2 className="key">{`Stat${index + 1}:`}</h2>
            <p className="value">{ele.stat.name}</p>
          </div>
        </>
      ))}
    </div>
  );
}
function RightCardRight({ arr }) {
  return (
    <div className="rightCardCenter">
      {arr.map((ele, index) => (
        <>
          <div className="contentWrap">
            <h2 className="key">{`Bs${index + 1}:`}</h2>
            <p className="value">{ele.base_stat}</p>
          </div>
        </>
      ))}
    </div>
  );
}
