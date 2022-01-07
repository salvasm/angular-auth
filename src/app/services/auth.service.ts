import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export interface Config {
    apiUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private authApiUrl = '/api/auth';

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(this.authApiUrl + '/login', { username, password }).pipe(
            data => {
                localStorage.setItem('token', JSON.stringify(data));
                return data;
            });
    }

    logout() {
        localStorage.removeItem('token');
    }

    public get isUserAuthenticated(): boolean {
        return (localStorage.getItem('token') !== null);
    }

    private getServerErrorMessage(error: HttpErrorResponse): string {
        switch (error.status) {
            case 401: {
                return `Unauthorized: ${error.message}`;
            }
            case 404: {
                return `Not Found: ${error.message}`;
            }
            case 403: {
                return `Access Denied: ${error.message}`;
            }
            case 500: {
                return `Internal Server Error: ${error.message}`;
            }
            default: {
                return `Unknown Server Error: ${error.message}`;
            }

        }
    }
}
