export class PlaylistEntry {
    id: string;
    url: string;
    artist: string;
    album: string;
    year: number;
    name: string;
    extraInfo: string;
    userId: string;
    username: string;
    comment: string;
    approvalStatus: ApprovalStatus;
}

export enum ApprovalStatus {
    None = 0,
    Rejected = 1,
    Approved = 2
}