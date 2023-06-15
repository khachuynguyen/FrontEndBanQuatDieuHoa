import axios from 'axios';
const Instance = axios.create({
    baseURL: 'https://fine-crown-production.up.railway.app/api/',
    timeout: 20000,
});

export default Instance;