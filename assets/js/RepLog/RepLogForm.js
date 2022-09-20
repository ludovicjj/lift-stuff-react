import React, { Component } from "react";
import PropTypes from "prop-types"

export default class RepLogForm extends Component{
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.quantityInput = React.createRef();
        this.itemSelect = React.createRef();
    }

    handleFormSubmit(event) {
        event.preventDefault();

        const quantityInput = this.quantityInput.current;
        const itemSelect = this.itemSelect.current;
        const {onNewItemSubmit} = this.props;

        onNewItemSubmit(
            itemSelect.options[itemSelect.selectedIndex].text,
            quantityInput.value
        );

        // reset form
        quantityInput.value = '';
        itemSelect.selectedIndex = 0;
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <div className="row">
                    <div className="col">
                        <select id="item"
                                ref={this.itemSelect}
                                required="required"
                                className="form-select"
                                defaultValue=""
                        >
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
                               ref={this.quantityInput}
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