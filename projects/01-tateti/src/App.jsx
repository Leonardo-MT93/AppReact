import { useState } from "react";
import confetti from "canvas-confetti";
import "./App.css";
import { Square } from "./components/Square";
import { turns } from "../constants";
import { checkEndGame, checkWinnerFrom } from "./logic/board";
import WinnerModal from "./components/WinnerModal";
import BoardGame from "./components/BoardGame";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(turns.X);
  const [winner, setWinner] = useState(null); // null no hay ganador, false hay un empate

 

  const updateBoard = (index) => {
    //evitar sobreescritura
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === turns.X ? turns.O : turns.X;
    setTurn(newTurn);
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(turns.X);
    setWinner(null);
  };

  return (
    <main className="board">
      <h1>TA-TE-TI</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <BoardGame board={board} updateBoard={updateBoard}/>
      <section className="turn">
        <Square isSelected={turn === turns.X}>{turns.X}</Square>
        <Square isSelected={turn === turns.O}>{turns.O}</Square>
      </section>

      {<WinnerModal winner={winner} resetGame={resetGame} />}
    </main>
  );
}

export default App;
