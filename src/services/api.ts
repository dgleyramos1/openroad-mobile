import axios from 'axios';

import Constants from 'expo-constants';
const { manifest } = Constants;
const ip = manifest?.hostUri?.split(':').shift();
const url = `http://${ip}:8080`;




const api = axios.create({
    baseURL: url
});

export { api};