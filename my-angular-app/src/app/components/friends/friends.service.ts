import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 


@Injectable({ providedIn: 'root' })
export class FriendsService { 
    constructor(private http: HttpClient) {}
    private ngrok = "https://41fd30db.ngrok.io/friend";
    // newInvite: string;
    // currentInvite = [];

    inviteFriend(friendEmail: string, userEmail: string){
        // this.newInvite = input.value;
        return this.http.post(this.ngrok,
            {friendEmail: friendEmail, userEmail: userEmail}, {
                headers: {
                    'accept': '*/*'
                }
            })
    }

}
