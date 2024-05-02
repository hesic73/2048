import React from "react";

/**
 * Renders a single tile.
 * 
 * @param {Object} props
 * @param {number} props.exp - The exponent (power of 2) representing the tile's value.
 * @param {number} props.position 
 * @param {boolean} props.newTile - If the tile is newly added.
 * @returns The tile component.
 */
function Tile({ exp, position, newTile }) {
    const positionClass = getPositionClass(Math.floor(position / 4) + 1, (position % 4) + 1);
    const newTileAnimation = newTile ? "animate-spawn duration-500" : "";

    const [bg_color, text_color] = getBgColorAndTextColor(exp);
    const text = exp === 0 ? "" : (2 ** exp).toString();
    const font_size = getFontSize(text);

    const moveAnimation = "transition-position duration-200 ease-out";

    // Adding transparent padding within each tile
    return (
        <div className={`absolute w-1/4 h-1/4 ${positionClass} p-1 flex items-center justify-center ${moveAnimation} z-10`}>
            <div className={`flex items-center justify-center w-full h-full ${bg_color} ${text_color} font-bold ${font_size} rounded-[3px] ${newTileAnimation}`}>
                {text}
            </div>
        </div>
    );
}


/**
 * 
 * @param {Object} props 
 * @param {number} props.position
 * @returns 
 */
export function Grid({ position }) {
    const positionClass = getPositionClass(Math.floor(position / 4) + 1, (position % 4) + 1);
    return (
        <div className={`absolute w-1/4 h-1/4 ${positionClass} p-1 flex items-center justify-center`}>
            <div className={`flex items-center justify-center w-full h-full bg-grid_cell_0 rounded-[3px]`}>
            </div>
        </div>
    );
}


/**
 * 
 * @param {number} rowStart 
 * @param {number} colStart 
 * @returns {string}
 */
function getPositionClass(rowStart, colStart) {
    let row_class, col_class;

    switch (rowStart) {
        case 1: row_class = "top-0"; break;
        case 2: row_class = "top-1/4"; break;
        case 3: row_class = "top-2/4"; break;
        case 4: row_class = "top-3/4"; break;
        default: break; // Optionally handle unexpected cases
    }

    switch (colStart) {
        case 1: col_class = "left-0"; break;
        case 2: col_class = "left-1/4"; break;
        case 3: col_class = "left-2/4"; break;
        case 4: col_class = "left-3/4"; break;
        default: break; // Optionally handle unexpected cases
    }

    return `${row_class} ${col_class}`;
}


/**
 * 
 * @param {string} text
 * @returns string
 */
function getFontSize(text) {
    if (text.length === 0) {
        return "";
    }
    if (text.length < 3) {
        return "text-[35px] xl:text-[53px]";
    } else if (text.length < 4) {
        return "text-[25px] xl:text-[45px]";
    } else {
        return "text-[21px] xl:text-[33px]";
    }
}

/**
 * 
 * @param {number} exp 
 * @returns {[string, string]}
 */
function getBgColorAndTextColor(exp) {


    // Weirdly this doesn't work

    // let bg_color = exp >= 0 && exp <= 11 ? `bg-grid_cell_${exp}` : "";
    // let text_color = exp > 0 && exp <= 11 ? `text-grid_cell_text_${exp}` : "";

    // if (exp < 0 || exp > 11) {
    //     alert("Invalid exp value: " + exp);
    //     bg_color = "";
    //     text_color = "";
    // }


    let bg_color;
    let text_color;

    switch (exp) {
        case 0:
            bg_color = "bg-grid_cell_0";
            text_color = "";
            break;

        case 1:
            bg_color = "bg-grid_cell_1";
            text_color = "text-grid_cell_text_1";
            break;

        case 2:
            bg_color = "bg-grid_cell_2";
            text_color = "text-grid_cell_text_2";
            break;

        case 3:
            bg_color = "bg-grid_cell_3";
            text_color = "text-grid_cell_text_3";
            break;

        case 4:
            bg_color = "bg-grid_cell_4";
            text_color = "text-grid_cell_text_4";
            break;

        case 5:
            bg_color = "bg-grid_cell_5";
            text_color = "text-grid_cell_text_5";
            break;

        case 6:
            bg_color = "bg-grid_cell_6";
            text_color = "text-grid_cell_text_6";
            break;

        case 7:
            bg_color = "bg-grid_cell_7";
            text_color = "text-grid_cell_text_7";
            break;

        case 8:
            bg_color = "bg-grid_cell_8";
            text_color = "text-grid_cell_text_8";
            break;

        case 9:
            bg_color = "bg-grid_cell_9";
            text_color = "text-grid_cell_text_9";
            break;

        case 10:
            bg_color = "bg-grid_cell_10";
            text_color = "text-grid_cell_text_10";
            break;

        case 11:
            bg_color = "bg-grid_cell_11";
            text_color = "text-grid_cell_text_11";
            break;


        default:
            alert("Invalid exp value: " + exp);
            bg_color = "";
            text_color = "";
    }

    return [bg_color, text_color];
}

export default Tile;