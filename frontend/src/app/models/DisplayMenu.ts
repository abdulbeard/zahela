export class DisplayMenu {
    name: string;
    active: boolean;
    constructor(name: string, active: boolean){
        this.name = name;
        this.active = active;
    }
    public getCssClass(): string {
        return `${this.active ? "active red" : ""} item`;
    }
}