import { Injectable } from "@angular/core";
import { DisplayGuest, Gender } from "../models/DisplayGuest";
import { Observable } from "rxjs/Observable";
import { ObserveOnMessage } from "rxjs/operators/observeOn";

@Injectable()
export class FriendsService {
    constructor() {}
    getFriendsForUser() : Observable<Array<DisplayGuest>> {
        return Observable.of([
            this.friend, 
            this.friend1, 
            this.friend2, 
            this.friend3, 
            this.friend4,
        ]);
    }

    getGuestById(id: string) : Observable<DisplayGuest> {
        if(id === this.friend.name){
            return Observable.of(this.friend);
        }
        if(id === this.friend1.name){
            return Observable.of(this.friend1);
        }
        if(id === this.friend2.name){
            return Observable.of(this.friend2);
        }
        if(id === this.friend3.name){
            return Observable.of(this.friend3);
        }
        if(id === this.friend4.name){
            return Observable.of(this.friend4);
        }
        return Observable.of(DisplayGuest.default());
    }





    friend: DisplayGuest = new DisplayGuest(
        "Abdul Beard",
        ["friends", "coworkers", "badass"],
        // "My super duper bestest friend. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        "https://www.facebook.com/abdulkhaliqzaheer",
        "",
        "",
        "https://twosistersandamuslim.slack.com/messages/D2M36DM7T",
        "yolo@solo.com",
        ["coding", "philosophy", "IronMaiden"],
        "../../../assets/profile_pic_1.jpg",
        "../../../assets/profile_pic_2.jpg",
        Gender.Female
      );
      friend1: DisplayGuest = new DisplayGuest(
        "Abdul Beard1",
        ["friends", "coworkers", "badass"],
        "My super duper bestest friend. Can't write much more bruh",
        "https://www.facebook.com/abdulkhaliqzaheer",
        "",
        "",
        "https://twosistersandamuslim.slack.com/messages/D2M36DM7T",
        "yolo@solo.com",
        ["coding", "philosophy", "IronMaiden"],
        "../../../assets/profile_pic_1.jpg",
        "../../../assets/profile_pic_2.jpg",
        Gender.Female
      );
      friend2: DisplayGuest = new DisplayGuest(
        "Abdul Beard2",
        ["friends", "coworkers", "badass"],
        "My super duper bestest friend. Can't write much more bruh",
        "https://www.facebook.com/abdulkhaliqzaheer",
        "",
        "",
        "https://twosistersandamuslim.slack.com/messages/D2M36DM7T",
        "yolo@solo.com",
        ["coding", "philosophy", "IronMaiden"],
        "../../../assets/profile_pic_1.jpg",
        "../../../assets/profile_pic_2.jpg",
        Gender.Female
      );
      friend3: DisplayGuest = new DisplayGuest(
        "Abdul Beard3",
        ["friends", "coworkers", "badass"],
        "My super duper bestest friend. Can't write much more bruh",
        "https://www.facebook.com/abdulkhaliqzaheer",
        "",
        "",
        "https://twosistersandamuslim.slack.com/messages/D2M36DM7T",
        "yolo@solo.com",
        ["coding", "philosophy", "IronMaiden"],
        "../../../assets/profile_pic_1.jpg",
        "../../../assets/profile_pic_2.jpg",
        Gender.Female
      );
      friend4: DisplayGuest = new DisplayGuest(
        "Abdul Beard4",
        ["friends", "coworkers", "badass"],
        "My super duper bestest friend. Can't write much more bruh",
        "https://www.facebook.com/abdulkhaliqzaheer",
        "",
        "",
        "https://twosistersandamuslim.slack.com/messages/D2M36DM7T",
        "yolo@solo.com",
        ["coding", "philosophy", "IronMaiden"],
        "../../../assets/profile_pic_1.jpg",
        "../../../assets/profile_pic_2.jpg",
        Gender.Female
      );
}