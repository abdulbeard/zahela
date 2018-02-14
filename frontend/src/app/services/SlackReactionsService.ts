import { Injectable } from "@angular/core";
import { SlackMessagesService, EmojisListResponse } from "./SlackMessagesService";
import { DisplayReaction } from "../models/DisplayComment";
import { EmojiService, EmojiDefinitions, EmojiDefinition } from "./EmojiService";


@Injectable()
export class SlackReactionsService {
    constructor(private slackMessagesService: SlackMessagesService) {}
    private static reactions: DisplayReaction[] = [];
    private emojiDefs = new EmojiDefinitions();

    get(reactionName: string): DisplayReaction {
        if (SlackReactionsService.reactions && SlackReactionsService.reactions.length === 0) {
            this.slackMessagesService.getEmojisList().subscribe((result) => {
                SlackReactionsService.reactions = this.parseSlackEmojis(result.emoji);
            }, (Error) => {
            })
        }
        if (SlackReactionsService.reactions[reactionName]) {
            return SlackReactionsService.reactions[reactionName];
        };
        var emojiDefinition: EmojiDefinition = this.emojiDefs[reactionName];
        return {
            img: emojiDefinition ? 
                    EmojiService.getEmojiImageUrl(emojiDefinition) : 
                    EmojiService.getEmojiImageUrl(this.emojiDefs[":question:"]),
            name: emojiDefinition ? emojiDefinition.name : ":question:",
            numOfUsers: 0,
            text: ""
        }
    }

    private parseSlackEmojis(data: object): DisplayReaction[] {
        var result: DisplayReaction[] = [];
        if (Object.keys(data)) {
            Object.keys(data).forEach(emoji => {
                var image = "";
                var name = emoji;
                var numUsers = 0;
                var text = "";
                if (data[emoji].toString().startsWith("alias:")) {
                    var emojiDef = this.emojiDefs[`:${data[emoji].toString().replace("alias:", "")}:`];
                    image = emojiDef.img;
                }
                else {
                    image = data[emoji].toString();
                }
                result.push({
                    img: image,
                    name: name,
                    numOfUsers: numUsers,
                    text: text
                });
            });
        }
        return result;
    }
}