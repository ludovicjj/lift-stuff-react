import React, { Component } from "react";
import RepLogs from "./RepLogs";
import PropTypes from "prop-types"
import {getRepLogs, deleteRepLog, createRepLog, getRepLog} from "../Api/rep_log_api";

export default class RepLogApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightedRowId: null,
            repLogs: [],
            numberOfHeart: 1,
            isLoaded: false
        }

        this.handleRowClick = this.handleRowClick.bind(this)
        this.handleAddRepLog = this.handleAddRepLog.bind(this)
        this.handleHeartChange = this.handleHeartChange.bind(this)
        this.handleDeleteRepLog = this.handleDeleteRepLog.bind(this)
    }

    componentDidMount() {
        getRepLogs().then(repLogs => {
            this.setState({
                repLogs: repLogs,
                isLoaded: true
            })
        })
    }

    handleRowClick(repLogId) {
        this.setState({highlightedRowId: repLogId})
    }

    handleHeartChange(heartCount) {
        this.setState({
            numberOfHeart: heartCount
        })
    }

    handleAddRepLog(itemValue, reps) {
        const newRepLog = {
            reps: reps,
            item: itemValue
        }

        createRepLog(newRepLog).then(response => {
            return getRepLog(response.headers.get('Location'))
        }).then(repLog => {
            this.setState(prevState => {
                const newRepLogs = [...prevState.repLogs, repLog];
                return {repLogs: newRepLogs}
            })
        })
    }

    handleDeleteRepLog(repLogId) {
        deleteRepLog(repLogId)
        // TODO check if delete action is success and then update state
        // remove the rep log without mutating state
        this.setState(prevState => {
            return {
                repLogs: prevState.repLogs.filter(repLog => repLog.id !== repLogId)
            }
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
                onDeleteRepLog={this.handleDeleteRepLog}
            />
        )
    }
}

RepLogApp.propTypes = {
    withHeart: PropTypes.bool
}
