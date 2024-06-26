import React from "react";

import ScoreSection from "./ScoreSection";
import BestScoreSection from "./BestScoreSection";

/**
 * 
 * @param {Object} props
 * @param {number} props.score 
 * @param {number} props.bestScore
 * @param {number} props.change
 * @param {()=>voidu} props.OnNewGame
 * @returns 
 */
function Header({ score, bestScore, OnNewGame }) {
    return (
        <header className="p-0">
            <div className="flex justify-between items-center my-5">
                <h1 className='text-[31px] xl:text-[74px] leading-[66px] font-bold text-[#776e65]'>2048</h1>
                <div className="flex space-x-4">
                    <ScoreSection text="SCORE" score={score}></ScoreSection>
                    <BestScoreSection text="BEST" score={bestScore}></BestScoreSection>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <div className="text-[#776e65]">
                    <h2 className="text-[1em] xl:text-[1.5em] font-bold">Play 2048 Game Online</h2>
                    <p className="text-sm">Join the numbers and get to the <strong>2048</strong> tile!</p>
                </div>


                <button onClick={OnNewGame} className="bg-[#8f7a66] text-white font-bold px-2 h-10 rounded text-[15px] leading-[40px] whitespace-nowrap">
                    New Game
                </button>
            </div>




        </header>
    );
}

export default Header;