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
    public static readonly Guest: UserPermission = new UserPermission(UserRole.Guest, [Routes.admin, Routes.messages, Routes.friends], []);
    public static readonly RegisteredUser: UserPermission = new UserPermission(UserRole.RegisteredUser, [Routes.admin], [Routes.messages, Routes.friends]);
    public static readonly Admin: UserPermission = new UserPermission(UserRole.Admin, [], [])
}