import React, { Component } from "react";
import PropTypes from "prop-types"

export default class RepLogForm extends Component{
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const {onNewItemSubmit} = this.props
        onNewItemSubmit('Big Fat Cat', event.target.elements.namedItem('reps').value);
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
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
                               id="reps"
                               name="reps"
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
        )
    }
}

RepLogForm.propTypes = {
    onNewItemSubmit: PropTypes.func.isRequired
}