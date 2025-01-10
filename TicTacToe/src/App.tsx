import React from 'react';
import './App.css';
import {useState} from 'react';

type SquareProps = {
  value: string | null;
  onSquareClick: () => void;
};

function Square({ value, onSquareClick }: SquareProps) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

type BoardProps = {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (nextSquares: (string | null)[]) => void;
  botToggled: boolean;
};

function Board({ xIsNext, squares, onPlay, botToggled }: BoardProps) {
  function handleClick(i: number):void {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (botToggled) {
    status = "Human vs Bot"
    if (winner === "O") {
      status = "Winner: Bot";
    } else if (winner ==="X") {
      status = "Winner: Human";
    } else {
    status = "Human vs Bot"
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
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
  );
}


export default function Game() {
  const [history, setHistory] = useState<(string | null)[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;
  const [botToggled, setToggled] = useState(false);

  let mode;
  if(botToggled) {
    mode = "2 player mode"
  } else {
    mode = "single player mode"
  }

  if (!xIsNext) {
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
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} botToggled={botToggled}/>
        <div className='MoveBot'>
          <button className='toggle-btn' onClick={() => setToggled(!botToggled)}>
            <div className='thumb'>{mode}</div>
          </button>
        </div>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares: (string | null)[]): string | null {
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
