#!/usr/bin/env node
/* eslint-env node */
/* global process, setTimeout */

const readline = require('readline');

class TicTacToe {
  constructor() {
    this.reset();
  }

  reset() {
    this.board = Array(9).fill(' ');
    this.currentPlayer = 'X';
    this.isGameOver = false;
  }

  printBoard() {
    const rows = [
      `${this.board[0]} | ${this.board[1]} | ${this.board[2]}`,
      `${this.board[3]} | ${this.board[4]} | ${this.board[5]}`,
      `${this.board[6]} | ${this.board[7]} | ${this.board[8]}`,
    ];
    console.clear();
    console.log('Simple Tic-Tac-Toe');
    console.log(
      'Enter your move as "row col" (1-3 for each). Type q to quit.\n'
    );
    console.log(rows[0]);
    console.log('--+---+--');
    console.log(rows[1]);
    console.log('--+---+--');
    console.log(rows[2]);
    console.log(`\nPlayer ${this.currentPlayer}, it is your move.`);
  }

  makeMove(row, col) {
    if (this.isGameOver) {
      return { ok: false, message: 'Game is over. Start a new one.' };
    }
    if (![1, 2, 3].includes(row) || ![1, 2, 3].includes(col)) {
      return { ok: false, message: 'Row and column must be between 1 and 3.' };
    }
    const index = (row - 1) * 3 + (col - 1);
    if (this.board[index] !== ' ') {
      return { ok: false, message: 'Cell already taken. Try another.' };
    }

    this.board[index] = this.currentPlayer;
    if (this.checkWin()) {
      this.isGameOver = true;
      return { ok: true, message: `Player ${this.currentPlayer} wins!` };
    }
    if (this.board.every(cell => cell !== ' ')) {
      this.isGameOver = true;
      return { ok: true, message: 'Draw! No more moves left.' };
    }

    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    return { ok: true, message: null };
  }

  checkWin() {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    return winningLines.some(([a, b, c]) => {
      return (
        this.board[a] === this.board[b] &&
        this.board[b] === this.board[c] &&
        this.board[a] !== ' '
      );
    });
  }
}

const game = new TicTacToe();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askMove() {
  game.printBoard();
  rl.question('Move (row col) or q to quit: ', input => {
    if (input.trim().toLowerCase() === 'q') {
      rl.close();
      return;
    }

    const parts = input
      .replace(',', ' ')
      .split(' ')
      .map(v => v.trim())
      .filter(Boolean);

    const row = Number(parts[0]);
    const col = Number(parts[1]);

    if (Number.isNaN(row) || Number.isNaN(col) || parts.length < 2) {
      console.log('Invalid format. Use "row col" (e.g. "2 3").');
      return setTimeout(askMove, 1000);
    }

    const result = game.makeMove(row, col);
    if (!result.ok) {
      console.log(result.message);
      return setTimeout(askMove, 1000);
    }

    if (game.isGameOver) {
      game.printBoard();
      console.log(result.message);
      rl.question('Play again? (y/n): ', answer => {
        if (answer.trim().toLowerCase().startsWith('y')) {
          game.reset();
          return askMove();
        }
        rl.close();
      });
      return;
    }

    askMove();
  });
}

rl.on('close', () => {
  console.log('\nThanks for playing!');
});

askMove();
