// All code related to remote calls comes up
// It should be central utility to patch headers such as cookies before any api call
// access-token, Cookie // Start a loader, exception handling {error: true, data: {message: "", errorCode: ""}}, 
/*
the client can be extended as follows according to the need for configuration:-

`class req extends httpClient{
    public constructor(token: headerType){
        super(COURSES_URL,token);
        this._initializeRequestInterceptor();
    }
    public getter = () => this.instance.get('/');

    private _initializeRequestInterceptor = () => {
        this.instance.interceptors.request.use(
          this._handleRequest,
          this._handleError,
        );
    };
};`

const token: headerType= {
    Authorizartion: "Token"
};
const reqs = new req(token)
reqs.getter().then( res=>console.log(res));

*/
import axios, {AxiosResponse, AxiosInstance, AxiosRequestConfig }from 'axios'
import {headerType} from './../models/header-type'

declare module 'axios' {
    export interface AxiosRequestConfig {
      handlerEnabled: boolean;
    }
  }

abstract class httpClient{
    protected readonly instance: AxiosInstance;
    header: headerType; //header type class

    public constructor(baseURL: string,header: headerType) {
        this.instance = axios.create({
            baseURL,
            handlerEnabled: true
        });
        this.header = header;
    }
    
    protected _handleResponse = ({ data }: AxiosResponse) => data;
    
    protected _handleError = (error: any) => Promise.reject((error: any)=> console.log(error.status));

    protected _handleRequest = (config: AxiosRequestConfig) => {
        config.headers['Authorization'] = this.header.Authorizartion;
        return config;
    };
}

export default httpClient;

