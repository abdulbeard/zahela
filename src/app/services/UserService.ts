import { Injectable } from "@angular/core";
import { User } from "../models/DisplayComment";

@Injectable()
export class UserService {
    getUserInfo(username: string): User{
        var img = "";
        var commenter = "";
        if(username === "U2M3C5HEE"){
            img = "https://semantic-ui.com/images/avatar/small/matt.jpg";
            commenter = "Zaheer";
        }
        else if(username === "U2M1EE0Q3"){
            img = "https://semantic-ui.com/images/avatar/small/elliot.jpg";
            commenter = "Marcela";
        }
        else if(username === "U2M2V7TQC"){
            img = "https://semantic-ui.com/images/avatar/small/jenny.jpg";
            commenter = "Charla";
        }
        return {
            name: commenter,
            img: img
        }
    }
}