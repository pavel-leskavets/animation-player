import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompress } from "@fortawesome/free-solid-svg-icons";
class AnimationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            count: 0,
            interval: 0
        };
    }

    setTimer = () => {
        const canvasImg = document.querySelectorAll("#mini-canvas");
        clearInterval(this.state.interval);
        let timerId = setInterval(() => {
            let canvas = document.querySelector(".animation-canvas");
            let context = canvas.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);
            let imgOfMiniCanvas = new Image(300, 300);
            imgOfMiniCanvas.src = canvasImg[this.state.count].toDataURL();
            let newCtx = canvas.getContext("2d");
            newCtx.drawImage(imgOfMiniCanvas, 0, 0);
            this.setState({ count: this.state.count + 1 });
            if (this.state.count === canvasImg.length) {
                this.setState({ count: 0 });
            }
        }, 1000 / this.state.value);
        this.setState({ interval: timerId });
    };
    handleChange = e => {
        this.setState({ value: e.target.value });
        this.setTimer();
    };
    toFullScreen = () => {
        document.querySelector(".animation-canvas").webkitRequestFullscreen();
    };
    shouldComponentUpdate(nextState) {
        return this.state.value !== nextState.value;
    }
    render() {
        return (
            <div className="animation">
                <canvas className="animation-canvas" />
                <input
                    id="range-input"
                    type="range"
                    min="1"
                    max="24"
                    step="1"
                    value={this.state.value}
                    onChange={this.handleChange}
                />
                <label htmlFor="range-input" className="input-label">
                    FPS {this.state.value}
                </label>
                <FontAwesomeIcon
                    icon={faCompress}
                    onClick={this.toFullScreen}
                    className="fullscreen-icon"
                />
                <button className="animation-start" onClick={this.setTimer}>
                    {" "}
                    Start Animation
                </button>
            </div>
        );
    }
}
export default AnimationContainer;
