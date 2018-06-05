import React from 'react'
import Board from './board'

// Keeps track of game state and handles all game logic
class Game extends React.Component {
  constructor(props) {
    super(props);
    const boardSize = 3;

    const squares = new Array(boardSize)
    for (var i = 0; i < boardSize; i++) squares[i] = Array(boardSize).fill(null);

    this.state = {
      boardSize: boardSize,
      squares: squares,
      moves: [],
      xIsNext: true
    };
  }

  resetBoard(n) {
    const boardSize = (n || this.state.boardSize);

    const newSquares = new Array(boardSize)
    for (var i = 0; i < boardSize; i++) newSquares[i] = Array(boardSize).fill(null);

    this.setState({
      boardSize: boardSize,
      squares: newSquares,
      moves: [],
      xIsNext: this.state.xIsNext,
      winner: false
    });
  }


  undo() {
    if (this.state.moves.length === 0)
      return;

    const lastMove = this.state.moves.pop();
    const squares = this.state.squares.slice();

    squares[lastMove.x][lastMove.y] = null;

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    })
  }


  handleClick(x,y) {
    const squares = this.state.squares.slice();
    const moves = this.state.moves.slice();

    if (squares[x][y] || this.state.winner)
      return;

    squares[x][y] = this.state.xIsNext ? "X" : "O";
    moves.push({x: x, y: y});

    const winner = getWinner(squares, x, y);

    if (winner) {
      this.props.incrementScore(winner);
    }

    this.setState({
      squares: squares,
      moves: moves,
      xIsNext: !this.state.xIsNext,
      winner: winner
    });
  }

  render() {
    const squares = this.state.squares;
    const winner = this.state.winner;
    const moves = this.state.moves;
    const boardSize = this.state.boardSize;

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else if (moves.length === boardSize*boardSize) {
      status = "Draw!"
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className='game-controls'>
          <div>
            <button onClick={() => this.resetBoard(boardSize - 1)}> - </button>
            BoardSize: {boardSize}x{boardSize}
            <button onClick={() => this.resetBoard(boardSize + 1)}> + </button>
          </div>
          <button onClick={() => this.undo()}> Undo </button>
          <button onClick={() => this.resetBoard()}> {this.state.winner ? 'Play Again' : 'Reset'} </button>
        </div>
        <div className="game-info">
          <div>{status}</div>
        </div>
        <div className="game-board">
          <Board
            boardSize = {this.state.boardSize}
            squares={squares}
            onClick={(x,y) => this.handleClick(x,y)}
          />
        </div>
      </div>
    );
  }
}

// Checks to see if there's a winner in linear time
function getWinner(squares, x, y) {

  const player = squares[x][y];
  const boardSize = squares[x].length

  // check row
  for (var i = 0; i < boardSize; i++) {
    if (player !== squares[x][i])
      break;
    if (i === boardSize - 1) {
      return player;
    }
  }

  // check column
  for (var j = 0; j < boardSize; j++) {
    if (player !== squares[j][y])
      break;
    if (j === boardSize - 1)
      return player;
  }

  // check diagonal
  if (x === y) {
    for (var k = 0; k < boardSize; k++) {
      if (player !== squares[k][k])
        break;
      if (k === boardSize - 1)
        return player;
    }
  }

  // check other diagonal
  if (x + y === boardSize - 1) {
    for (var a = 0; a < boardSize; a++) {
      if (player !== squares[boardSize - a - 1][a])
        break;
      if (a === boardSize - 1)
        return player;
    }
  }
  
  return null;
}

export default Game;