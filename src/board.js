import React from 'react'

// Handles rendering of board and squares
class Board extends React.Component {
  renderSquare(x,y, size) {
    return (
      <Square
        size={size}
        key={x + '' + y}
        value={this.props.squares[x][y]}
        onClick={() => this.props.onClick(x,y)}
      />
    );
  }

  render() {

    const renderSize = (window.innerWidth > 400 ? 400 : 250);
    const renderBoard = [];
    const boardSize = this.props.boardSize;

    for (var i = 0; i < boardSize; i++) {
        const row = [];
      for (var j = 0; j < boardSize; j++) {
        row.push(this.renderSquare(i,j, renderSize/boardSize));
      }

      const divRow = <div key={i} className="board-row"> {row} </div>
      renderBoard.push(divRow);
    }


    return (
      <div className='board'>
        {renderBoard}
      </div>
    );
  }
}

// Renders a square
function Square(props) {

  const squareStyle = {
    height: props.size + 'px',
    width: props.size + 'px',
    fontSize: props.size + 'px',
  }

  return (
    <button style={squareStyle} className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Board;
