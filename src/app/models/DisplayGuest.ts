// export class DisplayGuest {
//     name: string;
//     categories: string[];
//     description: string;
//     facebookUrl: string;
//     twitterUrl: string;
//     instagramUrl: string;
//     slackUrl: string;
//     email: string;
//     interests: string[];
//     primaryImage: string;
//     secondaryImage: string;
//     gender: Gender;
//     linkedGuests: Array<string>;

//     public static default(): DisplayGuest {
//         return new DisplayGuest("Jon Doe", ["Anonymous"], "The bestest Jon of Does", "", "", "", "",
//             "john@doe.com", ["John-ing", "Doe-ing"], "", "", Gender.Male)
//     }

//     constructor(name: string, categories: string[], description: string, facebookUrl: string, twitterUrl: string,
//         instagramUrl: string, slackUrl: string, email: string, interests: string[], primaryImage: string,
//         secondaryImage: string, gender: Gender) {
//         this.name = name
//         this.categories = categories
//         this.description = description
//         this.facebookUrl = facebookUrl
//         this.twitterUrl = twitterUrl
//         this.instagramUrl = instagramUrl
//         this.slackUrl = slackUrl
//         this.email = email
//         this.interests = interests
//         this.primaryImage = primaryImage
//         this.secondaryImage = secondaryImage
//         this.gender = gender;
//     }

//     public getMailToHref(): string {
//         return `mailto:${this.email}`;
//     }

//     public getInterestsText(): string {
//         var result = [];
//         for (var i = 0; i < this.interests.length; i++) {
//             if (i === 0) {
//                 result.push(this.interests[i]);
//                 continue;
//             }
//             else if (i > 0 && i < this.interests.length - 1) {
//                 result.push(`, ${this.interests[i]}`);
//                 continue;
//             }
//             else if (i === this.interests.length - 1) {
//                 result.push(` and ${this.interests[i]}`);
//                 continue;
//             }
//         }
//         return result.join("");
//     }

//     public getPronounText(firstCapital: boolean): string {
//         if (this.gender === Gender.Male) {
//             return firstCapital ? "He is" : "he is";
//         }
//         if (this.gender === Gender.Female) {
//             return firstCapital ? "She is" : "she is";
//         }
//         if (this.gender === Gender.NonBinary) {
//             return firstCapital ? "They are" : "they are";
//         }
//     }
// }

// export class DietaryRestrictionsDisplayGuest extends DisplayGuest {
//     public active: boolean;
//     public allergies: Array<string>;
//     public dietaryRestrictions: Array<string>;
//     public religiousRestrictions: Array<string>;
//     public freeformRestrictions: string;
//     public freeformAllergies: string;
//     constructor(name: string, categories: string[], description: string, email: string, gender: Gender) {
//         super(name, categories, description, "", "", "", "", email, [], "", "", gender);
//         this.allergies = [];
//         this.dietaryRestrictions = [];
//         this.religiousRestrictions = [];
//     }
//     getCssClass(currentClass: string): string {
//         return `${this.active ? "active" : ""} ${currentClass}`;
//     }
// }

