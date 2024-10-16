import React, { useEffect, useState } from 'react';

import Square from './square';
import './styles.css';


// Move to ./interfaces.tsx as "Settings", so we can adjust them as params
const WIDTH = 7;
const HEIGHT = 6;
const NUM_FOR_WIN = 4;
//

const Connect4 = () => {
    const [playerTurn, setPlayerTurn] = useState<number>(1);
    const [lastPlay, setLastPlay] = useState<number[]>([-1, -1]);
    const [board, setBoard] = useState<string[][]>([[]]);
    const [winner, setWinner] = useState<number>(0);

    useEffect(() => {
        const [x, y] = lastPlay;

        // break if not set yet
        if (x < 0 || y < 0) {
            return
        }
        const playerToCheck = board[x][y]

        // VERTICAL we only check down
        if (checkVertical(playerToCheck, x, y)) {
            setWinner(Number(playerToCheck))
            return
        }
        // HORIZONTAL we check left and right
        if (checkHorizontal(playerToCheck, x, y)) {
            setWinner(Number(playerToCheck))
            return
        }
        // DIAGONAL we check going up to the left
        if (checkDiagonalLeft(playerToCheck, x, y)) {
            setWinner(Number(playerToCheck))
            return
        }
        // DIAGONAL we check going up to the right
        if (checkDiagonalRight(playerToCheck, x, y)) {
            setWinner(Number(playerToCheck))
            return
        }

        setWinner(0)
    }, lastPlay)

    const checkVertical = (playerToCheck: string, x: number, y: number) => {
        for (let i = 1; i < NUM_FOR_WIN; i++) {
            // break  out if we went too far
            if (x+i >= HEIGHT) {
                return false;
            }
            if (board[x+i][y] !== playerToCheck) {
                return false;
            }
        }

        return true;
    }

    const checkHorizontal = (playerToCheck: string, x: number, y: number) => {
        let numInRow = 1
        
        // Go left
        for (let i = 1; i < NUM_FOR_WIN; i++) {
            // break  out if we went too far
            if (y-i < 0) {
                break
            }
            if (board[x][y-i] === playerToCheck) {
                numInRow++
            } else {
                break
            }
        }

        // Go right
        for (let i = 1; i < NUM_FOR_WIN; i++) {
            // break  out if we went too far
            if (y+i >= WIDTH) {
                break
            }
            if (board[x][y+i] === playerToCheck) {
                numInRow++
            } else {
                break
            }
        }

        if (numInRow >= NUM_FOR_WIN) {
            return true
        }
        
        return false;
    }

    const checkDiagonalLeft = (playerToCheck: string, x: number, y: number) => {
        let numInRow = 1
        
        // Go up and left
        for (let i = 1; i < NUM_FOR_WIN; i++) {
            // break  out if we went too far
            if (x-i < 0 || y-i < 0) {
                break
            }
            if (board[x-i][y-i] === playerToCheck) {
                numInRow++
            } else {
                break
            }
        }

        // Go down and right
        for (let i = 1; i < NUM_FOR_WIN; i++) {
            // break  out if we went too far
            if (x+i >= HEIGHT || y+i >= WIDTH) {
                break
            }
            if (board[x+i][y+i] === playerToCheck) {
                numInRow++
            } else {
                break
            }
        }

        if (numInRow >= NUM_FOR_WIN) {
            return true
        }
        
        return false;
    }

    const checkDiagonalRight = (playerToCheck: string, x: number, y: number) => {
        let numInRow = 1
        
        // Go up and right
        for (let i = 1; i < NUM_FOR_WIN; i++) {
            // break  out if we went too far
            if (x-i < 0 || y+i >= WIDTH) {
                break
            }
            if (board[x-i][y+i] === playerToCheck) {
                numInRow++
            } else {
                break
            }
        }

        // Go down and left
        for (let i = 1; i < NUM_FOR_WIN; i++) {
            // break  out if we went too far
            if (x+i >= HEIGHT || y-i < 0) {
                break
            }
            if (board[x+i][y-i] === playerToCheck) {
                numInRow++
            } else {
                break
            }
        }

        if (numInRow >= NUM_FOR_WIN) {
            return true
        }
        
        return false;
    }

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
        setLastPlay([-1, -1])
        setPlayerTurn(1)
        setWinner(0)
    }

    const placePiece = (x: number, y: number) => {
        // find the highest X value
        for (let i = HEIGHT - 1; i >= 0; i-- ) {
            console.log("i", i)
            if ( board[i][y] === "empty") {
                board[i][y] = playerTurn.toString()
                // TODO - we could just call checkWinner here. No need to store the lastPlay.
                setLastPlay([i,y])
                break
            }
        }

        if (playerTurn === 1) {
            setPlayerTurn(2)
        } else {
            setPlayerTurn(1)
        }
    }

    return (
        <>
            {
                winner !== 0 ? (
                    <p>{winner === 1 ? "Red" : "Yellow"} Wins!</p>
                ) : (
                    <p>Current Turn: {playerTurn === 1 ? "Red" : "Yellow"}</p>
                )
            }
            <button onClick={() => createNewBoard(WIDTH, HEIGHT)}>
                New Game
            </button>

            {/* Display board */}
            <div className="board">
                {
                    board.reverse().map((row, rowIndex) => (
                        <div className="row" key={rowIndex}>
                            {
                                row.map((square, squareIndex) => (
                                    <Square
                                        square={square}
                                        squareIndex={squareIndex}
                                        rowIndex={rowIndex}
                                        placePiece={() => placePiece(rowIndex, squareIndex)}
                                        disabled={winner !== 0}
                                        debugMode={true}
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