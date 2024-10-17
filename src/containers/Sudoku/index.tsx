import React, { useState } from 'react';

import { SudokuSquare } from './interfaces'
import { createNewBoard } from './util'
import './styles.css'

const WIDTH = 9;

// TODO - create a typing way for the user to enter numbers
// TODO - useEffect to check if there are duplicates. If so, highlight the duplicates
// TODO - optimize the solver to do it in 1 pass instead of 3
// TODO - create a way to pull a new problem
// TODO - create a auto solver
// TODO - pull out parts to other components. Its not really necessary, as they aren't reusable
const Sudoku = () => {
    const [board, setBoard] = useState<SudokuSquare[][]>(createNewBoard())
    const [selectedSquare, setSelectedSquare] = useState<[number, number]>([-1,-1])

    const isSolved = () => {
        // horizontals are good
        if (!checkHorizontal(board)) {
            return false;
        }
        
        // verticals are good
        if (!checkHorizontal(transpose2dArray(board))) {
            return false;
        }

        // 3x3's are good
        let xOffset = 0;
        let yOffset = 0;
        for( let checks = 0; checks < WIDTH; checks++) {
            let numsFound: number[] = []
            for( let x = 0+xOffset; x < 3+xOffset; x++) {
                for( let y = 0+xOffset; y < 3+xOffset; y++) {
                    numsFound.push(board[x][y].UserNum)
                }
            }
            if( numsFound.length < 9) {
                return false
            }
            if( (1+checks)%3 === 0) {
                yOffset += 3
                xOffset = 0
            } else {
                xOffset += 3
            }
        }

        return true;
    }

    const checkHorizontal = (testBoard) => {
        return testBoard.every((row) => {
            let numsFound: number[] = [];
            row.forEach((square) => square.UserNum > 0 && !numsFound.includes(square.UserNum) && numsFound.push(square.UserNum))
            return numsFound.length === WIDTH
        })
    }

    const transpose2dArray = (twoDArray) => {
        return twoDArray[0].map((_, colIndex) => twoDArray.map(row => row[colIndex]));
    }

    const setNumberToSelectedSquare = (num: number) => {
        const x = selectedSquare[0];
        const y = selectedSquare[1];
        if (x > -1 && y > -1) {
            board[x][y].UserNum = num;
        }
        setBoard([...board])
    }

    return  (
        <>
        <h1>Test</h1>
        <div>
            <button onClick={() => setBoard(createNewBoard())}>Reset Game</button>
            <button onClick={() => alert(isSolved())}>Check if I won?</button>
        </div>

        <div>
            {
                [...Array(WIDTH)].map((_, index) => (
                    <button onClick={() => setNumberToSelectedSquare(index+1)}>{index+1}</button>
                ))
            }
        </div>
        
        <div className="sudoku-board">
            {
                board.map((row, xIndex) => (
                    <div className="sudoku-row">
                        {
                            row.map((square, yIndex) => (
                                <div 
                                    className={`
                                        sudoku-square 
                                        ${square.StartingNum !== 0 && "starting-num"}
                                        ${selectedSquare[0] === xIndex && selectedSquare[1] === yIndex && "selected"}
                                    `}
                                    onClick={() => square.StartingNum === 0 && setSelectedSquare([xIndex, yIndex])}
                                >
                                    <p>
                                        {square.StartingNum > 0 ? square.StartingNum : square.UserNum > 0 ? square.UserNum : ""}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
        </>
    )
}

export default Sudoku;