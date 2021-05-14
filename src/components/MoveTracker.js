import React, { useState } from "react";
import styled from "styled-components";
import { MoveGenerator } from "../utils/scrap";
import { Nakhmanson } from "../utils/openings";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flext-start;
	align-items: center;
	height: 300px;
	width: 100%;
	border: 1px solid black;
	padding: 12px;
`;

const MoveLogArea = styled.div`
	border: 1px dotted;
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	align-items: start;
	width: 100%;
	min-height: 100px;
`;

const Move = styled.span`
	background-color: #fff;
	color: #000;
	border: 1px dashed grey;
	margin: 4px;
	padding: 2px;
`;

const MoveInputArea = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	min-height: 100px;
	width: 100%;
	padding: 12px;
`;

const MoveInput = styled.button`
	background-color: lightgrey;
	color: #000;
	border: 1px solid grey;
	margin: 4px;
	padding: 2px;
	height: 24px;
	cursor: pointer;
`;

const ButtonWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

function MoveTracker() {
	const [moves, setMoves] = useState([]);
	const [isInputRequired, setIsInputRequired] = useState(false);
	const [moveOptions, setMoveOptions] = useState([]);
	const [moveGen] = useState(new MoveGenerator(Nakhmanson));

	function checkNextMove() {
		debugger;
		let nextMove = moveGen.nextMove();
		if (!nextMove) return;
		if (nextMove.move && typeof nextMove.move === "string") {
			setMoves((prevMoves) => [...moveGen.getPlayedMoves()]);
			return;
		}
		if (typeof nextMove === "object" && nextMove.conditional) {
			const possibleMoves = nextMove.possibleMoves;
			if (possibleMoves && possibleMoves.length > 0) {
				// ask user for the input
				setIsInputRequired(true);
				setMoveOptions(() => [...possibleMoves]);
			}
		}
	}
	function onMoveSubmit(move) {
		debugger;
		if (move) {
			let nextMove = moveGen.nextMoveConditional(move);
			setIsInputRequired(true);
			setMoveOptions([]);
		} else {
			alert("Invalid move selected. Please select one of the options");
		}
	}
	return (
		<Container>
			<span>Move Tracker</span>
			<MoveLogArea>
				{moves &&
					moves.map((move, index) => (
						<Move key={`move_${index}`}>{`${index + 1}. ${
							move[0]
						} ${move[1] ? move[1] : ""}`}</Move>
					))}
			</MoveLogArea>

			{isInputRequired && (
				<MoveInputArea>
					{moveOptions &&
						moveOptions.map((option, idx) => (
							<MoveInput
								key={`mi_${idx}`}
								type="submit"
								onClick={() => onMoveSubmit(option)}
							>
								{option}
							</MoveInput>
						))}
				</MoveInputArea>
			)}
			<ButtonWrapper>
				<button>Prev</button>
				<button onClick={checkNextMove}>Next</button>
			</ButtonWrapper>
		</Container>
	);
}

export default MoveTracker;
