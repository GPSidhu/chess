import React, {Component} from 'react';
import { BOARD_SIZE } from '../constants';
import Board from './board';

class Main extends Component {
    render() {
        return <Board size={BOARD_SIZE}/> 
    }
}

export default Main