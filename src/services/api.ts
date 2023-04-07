import axios from 'axios';

import Constants from 'expo-constants';
const { manifest } = Constants;
const ipAddress = manifest?.debuggerHost?.split(':').shift();
const url = `http://${ipAddress}:8080`;


const api = axios.create({
    baseURL: url
});

export { api };