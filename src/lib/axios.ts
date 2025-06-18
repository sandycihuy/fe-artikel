import axios from "axios"

const instance = axios.create({
    baseURL: 'https://test-fe.mysellerpintar.com',
    headers:{
        'Content-Type': 'application/json'
    },
});