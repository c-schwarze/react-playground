import React from "react"
import Cell from "./cell"

export function create2DArray(width: number, height: number) {
    return new Array(height).fill(0).map(() => new Array(width).fill(0));
//     let newBoard = new Array(height).fill(0).map(() => new Array(width).fill(undefined))
//     newBoard.forEach((row) => {
//         row.forEach((cell) => {
//             <Cell
//                 key={`cell-${index1}-${index2}`}
//                 x={index1}
//                 y={index2}
//                 setSpecificCell={setSpecificCell}
//                 classes={`cell ${cell && 'highlight'}`}
//             />
//         })
//     })
}