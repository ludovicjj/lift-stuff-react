/**
 * Get rep log Collection
 * @return {Promise<any>}
 */
export function getRepLogs() {
    return fetch('/api/reps').then(response => {
        return response.json()
    })
}