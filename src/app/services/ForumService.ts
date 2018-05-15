import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ForumTopic } from "../models/ForumTopic";
import { BasicDisplayComment, DisplayComment, User } from "../models/DisplayComment";

@Injectable()
export class ForumService {

    constructor(){}
    getForumTopicsForUser(): Observable<Array<ForumTopic>>{
        return Observable.of(
            Array.of(
                new ForumTopic("general", "general_1", "For general things and chitchat", true),
                new ForumTopic("random", "random_1", "For random things and weird stuff", false),
                new ForumTopic("cats", "cats_1", "For cats and all things cats", false)));
    }

    getMessagesForTopic(): Observable<Array<BasicDisplayComment>> {
        return Observable.of(
            Array.of(
                new BasicDisplayComment({name: "Joe Shmoe", img: "https://semantic-ui.com/images/avatar/small/elliot.jpg"}, "I'm here", new Date()),
                new BasicDisplayComment({name: "Joseph Schmozef", img: "https://semantic-ui.com/images/avatar/small/elliot.jpg"}, "Now I'm here", new Date()),
                new BasicDisplayComment({name: "Shlo Moe", img: "https://semantic-ui.com/images/avatar/small/elliot.jpg"}, "But now I'm here", new Date()),
                new BasicDisplayComment({name: "Yo Lo", img: "https://semantic-ui.com/images/avatar/small/helen.jpg"}, "How about now?", new Date()),
                new BasicDisplayComment({name: "Joe Shmoe", img: "https://semantic-ui.com/images/avatar/small/elliot.jpg"}, "I'm here", new Date()),
                new BasicDisplayComment({name: "Joseph Schmozef", img: "https://semantic-ui.com/images/avatar/small/elliot.jpg"}, "Now I'm here", new Date()),
                new BasicDisplayComment({name: "Shlo Moe", img: "https://semantic-ui.com/images/avatar/small/elliot.jpg"}, "But now I'm here", new Date()),
                new BasicDisplayComment({name: "Yo Lo", img: "https://semantic-ui.com/images/avatar/small/helen.jpg"}, "How about now?", new Date()),
                new BasicDisplayComment({name: "Joe Shmoe", img: "https://semantic-ui.com/images/avatar/small/elliot.jpg"}, "I'm here", new Date()),
                new BasicDisplayComment({name: "Joseph Schmozef", img: "https://semantic-ui.com/images/avatar/small/elliot.jpg"}, "Now I'm here", new Date()),
                new BasicDisplayComment({name: "Shlo Moe", img: "https://semantic-ui.com/images/avatar/small/elliot.jpg"}, "But now I'm here", new Date()),
                new BasicDisplayComment({name: "Yo Lo", img: "https://semantic-ui.com/images/avatar/small/helen.jpg"}, "How about now?", new Date()),
                new BasicDisplayComment({name: "Joe Shmoe", img: "https://semantic-ui.com/images/avatar/small/elliot.jpg"}, "I'm here", new Date()),
                new BasicDisplayComment({name: "Joseph Schmozef", img: "https://semantic-ui.com/images/avatar/small/elliot.jpg"}, "Now I'm here", new Date()),
                new BasicDisplayComment({name: "Shlo Moe", img: "https://semantic-ui.com/images/avatar/small/elliot.jpg"}, "But now I'm here", new Date()),
                new BasicDisplayComment({name: "Yo Lo", img: "https://semantic-ui.com/images/avatar/small/helen.jpg"}, "How about now?", new Date()),
                new BasicDisplayComment({name: "Joe Shmoe", img: "https://semantic-ui.com/images/avatar/small/elliot.jpg"}, "I'm here", new Date()),
                new BasicDisplayComment({name: "Joseph Schmozef", img: "https://semantic-ui.com/images/avatar/small/elliot.jpg"}, "Now I'm here", new Date()),
                new BasicDisplayComment({name: "Shlo Moe", img: "https://semantic-ui.com/images/avatar/small/elliot.jpg"}, "But now I'm here", new Date()),
                new BasicDisplayComment({name: "Yo Lo", img: "https://semantic-ui.com/images/avatar/small/helen.jpg"}, "How about now?", new Date()),
                new BasicDisplayComment({name: "Joe Shmoe", img: "https://semantic-ui.com/images/avatar/small/elliot.jpg"}, "I'm here", new Date()),
                new BasicDisplayComment({name: "Joseph Schmozef", img: "https://semantic-ui.com/images/avatar/small/elliot.jpg"}, "Now I'm here", new Date()),
                new BasicDisplayComment({name: "Shlo Moe", img: "https://semantic-ui.com/images/avatar/small/elliot.jpg"}, "But now I'm here", new Date()),
                new BasicDisplayComment({name: "Yo Lo", img: "https://semantic-ui.com/images/avatar/small/helen.jpg"}, "How about now?", new Date()),
                new BasicDisplayComment({name: "Joe Shmoe", img: "https://semantic-ui.com/images/avatar/small/elliot.jpg"}, "I'm here", new Date()),
                new BasicDisplayComment({name: "Joseph Schmozef", img: "https://semantic-ui.com/images/avatar/small/elliot.jpg"}, "Now I'm here", new Date()),
                new BasicDisplayComment({name: "Shlo Moe", img: "https://semantic-ui.com/images/avatar/small/elliot.jpg"}, "But now I'm here", new Date()),
                new BasicDisplayComment({name: "Yo Lo", img: "https://semantic-ui.com/images/avatar/small/helen.jpg"}, "How about now?", new Date()),
        ));
    }
}