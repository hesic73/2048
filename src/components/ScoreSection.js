import React, { useEffect, useState, useRef } from "react";

/**
 * 
 * @param {Object} props
 * @param {string} props.text 
 * @param {number} props.score
 * @returns 
 */
function ScoreSection({ text, score }) {
    const [showAnimation, setShowAnimation] = useState(false);
    const [scoreChange, setScoreChange] = useState(0);
    const previousScore = useRef(score);

    useEffect(() => {
        const change = score - previousScore.current;  // Calculate the change in score

        if (change > 0) {  // If the score has increased
            setScoreChange(change);       // Set the score change state
            setShowAnimation(true);       // Trigger the animation

            // Automatically hide the animation after it finishes
            setTimeout(() => setShowAnimation(false), 500);
        }

        // Always update the previous score after processing
        previousScore.current = score;
    }, [score]);

    return (
        <div className="relative p-2 rounded bg-[#bbada0] px-2.5 xl:px-5 py-1">
            <p className="text-[13px] font-bold text-center text-[#eee4da]">{text}</p>
            <p className="text-2xl font-bold text-center text-white">{score}</p>
            {showAnimation && (
                <div className="absolute left-0 bottom-0 w-full text-center font-bold text-[1rem] text-score_addition z-10 animate-moveup">
                    +{scoreChange}
                </div>
            )}
        </div>
    );
}

export default ScoreSection;
