import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 


@Injectable({ providedIn: 'root' })
export class FriendsService { 
    constructor(private http: HttpClient) {}
    private ngrok = "https://0265f40f.ngrok.io/friend";
    // newInvite: string;
    // currentInvite = [];

    inviteFriend(friendEmail: string, userEmail: string){
        // this.newInvite = input.value;
        console.log(friendEmail, userEmail);
        return this.http.post(this.ngrok,
            {friendEmail: friendEmail, userEmail: userEmail}, {
                headers: {
                    'accept': '*/*'
                }
            })
    }
    getFriends(userEmail: string){
        console.log(userEmail, "{{{{{{");
        return this.http.post("https://0265f40f.ngrok.io/friends",
        //http://0265f40f.ngrok.io
            {userEmail: userEmail})
    }

}
