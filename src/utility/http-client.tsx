// All code related to remote calls comes up
// It should be central utility to patch headers such as cookies before any api call
// access-token, Cookie // Start a loader, exception handling {error: true, data: {message: "", errorCode: ""}}, 
/*
the client can be extended as follows according to the need for configuration:-
const reqs = new req(baseurl,config)
reqs.get().then( res=>console.log(res));
*/

import axios, {AxiosResponse, AxiosInstance, AxiosRequestConfig }from 'axios'
import {configType} from '../models/config-type'

declare module 'axios' {
    export interface AxiosRequestConfig {
      handlerEnabled: boolean;
    }
  }

class httpClient{
    protected readonly instance: AxiosInstance;
    config: configType; //header type class

    public constructor(baseURL: string,config: configType) {
        this.instance = axios.create({
            baseURL,
            handlerEnabled: true
        });
        this.config = config;
    }
    
    protected _handleResponse = ({ data }: AxiosResponse) => data;
    
    protected _handleError = (error: any) => Promise.reject((error: any)=> console.log(error.status));

    protected _handleRequest = (config: AxiosRequestConfig) => {
        config.headers['Authorization'] = this.config.headerAuthorization;
        config.headers["Content-type"] = this.config.contentType
        return config;
    };

    public get = (url: string) => {
        this.instance.interceptors.request.use(
            this._handleRequest,
            this._handleError,
        );
        return this.instance.get(url);
    }

    public post = (url: string, body: any) => {
        this.instance.interceptors.request.use(
            this._handleRequest,
            this._handleError,
        );
        return this.instance.post(url, body);
    }

    public put = (url: string, body: any) => {
        this.instance.interceptors.request.use(
            this._handleRequest,
            this._handleError,
        );
        return this.instance.put(url, body);
    }

    public delete = (url: string) =>{
        this.instance.interceptors.request.use(
            this._handleRequest,
            this._handleError,
        );
        return this.instance.delete(url);
    }
}

export default httpClient;

