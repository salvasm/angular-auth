import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';

export interface Config {
    apiUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private authApiUrl = '/api/auth';

    constructor(private http: HttpClient, private ls: LocalStorageService) { }

    login(username: string, password: string) {
        return this.http.post<any>(this.authApiUrl + '/login', { username, password }).pipe(
            data => {
                return data;
            });
    }

    public get isUserAuthenticated(): boolean {
        return (this.ls.get('token') !== null);
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
