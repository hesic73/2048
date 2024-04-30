/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        background_color: 'rgba(238, 228, 218, 0.5)',
        grid_cell_0: 'rgba(238, 228, 218, 0.35)',

        grid_cell_1: '#eee4da',
        grid_cell_2: '#eee1c9',
        grid_cell_3: '#f3b27a',
        grid_cell_4: '#f69664',
        grid_cell_5: '#f77c5f',
        grid_cell_6: '#f75f3b',
        grid_cell_7: '#edd073',
        grid_cell_8: '#edcc62',
        grid_cell_9: '#edc950',
        grid_cell_10: '#edc53f',
        grid_cell_11: '#edc22e',

        grid_cell_text_1: '#776e65',
        grid_cell_text_2: '#776e65',
        grid_cell_text_3: '#f9f6f2',
        grid_cell_text_4: '#f9f6f2',
        grid_cell_text_5: '#f9f6f2',
        grid_cell_text_6: '#f9f6f2',
        grid_cell_text_7: '#f9f6f2',
        grid_cell_text_8: '#f9f6f2',
        grid_cell_text_9: '#f9f6f2',
        grid_cell_text_10: '#f9f6f2',
        grid_cell_text_11: '#f9f6f2',


        score_addition: 'rgba(119, 110, 101, 0.9)',

      },

      keyframes: {
        moveup: {
          '0%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
          '100%': {
            transform: 'translateY(-150px)',
            opacity: 0,
          },
        },
      },

      animation: {
        moveup: 'moveup 2s ease-out',
      },


    },
  },
  plugins: [],
}

