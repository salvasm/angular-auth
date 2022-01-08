import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class JwtService {
    token!: string;
    decodedToken!: { [key: string]: string; };

    constructor() { }

    setToken(token: string) {
        if (token) {
            this.token = token;
        }
    }

    decodeToken() {
        if(this.token) {
            this.decodedToken = jwt_decode(this.token);
        }
    }

    getDecodeToken() {
        return jwt_decode(this.token);
    }

    getUser() {
        this.decodeToken();
        return this.decodedToken ? this.decodedToken['username'] : null;
    }
    
    getRole() {
        this.decodeToken();
        return this.decodedToken ? this.decodedToken['role'] : null;
    }

    getExpirationTime() {
        this.decodeToken();
        return this.decodedToken ? this.decodedToken['expiration'] : null;
    }

    isTokenExpired(): boolean {
        const expirationTime: string | null = this.getExpirationTime();
        if (expirationTime) {
          return ((1000 * +expirationTime) - (new Date()).getTime()) < 5000;
        } else {
          return false;
        }
    }
}
