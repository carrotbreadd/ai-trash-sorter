const API_URL = 'http://localhost:5001/api'

export const apiFetch = async (path: string, options: RequestInit = {}) => {
const token = localStorage.getItem('token')

const headers = {
'Content-Type': 'application/json',
...(token ? { Authorization: `Bearer ${token}` } : {}),
...options.headers,
}

const res = await fetch(`${API_URL}${path}`, {
...options,
headers,
})

return res.json()
}


