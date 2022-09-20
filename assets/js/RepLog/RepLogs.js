import React from "react";
import PropTypes from "prop-types"
import RepLogList from "./RepLogList";
import RepLogForm from "./RepLogForm";

function calculateTotalRepsAndWeightLifted(repLogs) {
    const init = {totalReps: 0, totalWeightLifted: 0}
    return repLogs.reduce((total, log) => {
        total.totalReps += log.reps
        total.totalWeightLifted += log.totalWeightLifted
        return total;
    }, init)
}

export default function RepLogs (props) {
    let heart = "";
    const {withHeart, highlightedRowId, onRowClick, repLogs, onNewItemSubmit} = props;
    const {totalReps, totalWeightLifted} = calculateTotalRepsAndWeightLifted(repLogs);

    if (withHeart) {
        heart = <span>❤️</span>
    }

    return (
        <div className="col-12">
            <div className="card card-reps">
                <div className="card-body p-0">
                    <div className="row g-0">
                        <div className="col-md-3 card-reps-info">
                            <div>
                                <h6>items</h6>
                                <h2 className="my-2">Your lift history {heart}</h2>
                            </div>
                            <a href="#" id="item-info">View items info <i className="fa-solid fa-chevron-right"/></a>
                        </div>
                        <div className="col-md-9 card-reps-content">
                            <div className="table-responsive mb-3">
                                <table className="table table-hover">
                                    <thead>
                                    <tr>
                                        <th>What</th>
                                        <th>How many time</th>
                                        <th>Weight</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                    </thead>
                                    <RepLogList
                                        highlightedRowId={highlightedRowId}
                                        onRowClick={onRowClick}
                                        repLogs={repLogs}
                                    />
                                    <tfoot>
                                    <tr>
                                        <td className="fw-bold">Total</td>
                                        <td className="fw-bold">{totalReps}</td>
                                        <td className="fw-bold">{totalWeightLifted}</td>
                                        <td>&nbsp;</td>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <RepLogForm onNewItemSubmit={onNewItemSubmit}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

RepLogs.propTypes = {
    withHeart: PropTypes.bool,
    highlightedRowId: PropTypes.any,
    onRowClick: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired,
    onNewItemSubmit: PropTypes.func.isRequired
}