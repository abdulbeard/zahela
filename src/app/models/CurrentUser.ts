import { UserPermission } from "../constants/UserPermissions";
import { DisplayGuest, Gender } from "./DisplayGuest";

export class CurrentUser {
    constructor(permissions: UserPermission, guestInfo: DisplayGuest, loggedIn?: boolean){
        this.permissions = permissions;
        this.guestInfo = guestInfo;
        this.loggedIn = loggedIn ? loggedIn : false;
    }

    permissions: UserPermission;
    guestInfo: DisplayGuest;
    loggedIn: boolean;

    public static guest(): CurrentUser {
        return new CurrentUser(UserPermission.default(), DisplayGuest.default(), false);
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
    LinkedGuests: any[];
    Allergies: string[];
    DietaryRestrictions: string[];
    ReligiousRestrictions: string[];
    FreeformRestrictions: string;
    FreeformAllergies: string;
    RSVPStatus: number;
    Type: UserType;
  }
  
  export class ContactInfo {
    Uri: string;
    IsPublic: boolean;
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