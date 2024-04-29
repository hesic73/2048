import React from "react";

/**
 * 
 * @param {Object} props
 * @param {number} props.exp
 * @returns 
 */
function GridCell({ exp }) {

    let bg_color;
    let text_color;

    // 字符串拼接有莫名的bug。也许和tailwindcss有关。
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

    const text = exp === 0 ? "" : (2 ** exp).toString();
    return (
        <div className={`w-20 h-20 flex items-center justify-center ${bg_color} ${text_color} font-bold text-3xl`}>
            {text}
        </div>
    );
}

export default GridCell;