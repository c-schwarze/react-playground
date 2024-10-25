import React, { useState, useEffect } from 'react';

import Cell from './cell'
import { CursorTestingOption } from './interfaces'
import './styles.css'
import { lsolve } from 'mathjs';
// import { create2DArray } from './util'

const WIDTH = 10;
const HEIGHT = 10;


// TODO - clean up the drag highlighting with regards to scroll
const Cursortesting = () => {
    // General
    const [option, setOption] = useState<CursorTestingOption>(CursorTestingOption.HighlightOnHover);
    const [board, setBoard] = useState<boolean[][]>([])

    // For Drag
    const [clickedPoint, setClickedPoint] = useState<number[]>([-1,-1]);
    const [dragPoint, setDragPoint] = useState<number[]>([-1,-1]);
    const [dragCanMove, setDragCanMove] = useState<boolean>(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    // RESET on load
    useEffect(() => {
        resetCells(false);
    }, [])

    useEffect(() => {
        const handleScroll = () => {
          setScrollPosition(window.scrollY);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    useEffect(() => {
        let dragBox = document.getElementById('drag-box')
        if (dragBox) {
            dragBox.style.top = (clickedPoint[1] - scrollPosition).toString();
            
            console.log("___")
            console.log("clickedPoint[1]", clickedPoint[1])
            console.log("scrollPosition", scrollPosition)
            console.log("dragBox.style.top", dragBox.style.top)
        }
    }, [scrollPosition])

    // Drag useEffect to highlight
    useEffect(() => {
        if (option === CursorTestingOption.HighlightOnDrag) {
            let dragBox = document.querySelectorAll('.drag-box').length > 0 ? document.querySelectorAll('.drag-box')[0] : null;
            if (!dragBox) {
                resetCells(true);
                return
            }
            let cells = document.querySelectorAll ('.cell');

            let dragRect = dragBox.getClientRects()[0]
            cells.forEach((cell) => {
                let cellTop = cell.getClientRects()[0].top
                let cellRight = cell.getClientRects()[0].right
                let cellBottom = cell.getClientRects()[0].bottom
                let cellLeft = cell.getClientRects()[0].left
                if (dragRect.top <= cellBottom
                    && dragRect.bottom >= cellTop
                    && dragRect.left <= cellRight
                    && dragRect.right >= cellLeft
                ) {
                    let x = parseInt(cell.getAttribute('data-x') || "")
                    let y = parseInt(cell.getAttribute('data-y') || "")
                    board[x][y] = true;
                }
            })
        }
    }, [clickedPoint, dragPoint])

    // Reset
    const resetCells = (boardOnly: boolean) => {
        let newBoard = new Array(HEIGHT).fill(0).map(() => new Array(WIDTH).fill(undefined))
        newBoard.forEach((row, index1) => {
            row.forEach((_oldValue, index2) => {
                newBoard[index1][index2] = false;
            })
        })
        setBoard(newBoard)

        if (boardOnly) {
            return
        }

        setClickedPoint([-1, -1])
        setDragPoint([-1, -1])
        setDragCanMove(false)
    }

    // Options
    const handleOptionChange = (e) => {
        setOption(e.target.value)
        resetCells(false);
    }

    // COLOR CELL
    const setSpecificCell = (x: number, y: number, newValue: boolean) => {
        if (option === CursorTestingOption.HighlightOnHover) {
            board[x][y] = newValue;
            setBoard([...board]);
        }
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
                <button onClick={() => resetCells(false)}>Reset Grid</button>
            </div>
            
            {/* Drag option box */}
            {
                option === CursorTestingOption.HighlightOnDrag && clickedPoint[0] !== -1 && clickedPoint[1] !== -1 && (
                    <div
                        id='drag-box'
                        className='drag-box'
                        style={{
                            width: Math.abs(dragPoint[0]-clickedPoint[0]),
                            height: Math.abs(dragPoint[1]-clickedPoint[1]),
                            left: Math.min(clickedPoint[0], dragPoint[0]),
                            top: Math.min(clickedPoint[1], dragPoint[1]),  // TODO - need to update these based on scroll
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
                                    row.map((cell, index2) => (
                                        <Cell
                                            key={`cell-${index1}-${index2}`}
                                            x={index1}
                                            y={index2}
                                            setSpecificCell={setSpecificCell}
                                            classes={`cell ${cell && 'highlight'}`}
                                        />
                                    ))
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