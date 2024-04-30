import React, { useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import Header from './components/Header';

import { gameStep, checkGameOver } from './gameLogic';

function App() {

  const [exps, setExps] = useState(Array(16).fill(0));
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const [gameOver, setGameOver] = useState(false);



  const addRandomTile = useCallback((newExps) => {
    if (!newExps.includes(0)) {
      console.log('No space left!');
      return;
    }

    let added = false;
    while (!added) {
      let randomIndex = Math.floor(Math.random() * 16);
      if (newExps[randomIndex] === 0) {
        newExps[randomIndex] = Math.random() < 0.8 ? 1 : 2;
        added = true;
      }
    }
  }, []);


  const reset = useCallback(() => {
    setGameOver(false);
    setScore(0);
    let newExps = Array(16).fill(0);
    addRandomTile(newExps);
    addRandomTile(newExps);
    setExps(newExps);
  }, [addRandomTile]);


  const initializeGame = useCallback(() => {
    const savedBestScore = localStorage.getItem('bestScore');
    setBestScore(savedBestScore ? parseInt(savedBestScore, 10) : 0);
    reset();
  }, [reset]);


  const makeMove = useCallback((action) => {
    const [newState, scoreInc] = gameStep(exps, action);

    // Check if the state has changed
    if (JSON.stringify(newState) === JSON.stringify(exps)) {
      return;
    }
    setExps(newState);
    // Add a new tile if the state has changed (and the game is not over)
    if (newState.includes(0)) {
      addRandomTile(newState);
    }


    if (checkGameOver(newState)) {
      console.log('Game Over!');
      setGameOver(true);
    }

    if (scoreInc > 0) {
      setScore(score + scoreInc);
    }




  }, [addRandomTile, exps, score]);


  const handleKeyPress = useCallback((event) => {

    if (gameOver) {
      return;
    }

    let action;
    action = -1;
    if (event.key === 'ArrowUp') {
      action = 0;
    } else if (event.key === 'ArrowDown') {
      action = 1;
    } else if (event.key === 'ArrowLeft') {
      action = 2;
    } else if (event.key === 'ArrowRight') {
      action = 3;
    }

    if (action === -1) {
      return;
    }

    makeMove(action);



  }, [gameOver, makeMove]);


  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);


  useEffect(() => {
    initializeGame();
  }, [initializeGame]);


  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem('bestScore', score.toString());
    }
  }, [score, bestScore]);



  return (
    <div className='flex flex-col min-h-screen bg-background_color'>
      <div className="flex-1 mx-auto w-72 xl:w-[450px]">
        <Header score={score} bestScore={bestScore} OnNewGame={reset}></Header>
        <Board exps={exps}></Board>
      </div>
    </div>
  );
}

export default App;
