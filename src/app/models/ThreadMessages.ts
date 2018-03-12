import { Reaction } from "../services/SlackMessagesService";

export class ThreadMessagesResponse {
    messages: Message[];
    has_more: boolean;
    ok: boolean;
  }
  
  export class Message {
    type: string;
    user: string;
    text: string;
    thread_ts: string;
    reactions?: Reaction[];
    reply_count?: number;
    replies?: Reply[];
    subscribed?: boolean;
    last_read?: string;
    unread_count?: number;
    ts: string;
    parent_user_id?: string;
  }
  
  export class Reply {
    user: string;
    ts: string;
  }