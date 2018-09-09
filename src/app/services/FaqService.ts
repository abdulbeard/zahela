import { Injectable } from "@angular/core";
import { DisplayFaq, FaqTitle, FaqContent } from "../models/DisplayFaq";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/CurrentUser";
import { environment } from "../../environments/environment";

@Injectable()
export class FaqService {

    constructor(private httpClient: HttpClient) {

    }

    public getFaqs(): Observable<Array<DisplayFaq>> {
        return this.httpClient.get<Array<DisplayFaq>>(`${environment.backendUrl}/faq`).map(x => {
            var faqs = new Array<DisplayFaq>();
            for(var i = 0; i < x.length; i++){
                faqs.push(new DisplayFaq(x[i].title, x[i].content, x[i].id, false, x[i].score));
            }
            return faqs;
        });
        // return Observable.of([
        //     new DisplayFaq(
        //         new FaqTitle("What is a dog?", ["Dogs"]), 
        //         new FaqContent("A dog is a type of <a href='https://gastateparks.org/sites/default/files/parks/CloudlandCanyon.jpg'>domesticated</a> animal.<div class='ui large image'><img src='https://gastateparks.org/sites/default/files/parks/CloudlandCanyon.jpg'></div> Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.", ["Pawgs"]), 
        //         "1", false, 15),
        //     new DisplayFaq(new FaqTitle("What kinds of dogs are there?", ["Kinds"]), new FaqContent("There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.", ["KindContent"]), "2", false, 10),
        //     new DisplayFaq(new FaqTitle("How do you acquire a dog?", ["Acquisition"]), new FaqContent("Three common ways for a prospective owner to acquire a dog is from pet shops, private owners, or shelters. A pet shop may be the most convenient way to buy a dog. Buying a dog from a private owner allows you to assess the pedigree and upbringing of your dog before choosing to take it home. Lastly, finding your dog from a shelter, helps give a good home to a dog who may not find one so readily.", ["Acquisition", "Dogs"]), "3", false, 5)
        // ]);
    }

    public getFilters(): Observable<Array<string>> {
        return this.httpClient.get<Array<string>>(`${environment.backendUrl}/faq/filters`);
        // return Observable.of(["Organization", "When & Where", "Activities", "Food", "Accommodations", "Dogs", "Kinds"]);
    }

    public askQuestion(user: User, question: string) : Observable<boolean> {
        return this.httpClient.post<boolean>(`${environment.backendUrl}/faq/ask`, {
            Question: question,
            UserId: user.Id
        });
    }
}