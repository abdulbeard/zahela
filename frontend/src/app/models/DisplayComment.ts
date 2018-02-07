export class DisplayComment{
    public user: User;
    public text: string;
    public threadComments: Array<DisplayComment>;
    public timestamp: Date;
}

export class User{
    public name: string;
    public img: string;
}