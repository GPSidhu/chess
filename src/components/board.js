import React, {Component} from 'react';
import './style.scss';
import {
    BOARD_SIZE,
    FILES,
    RANKS
} from '../constants';


class Board extends Component {
    renderBoard () {
        const boardSize = this.props.size;
        let grid = [];
        console.log('boardSize:', boardSize)
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
                            return <div key={`${e}${RANKS[(index % 8) + 1]}`} className={cls.join(' ')} />
                        })
                    }
                </div>);
        }
        console.log(grid)
        return grid;
    }

    render() {
        return (
            <div className='board'>
                {this.renderBoard(BOARD_SIZE)}
            </div>
        )
    }
}

export default Board