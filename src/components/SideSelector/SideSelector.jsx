import React from 'react';

import dices from '../../assets/dices/dices.svg';

import './sideSelector.styles.scss';


const sideSelector = (props) => {
    console.log(props.sideSelected)

    return (
        <div className="sideSelector">
            {
                [...Array(6)].map((index, side) => {
                    return (
                        <svg key={side}
                            data-side={side}
                            className={
                                !props.sideSelected ||
                                    props.sideSelected === side ? "sideSelector__dice" : "sideSelector__dice sideSelector__inactive"}
                            onClick={props.sideSelection} >
                            <use href={`${dices}#dice${side}`}></use>
                        </svg>
                    )
                })
            }
        </div >
    )
}

export default sideSelector;