export class DisplayGuest {
    name: string;
    categories: string[];
    description: string;
    facebookUrl: string;
    twitterUrl: string;
    instagramUrl: string;
    slackUrl: string;
    email: string;
    interests: string[];
    primaryImage: string;
    secondaryImage: string;
    gender: Gender;

    public static default(): DisplayGuest {
        return new DisplayGuest("Jon Doe", ["Anonymous"], "The bestest Jon of Does", "", "", "", "", 
        "john@doe.com", ["John-ing", "Doe-ing"], "", "", Gender.Male)
    }

    constructor(name: string, categories: string[], description: string, facebookUrl: string, twitterUrl: string,
        instagramUrl: string, slackUrl: string, email: string, interests: string[], primaryImage: string,
        secondaryImage: string, gender: Gender) {
        this.name = name
        this.categories = categories
        this.description = description
        this.facebookUrl = facebookUrl
        this.twitterUrl = twitterUrl
        this.instagramUrl = instagramUrl
        this.slackUrl = slackUrl
        this.email = email
        this.interests = interests
        this.primaryImage = primaryImage
        this.secondaryImage = secondaryImage
        this.gender = gender;
    }

    public getMailToHref(): string {
        return `mailto:${this.email}`;
    }

    public getInterestsText(): string {
        var result = [];
        for (var i = 0; i < this.interests.length; i++) {
            if (i === 0) {
                result.push(this.interests[i]);
                continue;
            }
            else if (i > 0 && i < this.interests.length - 1) {
                result.push(`, ${this.interests[i]}`);
                continue;
            }
            else if (i === this.interests.length - 1) {
                result.push(` and ${this.interests[i]}`);
                continue;
            }
        }
        return result.join("");
    }

    public getPronounText(firstCapital: boolean): string {
        if (this.gender === Gender.Male) {
            return firstCapital ? "He" : "he";
        }
        if (this.gender === Gender.Female) {
            return firstCapital ? "She" : "she";
        }
        if (this.gender === Gender.NonSpecific) {
            return firstCapital ? "They" : "they";
        }
    }
}

export enum Gender {
    Male,
    Female,
    NonSpecific
}