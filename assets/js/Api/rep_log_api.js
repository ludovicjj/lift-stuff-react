/**
 * Get rep log Collection
 * @return {Promise<any>}
 */
export function getRepLogs() {
    return fetchJson('/api/reps', {
        method: 'GET'
    }).then(data => {
        return data.items
    })
}

export function getRepLog(url) {
    return fetchJson(url, {
        method: 'GET',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json'
        }
    })
}

/**
 * Delete one rep log
 * @param repLogId
 * @return {Promise<Response>}
 */
export function deleteRepLog(repLogId) {
    return fetchJson(`/api/reps/${repLogId}`, {
        method: 'DELETE',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
        }
    })
}

export function createRepLog(repLog) {
    return fetchJson('api/reps', {
        method: 'POST',
        body: JSON.stringify(repLog),
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-type': 'application/json'
        }
    })
}

/**
 *
 * @param {string} url
 * @param {Object} options
 * @return {Promise<Response>}
 */
function fetchJson(url, options) {
    return fetch(url, Object.assign({
        credentials: 'same-origin'
    }, options))
        .then(checkStatus)
        .then(response => {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.indexOf('application/json') !== -1) {
                return response.json()
            } else {
                return response
            }
        })
}

function checkStatus(response) {
    if (response.ok) {
        return response
    }

    const error = new Error(response.status)
    error.response = response

    throw error
}