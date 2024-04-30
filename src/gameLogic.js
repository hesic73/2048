
/**
 * 
 * @param {number[]} state 
 * @param {number} action 
 * @returns {[number[], number]}
 */
export function gameStep(state, action) {
    let newState = [];
    let scoreInc = 0;

    switch (action) {
        case 0: // Up
            state = rotateClockwise(rotateClockwise(rotateClockwise(state))); // Rotate 270° clockwise to align for left move
            [newState, scoreInc] = moveLeft(state);
            newState = rotateClockwise(newState); // Rotate back 90° clockwise
            break;
        case 1: // Down
            state = rotateClockwise(state); // Rotate 90° clockwise to align for left move
            [newState, scoreInc] = moveLeft(state);
            newState = rotateClockwise(rotateClockwise(rotateClockwise(newState))); // Rotate back 270° clockwise

            break;
        case 2: // Left
            [newState, scoreInc] = moveLeft(state);
            break;
        case 3: // Right
            state = flipHorizontal(state); // Flip horizontally to align for left move
            [newState, scoreInc] = moveLeft(state);
            newState = flipHorizontal(newState); // Flip back
            break;
        default:
            console.log("Invalid action!");
            return [state, 0];
    }

    return [newState, scoreInc];
}


/**
 * Rotates the board 90 degrees clockwise.
 * @param {number[]} state - The current state of the game board.
 * @returns {number[]} - The rotated game board.
 */
function rotateClockwise(state) {
    let newBoard = Array(16).fill(0);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            newBoard[j * 4 + (3 - i)] = state[i * 4 + j];
        }
    }
    return newBoard;
}


/**
 * Reflects the board horizontally.
 * @param {number[]} state - The current state of the game board.
 * @returns {number[]} - The horizontally flipped game board.
 */
function flipHorizontal(state) {
    let newBoard = Array(16).fill(0);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            newBoard[i * 4 + j] = state[i * 4 + (3 - j)];
        }
    }
    return newBoard;
}

/**
 * Checks if there are any valid moves left on the board.
 * @param {number[]} state - The current state of the game board.
 * @returns {boolean} - True if no valid moves left, otherwise false.
 */
export function checkGameOver(state) {
    // Check for any zeros (empty spaces)
    if (state.includes(0)) {
        return false;
    }

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


/**
 * Moves and merges tiles in the 2048 game to the left.
 * @param {number[]} state - The current state of the game board.
 * @returns {[number[], number]} - The new state of the game board and the score.
 */
function moveLeft(state) {
    let newBoard = [];
    let score = 0;

    // Process each row
    for (let i = 0; i < 4; i++) {
        let row = state.slice(i * 4, i * 4 + 4);
        let newRow = [];

        // Remove all zeros (simulate movement by compacting the row)
        row = row.filter(val => val !== 0);

        // Merge adjacent cells if they are the same
        for (let j = 0; j < row.length; j++) {
            if (row[j] === row[j + 1]) {
                newRow.push(row[j] + 1); // Merge and increase exponent for base 2
                score += Math.pow(2, row[j] + 1); // Add score based on merged value
                j++; // Skip the next element as it's merged
            } else {
                newRow.push(row[j]);
            }
        }

        // Fill the rest of the row with 0s
        while (newRow.length < 4) {
            newRow.push(0);
        }

        newBoard.push(...newRow);
    }

    return [newBoard, score];
}