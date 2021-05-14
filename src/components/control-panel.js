import React, {Component} from 'react';
import { INIT_FEN_STR } from '../constants';
import MoveTracker from './MoveTracker';

class ControlPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            position: INIT_FEN_STR
        }
        this.onFENChange = this.onFENChange.bind(this);
    }

    onFENChange(e) {
        this.setState({
            position: e.target.value
        });
    }

    render() {
        return (
            <div className='control-panel'>
                <div className="fen">
                    <label htmlFor="fen-txt">FEN</label>
                    <input id="fen-txt" 
                        type="text" className="form-control" 
                        // ref={(c) => this.title = c} 
                        name="title" 
                        value={this.state.position}
                        onChange={e => this.onFENChange(e)} />
                </div>
                <button type="button" onClick={() => {this.props.onSetPosition(this.state.position)}} className="btn">Set Position</button>
                <button className='btn' onClick={() => {this.props.onResetBoard()}}>Reset</button>
                <button className='btn' onClick={() => {this.props.onRotateBoard()}}>Rotate</button>

                <MoveTracker />
            </div>
        )
    }
}

export default ControlPanel;
