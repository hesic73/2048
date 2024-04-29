import React from 'react';
import GridCell from './GridCell';

/**
 * 
 * @param {Object} props
 * @param {Array<number>} props.exps
 * @returns 
 */
function Board({ exps }) {
    // Assuming a fixed size of 4x4 grid
    const size = 4;

    return (
        <div className="flex flex-col justify-center items-center space-y-2 p-4 bg-[#bbada0]">
            {Array.from({ length: size }).map((_, row) => (
                <div key={row} className="flex justify-center space-x-2">
                    {exps.slice(row * size, (row + 1) * size).map((exp, index) => (
                        <GridCell key={row * size + index} exp={exp} />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Board;