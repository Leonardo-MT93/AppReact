import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const turns = {
  X: 'x',
  O: 'o'
}



const Square = ({children, isSelected, updateBoard, index}) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`
  const handleClick = () => {
    updateBoard(index);
  }
  return (
    
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBO = [
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,4,8],
  [2,4,6],
]

const checkWinner = (boardToCheck) => {
  for (const combo of WINNER_COMBO){
    const [a,b,c] = combo;
    if(boardToCheck[a] && 
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a]
      }else{
        return null
      }
  }
}

function App() {

  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(turns.X);
  const [winner, setWinner] = useState(null); // null no hay ganador, false hay un empate
  const updateBoard = (index) => {
    //evitar sobreescritura
    if(board[index] || winner)return

    const newBoard = [... board];
    newBoard[index] = turn;
    setBoard(newBoard)
    const newTurn = turn === turns.X ? turns.O : turns.X;
    setTurn(newTurn);
    const newWinner = checkWinner(newBoard);
    if(newWinner){
      setWinner(newWinner)
    }
    }
   
    
  return (
    <main className='board'>
    <h1>TA-TE-TI</h1>
    <section className='game'>
      {
        board.map((_,index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}

            </Square>
          )
        })
      }
    </section>
    <section className='turn'>
      <Square isSelected={turn === turns.X}>{turns.X}</Square>
      <Square isSelected={turn === turns.O}>{turns.O}</Square>
    </section>
    </main>

  )
}

export default App
