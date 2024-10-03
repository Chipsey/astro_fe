import { Injectable } from '@angular/core';
import { ApiService } from './api-service.service';
import { Observable, map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FreeUserService {
  constructor(private apiService: ApiService) {}

  /**
   * get-all
   * @param data
   */
  getAll(data: any): Observable<any> {
    return this.apiService.get('ask?' + data).pipe(
      map((data) => {
        return data;
      }),
      catchError((res) => {
        throw res;
      })
    );
  }

  /**
   * updating admin
   * @param data
   * @returns
   */
  update(data: object): Observable<any> {
    return this.apiService.put('ask', data).pipe(
      map((data) => {
        return data;
      }),
      catchError((res) => {
        throw res;
      })
    );
  }

  create(data: any): Observable<any> {
    return this.apiService.post('ask', data).pipe(
      map((data) => {
        return data;
      }),
      catchError((res) => {
        throw res;
      })
    );
  }

  delete(data: any): Observable<any> {
    return this.apiService.delete(`ask${data['_id']}`).pipe(
      map((data) => {
        return data;
      }),
      catchError((res) => {
        throw res;
      })
    );
  }

  /**
   * view images from the server
   * @param id
   */
  viewUploadedFiles(id: any) {
    return this.apiService.get(`uploads/${id}`).pipe(
      map((data) => {
        return data;
      }),
      catchError((res) => {
        throw res;
      })
    );
  }
}
