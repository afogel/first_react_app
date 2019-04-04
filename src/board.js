import React, { useReducer } from 'react';
import Square from './square';

function reducer(state, action) {
  switch (action.type) {
    case 'select':
      let status;
      const squares = state.squares.slice();
      if (calculateWinner(squares) || squares[action.payload.index]) {
        return state;
      }
      const xIsNext = !state.xIsNext;
      squares[action.payload.index] = state.xIsNext ? 'X' : 'O';
      let winner = calculateWinner(squares);
      if (winner === null) {
        status = `Next player: ${xIsNext ? 'X' : 'O'}`;
      } else {
        status = `Winner: ${winner}`;
      }
      return {
        squares: squares,
        xIsNext: xIsNext,
        status: status,
      };
    default:
      throw new Error();
  }
}

export default function Board() {
  const [state, dispatch] = useReducer(reducer, {
    squares: Array(9).fill(null),
    xIsNext: true,
    status: `Next player: X`,
  });

  return (
    <div>
      <div className='status'>{state.status}</div>
      <div className='board-row'>
        <Square value={state.squares[0]} onClick={() => dispatch({type: 'select', payload: {index: 0}})} />
        <Square value={state.squares[1]} onClick={() => dispatch({type: 'select', payload: {index: 1}})} />
        <Square value={state.squares[2]} onClick={() => dispatch({type: 'select', payload: {index: 2}})} />
      </div>
      <div className='board-row'>
        <Square value={state.squares[3]} onClick={() => dispatch({type: 'select', payload: {index: 3}})} />
        <Square value={state.squares[4]} onClick={() => dispatch({type: 'select', payload: {index: 4}})} />
        <Square value={state.squares[5]} onClick={() => dispatch({type: 'select', payload: {index: 5}})} />
      </div>
      <div className='board-row'>
        <Square value={state.squares[6]} onClick={() => dispatch({type: 'select', payload: {index: 6}})} />
        <Square value={state.squares[7]} onClick={() => dispatch({type: 'select', payload: {index: 7}})} />
        <Square value={state.squares[8]} onClick={() => dispatch({type: 'select', payload: {index: 8}})} />
      </div>
    </div>
  )
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let index = 0; index < lines.length; index++) {
    const [a, b, c] = lines[index];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
