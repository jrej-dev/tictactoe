import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  squares: string[];
  xIsNext: boolean;
  winner: string;
  result: string;
  lines: number[][];

  constructor() {}

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.result = null;
    this.xIsNext = true;
    this.lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  }

  get player() {
    if (this.winner !== null) { 
      return '-'
    } else if ( this.xIsNext === true ) {
      return 'You';
    } else {
      return 'Computer';
    }
  }

  makeMove(idx: number) {
    if (!this.squares[idx] && this.xIsNext === true) {
      this.squares.splice(idx, 1, 'X');
      this.xIsNext = !this.xIsNext;
    

      this.winner = this.calculateWinner();

      if (this.winner === null) {
        setTimeout(()=> this.computerTurn(),1000)
      }
    }
  }

  computerTurn() {
    let nextNull = this.squares.findIndex(element => element === null);
    if ( nextNull >= 0 ){
      this.squares.splice(nextNull, 1, 'O');
      this.xIsNext = !this.xIsNext;
      this.winner = this.calculateWinner();
    } else {
      this.result = "It's a draw!";
      this.winner === 'draw'
    }
  }

  calculateWinner() {
    for (let i = 0; i < this.lines.length; i++) {
      const [a, b, c] = this.lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) { 
        if (this.squares[a]==='X') {
          this.result = 'You won the game!';
          return 'user';
        } else if (this.squares[a]==='O') {
          this.result = 'The Computer won the game!';
          return 'opponent';
        }
      } 
    }
    return null;
  }
}