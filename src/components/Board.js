import React from 'react';
import Tile from './Tile';
import { Grid } from './Tile';

/**
 * @typedef {import('../types').TileProps} TileProps
 */

/**
 * Renders the game board with tiles.
 * 
 * @param {Object} props
 * @param {TileProps[]} props.tiles - The array of tile properties.
 * @returns The game board component.
 */
function Board({ tiles }) {
    return (
        <div className="aspect-square flex flex-col p-2 bg-[#bbada0] rounded-md w-full mt-4 relative">
            {/* Inner container with padding to ensure uniform space inside the board */}
            <div className="flex flex-col p-2 relative w-full h-full">

                {Array.from({ length: 16 }, (_, i) => (
                    <Grid key={`placeholder-${i}`} position={i}></Grid>
                ))}


                {tiles.map(tile => (
                    <Tile key={tile.id} exp={tile.exp} position={tile.position} newTile={tile.newTile} />
                ))}
            </div>
        </div>
    );
}

export default Board;
