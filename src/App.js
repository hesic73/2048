import React from 'react';
import Board from './components/Board';

function App() {
  const exps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 0, 0, 0]

  return (
    <div className="flex min-h-screen justify-center bg-background_color">
      <div className="mx-auto max-w-3xl p-8 bg-white shadow-lg rounded-lg">
        <Board exps={exps}></Board>
      </div>
    </div>
  );
}

export default App;
