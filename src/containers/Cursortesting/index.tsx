import React, { useState, useEffect } from 'react';

import Cell from './cell'
import { CursorTestingOption } from './interfaces'
import './styles.css'
import { create2DArray } from './util'
import { click } from '@testing-library/user-event/dist/click';

const WIDTH = 10;
const HEIGHT = 10;


// TODO - need the drag box to determine what is highlighted
// TODO - need to update to now have the parent hold all of the cells properly
const Cursortesting = () => {
    // General
    const [option, setOption] = useState<CursorTestingOption>(CursorTestingOption.HighlightOnHover);
    const [board, setBoard] = useState<boolean[][]>(create2DArray(WIDTH, HEIGHT))

    // For Drag
    const [clickedPoint, setClickedPoint] = useState<number[]>([-1,-1]);
    const [dragPoint, setDragPoint] = useState<number[]>([-1,-1]);
    const [dragCanMove, setDragCanMove] = useState<boolean>(false);

    // Drag useEffect to highlight
    useEffect(() => {
        if (option === CursorTestingOption.HighlightOnDrag) {
            board.forEach((row, x) => {
                row.forEach((cell, y) => {
                    // TODO - we don't have coordinates here. If each "cell" is the actual component,
                    // TODO - we need to keep track of each component to be able to get the details
                    // TODO - then do the logic to check if its inside - which will update the color
                    
                    // TODO - call setSpecificCell()
                    // setSpecificCell(x, y, true)
                })
            })
        }
    }, [clickedPoint, dragPoint])

    // Reset
    const resetCells = () => {
        setBoard(create2DArray(WIDTH, HEIGHT))
        setClickedPoint([-1, -1])
        setDragPoint([-1, -1])
        setDragCanMove(false)
    }

    // Options
    const handleOptionChange = (e) => {
        setOption(e.target.value)
        resetCells();
    }

    // COLOR CELL
    const setSpecificCell = (x: number, y: number, newValue: boolean) => {
        board[x][y] = newValue;
        setBoard([...board]);
    }

    // DRAG
    const handleDragOptionClick = (e: React.MouseEvent) => {
        setClickedPoint([e.clientX, e.clientY])
        setDragPoint([e.clientX, e.clientY])
        setDragCanMove(true)
    }
    const handleDragOptionDrag = (e: React.MouseEvent) => {
        if (dragCanMove) {
            setDragPoint([e.clientX, e.clientY])
        }
    }

    return (
        <>
            {/* Options */}
            <div>
                <select onChange={handleOptionChange}>
                    {Object.keys(CursorTestingOption).map((key) => (
                        <option key={key} value={CursorTestingOption[key]}>
                            {CursorTestingOption[key]}
                        </option>
                    ))}
                </select>
                <button onClick={() => resetCells()}>Reset Grid</button>
            </div>
            
            {/* Drag option box */}
            {
                option === CursorTestingOption.HighlightOnDrag && clickedPoint[0] !== -1 && clickedPoint[1] !== -1 && (
                    <div
                        className='drag-box'
                        style={{
                            width: Math.abs(dragPoint[0]-clickedPoint[0]),
                            height: Math.abs(dragPoint[1]-clickedPoint[1]),
                            left: Math.min(clickedPoint[0], dragPoint[0]),
                            top: Math.min(clickedPoint[1], dragPoint[1]),
                        }}
                    >

                    </div>
                )
            }

            {/* Cell grid */}
            <div 
                className="box"
                onMouseDown={(e) => option === CursorTestingOption.HighlightOnDrag && handleDragOptionClick(e)}
                onMouseUp={() => setDragCanMove(false)}
                onMouseMove={(e) => option === CursorTestingOption.HighlightOnDrag && handleDragOptionDrag(e)}
            >
                <>
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
                </>
            </div>
        </>
    )
}

export default Cursortesting;