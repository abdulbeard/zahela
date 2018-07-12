import { UserPermission } from "../constants/UserPermissions";
import { Gender } from "./Gender";

export class CurrentUser {
    constructor(permissions: UserPermission, guestInfo: User, loggedIn?: boolean) {
        this.permissions = permissions;
        this.guestInfo = guestInfo;
        this.loggedIn = loggedIn ? loggedIn : false;
    }

    permissions: UserPermission;
    guestInfo: User;
    loggedIn: boolean;

    public static guest(): CurrentUser {
        return new CurrentUser(UserPermission.default(), User.default(), false);
    }
}

export class User {
    Username: string;
    FirstName: string;
    LastName: string;
    MiddleInitial: string;
    Categories: string[];
    Description: string;
    FacebookUrl: ContactInfo;
    TwitterUrl: ContactInfo;
    InstagramUrl: ContactInfo;
    Email: ContactInfo;
    Interests: string[];
    AvatarImage: string;
    Images: string[];
    Gender: Gender;
    Id: string;
    LinkedGuests: User[];
    Allergies: string[];
    DietaryRestrictions: string[];
    ReligiousRestrictions: string[];
    FreeformRestrictions: string;
    FreeformAllergies: string;
    RSVPStatus: RSVPStatus;
    Type: UserType;

    public static default(): User {
        return new User("Jon", "Doe", ["Anonymous"], "The Doest of Jons", new ContactInfo("www.facebook.com", true),
            new ContactInfo("www.twitter.com", true), new ContactInfo("www.instagram.com", true),
            new ContactInfo("jon@doe.com", true), ["Joning", "Doe-ing", "Pingpong"], "https://zahelastorage.blob.core.windows.net/zahela-assets/defaultAvatars/male-1.svg",
            [
                "https://zahelastorage.blob.core.windows.net/zahela-assets/defaultAvatars/male-1.svg", 
                "https://zahelastorage.blob.core.windows.net/zahela-assets/defaultAvatars/male-2.svg"
            ],
            Gender.Male, 
            [
                new User("Jane", "Smith", ["Anonymous"], "The Doest of Jons", new ContactInfo("www.facebook.com", true),
                    new ContactInfo("www.twitter.com", true), new ContactInfo("www.instagram.com", true),
                    new ContactInfo("jon@doe.com", true), ["Joning", "Doe-ing", "Pingpong"], "https://zahelastorage.blob.core.windows.net/zahela-assets/defaultAvatars/male-1.svg",
                    ["https://zahelastorage.blob.core.windows.net/zahela-assets/defaultAvatars/male-1.svg", "https://zahelastorage.blob.core.windows.net/zahela-assets/defaultAvatars/male-2.svg"],
                    Gender.Male, 
                    null, ["Peanuts"], ["Pescetarian"], ["Islam"], "I dont wike beef/chicken",
                    "Kinda don't like pansies", RSVPStatus.Coming, UserType.GuestUser),
                new User("John", "Spawn", ["Anonymous"], "The Doest of Jons", new ContactInfo("www.facebook.com", true),
                    new ContactInfo("www.twitter.com", true), new ContactInfo("www.instagram.com", true),
                    new ContactInfo("jon@doe.com", true), ["Joning", "Doe-ing", "Pingpong"], "https://zahelastorage.blob.core.windows.net/zahela-assets/defaultAvatars/male-1.svg",
                    ["https://zahelastorage.blob.core.windows.net/zahela-assets/defaultAvatars/male-1.svg", "https://zahelastorage.blob.core.windows.net/zahela-assets/defaultAvatars/male-2.svg"],
                    Gender.Male, 
                    null, ["Peanuts"], ["Pescetarian"], ["Islam"], "I dont wike beef/chicken",
                    "Kinda don't like pansies", RSVPStatus.Coming, UserType.GuestUser)
            ]
            , ["Peanuts"], ["Pescatarian"], ["Islam"], "I dont wike beef/chicken",
            "Kinda don't like pansies", RSVPStatus.Coming, UserType.GuestUser);
    }

    constructor(firstname: string, lastname: string, categories: string[], description: string, facebookInfo: ContactInfo,
        twitterInfo: ContactInfo, instagramInfo: ContactInfo, email: ContactInfo, interests: string[],
        avatar: string, images: string[], gender: Gender, linkedGuests: User[], allergies: string[],
        dietaryRestrictions: string[], religiousRestrictions: string[], freeformRestrictions: string,
        freeformAllergies: string, rsvpStatus: RSVPStatus, type: UserType) {
        this.FirstName = firstname;
        this.LastName = lastname;
        this.Categories = categories;
        this.Description = description;
        this.FacebookUrl = facebookInfo;
        this.TwitterUrl = twitterInfo;
        this.InstagramUrl = instagramInfo;
        this.Email = email;
        this.Interests = interests;
        this.AvatarImage = avatar;
        this.Images = images;
        this.Gender = gender;
        this.LinkedGuests = linkedGuests;
        this.Allergies = allergies;
        this.DietaryRestrictions = dietaryRestrictions;
        this.ReligiousRestrictions = religiousRestrictions;
        this.FreeformRestrictions = freeformRestrictions;
        this.FreeformAllergies = freeformAllergies;
        this.RSVPStatus = rsvpStatus;
        this.Type = type;
    }

    public getPronounText(firstCapital: boolean): string {
        if (this.Gender === Gender.Male) {
            return firstCapital ? "He is" : "he is";
        }
        if (this.Gender === Gender.Female) {
            return firstCapital ? "She is" : "she is";
        }
        if (this.Gender === Gender.NonBinary) {
            return firstCapital ? "They are" : "they are";
        }
    }

    public getInterestsText(): string {
        var result = [];
        for (var i = 0; i < this.Interests.length; i++) {
            if (i === 0) {
                result.push(this.Interests[i]);
                continue;
            }
            else if (i > 0 && i < this.Interests.length - 1) {
                result.push(`, ${this.Interests[i]}`);
                continue;
            }
            else if (i === this.Interests.length - 1) {
                result.push(` and ${this.Interests[i]}`);
                continue;
            }
        }
        return result.join("");
    }
}

export class ContactInfo {
    Uri: string;
    IsPublic: boolean;

    constructor(uri: string, ispublic: boolean) {
        this.Uri = uri;
        this.IsPublic = ispublic;
    }
}

export enum RSVPStatus {
    Coming,
    NotComing
}

export enum UserType {
    GuestUser,
    RegisteredUser,
    Posse,
    Admin
}