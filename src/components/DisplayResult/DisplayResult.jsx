import React from "react"

import './displayResult.styles.scss';


const DisplayResult = ({ result, winAmount }) => (
    <div className={"displayResult"}>
        {result === "WIN" ?
            <h1 className="heading--1">{winAmount}</h1>
            : null}
        <p className="displayResult--small">{result}</p>
    </div>
);


export default DisplayResult;