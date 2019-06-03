import React, { Component } from "react";
import "./App.css";
import CanvasContainer from "../src/Components/CanvasContainer";
import MainCanvas from "../src/Components/MainCanvas";
import AnimationContainer from "../src/Components/AnimationContainer";

class App extends Component {
    copyItem = e => {
        if (e.target.className === "copy-tool") {
            let canv = e.target.parentElement.firstChild;
            console.log(canv);
            let newCanv = canv.cloneNode();
            newCanv.classList.remove("active");
            let newCtx = newCanv.getContext("2d");
            newCtx.drawImage(canv, 0, 0);
            let frame = document.createElement("div");
            frame.className = "frame";
            frame.innerHTML = `<div class="copy-tool-new">COPY</div>
            <div class="delete-tool-new">DEL</div>`;
            frame.insertBefore(newCanv, frame.firstChild);
            let container = document.querySelector(".frame-container");
            let lengthContainer = container.children;
            container.insertBefore(
                frame,
                container.children[lengthContainer.length - 1]
            );
        } else if (e.target.className === "copy-tool-new") {
            let canv = e.target.parentElement.querySelector("canvas");
            let newCanv = canv.cloneNode();
            newCanv.style.margin = "27px";
            newCanv.classList.remove("active");
            let newCtx = newCanv.getContext("2d");
            newCtx.drawImage(canv, 0, 0);
            let container = document.querySelector(".frame-container");
            let lengthContainer = container.children;
            container.insertBefore(
                newCanv,
                container.children[lengthContainer.length - 1]
            );
        }
    };
    render() {
        return (
            <div className="main">
                <div className="task-title">CodeJam Animation Player</div>
                <div className="main-container" onClick={this.copyItem}>
                    <CanvasContainer />
                    <MainCanvas />
                    <AnimationContainer />
                </div>
            </div>
        );
    }
}

export default App;
