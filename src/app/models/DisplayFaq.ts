export class DisplayFaq {
    content: FaqContent;
    title: FaqTitle;
    id: string;
    active: boolean;
    constructor(title: FaqTitle, content: FaqContent, id: string, active?: boolean) {
        this.title = title;
        this.content = content;
        this.id = id;
        this.active = active ? active : false;
    }
    getCssClass(titleOrContent: string) {
        return `${this.active ? "active" : ""} ${titleOrContent} accordionItem`;
    }
}

export class FaqTitle {
    title: string;
    tags: string[];
    constructor(title: string, tags?: string[]) {
        this.title = title;
        this.tags = tags;
    }
}

export class FaqContent {
    content: string;
    tags: string[];
    constructor(content: string, tags?: string[]) {
        this.content = content;
        this.tags = tags;
    }
}