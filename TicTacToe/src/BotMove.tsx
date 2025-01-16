  export function getBotMove(squares: (string | null)[]): number | null {
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
      if (squares[a]==="O" && squares[a] === squares[b] && !squares[c]) {
        return c;
      } else if (squares[b]==="O" && squares[b] === squares[c] && !squares[a]) {
        return a;
      } else if (squares[c]==="O" && squares[c] === squares[a] && !squares[b]) {
        return b;
      }
    }
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a]==="X" && squares[a] === squares[b] && !squares[c]) {
        return c;
      } else if (squares[b]==="X" && squares[b] === squares[c] && !squares[a]) {
        return a;
      } else if (squares[c]==="X" && squares[c] === squares[a] && !squares[b]) {
        return b;
      }
    }
    const emptySquares = squares.map((sq, idx) => (sq === null ? idx : null)).filter(idx => idx !== null) as number[];
    if (emptySquares.length === 0) {
      return null;
    }
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  }

  
  export function getUnbeatableBotmove(squares: (string | null)[]): number | null {
    if(!squares[4]){
      return 4;
    } else {
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
        if (squares[a]==="O" && squares[a] === squares[b] && !squares[c]) {
          return c;
        } else if (squares[b]==="O" && squares[b] === squares[c] && !squares[a]) {
          return a;
        } else if (squares[c]==="O" && squares[c] === squares[a] && !squares[b]) {
          return b;
        }
      }
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a]==="X" && squares[a] === squares[b] && !squares[c]) {
          return c;
        } else if (squares[b]==="X" && squares[b] === squares[c] && !squares[a]) {
          return a;
        } else if (squares[c]==="X" && squares[c] === squares[a] && !squares[b]) {
          return b;
        }
      }      
    }
    const emptySquares = squares.map((sq, idx) => (sq === null ? idx : null)).filter(idx => idx % 2 === 1) as number[];
    if (emptySquares.length === 0) {
      return null;
    }
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  }