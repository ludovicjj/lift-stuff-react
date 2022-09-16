import React, { Component } from "react";

export default class RepLogApp extends Component {
    render() {
        const {withHeart} = this.props;
        const repLogs = [
            { id: 1, reps: 25, item: 'My Laptop', totalWeightLifted: 112.5 },
            { id: 2, reps: 10, item: 'Big Fat Cat', totalWeightLifted: 180 },
            { id: 8, reps: 4, item: 'Big Fat Cat', totalWeightLifted: 72 }
        ];

        return (
            <div className="col-12">
                <div className="card card-reps">
                    <div className="card-body p-0">
                        <div className="row g-0">
                            <RepLogCardInfo withHeart={withHeart}/>
                            <RepLogCardContent repLogs={repLogs}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class RepLogCardContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightedRowId: null
        }
    }

    handleRowClick(repLogId, event) {
        this.setState({highlightedRowId: repLogId})
    }

    render() {
        const {highlightedRowId} = this.state;
        return (
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
                        <tbody>
                        {this.props.repLogs.map(repLog => (
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
        )
    }
}

class RepLogCardInfo extends Component {
    render() {
        let heart = "";
        const {withHeart} = this.props;
        if (withHeart) {
            heart = <span>❤️</span>
        }

        return (
            <div className="col-md-3 card-reps-info">
                <div>
                    <h6>items</h6>
                    <h2 className="my-2">Your lift history {heart}</h2>
                </div>
                <a href="#" id="item-info">View items info <i className="fa-solid fa-chevron-right"/></a>
            </div>
        )
    }
}
