import axios from 'axios';
import AuthenticationService from "./AuthenticationService";

let instance = axios.create();

instance.interceptors.request.use((config) => {
    if (!config.url.startsWith("http://localhost:8080/authentication")) {
        config.headers = {Authorization: AuthenticationService.getAuthenticationHeader()};
    }
    return config;
})

instance.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 403) {
        localStorage.removeItem("userJWT");
    }
    return Promise.reject(error);
})

export const AxiosWithHeader = instance;