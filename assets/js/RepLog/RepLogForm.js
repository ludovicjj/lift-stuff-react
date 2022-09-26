import React, { Component } from "react";
import PropTypes from "prop-types"

export default class RepLogForm extends Component{
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.quantityInput = React.createRef();
        this.itemSelect = React.createRef();

        this.state = {
            quantityInputError: ''
        }

        this.itemOptions = [
            {id: 'cat', text: 'Cat'},
            {id: 'fat_cat', text: 'Big Fat Cat'},
            {id: 'laptop', text: 'My Laptop'},
            {id: 'coffee_cup', text: 'Coffee Cup'},
            {id: 'invalid_item', text: 'Bad item'}
        ]
    }

    handleFormSubmit(event) {
        event.preventDefault();

        const quantityInput = this.quantityInput.current;
        const itemSelect = this.itemSelect.current;
        const {onAddRepLog} = this.props;

        if (quantityInput.value <= 0) {
            this.setState({
                quantityInputError: "Please entre a value greater than 0"
            })
            console.log('Invalid Reps')
            return;
        }

        onAddRepLog(
            itemSelect.options[itemSelect.selectedIndex].value,
            +quantityInput.value
        );

        // reset form
        quantityInput.value = '';
        itemSelect.selectedIndex = 0;

        this.setState({
            quantityInputError: ''
        })
    }

    render() {
        const {quantityInputError} = this.state
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
                            {this.itemOptions.map(option => (
                                 <option key={option.id} value={option.id}>{option.text}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col">
                        <input type="number"
                               id="reps"
                               ref={this.quantityInput}
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