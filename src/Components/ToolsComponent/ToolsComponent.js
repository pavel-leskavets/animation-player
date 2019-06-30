import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFillDrip } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faEraser } from '@fortawesome/free-solid-svg-icons';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faEyeDropper } from '@fortawesome/free-solid-svg-icons';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import './ToolsComponent.css';

class ToolsComponent extends Component {
    setPen = e => {
        this.props.updateData('pen');
        this.markTool(e);
    };
    setBucket = e => {
        this.props.updateData('paint-bucket');
        this.markTool(e);
    };
    setEraser = e => {
        this.props.updateData('eraser');
        this.markTool(e);
    };
    setSquare = e => {
        this.props.updateData('square');
        this.markTool(e);
    };
    setMirror = e => {
        this.props.updateData('mirror');
        this.markTool(e);
    };
    setPipette = e => {
        this.props.updateData('pipette');
        this.markTool(e);
    };
    setCircle = e => {
        this.props.updateData('circle');
        this.markTool(e);
    };
    setPenLine = e => {
        this.props.updateData('pen-line');
        this.markTool(e);
    };
    setChessBoard = e => {
        this.props.updateData('chess-board');
        this.markTool(e);
    };
    setMoveTool = e => {
        this.props.updateData('move-tool');
        this.markTool(e);
    };
    setColor = e => {
        this.props.updateColor(e.target.value);
        let paletteIcon = document.querySelector('.tools-component-palette');
        paletteIcon.style.color = e.target.value;
    };
    setSameColorPaintBucket = e => {
        this.props.updateData('same-color-tool');
        this.markTool(e);
    };
    setSize = e => {
        if (e.target.classList.contains('mini')) {
            this.props.updateSize(2);
        } else if (e.target.classList.contains('normal')) {
            this.props.updateSize(4);
        } else if (e.target.classList.contains('big')) {
            this.props.updateSize(8);
        }
    };
    setLightenTool = e => {
        this.markTool(e);
        this.props.updateData('lighten-tool');
    };
    setDarkTool = e => {
        this.markTool(e);
        this.props.updateData('dark-tool');
    };
    markSize = e => {
        let activeSizes = document.querySelector('.active-size');
        activeSizes.classList.remove('active-size');
        e.currentTarget.classList.add('active-size');
    };
    markTool = e => {
        let activeTools = document.querySelector('.active-tool');
        activeTools.classList.remove('active-tool');
        e.currentTarget.classList.add('active-tool');
    };

    render() {
        return (
            <>
                <div className="tools-size" onClick={this.setSize}>
                    <div
                        className="tools-size-container mini active-size"
                        onClick={this.markSize}
                    >
                        <div className="tools-size-mini mini" />
                    </div>
                    <div
                        className="tools-size-container normal"
                        onClick={this.markSize}
                    >
                        <div className="tools-size-normal normal" />
                    </div>
                    <div
                        className="tools-size-container big"
                        onClick={this.markSize}
                    >
                        <div className="tools-size-big big" />
                    </div>
                </div>

                <div className="tools-component">
                    <button
                        className="tools-component-button pen active-tool"
                        onClick={this.setPen}
                    >
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button
                        className="tools-component-button bucket"
                        onClick={this.setBucket}
                    >
                        <FontAwesomeIcon icon={faFillDrip} />
                    </button>
                    <button
                        className="tools-component-button eraser"
                        onClick={this.setEraser}
                    >
                        <FontAwesomeIcon icon={faEraser} />
                    </button>
                    <div className="tools-component-button palette">
                        <input
                            type="color"
                            className="tools-component-input"
                            onChange={this.setColor}
                        />
                        <FontAwesomeIcon
                            icon={faPalette}
                            className="tools-component-palette"
                        />
                    </div>

                    <button
                        className="tools-component-button mirror"
                        onClick={this.setMirror}
                        onKeyDown={this.setMirror}
                    >
                        <FontAwesomeIcon icon={faCaretRight} />
                        <FontAwesomeIcon icon={faCaretLeft} />
                    </button>
                    <button
                        className="tools-component-button eye-dropper"
                        onClick={this.setPipette}
                    >
                        <FontAwesomeIcon icon={faEyeDropper} />
                    </button>
                    <button
                        className="tools-component-button square"
                        onClick={this.setSquare}
                    >
                        <div className="inner-square" />
                    </button>
                    <button
                        className="tools-component-button circle"
                        onClick={this.setCircle}
                    >
                        <div className="inner-circle" />
                    </button>
                    <button
                        className="tools-component-button pen-line"
                        onClick={this.setPenLine}
                    >
                        <div className="inner-pen">
                            <FontAwesomeIcon
                                icon={faPen}
                                className="tools-component-pen"
                            />
                            <div className="inner-line" />
                        </div>
                    </button>
                    <button
                        className="tools-component-button chess-board-button"
                        onClick={this.setChessBoard}
                    >
                        <div className="tools-chess-board" />
                    </button>
                    <button
                        className="tools-component-button lighten-tool"
                        onClick={this.setLightenTool}
                    >
                        <FontAwesomeIcon icon={faSun} />
                        <div className="lighten-tool-plus">
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                    </button>
                    <button
                        className="tools-component-button lighten-tool"
                        onClick={this.setDarkTool}
                    >
                        <FontAwesomeIcon icon={faSun} />
                        <div className="lighten-tool-minus">
                            <FontAwesomeIcon icon={faMinus} />
                        </div>
                    </button>
                    <button
                        className="tools-component-button move-tool"
                        onClick={this.setMoveTool}
                    >
                        <FontAwesomeIcon icon={faArrowsAlt} />
                    </button>
                    <button
                        className="tools-component-button all-pixels-same-color"
                        onClick={this.setSameColorPaintBucket}
                    >
                        <FontAwesomeIcon
                            icon={faBullseye}
                            className="same-color-target"
                        />
                        <FontAwesomeIcon
                            icon={faFillDrip}
                            className="same-color-filldrip"
                        />
                    </button>
                </div>
            </>
        );
    }
}
export default ToolsComponent;
