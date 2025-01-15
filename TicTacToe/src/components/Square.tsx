import React from 'react';
import '../App.css';

type SquareProps = {
    value: string | null;
    onSquareClick: () => void;
    diff: boolean;
  };

 export default function Square({ value, onSquareClick, diff}: SquareProps) {
    return <button className={`square ${diff ? "highlighted" : ""}`} onClick={onSquareClick}>{value}</button>;
  }