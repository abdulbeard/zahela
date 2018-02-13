export class DisplayChannel {
    constructor(id: string, name: string, selected: boolean) {
        this.id = id;
        this.name = name;
        this.selected = selected;
    }
    id: string;
    name: string;
    selected: boolean;
    public channelContentId(): string { 
        return `${this.id}_content`; 
    }
    public getCssClass(): string {
        return this.selected ? "active red item" : "red item";
    }
    public getHref(): string {
        return `/messages/${this.id}`;
    }
}