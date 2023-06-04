import { WINNER_COMBO } from "../../constants";

export const checkWinnerFrom = (boardToCheck) => {
    for (const combo of WINNER_COMBO){
      const [a,b,c] = combo;
      if(boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
        ){
          return boardToCheck[a]
        }
    }
    return null
  }

  export  const checkEndGame = (newBoard) => {
    //Se chequean que todos los elementos del arraya sean distintos de null
    return newBoard.every((square) => square !== null);
  };