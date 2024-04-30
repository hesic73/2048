import React from 'react';
import Board from './components/Board';
import Header from './components/Header';

function App() {
  const exps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 0, 0, 0]

  return (
    <div className='min-h-screen'>
      <div className="mx-auto max-w-md">
        <Header></Header>
        <Board exps={exps}></Board>
      </div>
    </div>

  );
}

export default App;
