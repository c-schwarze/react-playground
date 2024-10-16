import Sudoku from ".";
import { SudokuSquare } from './interfaces'

export const createNewBoard = (): SudokuSquare[][] => {
    // TODO - generate this puzzles in a better way
    const examplePuzzle = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];
    let newBoard: SudokuSquare[][] = []

    examplePuzzle.forEach((row) => newBoard.push(
        row.map((num) => ({
                StartingNum: num,
                UserNum: num,
            } as SudokuSquare))
    ))

    return newBoard;
}