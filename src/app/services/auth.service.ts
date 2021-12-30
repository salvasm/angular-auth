import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Config {
    apiUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    apiUrl = 'assets/config.json';

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>('/api/auth/login', { username, password }).pipe(data => {
            localStorage.setItem('currentUser', JSON.stringify(data));
            console.log(data)
            return data;
        });
    }
}
