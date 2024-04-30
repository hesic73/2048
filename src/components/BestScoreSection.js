import React from "react";

/**
 * 
 * @param {Object} props
 * @param {string} props.text 
 * @param {number} props.score
 * @returns 
 */
function BestScoreSection({ text, score }) {


    return (
        <div className="relative p-2 rounded bg-[#bbada0] px-2.5 xl:px-5 py-1">
            <p className="text-[13px] font-bold text-center text-[#eee4da]">{text}</p>
            <p className="text-2xl font-bold text-center text-white">{score}</p>
        </div>
    );
}

export default BestScoreSection;
