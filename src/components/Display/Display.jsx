import React from 'react';
import DisplayResult from "../DisplayResult/DisplayResult"

import './display.styles.scss';
import { ReactComponent as Logo } from '../../assets/dices/dice-logo.svg'

import dices from '../../assets/dices/dices.svg';


const Display = ({ sideGenerated, sideSelected, result, winAmount }) => {
    return (
        <div className="display">
            {!sideGenerated && !sideSelected ?
                <Logo className={"marginY-lg display--svg"} />
                : <svg className={`${result} marginY-lg display--svg`}>
                    <use href={`${dices}#dice${
                        sideGenerated ? sideGenerated
                            : sideSelected}`}></use>
                </svg>
            }
            <DisplayResult result={result} winAmount={winAmount} />
        </div >
    )
};

export default Display;