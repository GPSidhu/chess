import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
// import ExampleSVG from '../icons/wB.png';
import Piece from './piece';
import './style.scss';
import {
    BOARD_SIZE,
    FILES,
    RANKS,
    WHITE,
    BLACK,
    INIT_FEN_STR,
    BOARD_SQ_SIZE,
    SQUARES,
    RANKS_MAP,
    FILES_MAP
} from '../constants';
import {
    FRToSquare
} from '../utils/conversions';

class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rotatePressed: false,
            resetPressed: false,
            fen: INIT_FEN_STR
        };
        this.filesArray = new Array(BOARD_SQ_SIZE);
        this.ranksArray = new Array(BOARD_SQ_SIZE);
        this.piecesArray = new Array(BOARD_SQ_SIZE);
        this.fiftyMove = 0;
        this.hisPly = 0; //count of half moves either side
        this.ply = 0;   // count of half moves in search tree
        this.castlePerm = 0;
        this.initBoard();
    }

    initBoard() {
        // Initialise all squares as offboard
        for (let i = 0; i < BOARD_SQ_SIZE; i++) {
            this.filesArray[i]  = SQUARES.OFFBOARD;
            this.ranksArray[i] = SQUARES.OFFBOARD;
        }
        // Initialise all board piece square values (8x8) with corresponding files/ranks
        for (let rank = RANKS_MAP['1']; rank <= RANKS_MAP['8']; rank++) {
            for (let file = FILES_MAP['a']; file <= FILES_MAP['h']; file++) {
                let sq = FRToSquare(file, rank);
                this.filesArray[sq] = file;
                this.ranksArray[sq] = rank;
            }
        }
        console.log("filesArray[0]: "+this.filesArray[0]+" ranksArray[0]: "+this.ranksArray[0]);
        console.log("filesArray[A1]: "+this.filesArray[SQUARES.A1]+" ranksArray[A1]: "+this.ranksArray[SQUARES.A1]);
        console.log("filesArray[E8]: "+this.filesArray[SQUARES.E8]+" ranksArray[E8]: "+this.ranksArray[SQUARES.E8]);

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
        if (this.props.fen !== prevProps.fen) {
            this.setState((state) => ({
                fen: this.props.fen
            }))
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

Board.propTypes = {
    fen: PropTypes.string.isRequired,
    size: PropTypes.number,
    viewMode: PropTypes.number
}

export default Board