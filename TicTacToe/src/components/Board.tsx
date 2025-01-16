import React from 'react';
import '../App.css';
import Square from './Square.tsx';
import { calculateWinner } from '../App.tsx';

type BoardProps = {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (nextSquares: (string | null)[]) => void;
  onDisorder: (nextSquares: (string | null)[]) => void;
  botToggled: boolean;
  diff: null;
};

export default function Board({ xIsNext, squares, onPlay, onDisorder, botToggled ,diff}: BoardProps) {
  function handleClick(i: number):void {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
      onPlay(nextSquares);
    } else if(!xIsNext && botToggled) {
      nextSquares[i] = null;
      onDisorder(nextSquares);
    } else {
      nextSquares[i] = "O";
      onPlay(nextSquares);
    }
  }

  const winner = calculateWinner(squares);
  let status: string;
  if (botToggled) {
    status = "Human vs Bot"
    if (winner === "O") {
      status = "Winner: Bot";
    } else if (winner ==="X") {
      status = "Winner: Human";
    } else if(!squares.includes(null)) {
    status = "Draw"
    }
  } else {
    if (winner) {
      status = "Winner: " + winner;
    } else if (squares.includes(null)) {
      status = "Next player: " + (xIsNext ? "X" : "O");
    } else {
      status = "Draw";
    }
  }
  return (
      <div className="App">
        <header className="App-header">Tic Tac Toe</header>
        <div className="status">{status}</div>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} diff={diff === 0}/>
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} diff={diff === 1}/>
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} diff={diff === 2}/>
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} diff={diff === 3}/>
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} diff={diff === 4}/>
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} diff={diff === 5}/>
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} diff={diff === 6}/>
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} diff={diff === 7}/>
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} diff={diff === 8}/>
        </div>
      </div>
  );
}