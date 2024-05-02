import React, { useState, useEffect, useCallback, useRef } from 'react';
import Board from './components/Board';
import Header from './components/Header';
import MobileSwiper from './components/MobilrSwiper';

import { gameStep, checkGameOver, checkWin, spawnTile, isValid, Action } from './gameLogic';

/**
 * @typedef {import('./types').TileProps} TileProps
 */

const GameState = Object.freeze({
  IN_PROGRESS: 0,
  FAILED: 1,
  WIN: 2
});

function App() {

  const [tiles, setTiles] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);


  // 0: Game in progress
  // 1: failed
  // 2: win
  const [gameState, setGameState] = useState(GameState.IN_PROGRESS);
  const tileIdRef = useRef(0);



  const reset = useCallback(() => {
    setGameState(GameState.IN_PROGRESS);
    setScore(0);
    let initialTiles = [];
    spawnTile(initialTiles, tileIdRef); // Add first random tile
    spawnTile(initialTiles, tileIdRef); // Add second random tile
    setTiles(initialTiles);

    // Clear previous game state from localStorage
    localStorage.removeItem('tiles');
    localStorage.removeItem('currentScore');
  }, []);



  const initializeGame = useCallback(() => {
    const savedBestScore = localStorage.getItem('bestScore');
    const savedTiles = localStorage.getItem('tiles');
    const savedScore = localStorage.getItem('currentScore');

    setBestScore(savedBestScore ? parseInt(savedBestScore, 10) : 0);
    setScore(savedScore ? parseInt(savedScore, 10) : 0);

    if (savedTiles) {
      try {

        /**
         * @type {TileProps[]}
         */
        const loadedTiles = JSON.parse(savedTiles).map(tile => ({
          ...tile,
          newTile: true
        }));

        if (isValid(loadedTiles)) {
          setTiles(loadedTiles);
          if (checkGameOver(loadedTiles)) {
            console.log('Game over detected upon load, resetting.');
            reset();
          }
        } else {
          console.error('Invalid tiles detected, resetting game.');
          reset();
        }
      } catch (error) {
        console.error('Error parsing tiles from localStorage:', error);
        reset();
      }
    } else {
      reset();
    }
  }, [reset]);


  const makeMove = useCallback((action) => {
    const [newTiles, scoreInc] = gameStep(tiles, action, tileIdRef);

    // Create string representations of tiles before and after the move to compare their states
    const oldTileSet = new Set(tiles.map(tile => `${tile.position}:${tile.exp}`));
    const newTileSet = new Set(newTiles.map(tile => `${tile.position}:${tile.exp}`));

    // Check if the sets are different, indicating a change in the board
    const tilesChanged = newTiles.length !== tiles.length || [...newTileSet].some(tile => !oldTileSet.has(tile));

    if (!tilesChanged) {
      console.log('No change in tiles!');
      return;
    }

    if (checkWin(newTiles)) {
      console.log('You win!');
      setGameState(GameState.WIN);
    }


    if (newTiles.length < 16) {
      spawnTile(newTiles, tileIdRef);
    }

    if (checkGameOver(newTiles)) {
      console.log('You lose!');
      setGameState(GameState.FAILED);
    }

    setTiles(newTiles);
    if (scoreInc > 0) {
      setScore(prev => prev + scoreInc);
    }

    setTimeout(() => {
      localStorage.setItem('tiles', JSON.stringify(newTiles));
      localStorage.setItem('currentScore', (score + scoreInc).toString());
    }, 0);

  }, [tiles, score]);


  const handleKeyPress = useCallback((event) => {
    if (gameState !== GameState.IN_PROGRESS) return;
    const keyActionMap = { ArrowUp: Action.UP, ArrowDown: Action.DOWN, ArrowLeft: Action.LEFT, ArrowRight: Action.RIGHT };
    const action = keyActionMap[event.key];
    if (action !== undefined) makeMove(action);
  }, [gameState, makeMove]);


  const handleSwipe = useCallback(
    ({ deltaX, deltaY }) => {

      if (gameState !== GameState.IN_PROGRESS) return;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
          makeMove(Action.RIGHT);
        } else {
          makeMove(Action.LEFT);
        }
      } else {
        if (deltaY > 0) {
          makeMove(Action.DOWN);
        } else {
          makeMove(Action.UP);
        }
      }
    },
    [gameState, makeMove],
  );


  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
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
    <MobileSwiper onSwipe={handleSwipe}>
      <div className='flex flex-col min-h-screen bg-background_color'>
        <div className="flex-1 mx-auto w-72 xl:w-[28rem]">
          <Header score={score} bestScore={bestScore} OnNewGame={reset}></Header>
          <Board tiles={tiles}></Board>
        </div>
      </div>
    </MobileSwiper>
  );
}


export default App;
