import { Component } from 'react';

import classes from './Modal.module.css';

class Modal extends Component {

    isModalClicked() {
        this.props.onClick();
    }

    render() {
        return (
            <div>
                <div className={classes.background_overlay} onClick={this.isModalClicked.bind(this)}></div>
                <div className={classes.modal}>
                    
                </div>
            </div>
        );
    }
}

export default Modal;