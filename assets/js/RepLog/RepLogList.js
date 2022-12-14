import React from "react";
import PropTypes from "prop-types"

export default function RepLogList (props) {
    const {highlightedRowId, onRowClick, repLogs, onDeleteRepLog, isLoaded, isSavingNewRepLog} = props

    const handleDeleteClick = function(event, repLogId) {
        event.preventDefault();
        onDeleteRepLog(repLogId)
    }

    if (!isLoaded) {
        return (
            <tbody>
                <tr>
                    <td colSpan="4" className="text-center loading-row">Chargement...</td>
                </tr>
            </tbody>
        )
    }
    return (
        <tbody>
        {repLogs.map(repLog => (
            <tr
                key={repLog.id}
                className={highlightedRowId === repLog.id ? 'info' : ''}
                onClick={(event) => {
                    if (['TR', 'TD'].includes(event.target.nodeName)) {
                        onRowClick(repLog.id)
                    }
                }}
                style={{
                    opacity: repLog.isDeleting ? .3 : 1
                }}
            >
                <td>{repLog.item}</td>
                <td>{repLog.reps}</td>
                <td>{repLog.totalWeightLifted}</td>
                <td>
                    <a href=""
                       className="btn btn-primary btn-sm"
                       onClick={(event) => handleDeleteClick(event, repLog.id)}
                    >
                        <i className="fa-solid fa-ban"/>
                    </a>
                </td>
            </tr>
        ))}
        {isSavingNewRepLog && (
            <tr>
                <td
                    colSpan="4"
                    className="text-center loading-row"
                    style={{
                        opacity: .5
                    }}
                >
                    Lifting to the database ...
                </td>
            </tr>
        )}
        </tbody>
    )
}

RepLogList.propTypes = {
    highlightedRowId: PropTypes.any,
    onRowClick: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired,
    onDeleteRepLog: PropTypes.func.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    isSavingNewRepLog: PropTypes.bool.isRequired
}