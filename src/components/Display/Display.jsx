import React from 'react';

import { ReactComponent as Dice } from '../../assets/dices/dice5.svg';

const Display = (props) => (
    <div className="display">
        <Dice />

        {/* <img src={
            props.dices[`dice${props.sideGenerated}.svg`]
        }
            alt={props.sideGenerated}
        /> */}
    </div>
);

export default Display;