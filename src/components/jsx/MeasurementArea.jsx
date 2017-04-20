import React from 'react';
import jQuery from 'jquery';
import Measurement from './Measurement.jsx';

export default class MeasurementArea extends React.Component {
    constructor() {
        super();
        this.state = {
            devices: []
        };
    }

    getDeviceData() {
        console.log("React: Running getDeviceData()...");
        let self = this;
        jQuery.get( self.props.datauri, function(data) {
            console.log(data.devices);
            // Sort array by device name
            self.setState({
                devices: data.devices
            });
        });
    }

    componentDidMount() {
        console.log("React: Running componentDidMount()...");
        this.getDeviceData();
        setInterval(this.getDeviceData.bind(this), 2000);
    }

    render() {
        console.log("React: Current state of \"devices\":");
        console.log(this.state.devices);
        let rowsOfMeasurements = this.state.devices.map((device) => {
            return (
                <Measurement key={device.name} name={device.name} noise={device.noise} date={device.date} />
            );
        });
        return (
            <div>
                <div className="row">
                    <ul>
                        {rowsOfMeasurements}
                    </ul>
                </div>
            </div>
        );
    }
}
