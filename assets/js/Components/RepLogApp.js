class RepLogApp {
    /**
     * @param {HTMLElement} wrapper
     * @param {string} initialRepLogs
     */
    constructor(wrapper, initialRepLogs) {
        this.wrapper = wrapper;
        this.repLogs = [];
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
        const formJson = JSON.stringify(Object.fromEntries(formData))

        this._submitRepLog(formJson)
    }

    _submitRepLog(data) {
        const url = this.form.getAttribute('action');
        const headers = new Headers();
        headers.append("X-Requested-With", "XMLHttpRequest");
        headers.append("Content-Type", "application/json");

        fetch(url, {method: 'POST', headers, body: data}).then(async Response => {

        })
    }

    _addRow(repLog) {
        this.repLogs.push(repLog);
        const htmlFragment = rowFragment(repLog);
        const row = htmlFragment.content.querySelector('tr');

        // store the repLog index into data-key attribute
        row.setAttribute('data-key', (this.repLogs.length - 1).toString());
        this.wrapper.querySelector('tbody').appendChild(row)
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