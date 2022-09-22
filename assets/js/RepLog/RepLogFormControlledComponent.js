import React, { Component } from "react";
import PropTypes from "prop-types";

export default class RepLogForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quantityInputError: '',
            selectedItemId: '',
            quantityValue: 0
        }

        this.itemOptions = [
            {id: 'cat', text: 'Cat'},
            {id: 'fat_cat', text: 'Big Fat Cat'},
            {id: 'laptop', text: 'My Laptop'},
            {id: 'coffee_cup', text: 'Coffee Cup'},
        ]

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleSelectedItemChange = this.handleSelectedItemChange.bind(this);
        this.handleQuantityValueChange = this.handleQuantityValueChange.bind(this);
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const {selectedItemId, quantityValue} = this.state
        const {onAddRepLog} = this.props

        const itemLabel = this.itemOptions.find(option => option.id === selectedItemId)?.text

        // Invalid form data, don't submit
        if (quantityValue <= 0 || itemLabel === undefined) {
            this.setState({
                quantityInputError: 'Please enter a value greater than 0'
            })
            // add error for item
            // clear form
            return;
        }

        console.log(`item: ${itemLabel}; quantity: ${quantityValue}`)
        // valid form
        onAddRepLog(itemLabel, quantityValue)

        // Clear form
        this.setState({
            quantityInputError: '',
            selectedItemId: '',
            quantityValue: 0
        })
    }

    handleSelectedItemChange(event) {
        this.setState({
            selectedItemId: event.target.value
        })
    }

    handleQuantityValueChange(event) {
        this.setState({
            quantityValue: event.target.value
        })
    }

    render() {
        const {quantityInputError, selectedItemId, quantityValue} = this.state
        return (
            <form onSubmit={this.handleFormSubmit}>
                <div className="row">
                    <div className="col">
                        <select id="item"
                                value={selectedItemId}
                                onChange={this.handleSelectedItemChange}
                                // required="required"
                                className="form-select"
                        >
                            <option value="">What did you lift ?</option>
                            {this.itemOptions.map(option => (
                                <option key={option.id} value={option.id}>{option.text}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col">
                        <input type="number"
                               id="reps"
                               value={quantityValue}
                               onChange={this.handleQuantityValueChange}
                               required="required"
                               placeholder="How many times?"
                               className={`form-control ${quantityInputError && 'is-invalid'}`}
                        />
                        {quantityInputError && <div className="invalid-feedback">{quantityInputError}</div>}
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
    onAddRepLog: PropTypes.func.isRequired
}