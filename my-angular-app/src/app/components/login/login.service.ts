import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const FIREBASE_API_KEY = 'AIzaSyCyGI2wUsrwcrNexTgWe-xJwYzUJz-Zez4';

@Injectable({ providedIn: 'root' })
export class LoginService { 
    constructor(private http: HttpClient) {}
    private userInfo = "https://1d9d864f.ngrok.io/user";

    signUp(email: string, password: string) {
        // console.log({email,password})
        return this.http.post(this.userInfo,
        {email: email, password: password}, {
            headers: {
                'accept': '*/*'
            }
        })
    };

    signUpFirebase(email: string, password: string) {
        // console.log({email,password})
        return this.http.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${FIREBASE_API_KEY}`,
        {email: email, password: password, returnSecureToken: true}, {
            headers: {
                'accept': '*/*'
            }
        })
    };

    login(email: string, password: string) {
        return this.http.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${FIREBASE_API_KEY}`, {
            email: email, password: password, returnSecureToken: true
        });
    }
}
