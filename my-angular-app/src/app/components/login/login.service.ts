import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const FIREBASE_API_KEY = 'AIzaSyCyGI2wUsrwcrNexTgWe-xJwYzUJz-Zez4';
@Injectable({ providedIn: 'root' })
export class LoginService { 
    public userEmail;
    constructor(private http: HttpClient) {}
    private userInfo = "https://df8a40db.ngrok.io/user";

    signUp(email: string, password: string) {
        console.log(this.userEmail)
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

    emailSaved(email: string) {
        this.userEmail = email;
    }
}
