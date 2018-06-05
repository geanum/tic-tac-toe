import React from 'react'
import Game from './game'

// App entry point: Initializes games and keeps track of player data (only score right now)
class TicTacToe extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      score: {
        X: 0,
        O: 0
      }
    }
  }

  incrementScore(winner) {
    const score = this.state.score;

    score[winner]++;

    this.setState({
      score: score
    });
  }

  render() {
    return (
      <div>
        <h1> Tic-Tac-Toe </h1>
        <div className='player'>
          <div className='player-label'>X</div>
          <div className='player-wins'>{this.state.score.X} wins </div>
        </div>
        <div className='player'>
          <div className='player-label'>O</div>
          <div className='player-wins'>{this.state.score.O} wins </div>
        </div>
        <Game incrementScore={(winner) => this.incrementScore(winner)}/>
      </div>
    )
  }
}

export default TicTacToe;
