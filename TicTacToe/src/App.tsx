import React from 'react';
import './App.css';
import {useState} from 'react';
import Board from './components/Board.tsx';

export default function Game() {
  const [history, setHistory] = useState<(string | null)[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;
  const [botToggled, setToggled] = useState<boolean>(false);
  const [diff, setDiff] = useState<null>(null);

  let mode;
  if(botToggled) {
    mode = "2 Player Mode"
  } else {
    mode = "Play With Bot"
    // jumpTo(0)
  }

  const handleClick = () => {
    setToggled(!botToggled)
    if(currentMove !== 0){
      jumpTo(0)
    } else {
      return;
    }
  }



  function getBotMove(squares: (string | null)[]): number | null {
    const emptySquares = squares.map((sq, idx) => (sq === null ? idx : null)).filter(idx => idx !== null) as number[];
    if (emptySquares.length === 0) {
      return null; // No moves available
    }
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  }

  function handlePlay(nextSquares: (string | null)[]): void {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setDiff(null);
  
    if (botToggled && !calculateWinner(nextSquares) && nextSquares.includes(null)) {
      const botMoveIndex = getBotMove(nextSquares);
      if (botMoveIndex !== null) {
        const botSquares = nextSquares.slice();
        botSquares[botMoveIndex] = "O"; // Assume bot is "O"
        const updatedHistory = [...nextHistory, botSquares];
        setHistory(updatedHistory);
        setCurrentMove(updatedHistory.length - 1);
      }
    }
  }
  

  function jumpTo(nextMove: number): void {
    setCurrentMove(nextMove);
    if (nextMove > 0){
      const last = history[nextMove];
      const prev = history[nextMove - 1];
      for (let i = 0; i < last.length; i++){
        if (last[i] !== prev[i]){
          setDiff(i);
          break;
        }
      }
    }
    else {
      setDiff(null);
    }
  }

  const moves = history.map((squares, move) => {
    let description: string;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button className='button' onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
     
      <div className='moveBot'>
        <button className='toggle-btn' onClick={handleClick}>
          <div className='thumb'>{mode}</div>
        </button>
      </div>
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} botToggled={botToggled} diff={diff}/>
      </div>   
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export function calculateWinner(squares: (string | null)[]): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
