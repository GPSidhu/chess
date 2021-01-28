import React, {Component} from 'react';

class ControlPanel extends Component {
    render() {
        return (
            <div>
                <button className='rotate-btn' onClick={()=> {
                    this.props.onRotateBoard()
                }}>Rotate</button>
                <button className='reset-btn' onClick={()=> {
                    this.props.onResetBoard()
                }}>Reset</button>
            </div>
        )
    }
}

export default ControlPanel;
