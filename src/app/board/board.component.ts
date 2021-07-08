import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares!: any[];
  xIsNext!: boolean;
  winner!: string;
  combos!: any[];
  loader: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.combos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.xIsNext = true;
    this.winner = '';
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    this.loader = true;
    if(!this.squares[idx] && !this.winner) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
      setTimeout(() => {
        this.makeAutoMove();
        this.winner = this.calculateWinner();
      }, 200);
    } else {
      this.loader = false;
    }
  }

  makeAutoMove() {
    let flag = 0;
    for (let i = 0; i < this.combos.length; i++) {
      const [a, b, c] = this.combos[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b]
      ) {
        if(!this.squares[c] && !this.winner) {
          this.squares.splice(c, 1, this.player);
          this.xIsNext = !this.xIsNext;
          flag = 0;
          i=10;
        }
      } else if (
        this.squares[a] &&
        this.squares[a] === this.squares[c]
      ) {
        if(!this.squares[b] && !this.winner) {
          this.squares.splice(b, 1, this.player);
          this.xIsNext = !this.xIsNext;
          flag = 0;
          i=10;
        }
      } else if (
        this.squares[b] &&
        this.squares[b] === this.squares[c]
      ) {
        if(!this.squares[a] && !this.winner) {
          this.squares.splice(a, 1, this.player);
          this.xIsNext = !this.xIsNext;
          flag = 0;
          i=10;
        }
      } else {
        flag = 1;
      }
    }
    if(flag===1) {
      let filled = 0;
      while(filled===0) {
        const n = Math.floor(Math.random() * 9);
        if(!this.squares[n]) {
          this.squares.splice(n, 1, this.player);
          this.xIsNext = !this.xIsNext;
          filled++;
        }
      }
      this.loader = false;
    } else {
      this.loader = false;
    }
  }

  calculateWinner() {
    for (let i = 0; i < this.combos.length; i++) {
      const [a, b, c] = this.combos[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }

  onClose() {
    this.newGame();
  }

}
