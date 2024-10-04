import React from 'react';


const Square = ({square, squareIndex, rowIndex, placePiece, disabled}) => {
    const displayValue = () => {
        let displayValue = ""
        if (square === "1") {
            displayValue = 'O'
        } else if (square === "2") {
            displayValue = 'O'
        }
        return displayValue;
    }

    const getClassName = () => {
        if (square === "") {
            return ""
        } else if (square === "1") {
            return "player1"
        } else if (square === "2") {
            return "player2"
        }
    }
    
    return (
        <button 
            className={`box ${getClassName()}`}
            key={squareIndex}
            disabled={square !== 'empty' || disabled}
            onClick={placePiece}
        >
            {/* {displayValue()} */}
            {rowIndex} {squareIndex}
        </button>
    )
}


export default Square;