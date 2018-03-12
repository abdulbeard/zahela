import { UserPermission } from "../constants/UserPermissions";
import { DisplayGuest } from "./DisplayGuest";

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