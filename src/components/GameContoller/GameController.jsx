import React from 'react';
import SideSelector from "../SideSelector/SideSelector"

const GameController = (props) => (
    <div className="gameController">
        <small>Tap to change selection</small>
        <h1>{props.sideSelected}</h1>
        <SideSelector
            sideSelection={props.getSelectedSide}
            sideSelected={props.sideSelected}
        />
        <input type="number"
            onChange={props.betAmountHandler}
            defaultValue={props.betAmount}
        />
        <button onClick={props.betHandler}>play</button>
    </div>
);
export default GameController;