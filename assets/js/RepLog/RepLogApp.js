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
            isLoaded: false,
            isSavingNewRepLog: false,
            successMessage: '',
            newRepLogValidationErrorMessage: ''
        }

        this.handleRowClick = this.handleRowClick.bind(this)
        this.handleAddRepLog = this.handleAddRepLog.bind(this)
        this.handleHeartChange = this.handleHeartChange.bind(this)
        this.handleDeleteRepLog = this.handleDeleteRepLog.bind(this)
        this.successTimeout = 0;
    }

    componentDidMount() {
        getRepLogs().then(repLogs => {
            this.setState({
                repLogs: repLogs,
                isLoaded: true
            })
        })
    }

    componentWillUnmount() {
        clearTimeout(this.successTimeout)
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
            item: itemValue,
            _token: this.props.token
        }

        this.setState({
            isSavingNewRepLog: true
        })

        const newState = {
            isSavingNewRepLog: false
        }

        createRepLog(newRepLog).then(response => {
            return getRepLog(response.headers.get('Location'))
        }).then(repLog => {
            // Add to an array without mutation
            this.setState(prevState => {
                const newRepLogs = [...prevState.repLogs, repLog];
                return {
                    repLogs: newRepLogs,
                    newRepLogValidationErrorMessage: '',
                    ...newState
                }
            })
            this.setSuccessMessage('Rep Log added with success !')
        }).catch(error => {
            error.response.json().then(errorsData => {
                let firstError = '';
                if (error.response.statusCode === 422) {
                    firstError = errorsData.errors[0].message
                } else {
                    firstError = errorsData.message
                }
                this.setState({
                    newRepLogValidationErrorMessage: firstError,
                    ...newState
                })
            })
        })
    }

    setSuccessMessage(message) {
        this.setState({
            successMessage: message
        })

        clearTimeout(this.successTimeout)
        this.successTimeout = setTimeout(() => {
            this.setState({
                successMessage: ''
            })
            this.successTimeout = 0
        }, 3000)
    }

    handleDeleteRepLog(repLogId) {
        // Change an object inside an array without mutation
        // map -> return a new array
        // object rest spread -> return new object
        this.setState(prevState => {
            return {
                repLogs: prevState.repLogs.map(repLog => {
                    if (repLog.id !== repLogId) {
                        return repLog
                    }
                    return {...repLog, isDeleting: true}
                })
            }
        })

        deleteRepLog(repLogId).then(() => {
            // remove the rep log without mutating state
            this.setState(prevState => {
                return {
                    repLogs: prevState.repLogs.filter(repLog => repLog.id !== repLogId)
                }
            })
            // Success message
            this.setSuccessMessage('Rep Log deleted with success !')
        }).catch(error => {
            console.log(error.response);
            this.setState(prevState => {
                return {
                    repLogs: prevState.repLogs.map(repLog => {
                        if (repLog.id !== repLogId) {
                            return repLog
                        }
                        const {isDeleting, ...otherRepLogProp} = repLog
                        return {...otherRepLogProp}
                    })
                }
            })
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
RepLogApp.defaultProps = {
    itemOptions: [],
    token: ''
}
RepLogApp.propTypes = {
    withHeart: PropTypes.bool,
    itemOptions: PropTypes.array,
    token: PropTypes.string
}
