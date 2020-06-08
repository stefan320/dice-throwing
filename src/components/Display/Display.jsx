import React from 'react';

import './display.styles.scss';

import dices from '../../assets/dices/dices.svg';



const Display = (props) => (
    <div className="display">
        <svg className={props.result}>
            <use href={`${dices}#dice${props.sideGenerated ? props.sideGenerated : props.sideSelected} `}></use>
        </svg>
        {/* <img src={
            props.dices[`dice${props.sideGenerated}.svg`]
        }
            alt={props.sideGenerated}
        /> */}
    </div>
);

export default Display;