import React, { Component } from 'react';

class MainCanvasComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            isMouseDown: false,
            context: '',
            coordsX: 0,
            coordsY: 0,
            dataURL: ''
        };
    }
    shouldComponentUpdate(nextState) {
        this.updateMiniCanvas();
        return this.state.value !== nextState.value;
    }
    getCoordByX = e => {
        let canv = document.querySelector('#main-canvas');
        return (
            ((e.clientX - canv.offsetLeft) * canv.width) / canv.clientWidth -
            ((((e.clientX - canv.offsetLeft) * canv.width) / canv.clientWidth) %
                this.props.size)
        );
    };
    getCoordByY = e => {
        let canv = document.querySelector('#main-canvas');
        return (
            ((e.clientY - canv.offsetTop) * canv.height) / canv.clientHeight -
            ((((e.clientY - canv.offsetTop) * canv.height) /
                canv.clientHeight) %
                this.props.size)
        );
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
                console.log(rgba);
            }
        }
    };
    contextHelper = () => {
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
        ctx.drawImage(image, 0, 0);
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
        } else if (this.props.mode !== 'pipette') {
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
        if (this.state.isMouseDown === true) {
            let canv = document.querySelector('#main-canvas');
            let ctx = canv.getContext('2d');
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
