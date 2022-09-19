import React, { Component } from "react";
import RepLogs from "./RepLogs";
import PropTypes from "prop-types"

export default class RepLogApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightedRowId: null,
            repLogs: [
                { id: 1, reps: 25, item: 'My Laptop', totalWeightLifted: 112.5 },
                { id: 2, reps: 10, item: 'Big Fat Cat', totalWeightLifted: 180 },
                { id: 8, reps: 4, item: 'Big Fat Cat', totalWeightLifted: 72 }
            ]
        }

        this.handleRowClick = this.handleRowClick.bind(this)
    }

    handleRowClick(repLogId) {
        this.setState({highlightedRowId: repLogId})
    }

    render() {
        const {withHeart} = this.props;
        const {highlightedRowId, repLogs} = this.state;

        return (
            <RepLogs
                highlightedRowId={highlightedRowId}
                withHeart={withHeart}
                onRowClick={this.handleRowClick}
                repLogs={repLogs}
            />
        )
    }
}

RepLogApp.propTypes = {
    withHeart: PropTypes.bool
}
