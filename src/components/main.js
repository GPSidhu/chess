import React, {Component} from 'react';
import { BOARD_SIZE, WHITE, BLACK, INIT_FEN_STR } from '../constants';
import Board from './board';
import UserInfoPanel from './user-info-panel';
import ControlPanel from './control-panel';

class Main extends Component {
    constructor() {
        super()
        this.state = {
            viewMode: WHITE,
            player1: {
                name: 'Player 1 - White'
            },
            player2: {
                name: 'Player 2 - Black'
            }
        }
        this.rotateBoard = this.rotateBoard.bind(this);
        this.resetBoard = this.resetBoard.bind(this);
    }

    rotateBoard() {
        this.setState((state) => ({
            player1: state.player2,
            player2: state.player1,
            viewMode: state.viewMode === WHITE ? BLACK : WHITE
        }))
    }

    resetBoard() {
        this.setState((state) => ({
            fen: INIT_FEN_STR
        }))
    }

    render() {
        return (
            <div className='chess'>
                <div className='container'>
                    <div className='left-container'>
                        <div className='user-panel'>
                            <UserInfoPanel user={this.state.player2}/>
                        </div>
                        <div className='board-container'>
                            <Board fen={this.state.fen} size={BOARD_SIZE} viewMode={this.state.viewMode}/>
                        </div>
                        <div className='user-panel'>
                            <UserInfoPanel user={this.state.player1}/>
                        </div>
                    </div>
                    <div className='right-container'>
                        <ControlPanel onResetBoard={this.resetBoard} onRotateBoard={this.rotateBoard}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main