import React from 'react';
import axios from 'axios';

import Display from '../Display/Display';
import Header from '../Header/Header';

import './cockpit.styles.scss';


class Cockpit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            credit: 0,
            currentPlayer: 'robouser',
            result: null,
            sideGenerated: 0,
            sideSelected: 1,
            images: {}
        }
    }

    handleSubmit = () => {
        axios.post('http://localhost:3000/roll-dice', {
            "betAmount": 10,
            "username": this.state.currentPlayer,
            "sideSelected": this.state.sideSelected
        })
            .then((response) => {
                console.log(response);
                this.setState({
                    result: response.data.result,
                    sideGenerated: response.data.sideGenerated
                })
            })
            .then(() => this.fetchUserData(this.state.currentPlayer))
            .catch((error) => {
                console.log(error);
            });
    }

    importAll = r => {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }


    fetchUserData = (player) => {
        return axios.get(`http://localhost:3000/get-user/${player}`)
            .then((response) => response.data)
            .then((data) => {
                this.setState({ credit: data.balance });
            });
    }

    componentDidMount() {
        this.fetchUserData(this.state.currentPlayer);
        this.setState({
            images: this.importAll(require.context('../../assets/dices', false, /\.(png|jpe?g|svg)$/))
        });
    }

    render() {
        return (
            <div className="cockpit">
                <Header credit={this.state.credit} />
                <Display
                    result={this.state.result}
                    dices={this.state.images}
                    sideGenerated={this.state.sideGenerated}
                    sideSelected={
                        this.state.sideSelected
                    } />
                <h2>{this.state.result}</h2>
                <button onClick={this.handleSubmit} />
            </div>
        )
    }
}

export default Cockpit;