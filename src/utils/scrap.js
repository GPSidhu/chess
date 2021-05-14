import { Nakhmanson } from "./openings";

export function tester() {
	let n = Nakhmanson.length;
	let i = 1;
	let turn = "w";
	let lastMove = null;
	let moveGen = new MoveGenerator(Nakhmanson);
	while (i - 1 < n) {
		let nextMove = moveGen.nextMove();
		// console.log(nextMove);
		// if (typeof nextMove === "object" && nextMove.conditional) {
		//   // ask user to select a move
		//   nextMove = moveGen.nextMoveConditional(nextMove.possibleMoves[0]);
		// }

		if (turn === "w") {
			turn = "b";
		} else {
			turn = "w";
			i++;
		}
	}
}
export class MoveGenerator {
	constructor(moves = []) {
		this.allMoves = moves;
		this.turn = "w";
		this.moveNumber = 0;
		this.lastMove = null;
		this.currentList = JSON.parse(JSON.stringify(moves));
		this.currentListIndex = -1;
		this.history = [];
	}

	getTurnIndex() {
		return this.turn === "w" ? 0 : 1;
	}

	setCurrentList(list) {
		this.currentList = list;
	}

	nextMoveConditional(playedMove) {
		debugger;
		let turnIndex = this.getTurnIndex();
		this.logMove(playedMove);
		// get the moves object for the playedMove and

		let moveOptions = this.currentList[this.currentListIndex][turnIndex];
		if (moveOptions[playedMove]) {
			//valid move played
			//point currentList and currentList index to first array of the playeMove
			this.setCurrentList(moveOptions[playedMove]);
			this.currentListIndex = -1;
			this.updateTurn();
			return true;
		}

		return false;
	}

	updateTurn() {
		this.turn = this.turn === "w" ? "b" : "w";
	}

	logMove(move) {
		if (!move || !this.history || typeof move !== "string")
			return this.history;

		if (
			this.history.length === 0 ||
			this.history[this.history.length - 1].length === 2
		) {
			// this is white's move
			let newMove = [];
			newMove.push(move);
			this.history.push(newMove);
			return this.history;
		}

		if (this.history[this.history.length - 1].length === 1) {
			// this is black's move
			this.history[this.history.length - 1].push(move);
			return this.history;
		}
	}

	getPlayedMoves() {
		return this.history;
	}

	nextMove() {
		let nextMove = null;
		let turnIndex = this.getTurnIndex();
		if (this.turn === "w") this.currentListIndex++;

		if (this.currentListIndex < this.currentList.length) {
			nextMove = this.currentList[this.currentListIndex][turnIndex];
			if (typeof nextMove === "string") {
				this.logMove(nextMove);
				let res = {
					possibleMoves: [],
					conditional: false,
					move: nextMove,
					turn: this.turn,
					moveNum: this.moveNum,
				};
				this.updateTurn();
				return res;
			}
			if (typeof nextMove === "object") {
				let res = {
					possibleMoves: Object.keys(nextMove),
					conditional: true,
					move: "",
					turn: this.turn,
					moveNum: this.moveNum,
				};
				//this.updateTurn();
				return res;
			}
		}
	}
}
