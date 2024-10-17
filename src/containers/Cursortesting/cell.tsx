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
        ></div>
    )
}

export default Cell;