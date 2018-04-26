import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class SlackAuthService {
    private slackOauthAccessUrl: string = "https://slack.com/api/oauth.access";

    constructor(private http: Http) { }

    getUserToken(code: string) : Observable<SlackOAuthAccessResponse>{
        let headers = new Headers({
            "Accept": "application/json"
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(`${this.slackOauthAccessUrl}?client_id=${environment.slackAppClientId}&client_secret=${environment.slackAppClientSecret}&code=${code}`, new RequestOptions())
            .map((res: Response) => Object.assign(new SlackOAuthAccessResponse(), res.json()))
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}

export class SlackOAuthAccessResponse {
    ok: boolean;
    access_token: string;
    scope: string;
    team_id: string;
}



//bb71321f3c5b6d8af78fdc1601703e5a