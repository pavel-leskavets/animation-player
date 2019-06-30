import React, { Component } from 'react';
import './MainCanvasComponent.css';

class MainCanvasComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            isMouseDown: false,
            context: '',
            coordsX: 0,
            coordsY: 0,
            dataURL: '',
            rotate: 90
        };
    }
    shouldComponentUpdate(nextState) {
        this.updateMiniCanvas();
        return this.state.value !== nextState.value;
    }
    getCoordByX = e => {
        if (e) {
            let canv = document.querySelector('#main-canvas');
            return (
                ((e.clientX - canv.offsetLeft) * canv.width) /
                    canv.clientWidth -
                ((((e.clientX - canv.offsetLeft) * canv.width) /
                    canv.clientWidth) %
                    this.props.size)
            );
        }
    };

    getCoordByY = e => {
        if (e) {
            let canv = document.querySelector('#main-canvas');
            return (
                ((e.clientY - canv.offsetTop) * canv.height) /
                    canv.clientHeight -
                ((((e.clientY - canv.offsetTop) * canv.height) /
                    canv.clientHeight) %
                    this.props.size)
            );
        }
    };
    paintBucket = () => {
        let canv = document.querySelector('#main-canvas');
        let ctx = canv.getContext('2d');

        ctx.rect(0, 0, 500, 500);
        ctx.fillStyle = this.props.color;
        ctx.fill();
    };
    onClick = e => {
        let canv = document.querySelector('#main-canvas');
        let ctx = canv.getContext('2d');
        this.setState({ isMouseDown: true });
        this.mouseMove();
        this.setState({ isMouseDown: false });
        if (this.props.mode === 'pipette') {
            let color = ctx.getImageData(
                this.getCoordByX(e),
                this.getCoordByY(e),
                this.props.size,
                this.props.size
            );
            let rgba =
                'rgba(' +
                color.data[0] +
                ', ' +
                color.data[1] +
                ', ' +
                color.data[2] +
                ', ' +
                color.data[3] / 255 +
                ')';
            if (rgba !== 'rgba(0, 0, 0, 0)') {
                this.props.updateColor(rgba);
                let paletteIcon = document.querySelector(
                    '.tools-component-palette'
                );
                paletteIcon.style.color = rgba;
            }
        }
        if (
            this.props.mode === 'lighten-tool' ||
            this.props.mode === 'dark-tool'
        ) {
            let myImageData = ctx.getImageData(
                this.getCoordByX(e),
                this.getCoordByY(e),
                this.props.size,
                this.props.size
            );
            let data = myImageData.data;
            if (this.props.mode === 'lighten-tool') {
                for (let i = 0; i < data.length; i += 4) {
                    data[i] = data[i] + 10;
                    data[i + 1] = data[i + 1] + 10;
                    data[i + 2] = data[i + 2] + 10;
                }
            } else {
                for (let i = 0; i < data.length; i += 4) {
                    data[i] = data[i] - 10;
                    data[i + 1] = data[i + 1] - 10;
                    data[i + 2] = data[i + 2] - 10;
                }
            }
            ctx.putImageData(
                myImageData,
                this.getCoordByX(e),
                this.getCoordByY(e)
            );
        }
        if (this.props.mode === 'same-color-tool') {
            let myImageData = ctx.getImageData(0, 0, canv.width, canv.height);
            let data = myImageData.data;
            let colorForComparison = ctx.getImageData(
                this.getCoordByX(e),
                this.getCoordByY(e),
                this.props.size,
                this.props.size
            );
            let dataForComparison = colorForComparison.data;
            let targetColor = this.props.color;
            for (let i = 0; i < data.length; i += 4) {
                if (
                    data[i] === dataForComparison[0] &&
                    data[i + 1] === dataForComparison[1] &&
                    data[i + 2] === dataForComparison[2]
                ) {
                    data[i] = parseInt(targetColor.slice(1, 3), 16).toString(
                        10
                    );
                    data[i + 1] = parseInt(
                        targetColor.slice(3, 5),
                        16
                    ).toString(10);
                    data[i + 2] = parseInt(targetColor.slice(5), 16).toString(
                        10
                    );
                }
            }
            ctx.putImageData(myImageData, 0, 0);
        }
    };
    contextHelper = e => {
        this.updateMiniCanvas();
        let canv = document.querySelector('#main-canvas');
        let ctx = canv.getContext('2d');
        this.setState({ context: ctx });
        this.setState({ value: this.state.value + 1 });
        ctx.clearRect(0, 0, canv.width, canv.height);
        let image = new Image(500, 500);
        image.src = this.state.dataURL;
        ctx.strokeStyle = this.props.color;
        ctx.imageSmoothingEnabled = false;

        if (this.props.mode === 'move-tool') {
            ctx.drawImage(
                image,
                this.getCoordByX(e) - this.state.coordsX,
                this.getCoordByY(e) - this.state.coordsY
            );
        } else {
            ctx.drawImage(image, 0, 0);
        }

        ctx.beginPath();
        ctx.lineWidth = this.props.size;
    };
    mouseDown = e => {
        let canv = document.querySelector('#main-canvas');
        this.setState({ isMouseDown: true });
        this.setState({
            coordsX: this.getCoordByX(e)
        });
        this.setState({
            coordsY: this.getCoordByY(e)
        });
        this.setState({ dataURL: canv.toDataURL() });
    };
    mouseUp = () => {
        if (this.props.mode === 'paint-bucket') {
            this.paintBucket();
        } else if (this.props.mode !== 'pipette' && this.state.context) {
            this.setState({ isMouseDown: false });
            this.state.context.beginPath();
        }
    };
    updateMiniCanvas = () => {
        let canv = document.querySelector('#main-canvas');
        let miniCanvas = document.querySelector('.active');

        let newCtx = miniCanvas.getContext('2d');
        newCtx.clearRect(0, 0, miniCanvas.width, miniCanvas.height);
        newCtx.drawImage(canv, 0, 0);
    };
    mouseMove = e => {
        let canv = document.querySelector('#main-canvas');
        let ctx = canv.getContext('2d');
        if (e) {
            this.props.updateCoordinates(
                Math.floor(
                    ((e.clientX - canv.offsetLeft) * canv.width) /
                        canv.clientWidth
                ),
                Math.floor(
                    ((e.clientY - canv.offsetTop) * canv.height) /
                        canv.clientHeight
                )
            );
        }

        if (this.state.isMouseDown === true) {
            if (this.props.mode === 'eraser') {
                ctx.clearRect(
                    this.getCoordByX(e),
                    this.getCoordByY(e),
                    this.props.size,
                    this.props.size
                );
                this.updateMiniCanvas();
            } else if (this.props.mode === 'pen') {
                this.updateMiniCanvas();
                this.setState({ context: ctx });
                this.setState({ value: this.state.value + 1 });
                ctx.fillStyle = this.props.color;
                ctx.rect(
                    this.getCoordByX(e),
                    this.getCoordByY(e),
                    this.props.size,
                    this.props.size
                );
                ctx.fill();
            } else if (this.props.mode === 'square') {
                this.contextHelper();
                ctx.moveTo(this.state.coordsX, this.state.coordsY);
                ctx.lineTo(this.getCoordByX(e), this.state.coordsY);
                ctx.lineTo(this.getCoordByX(e), this.getCoordByY(e));
                ctx.lineTo(this.state.coordsX, this.getCoordByY(e));
                ctx.closePath();
                ctx.stroke();
            } else if (this.props.mode === 'mirror') {
                this.updateMiniCanvas();
                this.setState({ context: ctx });
                this.setState({ value: this.state.value + 1 });
                ctx.fillStyle = this.props.color;
                ctx.rect(
                    this.getCoordByX(e),
                    this.getCoordByY(e),
                    this.props.size,
                    this.props.size
                );
                let coordZ = canv.width - this.getCoordByX(e);
                ctx.rect(
                    coordZ,
                    this.getCoordByY(e),
                    this.props.size,
                    this.props.size
                );
                ctx.fill();
            } else if (this.props.mode === 'circle') {
                this.contextHelper();
                ctx.arc(
                    this.state.coordsX,
                    this.state.coordsY,
                    this.getCoordByX(e) - this.state.coordsX,
                    0,
                    2 * Math.PI
                );
                ctx.stroke();
                ctx.lineWidth = this.props.size;
            } else if (this.props.mode === 'pen-line') {
                this.contextHelper();
                ctx.moveTo(this.state.coordsX, this.state.coordsY);
                ctx.lineTo(this.getCoordByX(e), this.getCoordByY(e));
                ctx.stroke();
            } else if (this.props.mode === 'chess-board') {
                this.updateMiniCanvas();
                this.setState({ context: ctx });
                this.setState({ value: this.state.value + 1 });
                ctx.fillStyle = this.props.color;
                if (
                    this.getCoordByX(e) % (this.props.size * 2) === 0 &&
                    this.getCoordByY(e) % (this.props.size * 2) === 0
                ) {
                    ctx.rect(
                        this.getCoordByX(e),
                        this.getCoordByY(e),
                        this.props.size,
                        this.props.size
                    );
                    ctx.fill();
                }
            } else if (this.props.mode === 'move-tool') {
                this.contextHelper(e);
            }
        }
    };

    render() {
        return (
            <div>
                <canvas
                    id="main-canvas"
                    className="canvas"
                    onMouseDown={this.mouseDown}
                    onMouseUp={this.mouseUp}
                    onMouseMove={this.mouseMove}
                    onClick={this.onClick}
                    width="64"
                    height="64"
                />
            </div>
        );
    }
}
export default MainCanvasComponent;
