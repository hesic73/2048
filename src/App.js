import React, { useState, useEffect, useCallback, useRef } from 'react';
import Board from './components/Board';
import Header from './components/Header';

import { gameStep, checkGameOver } from './gameLogic';


function spawnTile(currentTiles, tileIdRef) {
  const emptyIndices = Array.from({ length: 16 }, (_, index) => index).filter(index => !currentTiles.some(tile => tile.position === index));
  if (emptyIndices.length === 0) {
    console.log('No space left!');
    return;
  }
  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  const newTile = {
    id: tileIdRef.current++,  // Assume tileIdRef is still defined in your component to keep track of unique IDs
    exp: Math.random() < 0.8 ? 1 : 2, // Exponent for 2 or 4
    position: randomIndex,
  };
  currentTiles.push(newTile);
}


function App() {

  const [tiles, setTiles] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const tileIdRef = useRef(0);



  const reset = useCallback(() => {
    setGameOver(false);
    setScore(0);
    let initialTiles = [];
    spawnTile(initialTiles, tileIdRef); // Add first random tile
    spawnTile(initialTiles, tileIdRef); // Add second random tile
    setTiles(initialTiles);
  }, []);


  const initializeGame = useCallback(() => {
    const savedBestScore = localStorage.getItem('bestScore');
    setBestScore(savedBestScore ? parseInt(savedBestScore, 10) : 0);
    reset();
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


    if (newTiles.length < 16) {
      spawnTile(newTiles, tileIdRef);
    }

    if (checkGameOver(newTiles)) {
      console.log('Game over!');
      setGameOver(true);
    }

    setTiles(newTiles);
    if (scoreInc > 0) {
      setScore(prev => prev + scoreInc);
    }
  }, [tiles]);


  const handleKeyPress = useCallback((event) => {
    if (gameOver) return;
    const keyActionMap = { ArrowUp: 0, ArrowDown: 1, ArrowLeft: 2, ArrowRight: 3 };
    const action = keyActionMap[event.key];
    if (action !== undefined) makeMove(action);
  }, [gameOver, makeMove]);


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
    <div className='flex flex-col min-h-screen bg-background_color'>
      <div className="flex-1 mx-auto w-72 xl:w-[450px]">
        <Header score={score} bestScore={bestScore} OnNewGame={reset}></Header>
        <Board tiles={tiles}></Board>
      </div>
    </div>
  );
}

export default App;
