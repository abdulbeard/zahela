export class BasicDisplayComment {
    constructor(user: User, text: string, timestamp: Date){
        this.user = user;
        this.text = text;
        this.timestamp = timestamp;
    }
    public user: User;
    public text: string;
    public textIsHtml: boolean;
    public timestamp: Date;
    public reactions: DisplayReaction[];
}

export class DisplayComment extends BasicDisplayComment {
    public threadComments: Array<DisplayComment>;
    public slackHref: string;
    public currentReply: string = "";
}

export class User{
    public name: string;
    public img: string;
}

export class DisplayReaction {
    numOfUsers: number;
    text: string;
    img: string;
    name: string;
}