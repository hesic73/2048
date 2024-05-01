/**
 * 
 * @param {Object[]} tiles 
 * @param {React.MutableRefObject<number>} tileIdRef 
 * @returns {[Object[], number]}
 */
function moveLeft(tiles, tileIdRef) {
    let movedTiles = [];
    let newScore = 0;
    for (let i = 0; i < 4; i++) {
        let rowTiles = tiles.filter(tile => getPosition(tile.position).row === i);
        rowTiles.sort((a, b) => getPosition(a.position).col - getPosition(b.position).col); // Sort by column for the left move
        let newRow = [];
        for (let j = 0; j < rowTiles.length; j++) {
            if (j < rowTiles.length - 1 && rowTiles[j].exp === rowTiles[j + 1].exp) {
                const mergedExp = rowTiles[j].exp + 1;
                newRow.push({
                    id: tileIdRef.current++,
                    exp: mergedExp,
                    position: getIndex(i, newRow.length),
                    // new: true
                });
                newScore += Math.pow(2, mergedExp);
                j++; // Skip the next element since it's merged
            } else {
                newRow.push({
                    ...rowTiles[j],
                    position: getIndex(i, newRow.length),
                    // new: false
                });
            }
        }
        newRow.forEach(tile => movedTiles.push(tile));
    }
    return [movedTiles, newScore];
}

/**
 * 
 * @param {Object[]} tiles 
 * @param {number} action 
 * @param {React.MutableRefObject<number>} tileIdRef 
 * @returns {[Object[], number]}
 */
export function gameStep(tiles, action, tileIdRef) {
    let newState = [...tiles]; // Create a shallow copy of tiles
    let scoreInc = 0;


    // Rotate, flip, and move logic goes here, similar to your original code, adapted to handle tile objects

    switch (action) {
        case 0: // Up
            newState = rotateClockwise(rotateClockwise(rotateClockwise(newState))); // Rotate 270° to align for a left move
            [newState, scoreInc] = moveLeft(newState, tileIdRef);
            newState = rotateClockwise(newState); // Rotate back 90°
            break;
        case 1: // Down
            newState = rotateClockwise(newState); // Rotate 90° to align for a left move
            [newState, scoreInc] = moveLeft(newState, tileIdRef);
            newState = rotateClockwise(rotateClockwise(rotateClockwise(newState))); // Rotate back 270°
            break;
        case 2: // Left
            [newState, scoreInc] = moveLeft(newState, tileIdRef); // Direct left move
            break;
        case 3: // Right
            newState = flipHorizontal(newState); // Flip horizontally to align for a left move
            [newState, scoreInc] = moveLeft(newState, tileIdRef);
            newState = flipHorizontal(newState); // Flip back
            break;
        default:
            console.log("Invalid action!");
            return [newState, 0];
    }

    return [newState, scoreInc];
}


function rotateClockwise(tiles) {
    return tiles.map(tile => {
        const { row, col } = getPosition(tile.position);
        const newPosition = col * 4 + (3 - row);
        return { ...tile, position: newPosition };
    });
}


function getPosition(index) {
    return { row: Math.floor(index / 4), col: index % 4 }; // Helper function to get row and column from index
}

function getIndex(row, col) {
    return row * 4 + col; // Helper function to get index from row and column
}


function flipHorizontal(tiles) {
    return tiles.map(tile => {
        const { row, col } = getPosition(tile.position);
        const newPosition = row * 4 + (3 - col);
        return { ...tile, position: newPosition };
    });
}



/**
 * 
 * @param {Object[]} tiles 
 * @returns {boolean}
 */
export function checkGameOver(tiles) {
    // Check for any empty positions
    if (tiles.length < 16) return false;

    let state = Array(16).fill(0);
    tiles.forEach(tile => state[tile.position] = tile.exp);

    // Check for possible merges horizontally and vertically
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let current = state[i * 4 + j];
            // Check right and down (no need for left and up as those will be checked by those cells)
            if (j < 3 && current === state[i * 4 + j + 1]) { // Check right
                return false;
            }
            if (i < 3 && current === state[(i + 1) * 4 + j]) { // Check down
                return false;
            }
        }
    }

    return true; // No moves left
}


