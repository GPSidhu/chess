import React, {Component} from 'react';
import pieceIcons from '../icons';

const pieceIconMap = {
    'K': 'wK',
    'Q': 'wQ',
    'B': 'wB',
    'N': 'wN',
    'R': 'wR',
    'P': 'wP',
    'k': 'bK',
    'q': 'bQ',
    'b': 'bB',
    'n': 'bN',
    'r': 'bR',
    'p': 'bP'
}
class Piece extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: props.file,
            rank: props.rank,
            isCaptured: props.isCaptured
        }
    }
    render() {
        return (
            <div className='piece' style={this.props.style} onClick={(e) => {alert('piece clicked')}}>
                <img src={pieceIcons[pieceIconMap[this.props.type]]} alt={pieceIconMap[this.props.type]} />
            </div>
        )
    }
}

export default Piece;
