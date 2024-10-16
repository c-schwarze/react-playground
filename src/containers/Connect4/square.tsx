import React from 'react';


const Square = ({square, squareIndex, rowIndex, placePiece, disabled, debugMode}) => {
    const displayValue = () => {
        return `${rowIndex} ${squareIndex}`;
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
            {debugMode && displayValue()}
        </button>
    )
}


export default Square;