import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { ThreadMessagesResponse } from '../models/ThreadMessages';
import { environment } from '../../environments/environment';

@Injectable()
export class SlackMessagesService {
    private static slackUrl: string = "https://slack.com/api/";
    private static conversationsHistory: string = "conversations.history";
    private static conversationsReplies: string = "conversations.replies"
    private static defaultMessagesLimit: number = 100;
    constructor(private http: Http) {

    }

    getMessages(): Observable<MessagesResponse> {
        let headers = new Headers({
            "Accept": "application/json"
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(`${SlackMessagesService.slackUrl}${SlackMessagesService.conversationsHistory}?token=${environment.slackToken}&channel=C2M99LPK4&pretty=1&limit=${SlackMessagesService.defaultMessagesLimit}`, new RequestOptions())
            .map((res: Response) => Object.assign(new MessagesResponse(), res.json()))
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getThreadMessages(threadTimestamp: string): Observable<ThreadMessagesResponse>{
        let headers = new Headers({
            "Accept": "application/json"
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(`${SlackMessagesService.slackUrl}${SlackMessagesService.conversationsReplies}?token=${environment.slackToken}&channel=C2M99LPK4&pretty=1&limit=${SlackMessagesService.defaultMessagesLimit}&ts=${threadTimestamp}`, new RequestOptions())
            .map((res: Response) => Object.assign(new ThreadMessagesResponse(), res.json()))
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));        
    }
}

export class MessagesResponse {
    ok: boolean;
    messages: Message[];
    has_more: boolean;
    pin_count: number;
    response_metadata: Responsemetadata;
}

export class Responsemetadata {
    next_cursor: string;
}

export class Message {
    type: string;
    user: string;
    text: string;
    ts: string;
    thread_ts?: string;
    reply_count?: number;
    replies?: Reply[];
    subscribed?: boolean;
    last_read?: string;
    unread_count?: number;
    bot_id?: string;
    attachments?: Attachment[];
}

export class Attachment {
    fallback: string;
    image_url: string;
    image_width: number;
    image_height: number;
    image_bytes: number;
    is_animated?: boolean;
    title: string;
    id: number;
    title_link: string;
    service_name?: string;
    text?: string;
    from_url?: string;
    service_icon?: string;
}

export class Reply {
    user: string;
    ts: string;
}