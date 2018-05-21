import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ForumTopic } from "../models/ForumTopic";
import { BasicDisplayComment, DisplayComment, User } from "../models/DisplayComment";
import { Http, RequestOptions, Headers, Response } from "@angular/http";
import { environment } from '../../environments/environment'

@Injectable()
export class ForumService {

    constructor(private http: Http) { }
    getForumTopicsForUser(): Observable<Array<ForumTopic>> {
        return Observable.of(
            Array.of(
                new ForumTopic("general", "general_1", "For general things and chitchat", true),
                new ForumTopic("random", "random_1", "For random things and weird stuff", false),
                new ForumTopic("cats", "cats_1", "For cats and all things cats", false)));
    }

    addComment(comment: BasicDisplayComment, topicId: string) {
        let headers = new Headers({
            "Accept": "application/json"
        });
        let options = new RequestOptions({ headers: headers });
        var response = this.http.put(`${environment.backendUrl}/forumcomments`, JSON.stringify({
            ForumTopicId: topicId,
            UserId: comment.user.name,
            Text: comment.text,
            Likes: null
        }), options);
    }

    getThreadedMessagesForTopic(topicId: string, userId: string): Observable<Array<DisplayComment>> {
        let array = Array.of(
            new DisplayComment({ name: "Amy", img: "https://semantic-ui.com/images/avatar/small/elliot.jpg" }, "cash", new Date()),
            new DisplayComment({ name: "Shaq", img: "https://semantic-ui.com/images/avatar/small/elliot.jpg" }, "me", new Date()),
            new DisplayComment({ name: "Laurel", img: "https://semantic-ui.com/images/avatar/small/elliot.jpg" }, "ousside", new Date()),
            new DisplayComment({ name: "Andy", img: "https://semantic-ui.com/images/avatar/small/elliot.jpg" }, "how bout dat?", new Date()),
        );
        array[0].threadComments = Array.of(new DisplayComment({ name: "Danielle", img: "https://semantic-ui.com/images/avatar/small/elliot.jpg" }, "huh?", new Date()));
        return Observable.of(array);
    }

    getMessagesForTopic(topicId: string, userId: string): Observable<Array<BasicDisplayComment>> {
        var responseComments = Array.of(
            new BasicDisplayComment({ name: "Joe Shmoe", img: "https://semantic-ui.com/images/avatar/small/elliot.jpg" }, "I'm here", new Date()),
            new BasicDisplayComment({ name: "Joseph Schmozef", img: "https://semantic-ui.com/images/avatar/small/elliot.jpg" }, "Now I'm here", new Date()),
            new BasicDisplayComment({ name: "Shlo Moe", img: "https://semantic-ui.com/images/avatar/small/elliot.jpg" }, "But now I'm here", new Date()),
            new BasicDisplayComment({ name: "Yo Lo", img: "https://semantic-ui.com/images/avatar/small/helen.jpg" }, "How about now?", new Date()),
            new BasicDisplayComment({ name: "Joe Shmoe", img: "https://semantic-ui.com/images/avatar/small/elliot.jpg" }, "I'm here", new Date()), );


        let headers = new Headers({
            "Accept": "application/json"
        });
        let options = new RequestOptions({ headers: headers });
        let response = this.http.get(`${environment.backendUrl}/forumcomments/${topicId}/${userId}`, options);
        response.subscribe((response: Response) => {
            response.json().map(x => {
                responseComments.push(new BasicDisplayComment({ name: x.userId, img: "https://semantic-ui.com/images/avatar/small/helen.jpg" }, x.text, new Date()));
            })
        }, error => console.log(error));
        return Observable.of(responseComments);
    }
}