import { UserPermission } from "../constants/UserPermissions";
import { DisplayGuest } from "./DisplayGuest";

export class CurrentUser {
    constructor(permissions: UserPermission, guestInfo: DisplayGuest){

    }

    permissions: UserPermission;
    guestInfo: DisplayGuest;

    guest(): CurrentUser {
        return new CurrentUser(UserPermission.default(), DisplayGuest.default());
    }
}