import React, { Component } from "react";

export default class RepLogList extends Component {
    render() {
        const repLogs = [
            { id: 1, reps: 25, item: 'My Laptop', totalWeightLifted: 112.5 },
            { id: 2, reps: 10, item: 'Big Fat Cat', totalWeightLifted: 180 },
            { id: 8, reps: 4, item: 'Big Fat Cat', totalWeightLifted: 72 }
        ];

        const {highlightedRowId} = this.props

        return (
            <tbody>
            {repLogs.map(repLog => (
                <tr
                    key={repLog.id}
                    className={highlightedRowId === repLog.id ? 'info' : ''}
                    onClick={(event) => this.handleRowClick(repLog.id, event)}
                >
                    <td>{repLog.item}</td>
                    <td>{repLog.reps}</td>
                    <td>{repLog.totalWeightLifted}</td>
                    <td>...</td>
                </tr>
            ))}
            </tbody>
        )
    }
}