import React, { Component } from 'react';
import './App.css';
import FrameContainerComponent from './Components/FrameContainerComponent/FrameContainerComponent';
import MainCanvasComponent from './Components/MainCanvasComponent/MainCanvasComponent';
import AnimationComponent from './Components/AnimationComponent/AnimationComponent';
import ToolsComponent from './Components/ToolsComponent/ToolsComponent';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'pen',
            color: '#000000',
            size: 2,
            coordX: 0,
            coordY: 0
        };
    }
    updateData = value => {
        this.setState({ mode: value });
    };
    updateColor = color => {
        this.setState({ color: color });
    };
    updateSize = size => {
        this.setState({ size: size });
    };
    updateCoordinates = (X, Y) => {
        this.setState({ coordX: X });
        this.setState({ coordY: Y });
    };
    copyItem = e => {
        if (
            e.target.className === 'copy-tool' ||
            e.target.className === 'copy-tool-new'
        ) {
            let canv = e.target.parentElement.firstElementChild;
            let newCanv = canv.cloneNode();
            let newCtx = newCanv.getContext('2d');
            e.target.parentElement.firstElementChild.classList.remove('active');

            newCtx.drawImage(canv, 0, 0);

            let frame = document.createElement('div');
            frame.className = 'frame';
            frame.innerHTML = `<div class="copy-tool-new"></div>
            <div class="delete-tool-new copied-tool"></div>`;
            frame.insertBefore(newCanv, frame.firstChild);

            let container = document.querySelector('.frame-container');
            let lengthContainer = container.children;
            container.insertBefore(
                frame,
                container.children[lengthContainer.length - 1]
            );
        }
    };

    render() {
        return (
            <div className="main">
                <div className="task-title">Piskel Clone</div>
                <div className="main-container" onClick={this.copyItem}>
                    <ToolsComponent
                        updateData={this.updateData}
                        updateColor={this.updateColor}
                        updateSize={this.updateSize}
                    />
                    <FrameContainerComponent />
                    <MainCanvasComponent
                        mode={this.state.mode}
                        color={this.state.color}
                        size={this.state.size}
                        updateColor={this.updateColor}
                        updateCoordinates={this.updateCoordinates}
                    />
                    <AnimationComponent
                        coordX={this.state.coordX}
                        coordY={this.state.coordY}
                    />
                </div>
            </div>
        );
    }
}

export default App;
