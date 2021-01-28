import React, {Component, Fragment} from 'react';
// import ExampleSVG from '../icons/wB.png';
import Piece from './piece';
import './style.scss';
import {
    BOARD_SIZE,
    FILES,
    RANKS,
    WHITE,
    BLACK,
    INIT_FEN_STR
} from '../constants';

class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rotatePressed: false,
            resetPressed: false,
            fen: INIT_FEN_STR
        };
    }
    
    componentDidUpdate(prevProps) {
        // rotate board based if viewMode changes i.e. either black or white on top
        if (this.props.viewMode !== prevProps.viewMode) {
            this.setState((state) => ({
                rotatePressed: true
            }))
            // Reset rotatePressed to null
            setTimeout(() => {
                this.setState((state) => ({
                    rotatePressed: false
                }))
            }, 2000)
        }
    }

    renderSquareMarking(file, rank, index, player, squareColor) {
        let marking = [];
        if (player === BLACK) {
            if (index === 0) {
                let rankCls = ['rank-txt'];
                if (rank === 7)
                    rankCls.push('last-rank');
                
                marking.push(<span key={`rank_${rank+1}`}className={rankCls.join(' ')}>{rank+1}</span>);
            }
            if (rank === 7) {
                marking.push(<span key={file} className={`file-txt`}>{FILES[FILES.length - index - 1]}</span>)
            }
        }
        
        if (player === WHITE) {
            if (index === 0) {
                let rankCls = ['rank-txt'];
                if (rank === 7)
                    rankCls.push('last-rank');
                
                marking.push(<span key={`rank_${Math.abs(rank-8)}`} className={rankCls.join(' ')}>{Math.abs(rank-8)}</span>)
            }
            if (rank === 7) {
                marking.push(<span key={file} className={`file-txt`}>{file}</span>)
            }
        }
        return <Fragment>{marking}</Fragment>
    }

    renderBoard () {
        const boardSize = this.props.size;
        const viewMode = this.props.viewMode;
        let grid = [];
        for(let i = 0; i < boardSize; i++) {
            grid.push(
                <div key={`${RANKS[i]}`} className='file'>
                    {FILES.map(
                        (e,index) => {
                            let cls = ['square'];
                            if ((i + index) % 2 === 1)
                                cls.push('black')
                            else
                                cls.push('white');
                            return (
                                <div key={`${e}${RANKS[(index % 8) + 1]}`} className={cls.join(' ')}>
                                    {this.renderSquareMarking(e, i, index, viewMode, cls[0])}
                                </div>
                                )
                        })
                    }
                </div>);
        }
        return grid;
    }

    renderPieces(fenStr) {
        const rankPositions = this.getRankPositions(fenStr);
        if (!rankPositions)
            return <Fragment/>;
        
        return rankPositions.map((pos, index) => (this.renderPiecesPerRank(pos, index+1)));
    }

    renderPiecesPerRank(rankStr, rank) {
        // Lets consider fixed width and height of each square for the time being
        const SQUARE_SIZE = 90; //px
        let counter = 0;
        let pieces = [];
        for (let s in rankStr) {
            const c = rankStr[s];
            // console.log(c)
            if (/^\d+$/.test(c)) {
                // Empty square
                counter += parseInt(c);
            } else {
                // Piece is there
                let left = Math.abs(counter- (this.props.viewMode === BLACK ? 7 : 0)) * SQUARE_SIZE;
                // if viewMode === WHITE => positions array 0 -> 8th rank and 7 is 1st rank and vice versa for files
                // if viewMode === BLACK => positions array 0 -> 1st rank and 7 is 8th rank and vice versa for files
                let top = Math.abs(rank-1- (this.props.viewMode === BLACK ? 7 : 0)) * SQUARE_SIZE;
                let pieceStyle = {
                    left: left + 'px',
                    top: top + 'px'
                }
                pieces.push(<Piece key={`${c}_${counter}${rank}`} type={c} style={pieceStyle}/>);
                counter++;
            }
        }
        return pieces;
    }

    getRankPositions(fenStr) {
        if (!fenStr)
            return null;
        
        console.log('fen: '+fenStr)
        const fenArr = fenStr.split(' ');
        const positions = fenArr[0].split('/');
        return positions;
    }

    render() {
        let cls = ['board'];
        const fenStr = this.state.fen;
        
        if (this.state.rotatePressed)
            cls.push('rotate');
        
        return (
            <div className={cls.join(' ')}>
                {this.renderBoard(BOARD_SIZE)}
                {this.renderPieces(fenStr)}
            </div>
        )
    }
}

export default Board