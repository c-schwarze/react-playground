import React, { useState } from 'react';

import Cell from './cell'
import './styles.css'


const Cursortesting = () => {
    // TODO - convert to util
    const [board, setBoard] = useState<boolean[][]>(new Array(10).fill(0).map(() => new Array(10).fill(false)))
    const resetCells = () => {

        setBoard(new Array(10).fill(0).map(() => new Array(10).fill(false)))
    }

    const setSpecificCell = (x: number, y: number, newValue: boolean) => {
        board[x][y] = newValue;
        setBoard([...board]);
    }

    return (
        <>
            <div>
                <button onClick={() => resetCells()}>Reset</button>
            </div>
            <div className="box">
                {
                    board.map((row, index1) => (
                        <div className='container' key={`container-${index1}`}>
                            {
                                row.map((cell, index2) => 
                                    <Cell
                                        key={`cell-${index1}-${index2}`}
                                        x={index1}
                                        y={index2}
                                        setSpecificCell={setSpecificCell}
                                        classes={`cell ${cell && 'highlight'}`}
                                    />
                                )
                            }

                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Cursortesting;