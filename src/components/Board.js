import React from 'react';
import GridCell from './GridCell';

/**
 * 
 * @param {Object} props
 * @param {Array<number>} props.exps
 * @returns 
 */
function Board({ exps }) {
    return (
        <div className="flex flex-col items-center justify-center p-3 bg-[#bbada0] rounded-md w-full mt-4">
            <div className="grid grid-cols-4 gap-2 w-full">
                {exps.map((exp, index) => (
                    <GridCell key={index} exp={exp} />
                ))}
            </div>
        </div>
    );
}

export default Board;