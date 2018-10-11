export class PlaylistEntry {
    public constructor(url: string, artist: string, album: string, year: number, name: string, extraInfo: string,
        userId: string, username: string, comment: string, approvalStatus: ApprovalStatus){
        this.id = "00000000-0000-0000-0000-000000000000";
        this.url = url;
        this.artist = artist;
        this.album = album;
        this.year = year;
        this.name = name;
        this.extraInfo = extraInfo;
        this.userId = userId;
        this.username = username;
        this.comment = comment;
        this.approvalStatus = approvalStatus;
    }

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