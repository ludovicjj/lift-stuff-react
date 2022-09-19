import React, { Component } from "react";
import RepLogs from "./RepLogs";

export default class RepLogApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightedRowId: null
        }

        this.handleRowClick = this.handleRowClick.bind(this)
    }

    handleRowClick(repLogId) {
        this.setState({highlightedRowId: repLogId})
    }

    render() {
        const {withHeart} = this.props;
        const {highlightedRowId} = this.state;

        return (
            <RepLogs
                highlightedRowId={highlightedRowId}
                withHeart={withHeart}
                onRowClick={this.handleRowClick}
            />
        )
    }
}
