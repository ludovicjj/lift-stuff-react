import React, { Component } from "react";
import RepLogs from "./RepLogs";
import PropTypes from "prop-types"
import { v4 as uuid } from 'uuid';

export default class RepLogApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightedRowId: null,
            repLogs: [
                { id: uuid(), reps: 25, item: 'My Laptop', totalWeightLifted: 112.5 },
                { id: uuid(), reps: 10, item: 'Big Fat Cat', totalWeightLifted: 180 },
                { id: uuid(), reps: 4, item: 'Big Fat Cat', totalWeightLifted: 72 }
            ]
        }

        this.handleRowClick = this.handleRowClick.bind(this)
        this.handleNewItemSubmit = this.handleNewItemSubmit.bind(this)
    }

    handleRowClick(repLogId) {
        this.setState({highlightedRowId: repLogId})
    }

    handleNewItemSubmit(itemName, reps) {
        const newRepLog = {
            id: uuid(),
            reps: parseInt(reps),
            item: itemName,
            totalWeightLifted: 50
        }
        const repLogs = this.state.repLogs;
        repLogs.push(newRepLog);
        this.setState({repLogs: repLogs})
    }

    render() {
        return (
            <RepLogs
                {...this.props}
                {...this.state}
                onRowClick={this.handleRowClick}
                onNewItemSubmit={this.handleNewItemSubmit}
            />
        )
    }
}

RepLogApp.propTypes = {
    withHeart: PropTypes.bool
}
