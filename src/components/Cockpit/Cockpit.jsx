import React from 'react';
import axios from 'axios';

import Display from '../Display/Display';
import Header from '../Header/Header';
import GameController from '../GameContoller/GameController'

import './cockpit.styles.scss';


class Cockpit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            credit: 0,
            currentPlayer: 'robouser',
            result: null,
            sideGenerated: null,
            sideSelected: null,
            betAmount: 2000,
            winAmount: null
        }
    }

    betAmountHandler = (event) => {
        const type = event.target.closest(".bet--changer").dataset.type;
        switch (type) {
            case ("decrement"):
                this.setState({ betAmount: this.state.betAmount - 1 })
                break;
            case ("increment"):
                this.setState({ betAmount: this.state.betAmount + 1 })
                break;
            case ("manualChange"):
                this.setState({ betAmount: parseInt(event.target.value) })
                break;
            default: null;
        }
    }

    betHandler = () => {
        this.state.betAmount >= 1 ?
            axios.post('http://localhost:3000/roll-dice', {
                "betAmount": this.state.betAmount,
                "username": this.state.currentPlayer,
                "sideSelected": this.state.sideSelected
            })
                .then((response) => {
                    return response.data
                })
                .then(({ result, sideGenerated }) => {
                    const stateCopy = { ...this.state };
                    const newResult = result === "WON" ? ["WIN", stateCopy.betAmount * 5] : ["Loss", null]
                    this.setState({
                        result: newResult[0],
                        winAmount: newResult[1],
                        sideGenerated
                    })
                })
                .then(() => this.fetchUserData(this.state.currentPlayer))
                .catch((error) => {
                    console.log(error);
                })
            : this.setState({ betAmount: 1 });
    }

    fetchUserData = (player) => {
        axios.get(`http://localhost:3000/get-user/${player}`)
            .then((response) => response.data)
            .then(({ balance, betHistory }) => {
                this.setState({ credit: balance, betHistory });
            });
    }


    getSelectedSide = (event) => {
        const selectedDice = parseInt(event.target.closest("svg").dataset.side);
        this.setState({ sideSelected: selectedDice })
    }

    componentDidMount() {
        this.fetchUserData(this.state.currentPlayer);
    }

    render() {
        const { state } = this;
        return (
            <div className="cockpit">
                <Header credit={state.credit} />
                <Display
                    result={state.result}
                    sideGenerated={state.sideGenerated}
                    sideSelected={state.sideSelected}
                    winAmount={state.winAmount}
                />
                <div>
                    <GameController
                        sideSelected={state.sideSelected}
                        betAmount={state.betAmount}
                        betAmountHandler={this.betAmountHandler}
                        getSelectedSide={this.getSelectedSide}
                        betHandler={this.betHandler}
                    />
                </div>
            </div>
        )
    }
}

export default Cockpit;