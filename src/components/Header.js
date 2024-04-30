import React from "react";

import ScoreSection from "./ScoreSection";


function Header() {
    return (
        <header className="p-0">
            <div className="flex justify-between items-center my-5">
                <h1 className='text-7xl font-bold text-[#776e65]'>2048</h1>
                <div className="flex space-x-4">
                    <ScoreSection text="SCORE" score={0}></ScoreSection>
                    <ScoreSection text="BEST" score={0}></ScoreSection>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <div className="text-[#776e65]">
                    <h2 className="text-base font-bold">Play 2048 Game Online</h2>
                    <p className="text-sm">Join the numbers and get to the <strong>2048</strong> tile!</p>
                </div>


                <button className="bg-[#8f7a66] text-white font-bold px-2 h-10 rounded">
                    New Game
                </button>
            </div>




        </header>
    );
}

export default Header;