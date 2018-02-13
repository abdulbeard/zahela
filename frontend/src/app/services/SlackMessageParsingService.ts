import { Injectable } from "@angular/core";
import { UserService } from "./UserService";
import { MessagesResponse, SlackMessagesService, Reaction } from "./SlackMessagesService";
import { DisplayComment, DisplayReaction } from "../models/DisplayComment";
import { EmojiService } from "./EmojiService";
import { SlackReactionsService } from "./SlackReactionsService";


@Injectable()
export class SlackMessageParsingService {
    private singleTickRegex = /`.*?`/g;
    private tripleTickRegex = /```.*?```/g;
    private linkRegex = /<.*?>/g;

    constructor(private userService: UserService, private slackMessagesService: SlackMessagesService,
        private slackReactionsService: SlackReactionsService, private usersService: UserService) {

    }

    parseSlackMessages(channel: string, slackMessages: MessagesResponse): DisplayComment[] {
        var comments: DisplayComment[] = [];
        for (var i = 0; i < slackMessages.messages.length; i++) {
            var displayComment = new DisplayComment();
            var slackMessage = slackMessages.messages[i];
            displayComment.text = this.parse(slackMessage.text);
            displayComment.timestamp = new Date(parseFloat(slackMessage.ts) * 1000.0);
            displayComment.user = this.userService.getUserInfo(slackMessage.user);
            displayComment.threadComments = new Array<DisplayComment>();
            displayComment.textIsHtml = true;
            displayComment.slackHref = this.getSlackHref(slackMessage.ts, "C2M99LPK4");
            displayComment.reactions = this.getDisplayReactions(slackMessage.reactions);
            if (EmojiService.textContainsEmoji(displayComment.text)) {
                displayComment.text = this.parse(displayComment.text);
                displayComment.text = EmojiService.replaceEmojisWithHtml(displayComment.text);
                displayComment.textIsHtml = true;
            }
            if (slackMessage.thread_ts) {
                this.slackMessagesService.getThreadMessages(channel, slackMessage.thread_ts).subscribe((result) => {
                    console.log(result);
                    result.messages.forEach(message => {
                        if (message.thread_ts !== slackMessage.thread_ts) {
                            var textContainsEmoji = EmojiService.textContainsEmoji(message.text);
                            displayComment.threadComments.push({
                                text: textContainsEmoji ? EmojiService.replaceEmojisWithHtml(displayComment.text = this.parse(message.text)) : this.parse(message.text),
                                threadComments: [],
                                timestamp: new Date(parseFloat(message.ts) * 1000.0),
                                user: this.userService.getUserInfo(message.user),
                                slackHref: this.getSlackHref(slackMessage.thread_ts, "C2M99LPK4"),
                                reactions: this.getDisplayReactions(message.reactions),
                                textIsHtml: true//textContainsEmoji
                            });
                        }
                    })
                }, (Error) => {
                    console.log(Error);
                });
            }
            comments.push(displayComment);
        }
        console.log(comments);
        return comments;
    }

    getDisplayReactions(reactions: Reaction[]): DisplayReaction[] {
        var result: DisplayReaction[] = [];
        if (reactions) {
            reactions.forEach(reaction => {
                var reactionName = `:${reaction.name}:`;
                reaction.users.push("U2M1EE0Q3");
                reaction.users.push("U2M2V7TQC");
                var displayReaction = this.slackReactionsService.get(reactionName);
                displayReaction.numOfUsers = reaction.count;
                displayReaction.text = `${reaction.users.map(x => this.userService.getUserInfo(x).name).join(',')} reacted with ${reactionName}`;
                result.push(displayReaction);
            });
        }
        return result;
    }

    getSlackHref(text: string, channel: string): string {
        var returnValue = text ? `https://twosistersandamuslim.slack.com/messages/${channel}/p${text.replace(/\./g, "")}` : text;
        return returnValue;
    }

    parse(text: string): string {
        var tripleTicksReplaced = this.replaceTripleTicks(text);
        var allTicksReplaced = this.replaceSingleTicks(tripleTicksReplaced);
        var allThingsReplaced = this.replaceLinks(allTicksReplaced);
        return allThingsReplaced;
    }

    replaceLinks(text: string): string {
        var regexMatches = text.match(this.linkRegex);
        if (regexMatches && regexMatches.length > 0) {
            for (var i = 0; i < regexMatches.length; i++) {
                var user = this.userService.getUserInfo(regexMatches[i].replace(/<@/g, "").replace(/>/g, ""));
                if (regexMatches[i].startsWith('<@')) {
                    text = text.replace(regexMatches[i], `<a class='user_tag' href='#'>@    ${user.name}</a>`);
                }
                else if (regexMatches[i].startsWith('<#')) {
                    var rawText = regexMatches[i].replace(/<#/g, "").replace(/>/g, "");
                    var channelSplit = rawText.split('|');
                    var channelId = channelSplit[0];
                    var channelName = channelSplit[1];
                    text = text.replace(regexMatches[i], `<a class='user_tag' href='#'>#${channelName}</a>`);
                }
                else if (regexMatches[i].startsWith('<!')) {
                    var replaced = regexMatches[i].replace(/<!/g, "").replace(/>/g, "");
                    text = text.replace(regexMatches[i], `<a class='at_mention' href='#'>@${replaced}</a>`);
                }
            }
        }
        return text;
    }

    replaceSingleTicks(text: string): string {
        var regexMatches = text.match(this.singleTickRegex);
        if (regexMatches && regexMatches.length > 0) {
            for (var i = 0; i < regexMatches.length; i++) {
                text = text.replace(regexMatches[i], `<code>${regexMatches[i].replace(/`/g, '')}</code>`);
            }
        }
        return text;
    }

    replaceTripleTicks(text: string): string {
        var regexMatches = text.match(this.tripleTickRegex);
        if (regexMatches && regexMatches.length > 0) {
            for (var i = 0; i < regexMatches.length; i++) {
                text = text.replace(regexMatches[i], `<pre class='slackComment'>${regexMatches[i].replace(/```/g, '')}</pre>`);
            }
        }
        return text;
    }
}