import React, { Component } from "react";

class MainCanvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            isMouseDown: false,
            context: ""
        };
    }
    mouseDown = () => {
        this.setState({ isMouseDown: true });
    };
    mouseUp = () => {
        this.setState({ isMouseDown: false });
        this.state.context.beginPath();
    };
    updateMiniCanvas = () => {
        let canv = document.querySelector("#main-canvas");
        let imgOfMainCanvas = new Image(120, 120);
        imgOfMainCanvas.src = canv.toDataURL();
        let miniCanvas = document.querySelector(".active");
        let newCtx = miniCanvas.getContext("2d");
        newCtx.drawImage(imgOfMainCanvas, 0, 0);
    };
    mouseMove = e => {
        if (this.state.isMouseDown === true) {
            let canv = document.querySelector("#main-canvas");
            let ctx = canv.getContext("2d");
            let objCoords = canv.getBoundingClientRect();
            let canvStyles = window.getComputedStyle(canv);
            let canvWidth = parseInt(canvStyles.width);
            this.updateMiniCanvas();
            this.setState({ context: ctx });
            this.setState({ value: this.state.value + 1 });

            ctx.lineWidth = 4;
           ctx.lineTo(
                ((e.clientX - canv.offsetLeft) * canv.width) / canv.clientWidth,
                ((e.clientY - canv.offsetTop) * canv.height) / canv.clientHeight
            );
            ctx.stroke();
            ctx.beginPath();

            ctx.arc(
                ((e.clientX - canv.offsetLeft) * canv.width) / canv.clientWidth,
                ((e.clientY - canv.offsetTop) * canv.height) /
                    canv.clientHeight,
                2,
                0,
                Math.PI * 2
            );
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(
                ((e.clientX - canv.offsetLeft) * canv.width) / canv.clientWidth,
                ((e.clientY - canv.offsetTop) * canv.height) / canv.clientHeight
            );
        }
    };
    shouldComponentUpdate(nextState) {
        this.updateMiniCanvas();
        return this.state.value !== nextState.value;
    }
    render() {
        return (
            <div>
                <canvas
                    id="main-canvas"
                    className="canvas"
                    onMouseDown={this.mouseDown}
                    onMouseUp={this.mouseUp}
                    onMouseMove={this.mouseMove}
                />
            </div>
        );
    }
}
export default MainCanvas;
