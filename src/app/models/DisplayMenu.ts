export class DisplayMenu {
    displayText: string;
    name: string;
    active: boolean;
    constructor(name: string, active: boolean, displayText: string){
        this.name = name;
        this.active = active;
        this.displayText = displayText;
    }
    public getCssClass(): string {
        return `${this.active ? "active red" : ""} item`;
    }
}