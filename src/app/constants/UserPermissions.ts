import { Routes } from './Routes';

export class UserPermission {
    userRole: UserRole;
    forbiddenRoutes: string[];
    postLoginRoutes: string[];
    constructor(role: UserRole, forbiddenRoutes?: string[], postLoginRoutes?: string[]) {
        this.userRole = role;
        this.forbiddenRoutes = forbiddenRoutes;
        this.postLoginRoutes = postLoginRoutes;
    }
    public static default(): UserPermission {
        return UserPermissions.Guest;
    }
}

export enum UserRole {
    Guest,
    RegisteredUser,
    Admin
}

export class UserPermissions {
    public static readonly Guest: UserPermission = new UserPermission(UserRole.Guest, [
        Routes.admin, 
        // Routes.faq, 
        Routes.recipe, 
        // Routes.faqExtended, 
        Routes.accountExtended, 
        Routes.playlist, 
        Routes.messages, 
        Routes.friends, 
        Routes.account, 
        Routes.forum, 
        Routes.forumDetail], []);
    public static readonly RegisteredUser: UserPermission = new UserPermission(UserRole.RegisteredUser, [
            Routes.admin,
            Routes.friends, 
            `${Routes.account}/${Routes.accountProfile}`,
            `${Routes.account}/${Routes.accountUpdates}`,
            `${Routes.account}/${Routes.accountInvitation}`,
            `${Routes.account}/${Routes.accountPolo}`,
            // `${Routes.recipe}`,
            `${Routes.playlist}`
        ], [
            Routes.messages, 
            // Routes.friends, 
            // Routes.account            
        ]);
    public static readonly Admin: UserPermission = new UserPermission(UserRole.Admin, [
            Routes.friends, 
        ], [
            
        ])
}