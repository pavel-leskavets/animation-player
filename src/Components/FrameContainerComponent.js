import React, { Component } from 'react';

class FrameContainerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1
        };
    }
    addFrameToContainer = () => {
        this.deleteMarkActiveFrame();
        let container = document.querySelector('.frame-container');
        let frame = document.createElement('div');
        frame.className = 'frame';
        frame.innerHTML = `<div>
            <canvas class='canvas active' id='mini-canvas' width='64'
            height='64'></canvas>
            <div class="copy-tool-new"></div>
            <div class="delete-tool-new"></div>
        </div>`;
        let lengthContainer = container.children;
        container.insertBefore(
            frame,
            container.children[lengthContainer.length - 1]
        );
    };

    deleteMarkActiveFrame = () => {
        let frames = document.querySelectorAll('.canvas');
        frames.forEach(elem => {
            elem.classList.remove('active');
        });
    };
    transferImageToMainCanvas = () => {
        this.setState({ value: this.state.value + 1 });
        let canvas = document.querySelector('#main-canvas');
        let context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        let canv = document.querySelector('.active');
        context.drawImage(canv, 0, 0);
    };
    markActiveFrame = e => {
        if (e.target.className === 'canvas') {
            this.deleteMarkActiveFrame();

            e.target.classList.add('active');
        }
        this.transferImageToMainCanvas();
    };
    deleteItem = e => {
        if (e.target.classList.contains('copied-tool')) {
            e.target.parentElement.style.display = 'none';
            e.target.parentElement.firstElementChild.removeAttribute('id');
        } else if (e.target.className === 'delete-tool-new') {
            e.target.parentElement.parentElement.style.display = 'none';
            e.target.parentElement.firstElementChild.removeAttribute('id');
        } else if (e.target.className === 'delete-tool') {
            e.target.parentElement.firstElementChild.removeAttribute('id');
            let firstFrame = document.querySelector('.frame');
            let delLogo = document.querySelector('.delete-tool');
            let copyLogo = document.querySelector('.copy-tool');
            firstFrame.style.display = 'none';
            delLogo.style.display = 'none';
            copyLogo.style.display = 'none';
        }
    };

    shouldComponentUpdate(nextState) {
        return this.state.value !== nextState.value;
    }
    render() {
        return (
            <div onClick={this.markActiveFrame}>
                <div className="frame-container" onClick={this.deleteItem}>
                    <div className="frame">
                        <canvas
                            id="mini-canvas"
                            className="canvas active"
                            width="64"
                            height="64"
                        />
                        <div className="delete-tool" />
                        <div className="copy-tool" />
                    </div>

                    <div
                        className="create-new-frame"
                        onClick={this.addFrameToContainer}
                    >
                        Add New Frame
                    </div>
                </div>
            </div>
        );
    }
}
export default FrameContainerComponent;
