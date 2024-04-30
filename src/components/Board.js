import React from 'react';
import Tile from './Tile';

/**
 * 
 * @param {Object} props
 * @param {Array<number>} props.exps
 * @returns 
 */
function Board({ exps }) {
    return (
        <div className="flex flex-col items-center justify-center p-3 bg-[#bbada0] rounded-md w-full mt-4 relative">
            <div className="grid grid-cols-4 gap-2 w-full">
                {Array.from({ length: 16 }, (_, i) => (
                    <div key={`placeholder-${i}`} className="aspect-square bg-grid_cell_0 rounded-[3px]"></div>
                ))}
            </div>

            <div className="absolute p-3 grid grid-cols-4 grid-rows-4 gap-2 w-full h-full">
                {exps.map((exp, index) => (
                    exp !== 0 && <Tile key={index} exp={exp} position={index} />
                ))}
            </div>

        </div>
    );
}

export default Board;