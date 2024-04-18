import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-gateway.skymavis.com/',
    timeout: 5000
})

export default api;