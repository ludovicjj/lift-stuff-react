import React from "react";
import RepLogList from "./RepLogList";

export default function RepLogs (props) {
    let heart = "";
    const {withHeart, highlightedRowId, onRowClick} = props;

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
                                    />
                                    <tfoot>
                                    <tr>
                                        <td className="fw-bold">Total</td>
                                        <td className="fw-bold">TODO</td>
                                        <td className="fw-bold">TODO</td>
                                        <td>&nbsp;</td>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <form>
                                <div className="row">
                                    <div className="col">
                                        <select id="item" name="item" required="required" className="form-select" defaultValue="">
                                            <option value="">What did you lift ?</option>
                                            <option value="cat">cat</option>
                                            <option value="laptop">laptop</option>
                                            <option value="coffee_cup">coffee cup</option>
                                            <option value="fat_cat">fat cat</option>
                                        </select>
                                    </div>
                                    <div className="col">
                                        <input type="number"
                                               id="reps" name="reps"
                                               required="required"
                                               placeholder="How many times?"
                                               className="form-control"
                                        />
                                    </div>
                                    <div className="col">
                                        <button type="submit" className="btn btn-primary">I Lifted it!</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}