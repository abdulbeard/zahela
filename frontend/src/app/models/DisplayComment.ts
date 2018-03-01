export class BasicDisplayComment {
    public user: User;
    public text: string;
    public textIsHtml: boolean;
    public timestamp: Date;
    public reactions: DisplayReaction[];
}

export class DisplayComment extends BasicDisplayComment {
    public threadComments: Array<DisplayComment>;
    public slackHref: string;
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