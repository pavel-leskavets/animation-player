import React, { Component } from 'react';
import './AnimationComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompress } from '@fortawesome/free-solid-svg-icons';
import CoordinateComponent from '../CoordinatesComponent/CoordinateComponent';
class AnimationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            count: 0,
            interval: 0
        };
    }
    componentWillMount() {
        this.setTimer();
    }
    setTimer = () => {
        clearInterval(this.state.interval);
        let timerId = setInterval(() => {
            let canvasImg = document.querySelectorAll('#mini-canvas');
            let canvas = document.querySelector('.animation-canvas');
            if (canvas !== null && canvasImg !== null) {
                let context = canvas.getContext('2d');
                context.clearRect(0, 0, canvas.width, canvas.height);
                if (canvasImg[this.state.count]) {
                    context.drawImage(canvasImg[this.state.count], 0, 0);
                }
                this.setState({ count: this.state.count + 1 });
                if (this.state.count === canvasImg.length) {
                    this.setState({ count: 0 });
                }
            }
        }, 1000 / this.state.value);
        this.setState({ interval: timerId });
    };
    handleChange = e => {
        this.setState({ value: e.target.value });
        this.setTimer();
    };
    toFullScreen = () => {
        document.querySelector('.animation-canvas').webkitRequestFullscreen();
    };
    shouldComponentUpdate(nextState) {
        return this.state.value !== nextState.value;
    }

    render() {
        return (
            <div className="animation">
                <canvas className="animation-canvas" width="64" height="64" />
                <input
                    id="range-input"
                    type="range"
                    min="1"
                    max="24"
                    step="1"
                    value={this.state.value}
                    onChange={this.handleChange}
                    className="input-animation"
                />
                <label htmlFor="range-input" className="input-label">
                    FPS {this.state.value}
                </label>
                <FontAwesomeIcon
                    icon={faCompress}
                    onClick={this.toFullScreen}
                    className="fullscreen-icon"
                />
                <CoordinateComponent
                    coordX={this.props.coordX}
                    coordY={this.props.coordY}
                />
            </div>
        );
    }
}
export default AnimationComponent;
