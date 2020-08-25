import React from 'react';
import './Calculator.css';

class Calculator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value1: '',
            value2: 0,
            operator: ''
        }

        this.handleOperatorClick = this.handleOperatorClick.bind(this);
        this.handleDecimalClick = this.handleDecimalClick.bind(this);
        this.handleClearClick = this.handleClearClick.bind(this);
        this.handleEqualsClick = this.handleEqualsClick.bind(this);
        this.handleNumClick = this.handleNumClick.bind(this);
    }

    handleNumClick(e) {
        if(this.state.value1.length < 9) {
            if (e === "0" && !this.state.value1) {
                return null;
            }

            this.setState({
                value1: this.state.value1 + e
            });
            
        }
    }

    handleDecimalClick() {
        if(this.state.value1.indexOf(".") === -1) {
            this.setState({
                value1: this.state.value1 + "."
            });
        };
    }

    handleOperatorClick(e) {
        if(this.state.value2 && this.state.operator) {
            this.handleEqualsClick();
        }

        this.setState({
            value2: this.state.value1,
            value1: '',
            operator: e
        });
    }

    handleClearClick() {
        if (this.state.value1) {
            this.setState({
                value1: ''
            });
        } else {
            this.setState({
                value2: '',
                operator: ''
            });
        };
    }

    handleEqualsClick() {
        let answer = 0;
        let proxyVal1 = this.state.value1

        //I use the proxy value here because you get NaN if value1 is ''.
        if(proxyVal1 === '') {
            proxyVal1 = 0;
        }

        // we don't just use eval here because lint gets pissy if you do.
        switch(this.state.operator) {
            case "+":
                answer = parseFloat(this.state.value2) + parseFloat(proxyVal1)
                break;
            case "-":
                answer = parseFloat(this.state.value2) - parseFloat(proxyVal1)
                break;
            case "*":
                answer = parseFloat(this.state.value2) * parseFloat(proxyVal1)
                break;
            case "/":
                answer = parseFloat(this.state.value2) / parseFloat(proxyVal1)
                break;
            default:
                answer = parseFloat(proxyVal1);
                break;
        }

        let answerLength = answer.toString().length;

        //check for overflow error
        if (answerLength > 9) {
            if(answer >= 1.0e200 | answer <= 1.0e-200) {
                this.setState({
                    value1: 'Error'
                });
            } else {
                this.setState({
                    value1: answer.toExponential(4).toString()
                });
            }
        } else {
            this.setState({
                value1: answer
            });
        }
    }

    render() {
        return (
            <div id="container">
                <div id="output">{this.state.value1}</div>

                <div id="input">

                    <div id="non-operators">
                        <div id="row1">
                            <button id="1" onClick={e => this.handleNumClick(e.target.id)}>1</button>
                            <button id="2" onClick={e => this.handleNumClick(e.target.id)}>2</button>
                            <button id="3" onClick={e => this.handleNumClick(e.target.id)}>3</button>
                        </div>
                        <div id="row2">
                            <button id="4" onClick={e => this.handleNumClick(e.target.id)}>4</button>
                            <button id="5" onClick={e => this.handleNumClick(e.target.id)}>5</button>
                            <button id="6" onClick={e => this.handleNumClick(e.target.id)}>6</button>
                        </div>
                        <div id="row3">
                            <button id="7" onClick={e => this.handleNumClick(e.target.id)}>7</button>
                            <button id="8" onClick={e => this.handleNumClick(e.target.id)}>8</button>
                            <button id="9" onClick={e => this.handleNumClick(e.target.id)}>9</button>
                        </div>
                        <div id="row4">
                            <button id="0" onClick={e => this.handleNumClick(e.target.id)}>0</button>
                            <button id="clear" onClick={this.handleClearClick}>C</button>
                            <button id="." onClick={this.handleDecimalClick}>.</button>
                        </div>
                    </div>

                    <div id="operators">
                        <button id="+" onClick={e => this.handleOperatorClick(e.target.id)}>+</button>
                        <button id="-" onClick={e => this.handleOperatorClick(e.target.id)}>-</button>
                        <button id="*" onClick={e => this.handleOperatorClick(e.target.id)}>x</button>
                        <button id="/" onClick={e => this.handleOperatorClick(e.target.id)}>/</button>
                    </div>
                    
                </div>

                <button id="equals" onClick={this.handleEqualsClick}>=</button>
            </div>
        )
    }
}

export default Calculator;