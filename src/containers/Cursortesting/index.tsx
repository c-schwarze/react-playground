import React, { useState } from 'react';

import Cell from './cell'
import { CursorTestingOption } from './interfaces'
import './styles.css'
import { create2DArray } from './util'
import { click } from '@testing-library/user-event/dist/click';

const WIDTH = 10;
const HEIGHT = 10;


// TODO - smooth out the highlight box
// TODO - need the drag box to determine what is highlighted
const Cursortesting = () => {
    // General
    const [option, setOption] = useState<CursorTestingOption>(CursorTestingOption.HighlightOnHover);
    const [board, setBoard] = useState<boolean[][]>(create2DArray(WIDTH, HEIGHT, false))

    // For Drag
    const [clickedPoint, setClickedPoint] = useState<number[]>([-1,-1]);
    const [dragPoint, setDragPoint] = useState<number[]>([-1,-1]);

    // Reset
    const resetCells = () => {
        setBoard(create2DArray(WIDTH, HEIGHT, false))
        setClickedPoint([-1, -1])
        setDragPoint([-1, -1])
    }

    // Options
    const handleOptionChange = (e) => {
        setOption(e.target.value)
    }

    // COLOR CELL
    const setSpecificCell = (x: number, y: number, newValue: boolean) => {
        if (option === CursorTestingOption.HighlightOnHover) {
            board[x][y] = newValue;
        }
        setBoard([...board]);
    }

    // DRAG
    const handleDragOptionClick = (e: React.MouseEvent) => {
        setClickedPoint([e.clientX, e.clientY])
    }
    const handleDragOptionDrag = (e: React.MouseEvent) => {
        setDragPoint([e.clientX, e.clientY])
    }

    return (
        <>
            <div>
                <select onChange={handleOptionChange}>
                    {Object.keys(CursorTestingOption).map((key) => (
                        <option key={key} value={CursorTestingOption[key]}>
                            {CursorTestingOption[key]}
                        </option>
                    ))}
                </select>
                <button onClick={() => resetCells()}>Reset Grid</button>
                <p>Clicked point: {clickedPoint[0]} {clickedPoint[1]}</p>
                <p>Drag point: {dragPoint[0]} {dragPoint[1]}</p>
            </div>
            
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
            <div 
                className="box"
                onMouseDown={(e) => option === CursorTestingOption.HighlightOnDrag && handleDragOptionClick(e)}
                // onMouseUp={(e) => option === CursorTestingOption.HighlightOnDrag && setClickedPoint([-1, -1])}
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