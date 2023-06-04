import { useState } from "react";
import confetti from "canvas-confetti";
import "./App.css";
import { Square } from "./components/Square";
import { turns } from "../constants";
import { checkEndGame, checkWinnerFrom } from "./logic/board";
import WinnerModal from "./components/WinnerModal";
import BoardGame from "./components/BoardGame";

function App() {
  //El valor inicial lo determina una condicional
  const [board, setBoard] = useState(()=> {
    const boardFronStorage = window.localStorage.getItem('board');
    return boardFronStorage ? JSON.parse(boardFronStorage) : Array(9).fill(null)
  });
  const [turn, setTurn] = useState(() => {
    const turnsFromLocalstorage = window.localStorage.getItem('turn');
    return turnsFromLocalstorage ?? turns.X; //?? revisa si es Null o Undefined
  });
  const [winner, setWinner] = useState(null); // null no hay ganador, false hay un empate

 

  const updateBoard = (index) => {
    //evitar sobreescritura
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === turns.X ? turns.O : turns.X;
    setTurn(newTurn);
    window.localStorage.setItem('board', JSON.stringify(newBoard));
    window.localStorage.setItem('turn', newTurn);


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
    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
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
