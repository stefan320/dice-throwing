import React from 'react';
import leftArrow from '../../assets/left-arrow.svg';

import "./header.styles.scss";

const Header = (props) => (
    <div className="header">
        <p className="header--score">{props.credit}</p>
        <img className="header--arrow" src={leftArrow} alt="Arrow" />
    </div>
);


export default Header;