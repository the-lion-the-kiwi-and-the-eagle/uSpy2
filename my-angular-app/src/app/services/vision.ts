
import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';



@Injectable() 
export class Vision {
    constructor (private http: Http) {}
        
// send to server url from here as base64 script.
    private googleVisionURL = "http://cbf44219.ngrok.io/image"; //"https://vision.googleapis.com/v1/images:annotate?key="
    
    private getImageAnnotations (base64Image: string): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const request = {
            requests: [
                {
                    features: [
                    {
                        type: "LABEL_DETECTION",
                        //type: "LANDMARK_DETECTION",
                        maxResults: 5
                    }],
                    image: {
                        content: base64Image
                    }
                }]
        };
        console.log(this.googleVisionURL);
        return this.http
                    .post(this.googleVisionURL, JSON.stringify(request), options)
                    .toPromise();
    }

    public evaluatePicture(base64Image: string):any {
        let errorMessage,
            result;
        // this is where the image labels are recieved
        return this.getImageAnnotations(base64Image).then(response => {
            console.log(response);
            result = response.json();
            if (result.error){
               console.log('API key wrong/missing?', result.error);
               return { faces:'API key wrong/missing?', things: result.error};
            }
            let labelAnnotations = result;
            return {
                things: this.evalLabels(labelAnnotations) 
            }        
        }, e => {
            console.log("Error occurred " + e);
        });
    }
    private evalLabels(things) :string {
        let retString = '';
        if(things) {
            things.forEach(thing => {
                retString += thing.description + ' (' + Math.floor(thing.score * 100) + '%), ' 
            });    
        }
        return retString;
    }

}