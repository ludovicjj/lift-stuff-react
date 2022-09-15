import Helper from "./RepLogHelper";
let HelperInstance = new WeakMap();

class RepLogApp {
    /**
     * @param {HTMLElement} wrapper
     * @param {string} initialRepLogs
     */
    constructor(wrapper, initialRepLogs) {
        this.wrapper = wrapper;
        this.repLogs = [];
        HelperInstance.set(this, new Helper(this.repLogs));
        this.form = this.wrapper.querySelector(RepLogApp.selector.repLogForm);

        for (let repLog of JSON.parse(initialRepLogs)) {
            this._addRow(repLog);
        }

        this.form.addEventListener('submit', this.handleRepLogSubmit.bind(this));
    }

    static get selector() {
        return {
            repLogForm: '.js-new-rep-log-form'
        }
    }

    handleRepLogSubmit(e) {
        e.preventDefault();
        const formData = new FormData(this.form);
        const formJson = JSON.stringify(Object.fromEntries(formData));
        const formSubmitButton = this.form.querySelector('button[type="submit"]');

        this._toggleDisabledButton(formSubmitButton);
        this._removeFormErrors();

        this._submitRepLog(formJson).then(repLog => {
            this._addRow(repLog);
            this.form.reset();
        }).catch(error => {
            if(error.code === 422) {
                this._mapErrorsToForm(error.errorsData)
            }
        }).finally(() => {
            this._toggleDisabledButton(formSubmitButton);
        })
    }

    _submitRepLog(data) {
        const url = this.form.getAttribute('action');
        const headers = new Headers();
        headers.append("X-Requested-With", "XMLHttpRequest");
        headers.append("Content-Type", "application/json");

        return fetch(url, {method: 'POST', headers, body: data})
            .then(async response => {
                if (!response.ok) {
                    let data = await response.json();
                    this._sendError(data)
                }

                headers.delete("Content-Type");
                return fetch(response.headers.get('Location'), {method: 'GET', headers})
            }).then(async response => {
                return await response.json();
            })
    }

    _addRow(repLog) {
        this.repLogs.push(repLog);
        const htmlFragment = rowFragment(repLog);
        const row = htmlFragment.content.querySelector('tr');

        // store the repLog index into data-key attribute
        row.setAttribute('data-key', (this.repLogs.length - 1).toString());
        this.wrapper.querySelector('tbody').appendChild(row);
        this._updateTotalWeightAndReps();
    }

    _updateTotalWeightAndReps() {
        let {weight, reps} = HelperInstance.get(this).getTotalWeightAndRepsString()
        this.wrapper.querySelector('.js-total-weight').textContent = weight;
        this.wrapper.querySelector('.js-total-reps').textContent = reps;
    }

    _sendError({message = '', code = 0, errors = []}) {
        const errorResponse = {
            type: 'Error',
            message: message || 'Something went wrong',
            code: code || 400,
            errorsData: errors
        }

        throw (errorResponse);
    }

    _mapErrorsToForm(errors) {
        for (let {property, message} of errors) {
            const field = this.form.querySelector(`[name="${property}"]`)

            if (field) {
                field.classList.add('is-invalid')
                const feedBack = document.createElement('div')
                feedBack.classList.add('invalid-feedback')
                feedBack.innerText = message
                field.after(feedBack)
            }
        }
    }

    _removeFormErrors() {
        const fields = this.form.querySelectorAll('input, select');
        for (let field of fields) {
            field.classList.remove('is-invalid');
            field.parentNode.querySelector('.invalid-feedback')?.remove();
        }
    }

    _toggleDisabledButton(button) {
        button.classList.toggle('disabled');
        let isButton = button.nodeName === 'BUTTON'
        if (button.classList.contains('disabled')) {
            button.setAttribute('aria-disabled', 'true');
            if (isButton) {
                button.setAttribute('tabindex', '-1');
            }
        } else {
            button.removeAttribute('aria-disabled');
            if (isButton) {
                button.removeAttribute('tabindex');
            }
        }
    }
}

const rowFragment = (repLog) => {
    const template = document.createElement('template');
    template.innerHTML = `<tr data-weight="${repLog.totalWeightLifted}" data-reps="${repLog.reps}">
<td>${repLog.item}</td>
<td>${repLog.reps}</td>
<td>${repLog.totalWeightLifted}</td>
<td>
    <a class="btn btn-primary btn-sm js-delete-rep-log" role="button" data-url="${repLog.links.self}">
        <i class="fa-solid fa-ban"></i>
    </a>
</td>
</tr>`;
    return template;
}

export default RepLogApp;