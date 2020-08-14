import React from 'react';
import SideSelector from "../SideSelector/SideSelector"
import BetController from "../BetController/BetController"

import './gameController.styles.scss';


const GameController = (props) => (
    <div className="gameController">
        <small className={"gameController--small"}>Tap to change selection</small>
        <SideSelector
            sideSelection={props.getSelectedSide}
            sideSelected={props.sideSelected}
        />
        <BetController
            betAmountHandler={props.betAmountHandler}
            betAmount={props.betAmount}
        />
        <button className={"btn--default"} onClick={props.betHandler}>Roll the dice</button>
    </div>
);
export default GameController;