import React from 'react';


const Square = ({square, squareIndex, colIndex, placePiece}) => {
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
            disabled={square !== 'empty'}
            onClick={placePiece}
        >
            {/* {displayValue()} */}
            {colIndex} {squareIndex}
        </button>
    )
}


export default Square;