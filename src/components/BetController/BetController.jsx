import React from 'react';

import './betController.scss'


const BetController = ({ betAmountHandler, betAmount }) => {
    return (
        <div className="betController">
            <span
                data-type={"decrement"}
                onClick={betAmountHandler} className="betController--btn betController--decrement bet--changer">
            </span>
            <input
                data-type={"manualChange"}
                type="number"
                min="1"
                value={betAmount}
                onChange={betAmountHandler}
                className={"bet--changer betController--input"} />
            <span
                data-type={"increment"}
                onClick={betAmountHandler} className="betController--btn betController--increment bet--changer">
            </span>
        </div>
    );
}

export default BetController;