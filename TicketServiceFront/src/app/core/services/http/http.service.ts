import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { ApiMethods } from "../const";

const apiUrl = "localhost:8080";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private http: HttpClient) {}

  requestCall(api, method, data?: any) {
    let response;
    switch (method) {
      case method === ApiMethods.GET:
        response = this.http
          .get(`${apiUrl}${api}`)
          .pipe(catchError(err => this.handleError(err)));
        break;
      case method === ApiMethods.POST:
        response = this.http
          .post(`${apiUrl}${api}`, data)
          .pipe(catchError(err => this.handleError(err)));
        break;
      case method === ApiMethods.PUT:
        response = this.http
          .put(`${apiUrl}${api}`, data)
          .pipe(catchError(err => this.handleError(err)));
        break;
      case method === ApiMethods.DELETE:
        response = this.http
          .delete(`${apiUrl}${api}`)
          .pipe(catchError(err => this.handleError(err)));
        break;
      default:
        break;
    }
    return response;
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error);
  }
}
