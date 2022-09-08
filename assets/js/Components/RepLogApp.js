class RepLogApp {
    /**
     * @param {HTMLElement} wrapper
     * @param {string} initialRepLogs
     */
    constructor(wrapper, initialRepLogs) {
        this.wrapper = wrapper;
        this.repLogs = [];

        for (let repLog of JSON.parse(initialRepLogs)) {
            this._addRow(repLog);
        }
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