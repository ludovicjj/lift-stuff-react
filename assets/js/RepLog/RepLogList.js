import React from "react";

export default function RepLogList (props) {

    const repLogs = [
        { id: 1, reps: 25, item: 'My Laptop', totalWeightLifted: 112.5 },
        { id: 2, reps: 10, item: 'Big Fat Cat', totalWeightLifted: 180 },
        { id: 8, reps: 4, item: 'Big Fat Cat', totalWeightLifted: 72 }
    ];

    const {highlightedRowId, onRowClick} = props

    return (
        <tbody>
        {repLogs.map(repLog => (
            <tr
                key={repLog.id}
                className={highlightedRowId === repLog.id ? 'info' : ''}
                onClick={() => {
                    onRowClick(repLog.id)
                }}
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