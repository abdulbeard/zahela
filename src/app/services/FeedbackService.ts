import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable()
export class FeedbackService {

    constructor(private httpClient: HttpClient) {
    }

    public submitFeedback(feedback: Array<Feedback>) : Observable<boolean> {
        return this.httpClient.post<boolean>(`${environment.backendUrl}/feedback`, feedback);
    }
}

export class Feedback {
    constructor(prompt: string, answer: string){
        this.Prompt = prompt;
        this.Answer = answer;
    }
    public Prompt: string;
    public Answer: string;
}