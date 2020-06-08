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
            sideGenerated: 0,
            sideSelected: undefined,
            betAmount: 2000
        }
    }

    betAmountHandler = (event) => {
        this.setState({
            betAmount: event.target.value
        })
    }

    betHandler = () => {
        console.log("submission");
        axios.post('http://localhost:3000/roll-dice', {
            "betAmount": this.state.betAmount,
            "username": this.state.currentPlayer,
            "sideSelected": this.state.sideSelected
        })
            .then((response) => response.data)
            .then(({ result, sideGenerated }) => {
                this.setState({
                    result,
                    sideGenerated
                })
            })
            .then(() => this.fetchUserData(this.state.currentPlayer))
            .catch((error) => {
                console.log(error);
            });
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

    shouldComponentUpdate(nextProps) {
        if (nextProps.betAmount !== this.state.betAmount) {
            return true
        } else {
            return false
        }
    }

    componentDidMount() {
        this.fetchUserData(this.state.currentPlayer);
    }


    render() {
        return (
            <div className="cockpit">
                <Header credit={this.state.credit} />
                <Display
                    result={this.state.result}
                    sideGenerated={this.state.sideGenerated}
                    sideSelected={this.state.sideSelected}
                />
                <div>
                    <GameController
                        betAmount={this.state.betAmount}
                        betAmountHandler={this.betAmountHandler}
                        getSelectedSide={this.getSelectedSide}
                        betHandler={this.betHandler}
                        sideSelected={this.state.sideSelected}
                    />

                    <h2>{this.state.betAmount}</h2>
                </div>
            </div>
        )
    }
}

export default Cockpit;