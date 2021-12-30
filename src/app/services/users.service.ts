import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get<any>('/api/user').pipe(data => {
            console.log(data);
            return data;
      });
  }

  getUserById(id: string) {
      return this.http.get<any>('/api/user/' + id).pipe(data => {
            console.log(data);
            return data;
      })
  }
}
