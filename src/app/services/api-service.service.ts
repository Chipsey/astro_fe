import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../environment/env';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  errorMsg = "You don't have permission for this";

  constructor(
    private httpClient: HttpClient, // Only keep HttpClient
    private router: Router
  ) {}

  /**
   * Setting Headers for API Request
   */
  private setHeaders(token = '', isText: boolean = false): HttpHeaders {
    let headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (isText) {
      headersConfig = {
        'Content-Type': 'text/plain',
        Accept: 'text/plain',
      };
    }

    return new HttpHeaders(headersConfig);
  }

  /**
   * Perform a GET Request
   * @param path
   */
  get(path: string, api_url: string = ''): Observable<any> {
    let url = `${environment.api_url}${path}`;
    if (api_url) {
      url = api_url;
    }

    return this.httpClient.get(url, { headers: this.setHeaders() }).pipe(
      catchError((error) => {
        this.handleTokenExp(error);
        return throwError(error); // Use throwError to propagate error
      })
    );
  }

  /**
   * Perform a GET Request with Parameters
   * @param path
   * @param params
   */
  getParams(path: string, params: any = {}): Observable<any> {
    return this.httpClient
      .get(`${environment.api_url}${path}`, {
        headers: this.setHeaders(),
        params: params,
      })
      .pipe(
        catchError((error) => {
          return throwError(error); // Use throwError to propagate error
        })
      );
  }

  /**
   * Perform a PUT Request
   * @param path
   * @param body
   */
  put(path: string, body: object, api_url: string = ''): Observable<any> {
    let url = `${environment.api_url}${path}`;
    if (api_url) {
      url = `${api_url}${path}`;
    }

    return this.httpClient
      .put(url, body, {
        headers: this.setHeaders(),
      })
      .pipe(
        catchError((error) => {
          return throwError(error); // Use throwError to propagate error
        })
      );
  }

  /**
   * Perform a POST Request
   * @param path
   * @param body
   */
  post(
    path: string,
    body: object,
    token = '',
    api_url: string = ''
  ): Observable<any> {
    let url = `${environment.api_url}${path}`;
    if (api_url) {
      url = `${api_url}${path}`;
    }

    return this.httpClient
      .post(url, body, {
        headers: this.setHeaders(token),
      })
      .pipe(
        catchError((error) => {
          return throwError(error); // Use throwError to propagate error
        })
      );
  }

  postString(path: any, body: any, api_url: string = ''): Observable<any> {
    let url = `${environment.api_url}${path}`;
    if (api_url) {
      url = `${api_url}${path}`;
    }

    return this.httpClient
      .post(url, body, {
        headers: this.setHeaders('', true),
      })
      .pipe(
        catchError((error) => {
          this.handleTokenExp(error);
          return throwError(error); // Use throwError to propagate error
        })
      );
  }

  /**
   * Perform Delete Request
   * @param path
   * @param bodyData
   */
  delete(path: any, bodyData = null): Observable<any> {
    let options: any = { headers: this.setHeaders() };

    if (bodyData) {
      options = {
        body: bodyData,
        headers: this.setHeaders(),
      };
    }

    return this.httpClient
      .delete(`${environment.api_url}${path}`, options)
      .pipe(
        catchError((error) => {
          return throwError(error); // Use throwError to propagate error
        })
      );
  }

  checkErrorType(error: any) {
    if (error?.error?.msg) {
      return true;
    }
    return false;
  }

  handleTokenExp(error: any) {
    if (this.checkErrorType(error) && error.error.msg === 'Invalid Token') {
      error.msg = 'Login session ended. Please login again';
      this.router.navigateByUrl('/login');
      throw error;
    }
    return true;
  }
}
