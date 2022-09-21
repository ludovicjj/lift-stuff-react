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
            ],
            numberOfHeart: 1
        }

        this.handleRowClick = this.handleRowClick.bind(this)
        this.handleAddRepLog = this.handleAddRepLog.bind(this)
        this.handleHeartChange = this.handleHeartChange.bind(this)
    }

    handleRowClick(repLogId) {
        this.setState({highlightedRowId: repLogId})
    }

    handleHeartChange(heartCount) {
        this.setState({
            numberOfHeart: heartCount
        })
    }

    handleAddRepLog(itemName, reps) {
        const newRepLog = {
            id: uuid(),
            reps: parseInt(reps),
            item: itemName,
            totalWeightLifted: 50
        }

        this.setState((prevState) => {
            const newRepLogs = [...prevState.repLogs, newRepLog];
            return {repLogs: newRepLogs}
        })
    }

    render() {
        return (
            <RepLogs
                {...this.props}
                {...this.state}
                onRowClick={this.handleRowClick}
                onAddRepLog={this.handleAddRepLog}
                onHeartChange={this.handleHeartChange}
            />
        )
    }
}

RepLogApp.propTypes = {
    withHeart: PropTypes.bool
}
