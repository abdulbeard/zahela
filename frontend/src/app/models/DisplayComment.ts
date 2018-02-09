export class DisplayComment{
    public user: User;
    public text: string;
    public textIsHtml: boolean;
    public threadComments: Array<DisplayComment>;
    public timestamp: Date;
    public slackHref: string;
    public reactions: DisplayReaction[];
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