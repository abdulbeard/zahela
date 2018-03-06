export class DisplayFaq {
    content: FaqContent;
    title: FaqTitle;
    id: string;
    active: boolean;
    score: number;
    constructor(title: FaqTitle, content: FaqContent, id: string, active?: boolean, score?: number) {
        this.title = title;
        this.content = content;
        this.id = id;
        this.active = active ? active : false;
        this.score = score ? score : 0;
    }
    getCssClass(titleOrContent: string) {
        return `${this.active ? "active" : ""} ${titleOrContent} accordionItem`;
    }
    public static sort(one: DisplayFaq, two: DisplayFaq) {
        if (one.score < two.score) {
            return -1;
        }
        if (two.score < one.score) {
            return 1;
        }
        // a must be equal to b
        return 0;
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