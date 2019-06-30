import React, { Component } from 'react';
import './CoordinateComponent.css';

class CoordinateComponent extends Component {
    render() {
        return (
            <div className="coordinate-component">
                Size: [ 64 x 64 ]<br /> Coordinates: <br />( {this.props.coordX}{' '}
                : {this.props.coordY} )
            </div>
        );
    }
}
export default CoordinateComponent;
