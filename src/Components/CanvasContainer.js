import React, { Component } from "react";

class CanvasContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1
        };
    }
    addFrameToContainer = () => {
        this.deleteMarkActiveFrame();
        let container = document.querySelector(".frame-container");
        let frame = document.createElement("div");
        frame.className = "frame";
        frame.innerHTML = `<div>
            <canvas class='canvas active' id='mini-canvas'></canvas>
            <div class="copy-tool-new">COPY</div>
            <div class="delete-tool-new">DEL</div>
        </div>`;
        let lengthContainer = container.children;
        container.insertBefore(
            frame,
            container.children[lengthContainer.length - 1]
        );
    };

    deleteMarkActiveFrame = () => {
        let frames = document.querySelectorAll(".canvas");
        frames.forEach(elem => {
            elem.classList.remove("active");
        });
    };
    transferImageToMainCanvas = () => {
        this.setState({ value: this.state.value + 1 });
        let canvas = document.querySelector("#main-canvas");
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        let canv = document.querySelector(".active");
        let imgOfMiniCanvas = new Image(500, 500);
        imgOfMiniCanvas.src = canv.toDataURL();
        let newCtx = canvas.getContext("2d");
        newCtx.drawImage(imgOfMiniCanvas, 0, 0);
    };
    markActiveFrame = e => {
        if (e.target.className === "canvas") {
            this.deleteMarkActiveFrame();

            e.target.classList.add("active");
        }
        this.transferImageToMainCanvas();
    };
    deleteItem = e => {
        if (e.target.className === "delete-tool-new") {
            e.target.parentElement.parentElement.style.display = "none";
        } else if (e.target.className === "delete-tool") {
            let firstFrame = document.querySelector(".frame");
            let delLogo = document.querySelector(".delete-tool");
            let copyLogo = document.querySelector(".copy-tool");
            firstFrame.style.display = "none";
            delLogo.style.display = "none";
            copyLogo.style.display = "none";
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
                        <canvas id="mini-canvas" className="canvas active" />
                        <div className="delete-tool">DEL</div>
                        <div className="copy-tool">COPY</div>
                    </div>

                    <div
                        className="create-new-frame"
                        onClick={this.addFrameToContainer}
                    >
                        Create New Frame
                    </div>
                </div>
            </div>
        );
    }
}
export default CanvasContainer;
