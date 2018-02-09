import { Injectable } from "@angular/core";


@Injectable()
export class SlackMessageParsingService{
    private singleTickRegex = /`.*?`/g;
    private tripleTickRegex = /```.*?```/g;
    private linkRegex = /<.*?>/g;

    parse(text: string): string{
        var tripleTicksReplaced = this.replaceTripleTicks(text);
        var allTicksReplaced = this.replaceSingleTicks(tripleTicksReplaced);
        var allThingsReplaced = this.replaceLinks(allTicksReplaced);
        return allThingsReplaced;
    }

    replaceLinks(text: string):string {
        var regexMatches = text.match(this.linkRegex);
        if (regexMatches && regexMatches.length > 0) {
            for (var i = 0; i < regexMatches.length; i++) {
                if(regexMatches[i].startsWith('<@')){
                    text = text.replace(regexMatches[i], `<a class='user_tag' href='#'>${regexMatches[i]}</a>`);
                }
                else if(regexMatches[i].startsWith('<#')){
                    text = text.replace(regexMatches[i], `<a class='user_tag' href='#'>${regexMatches[i]}</a>`);
                }
                else if(regexMatches[i].startsWith('<!')){
                    text = text.replace(regexMatches[i], `<a class='at_mention' href='#'>${regexMatches[i]}</a>`);
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
        console.log(regexMatches);
        console.log(text)
        if (regexMatches && regexMatches.length > 0) {
            console.log("actually replacing a triple tick");
            for (var i = 0; i < regexMatches.length; i++) {                
                text = text.replace(regexMatches[i], `<pre class='slackComment'>${regexMatches[i].replace(/```/g, '')}</pre>`);
            }
        }
        return text;
    }
}