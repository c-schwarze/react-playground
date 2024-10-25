import React from "react";


interface CellProps {
    x: number,
    y: number,
    setSpecificCell,
    classes: string
}

const Cell = (props: CellProps) => {
    const {x, y, setSpecificCell, classes} = props;
    return (
        <div
            className={classes}
            onMouseEnter={() => setSpecificCell(x, y, true)}
            data-x={x}
            data-y={y}
        ></div>
    )
}

export default Cell;