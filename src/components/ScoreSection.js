import React from "react";


/**
 * 
 * @param {Object} props
 * @param {string} props.text 
 * @param {number} props.score
 * @returns 
 */
function ScoreSection({ text, score }) {
    return (
        <div className="p-2 rounded bg-[#bbada0] px-5 py-1">
            <p className="text-xs text-center text-[#eee4da]">{text}</p>
            <p className="text-2xl font-bold text-center text-white">{score}</p>
        </div>);
}

export default ScoreSection;