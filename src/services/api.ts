import axios from 'axios';

const apiOrigins = axios.create({
    baseURL: 'https://api-gateway.skymavis.com/',
    timeout: 5000
})

export default apiOrigins;