// All code related to remote calls comes up
// It should be central utility to patch headers such as cookies before any api call
// access-token, Cookie // Start a loader, exception handling {error: true, data: {message: "", errorCode: ""}}, 
/*
the client can be extended as follows according to the need for configuration:-
const reqs = new req(baseurl,config)
reqs.get().then( res=>console.log(res));
*/

import axios, { AxiosResponse, AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios'
import { AUTHORISATION_PATH } from '../constants/global-constants';
import { configType } from '../models/config-type'

declare module 'axios' {
    export interface AxiosRequestConfig {
        handlerEnabled: boolean;
    }
}

class HttpClient {
    protected readonly instance: AxiosInstance;

    public constructor() {
        this.instance = axios.create({
            handlerEnabled: true
        });
    }

    protected _handleResponse = ({ data }: AxiosResponse) => data;

    protected _handleError = (error: AxiosError) => {
        if (error.response.status === 401) {
            window.location.href = AUTHORISATION_PATH;
        }
        Promise.reject(error.response);
    }

    public get = (url: string) => {
        this.instance.interceptors.response.use(
            this._handleResponse,
            this._handleError,
        );
        return this.instance.get(url);
    }

    public post = (url: string, body: any) => {
        this.instance.interceptors.response.use(
            this._handleResponse,
            this._handleError,
        );
        return this.instance.post(url, body);
    }

    public put = (url: string, body: any) => {
        this.instance.interceptors.response.use(
            this._handleResponse,
            this._handleError,
        );
        return this.instance.put(url, body);
    }

    public delete = (url: string) => {
        this.instance.interceptors.response.use(
            this._handleResponse,
            this._handleError,
        );
        return this.instance.delete(url);
    }
}

const httpInstance = new HttpClient();

export default httpInstance;

