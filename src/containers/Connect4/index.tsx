import React, { useState } from 'react';

import { Connect4Settings } from './interfaces';
import Square from './square';
import './styles.css';


const WIDTH = 7;
const HEIGHT = 6;
const NUM_FOR_WIN = 4;

const Connect4 = () => {
    const [playerTurn, setPlayerTurn] = useState<number>(1);
    const [lastPlay, setLastPlay] = useState<number[]>([]);
    const [board, setBoard] = useState<string[][]>([[]]);
    const [winner, setWinner] = useState<number>(0);

    const createNewBoard = (width: number, height: number) => {
        // TODO - make the board creation more efficient
        let newBoard: string[][] = [[]];
        for( let i=0; i < height; i++){
            newBoard[i] = [];
            for( let j=0; j < width; j++){
                newBoard[i][j] = "empty"
            }
        }
        setBoard(newBoard)
        setLastPlay([])
        setPlayerTurn(1)
    }

    const placePiece = (x: number, y: number) => {
        board[x][y] = playerTurn.toString()
        setLastPlay([x,y])
        checkWin();

        if (playerTurn === 1) {
            setPlayerTurn(2)
        } else {
            setPlayerTurn(1)
        }
    }

    // Only check last win from the last play
    const checkWin = () => {
        const [x, y] = lastPlay;
        let inARow = 1;
        // vertical we only check down
        for (let i = 1; i <= 3; i++) {
            if (y-i > 0) {
                break
            }
            console.log(i)
            if (board[x][y-i] === playerTurn.toString()) {
                inARow++;
            }
        }
        if (inARow === 4) {
            setWinner(playerTurn)
        }
        // horizontal we check left and right
        // diagonal we check going up to the left
        // diagonal we check going up to the right
        

        return ""
    }

    return (
        <>
            <p>Current Turn: {playerTurn === 1 ? "Player 1" : "Player 2"}</p>
            {
                winner !== 0 && (
                    <p>{winner}</p>
                )
            }
            <button onClick={() => createNewBoard(WIDTH, HEIGHT)}>
                New Game
            </button>

            {/* Display board */}
            <div className="board">
                {
                    board.map((col, colIndex) => (
                        <div className="col" key={colIndex}>
                            {
                                col.map((square, squareIndex) => (
                                    <Square
                                        square={square}
                                        squareIndex={squareIndex}
                                        colIndex={colIndex}
                                        placePiece={() => placePiece(colIndex, squareIndex)}
                                    />
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </>
    )
}


export default Connect4;