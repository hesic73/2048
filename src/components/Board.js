import React from 'react';
import Tile from './Tile';

/**
 * 
 * @param {Object} props
 * @param {Array} props.tiles
 * @returns 
 */
function Board({ tiles }) {
    return (
        <div className="flex flex-col items-center justify-center p-3 bg-[#bbada0] rounded-md w-full mt-4 relative">
            <div className="grid grid-cols-4 gap-2 w-full">
                {Array.from({ length: 16 }, (_, i) => (
                    <div key={`placeholder-${i}`} className="aspect-square bg-grid_cell_0 rounded-[3px]"></div>
                ))}
            </div>

            <div className="absolute p-3 grid grid-cols-4 grid-rows-4 gap-2 w-full h-full">
                {tiles.map(tile => (
                    <Tile key={tile.id} exp={tile.exp} position={tile.position} />
                ))}
            </div>

        </div>
    );
}

export default Board;