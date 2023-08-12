import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import querystring from 'querystring';
import { Logger } from '../global/logger';
import { AxiosHeaderOptions, AxiosHttpOptions } from '../global/global.types';

export class AxiosBuilder {
  private options: AxiosRequestConfig;
  // private loggerFactory: LoggerFactory;

  public constructor() {
    // this.loggerFactory = LoggerFactory.getInstance('axios-calls');
    this.options = {
      headers: {
        'Content-Type': 'application/json',
        'accept-language': 'en',
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    };
  }

  public setMethod(method: AxiosHttpOptions): AxiosBuilder {
    this.options.method = method.toUpperCase();
    return this;
  }

  public setUrl(url: string): AxiosBuilder {
    this.options.url = url;
    return this;
  }

  public setBody(body: any): AxiosBuilder {
    this.options.data = body;
    return this;
  }

  public setHeaders(headerOptions: AxiosHeaderOptions[]): AxiosBuilder {
    for (const { header, value } of headerOptions) {
      if (header && value) {
        // this.options.headers[header] = value;
      }
    }
    return this;
  }

  public setParams(params: any): AxiosBuilder {
    if (params) {
      this.options.url = `${this.options.url}?${querystring.stringify(params)}`;
    }
    return this;
  }

  public enableUrlEncoded(urlEncoded: boolean): AxiosBuilder {
    if (urlEncoded) {
      // this.options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      this.options.data = querystring.stringify(this.options.data);
    }
    return this;
  }

  public async sendRequest() {
    try {
      const response = await axios(this.options);
      return response;
    } catch (err) {
      //   if (err?.response) {
      //     const error: any = new Error(JSON.stringify(err.response.data));
      //     error.status = err.response.status;
      //     // logger.error(
      //     //   `Request failed with status ${error.status} at ${new Date().toISOString()}: ${JSON.stringify(this.options)}. Error message: ${err.message}`,
      //     //   error,
      //     // );
      //     throw error;
      //   } else {
      //     logger.error(`Request failed at ${new Date().toISOString()}: ${JSON.stringify(this.options)}. Error message: ${err.message}`, err);
      //     throw err;
      //   }
    }
  }
  // public setLanguage(language: string): AxiosBuilder {
  //   if (language) {
  //     this.options.headers['accept-language'] = language;
  //   }
  //   return this;
  // }

  // public setClientId(clientId: string): AxiosBuilder {
  //   if (clientId) {
  //     this.options.headers.client = clientId;
  //   }
  //   return this;
  // }

  // public setKeyHeader(keyHeader: string): AxiosBuilder {
  //   if (keyHeader) {
  //     this.options.headers['x-api-key'] = keyHeader;
  //   }
  //   return this;
  // }
}
