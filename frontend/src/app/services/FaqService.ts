import { Injectable } from "@angular/core";
import { DisplayFaq, FaqTitle, FaqContent } from "../models/DisplayFaq";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs";

@Injectable()
export class FaqService {
    public getFaqs(): Observable<Array<DisplayFaq>> {
        var subject = new Subject<Array<DisplayFaq>>();
        subject.next([
            new DisplayFaq(new FaqTitle("What is a dog?", ["Dogs"]), new FaqContent("A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.", ["Pawgs"]), "1", false, 15),
            new DisplayFaq(new FaqTitle("What kinds of dogs are there?", ["Kinds"]), new FaqContent("There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.", ["KindContent"]), "2", false, 10),
            new DisplayFaq(new FaqTitle("How do you acquire a dog?", ["Acquisition"]), new FaqContent("Three common ways for a prospective owner to acquire a dog is from pet shops, private owners, or shelters. A pet shop may be the most convenient way to buy a dog. Buying a dog from a private owner allows you to assess the pedigree and upbringing of your dog before choosing to take it home. Lastly, finding your dog from a shelter, helps give a good home to a dog who may not find one so readily.", ["Acquisition", "Dogs"]), "3", false, 5)
        ]);
        return subject.asObservable();
    }

    public getFilters(): Observable<Array<string>> {
        var subject = new Subject<Array<string>>();
        subject.next(["Organization", "When & Where", "Activities", "Food", "Accommodations"]);
        return subject.asObservable();
    }
}