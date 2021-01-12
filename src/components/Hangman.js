import React, {Component} from 'react';
import {randomSeason} from './seasons'

import stage0 from "./images/00.png"
import stage1 from "./images/01.png"
import stage2 from "./images/02.png"
import stage3 from "./images/03.png"
import stage4 from "./images/04.png"
import stage5 from "./images/05.png"
import stage6 from "./images/06.png"

class Hangman extends Component {
    //set initial props for images and amount of wrong answers allowable
    static defaultProps = {
        maxWrong: 6,
        images:[stage0, stage1, stage2, stage3, stage4, stage5, stage6]
    }

    constructor(props) {
        super(props);
        this.state = {
            mistakes: 0,
            guessed: new Set([]),
            answer: randomSeason()
        }
    }

    //adds letters to guessed array and add to mistakes count if wrong letter is chosen
    handleGuess = e => {
        let letter = e.target.value;
        this.setState(st => ({
            guessed: st.guessed.add(letter),
            mistakes: st.mistakes + (st.answer.includes(letter) ? 0 : 1) 
        }))
    }

    //breaks down answer into individual characters and compare to letters guessed, if the letter is guessed correctly it appears, if not a _ renders
    wordGuessed(){
        return this.state.answer.split("").map(letter => (this.state.guessed.has(letter) ? letter : " _ "));
    }

    //renders keyboard buttons
    keyboardButtons(){
        return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
        <button
        style={{margin: "2px", height: "50px", width: "50px"}}
        key = {letter}
        value = {letter}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(letter)}
        >{letter}</button>
        ));
    }


    //reset game to its initial states
    resetGame = () => {
        this.setState({
          mistakes: 0,
          guessed: new Set([]),
          answer: randomSeason()
        });
      }
    
    render() {
        const gameOver = this.state.mistakes >= this.props.maxWrong;
        const isWinner = this.wordGuessed().join("") === this.state.answer;
        let gameStatus = this.keyboardButtons();

        if(isWinner) {
            gameStatus = "Tis the  season of Winners!! :D"
        }

        if(gameOver) {
            gameStatus = "Tis not your season :("
        }

        return (
            <div align='center'>
                <p>Attempts: {this.state.mistakes} of {this.props.maxWrong}</p>
                <img src={this.props.images[this.state.mistakes]} alt=""/>
                <div>
                    <p>"Tis the season of": {!gameOver ? this.wordGuessed() : this.state.answer}</p>
                    <h1 style={{width: '50vw'}}>{gameStatus}</h1>
                    <button onClick={this.resetGame}>Reset</button>
                </div>
            </div>
        )
    }
}

export default Hangman;