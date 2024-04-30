import React from 'react';
import Board from './components/Board';
import Header from './components/Header';

function App() {
  const exps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 0, 0, 0]

  return (
    <div className='flex flex-col min-h-screen bg-background_color'>
      <div className="flex-1 mx-auto w-72 xl:w-[450px]">
        <Header></Header>
        <Board exps={exps}></Board>
      </div>
    </div>
  );
}

export default App;
