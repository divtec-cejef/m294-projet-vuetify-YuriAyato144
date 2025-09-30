import axios from 'axios'

const baseURL = import.meta.env.DEV // development mode
  ? '/greek' // ← go through Vite proxy in dev
  : import.meta.env.VITE_API_BASE_URL // ← direct access in prod (set this in your .env)

const api = axios.create({
  baseURL, // Assure-toi que cette variable est définie dans ton .env
  timeout: 10_000, // 10 secondes de timeout
})

// Si une clé API est nécessaire, ajoute-la ici
// const key = import.meta.env.VITE_API_KEY
// if (key) {
//   // Adapte si nécessaire (X-API-Key, etc.)
//   api.defaults.headers.common['Authorization'] = `Bearer ${key}`
// }

api.defaults.params = api.defaults.params || {}
api.defaults.params.key = import.meta.env.VITE_API_KEY

export default api
