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

/**
 * Delete one rep log
 * @param repLogId
 * @return {Promise<Response>}
 */
export function deleteRepLog(repLogId) {
    return fetchJson(`/api/reps/${repLogId}`, {
        method: 'DELETE',
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
}

function fetchJson(url, options) {
    return fetch(url, Object.assign({
        credentials: 'same-origin'
    }, options)).then(response => {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
            return response.json()
        }
    })
}