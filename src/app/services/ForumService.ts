import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ForumTopic } from "../models/ForumTopic";

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
}