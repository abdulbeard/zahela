export class ForumTopic {
    constructor(name: string, id: string, description: string, active: boolean){
        this.Name = name;
        this.Id = id;
        this.Description = description;
        this.Active = active;
    }
    public Name: string;
    public Id: string;
    public Description: string;
    public Active: boolean;
    public getTopicContentId(): string {
        return `${this.Id}_content`;
    }
}