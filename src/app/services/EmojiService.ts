import { Injectable } from "@angular/core";

@Injectable()
export class EmojiService {
    private static emojiRegex: RegExp = /:.*?:/g;
    private static emojisBaseUrl: string = "https://www.webpagefx.com/tools/emoji-cheat-sheet/graphics/emojis/";

    static replaceEmojisWithHtml(text: string): string {
        var emojiDefinitions = new EmojiDefinitions();
        var regexMatches = text.match(this.emojiRegex);
        if (regexMatches && regexMatches.length > 0) {
            for (var i = 0; i < regexMatches.length; i++) {                
                var emojiDef = emojiDefinitions[regexMatches[i].toString()];
                if (emojiDef) {
                    text = text.replace(regexMatches[i], this.getImgHtml(emojiDef));
                }
            }
        }
        return text;
    }

    private static getImgHtml(emojiDef: EmojiDefinition): string{
        return `<img class='emoji_in_comment' src='${EmojiService.getEmojiImageUrl(emojiDef)}' />`;
    }

    static getEmojiImageUrl(emojiDef: EmojiDefinition): string {
        return this.emojisBaseUrl + emojiDef.img;
    }

    static textContainsEmoji(text: string): boolean {
        var regexMatches = text.match(this.emojiRegex);
        return (regexMatches && regexMatches.length > 0); 
    }
}

export class EmojiDefinition {
    public name: string;
    public img: string;
    public category: string;
}

export class EmojiDefinitions {
    ":bowtie:": EmojiDefinition = {
        "name": "bowtie",
        "img": "bowtie.png",
        "category": "people"
    };
    ":smile:": EmojiDefinition = {
        "name": "smile",
        "img": "smile.png",
        "category": "people"
    };
    ":simple_smile:": EmojiDefinition = {
        "name": "simple_smile",
        "img": "simple_smile.png",
        "category": "people"
    };
    ":laughing:": EmojiDefinition = {
        "name": "laughing",
        "img": "laughing.png",
        "category": "people"
    };
    ":blush:": EmojiDefinition = {
        "name": "blush",
        "img": "blush.png",
        "category": "people"
    };
    ":smiley:": EmojiDefinition = {
        "name": "smiley",
        "img": "smiley.png",
        "category": "people"
    };
    ":relaxed:": EmojiDefinition = {
        "name": "relaxed",
        "img": "relaxed.png",
        "category": "people"
    };
    ":smirk:": EmojiDefinition = {
        "name": "smirk",
        "img": "smirk.png",
        "category": "people"
    };
    ":heart_eyes:": EmojiDefinition = {
        "name": "heart_eyes",
        "img": "heart_eyes.png",
        "category": "people"
    };
    ":kissing_heart:": EmojiDefinition = {
        "name": "kissing_heart",
        "img": "kissing_heart.png",
        "category": "people"
    };
    ":kissing_closed_eyes:": EmojiDefinition = {
        "name": "kissing_closed_eyes",
        "img": "kissing_closed_eyes.png",
        "category": "people"
    };
    ":flushed:": EmojiDefinition = {
        "name": "flushed",
        "img": "flushed.png",
        "category": "people"
    };
    ":relieved:": EmojiDefinition = {
        "name": "relieved",
        "img": "relieved.png",
        "category": "people"
    };
    ":satisfied:": EmojiDefinition = {
        "name": "satisfied",
        "img": "satisfied.png",
        "category": "people"
    };
    ":grin:": EmojiDefinition = {
        "name": "grin",
        "img": "grin.png",
        "category": "people"
    };
    ":wink:": EmojiDefinition = {
        "name": "wink",
        "img": "wink.png",
        "category": "people"
    };
    ":stuck_out_tongue_winking_eye:": EmojiDefinition = {
        "name": "stuck_out_tongue_winking_eye",
        "img": "stuck_out_tongue_winking_eye.png",
        "category": "people"
    };
    ":stuck_out_tongue_closed_eyes:": EmojiDefinition = {
        "name": "stuck_out_tongue_closed_eyes",
        "img": "stuck_out_tongue_closed_eyes.png",
        "category": "people"
    };
    ":grinning:": EmojiDefinition = {
        "name": "grinning",
        "img": "grinning.png",
        "category": "people"
    };
    ":kissing:": EmojiDefinition = {
        "name": "kissing",
        "img": "kissing.png",
        "category": "people"
    };
    ":kissing_smiling_eyes:": EmojiDefinition = {
        "name": "kissing_smiling_eyes",
        "img": "kissing_smiling_eyes.png",
        "category": "people"
    };
    ":stuck_out_tongue:": EmojiDefinition = {
        "name": "stuck_out_tongue",
        "img": "stuck_out_tongue.png",
        "category": "people"
    };
    ":sleeping:": EmojiDefinition = {
        "name": "sleeping",
        "img": "sleeping.png",
        "category": "people"
    };
    ":worried:": EmojiDefinition = {
        "name": "worried",
        "img": "worried.png",
        "category": "people"
    };
    ":frowning:": EmojiDefinition = {
        "name": "frowning",
        "img": "frowning.png",
        "category": "people"
    };
    ":anguished:": EmojiDefinition = {
        "name": "anguished",
        "img": "anguished.png",
        "category": "people"
    };
    ":open_mouth:": EmojiDefinition = {
        "name": "open_mouth",
        "img": "open_mouth.png",
        "category": "people"
    };
    ":grimacing:": EmojiDefinition = {
        "name": "grimacing",
        "img": "grimacing.png",
        "category": "people"
    };
    ":confused:": EmojiDefinition = {
        "name": "confused",
        "img": "confused.png",
        "category": "people"
    };
    ":hushed:": EmojiDefinition = {
        "name": "hushed",
        "img": "hushed.png",
        "category": "people"
    };
    ":expressionless:": EmojiDefinition = {
        "name": "expressionless",
        "img": "expressionless.png",
        "category": "people"
    };
    ":unamused:": EmojiDefinition = {
        "name": "unamused",
        "img": "unamused.png",
        "category": "people"
    };
    ":sweat_smile:": EmojiDefinition = {
        "name": "sweat_smile",
        "img": "sweat_smile.png",
        "category": "people"
    };
    ":sweat:": EmojiDefinition = {
        "name": "sweat",
        "img": "sweat.png",
        "category": "people"
    };
    ":disappointed_relieved:": EmojiDefinition = {
        "name": "disappointed_relieved",
        "img": "disappointed_relieved.png",
        "category": "people"
    };
    ":weary:": EmojiDefinition = {
        "name": "weary",
        "img": "weary.png",
        "category": "people"
    };
    ":pensive:": EmojiDefinition = {
        "name": "pensive",
        "img": "pensive.png",
        "category": "people"
    };
    ":disappointed:": EmojiDefinition = {
        "name": "disappointed",
        "img": "disappointed.png",
        "category": "people"
    };
    ":confounded:": EmojiDefinition = {
        "name": "confounded",
        "img": "confounded.png",
        "category": "people"
    };
    ":fearful:": EmojiDefinition = {
        "name": "fearful",
        "img": "fearful.png",
        "category": "people"
    };
    ":cold_sweat:": EmojiDefinition = {
        "name": "cold_sweat",
        "img": "cold_sweat.png",
        "category": "people"
    };
    ":persevere:": EmojiDefinition = {
        "name": "persevere",
        "img": "persevere.png",
        "category": "people"
    };
    ":cry:": EmojiDefinition = {
        "name": "cry",
        "img": "cry.png",
        "category": "people"
    };
    ":sob:": EmojiDefinition = {
        "name": "sob",
        "img": "sob.png",
        "category": "people"
    };
    ":joy:": EmojiDefinition = {
        "name": "joy",
        "img": "joy.png",
        "category": "people"
    };
    ":astonished:": EmojiDefinition = {
        "name": "astonished",
        "img": "astonished.png",
        "category": "people"
    };
    ":scream:": EmojiDefinition = {
        "name": "scream",
        "img": "scream.png",
        "category": "people"
    };
    ":neckbeard:": EmojiDefinition = {
        "name": "neckbeard",
        "img": "neckbeard.png",
        "category": "people"
    };
    ":tired_face:": EmojiDefinition = {
        "name": "tired_face",
        "img": "tired_face.png",
        "category": "people"
    };
    ":angry:": EmojiDefinition = {
        "name": "angry",
        "img": "angry.png",
        "category": "people"
    };
    ":rage:": EmojiDefinition = {
        "name": "rage",
        "img": "rage.png",
        "category": "people"
    };
    ":triumph:": EmojiDefinition = {
        "name": "triumph",
        "img": "triumph.png",
        "category": "people"
    };
    ":sleepy:": EmojiDefinition = {
        "name": "sleepy",
        "img": "sleepy.png",
        "category": "people"
    };
    ":yum:": EmojiDefinition = {
        "name": "yum",
        "img": "yum.png",
        "category": "people"
    };
    ":mask:": EmojiDefinition = {
        "name": "mask",
        "img": "mask.png",
        "category": "people"
    };
    ":sunglasses:": EmojiDefinition = {
        "name": "sunglasses",
        "img": "sunglasses.png",
        "category": "people"
    };
    ":dizzy_face:": EmojiDefinition = {
        "name": "dizzy_face",
        "img": "dizzy_face.png",
        "category": "people"
    };
    ":imp:": EmojiDefinition = {
        "name": "imp",
        "img": "imp.png",
        "category": "people"
    };
    ":smiling_imp:": EmojiDefinition = {
        "name": "smiling_imp",
        "img": "smiling_imp.png",
        "category": "people"
    };
    ":neutral_face:": EmojiDefinition = {
        "name": "neutral_face",
        "img": "neutral_face.png",
        "category": "people"
    };
    ":no_mouth:": EmojiDefinition = {
        "name": "no_mouth",
        "img": "no_mouth.png",
        "category": "people"
    };
    ":innocent:": EmojiDefinition = {
        "name": "innocent",
        "img": "innocent.png",
        "category": "people"
    };
    ":alien:": EmojiDefinition = {
        "name": "alien",
        "img": "alien.png",
        "category": "people"
    };
    ":yellow_heart:": EmojiDefinition = {
        "name": "yellow_heart",
        "img": "yellow_heart.png",
        "category": "people"
    };
    ":blue_heart:": EmojiDefinition = {
        "name": "blue_heart",
        "img": "blue_heart.png",
        "category": "people"
    };
    ":purple_heart:": EmojiDefinition = {
        "name": "purple_heart",
        "img": "purple_heart.png",
        "category": "people"
    };
    ":heart:": EmojiDefinition = {
        "name": "heart",
        "img": "heart.png",
        "category": "people"
    };
    ":green_heart:": EmojiDefinition = {
        "name": "green_heart",
        "img": "green_heart.png",
        "category": "people"
    };
    ":broken_heart:": EmojiDefinition = {
        "name": "broken_heart",
        "img": "broken_heart.png",
        "category": "people"
    };
    ":heartbeat:": EmojiDefinition = {
        "name": "heartbeat",
        "img": "heartbeat.png",
        "category": "people"
    };
    ":heartpulse:": EmojiDefinition = {
        "name": "heartpulse",
        "img": "heartpulse.png",
        "category": "people"
    };
    ":two_hearts:": EmojiDefinition = {
        "name": "two_hearts",
        "img": "two_hearts.png",
        "category": "people"
    };
    ":revolving_hearts:": EmojiDefinition = {
        "name": "revolving_hearts",
        "img": "revolving_hearts.png",
        "category": "people"
    };
    ":cupid:": EmojiDefinition = {
        "name": "cupid",
        "img": "cupid.png",
        "category": "people"
    };
    ":sparkling_heart:": EmojiDefinition = {
        "name": "sparkling_heart",
        "img": "sparkling_heart.png",
        "category": "people"
    };
    ":sparkles:": EmojiDefinition = {
        "name": "sparkles",
        "img": "sparkles.png",
        "category": "people"
    };
    ":star:": EmojiDefinition = {
        "name": "star",
        "img": "star.png",
        "category": "people"
    };
    ":star2:": EmojiDefinition = {
        "name": "star2",
        "img": "star2.png",
        "category": "people"
    };
    ":dizzy:": EmojiDefinition = {
        "name": "dizzy",
        "img": "dizzy.png",
        "category": "people"
    };
    ":boom:": EmojiDefinition = {
        "name": "boom",
        "img": "boom.png",
        "category": "people"
    };
    ":collision:": EmojiDefinition = {
        "name": "collision",
        "img": "collision.png",
        "category": "people"
    };
    ":anger:": EmojiDefinition = {
        "name": "anger",
        "img": "anger.png",
        "category": "people"
    };
    ":exclamation:": EmojiDefinition = {
        "name": "exclamation",
        "img": "exclamation.png",
        "category": "people"
    };
    ":question:": EmojiDefinition = {
        "name": "question",
        "img": "question.png",
        "category": "people"
    };
    ":grey_exclamation:": EmojiDefinition = {
        "name": "grey_exclamation",
        "img": "grey_exclamation.png",
        "category": "people"
    };
    ":grey_question:": EmojiDefinition = {
        "name": "grey_question",
        "img": "grey_question.png",
        "category": "people"
    };
    ":zzz:": EmojiDefinition = {
        "name": "zzz",
        "img": "zzz.png",
        "category": "people"
    };
    ":dash:": EmojiDefinition = {
        "name": "dash",
        "img": "dash.png",
        "category": "people"
    };
    ":sweat_drops:": EmojiDefinition = {
        "name": "sweat_drops",
        "img": "sweat_drops.png",
        "category": "people"
    };
    ":notes:": EmojiDefinition = {
        "name": "notes",
        "img": "notes.png",
        "category": "people"
    };
    ":musical_note:": EmojiDefinition = {
        "name": "musical_note",
        "img": "musical_note.png",
        "category": "people"
    };
    ":fire:": EmojiDefinition = {
        "name": "fire",
        "img": "fire.png",
        "category": "people"
    };
    ":hankey:": EmojiDefinition = {
        "name": "hankey",
        "img": "hankey.png",
        "category": "people"
    };
    ":poop:": EmojiDefinition = {
        "name": "poop",
        "img": "poop.png",
        "category": "people"
    };
    ":shit:": EmojiDefinition = {
        "name": "shit",
        "img": "shit.png",
        "category": "people"
    };
    ":+1:": EmojiDefinition = {
        "name": "+1",
        "img": "plus1.png",
        "category": "people"
    };
    ":thumbsup:": EmojiDefinition = {
        "name": "thumbsup",
        "img": "thumbsup.png",
        "category": "people"
    };
    ":-1:": EmojiDefinition = {
        "name": "-1",
        "img": "-1.png",
        "category": "people"
    };
    ":thumbsdown:": EmojiDefinition = {
        "name": "thumbsdown",
        "img": "thumbsdown.png",
        "category": "people"
    };
    ":ok_hand:": EmojiDefinition = {
        "name": "ok_hand",
        "img": "ok_hand.png",
        "category": "people"
    };
    ":punch:": EmojiDefinition = {
        "name": "punch",
        "img": "punch.png",
        "category": "people"
    };
    ":facepunch:": EmojiDefinition = {
        "name": "facepunch",
        "img": "facepunch.png",
        "category": "people"
    };
    ":fist:": EmojiDefinition = {
        "name": "fist",
        "img": "fist.png",
        "category": "people"
    };
    ":v:": EmojiDefinition = {
        "name": "v",
        "img": "v.png",
        "category": "people"
    };
    ":wave:": EmojiDefinition = {
        "name": "wave",
        "img": "wave.png",
        "category": "people"
    };
    ":hand:": EmojiDefinition = {
        "name": "hand",
        "img": "hand.png",
        "category": "people"
    };
    ":raised_hand:": EmojiDefinition = {
        "name": "raised_hand",
        "img": "raised_hand.png",
        "category": "people"
    };
    ":open_hands:": EmojiDefinition = {
        "name": "open_hands",
        "img": "open_hands.png",
        "category": "people"
    };
    ":point_up:": EmojiDefinition = {
        "name": "point_up",
        "img": "point_up.png",
        "category": "people"
    };
    ":point_down:": EmojiDefinition = {
        "name": "point_down",
        "img": "point_down.png",
        "category": "people"
    };
    ":point_left:": EmojiDefinition = {
        "name": "point_left",
        "img": "point_left.png",
        "category": "people"
    };
    ":point_right:": EmojiDefinition = {
        "name": "point_right",
        "img": "point_right.png",
        "category": "people"
    };
    ":raised_hands:": EmojiDefinition = {
        "name": "raised_hands",
        "img": "raised_hands.png",
        "category": "people"
    };
    ":pray:": EmojiDefinition = {
        "name": "pray",
        "img": "pray.png",
        "category": "people"
    };
    ":point_up_2:": EmojiDefinition = {
        "name": "point_up_2",
        "img": "point_up_2.png",
        "category": "people"
    };
    ":clap:": EmojiDefinition = {
        "name": "clap",
        "img": "clap.png",
        "category": "people"
    };
    ":muscle:": EmojiDefinition = {
        "name": "muscle",
        "img": "muscle.png",
        "category": "people"
    };
    ":metal:": EmojiDefinition = {
        "name": "metal",
        "img": "metal.png",
        "category": "people"
    };
    ":fu:": EmojiDefinition = {
        "name": "fu",
        "img": "fu.png",
        "category": "people"
    };
    ":runner:": EmojiDefinition = {
        "name": "runner",
        "img": "runner.png",
        "category": "people"
    };
    ":running:": EmojiDefinition = {
        "name": "running",
        "img": "running.png",
        "category": "people"
    };
    ":couple:": EmojiDefinition = {
        "name": "couple",
        "img": "couple.png",
        "category": "people"
    };
    ":family:": EmojiDefinition = {
        "name": "family",
        "img": "family.png",
        "category": "people"
    };
    ":two_men_holding_hands:": EmojiDefinition = {
        "name": "two_men_holding_hands",
        "img": "two_men_holding_hands.png",
        "category": "people"
    };
    ":two_women_holding_hands:": EmojiDefinition = {
        "name": "two_women_holding_hands",
        "img": "two_women_holding_hands.png",
        "category": "people"
    };
    ":dancer:": EmojiDefinition = {
        "name": "dancer",
        "img": "dancer.png",
        "category": "people"
    };
    ":dancers:": EmojiDefinition = {
        "name": "dancers",
        "img": "dancers.png",
        "category": "people"
    };
    ":ok_woman:": EmojiDefinition = {
        "name": "ok_woman",
        "img": "ok_woman.png",
        "category": "people"
    };
    ":no_good:": EmojiDefinition = {
        "name": "no_good",
        "img": "no_good.png",
        "category": "people"
    };
    ":information_desk_person:": EmojiDefinition = {
        "name": "information_desk_person",
        "img": "information_desk_person.png",
        "category": "people"
    };
    ":raising_hand:": EmojiDefinition = {
        "name": "raising_hand",
        "img": "raising_hand.png",
        "category": "people"
    };
    ":bride_with_veil:": EmojiDefinition = {
        "name": "bride_with_veil",
        "img": "bride_with_veil.png",
        "category": "people"
    };
    ":person_with_pouting_face:": EmojiDefinition = {
        "name": "person_with_pouting_face",
        "img": "person_with_pouting_face.png",
        "category": "people"
    };
    ":person_frowning:": EmojiDefinition = {
        "name": "person_frowning",
        "img": "person_frowning.png",
        "category": "people"
    };
    ":bow:": EmojiDefinition = {
        "name": "bow",
        "img": "bow.png",
        "category": "people"
    };
    ":couplekiss:": EmojiDefinition = {
        "name": "couplekiss",
        "img": "couplekiss.png",
        "category": "people"
    };
    ":couple_with_heart:": EmojiDefinition = {
        "name": "couple_with_heart",
        "img": "couple_with_heart.png",
        "category": "people"
    };
    ":massage:": EmojiDefinition = {
        "name": "massage",
        "img": "massage.png",
        "category": "people"
    };
    ":haircut:": EmojiDefinition = {
        "name": "haircut",
        "img": "haircut.png",
        "category": "people"
    };
    ":nail_care:": EmojiDefinition = {
        "name": "nail_care",
        "img": "nail_care.png",
        "category": "people"
    };
    ":boy:": EmojiDefinition = {
        "name": "boy",
        "img": "boy.png",
        "category": "people"
    };
    ":girl:": EmojiDefinition = {
        "name": "girl",
        "img": "girl.png",
        "category": "people"
    };
    ":woman:": EmojiDefinition = {
        "name": "woman",
        "img": "woman.png",
        "category": "people"
    };
    ":man:": EmojiDefinition = {
        "name": "man",
        "img": "man.png",
        "category": "people"
    };
    ":baby:": EmojiDefinition = {
        "name": "baby",
        "img": "baby.png",
        "category": "people"
    };
    ":older_woman:": EmojiDefinition = {
        "name": "older_woman",
        "img": "older_woman.png",
        "category": "people"
    };
    ":older_man:": EmojiDefinition = {
        "name": "older_man",
        "img": "older_man.png",
        "category": "people"
    };
    ":person_with_blond_hair:": EmojiDefinition = {
        "name": "person_with_blond_hair",
        "img": "person_with_blond_hair.png",
        "category": "people"
    };
    ":man_with_gua_pi_mao:": EmojiDefinition = {
        "name": "man_with_gua_pi_mao",
        "img": "man_with_gua_pi_mao.png",
        "category": "people"
    };
    ":man_with_turban:": EmojiDefinition = {
        "name": "man_with_turban",
        "img": "man_with_turban.png",
        "category": "people"
    };
    ":construction_worker:": EmojiDefinition = {
        "name": "construction_worker",
        "img": "construction_worker.png",
        "category": "people"
    };
    ":cop:": EmojiDefinition = {
        "name": "cop",
        "img": "cop.png",
        "category": "people"
    };
    ":angel:": EmojiDefinition = {
        "name": "angel",
        "img": "angel.png",
        "category": "people"
    };
    ":princess:": EmojiDefinition = {
        "name": "princess",
        "img": "princess.png",
        "category": "people"
    };
    ":smiley_cat:": EmojiDefinition = {
        "name": "smiley_cat",
        "img": "smiley_cat.png",
        "category": "people"
    };
    ":smile_cat:": EmojiDefinition = {
        "name": "smile_cat",
        "img": "smile_cat.png",
        "category": "people"
    };
    ":heart_eyes_cat:": EmojiDefinition = {
        "name": "heart_eyes_cat",
        "img": "heart_eyes_cat.png",
        "category": "people"
    };
    ":kissing_cat:": EmojiDefinition = {
        "name": "kissing_cat",
        "img": "kissing_cat.png",
        "category": "people"
    };
    ":smirk_cat:": EmojiDefinition = {
        "name": "smirk_cat",
        "img": "smirk_cat.png",
        "category": "people"
    };
    ":scream_cat:": EmojiDefinition = {
        "name": "scream_cat",
        "img": "scream_cat.png",
        "category": "people"
    };
    ":crying_cat_face:": EmojiDefinition = {
        "name": "crying_cat_face",
        "img": "crying_cat_face.png",
        "category": "people"
    };
    ":joy_cat:": EmojiDefinition = {
        "name": "joy_cat",
        "img": "joy_cat.png",
        "category": "people"
    };
    ":pouting_cat:": EmojiDefinition = {
        "name": "pouting_cat",
        "img": "pouting_cat.png",
        "category": "people"
    };
    ":japanese_ogre:": EmojiDefinition = {
        "name": "japanese_ogre",
        "img": "japanese_ogre.png",
        "category": "people"
    };
    ":japanese_goblin:": EmojiDefinition = {
        "name": "japanese_goblin",
        "img": "japanese_goblin.png",
        "category": "people"
    };
    ":see_no_evil:": EmojiDefinition = {
        "name": "see_no_evil",
        "img": "see_no_evil.png",
        "category": "people"
    };
    ":hear_no_evil:": EmojiDefinition = {
        "name": "hear_no_evil",
        "img": "hear_no_evil.png",
        "category": "people"
    };
    ":speak_no_evil:": EmojiDefinition = {
        "name": "speak_no_evil",
        "img": "speak_no_evil.png",
        "category": "people"
    };
    ":guardsman:": EmojiDefinition = {
        "name": "guardsman",
        "img": "guardsman.png",
        "category": "people"
    };
    ":skull:": EmojiDefinition = {
        "name": "skull",
        "img": "skull.png",
        "category": "people"
    };
    ":feet:": EmojiDefinition = {
        "name": "feet",
        "img": "feet.png",
        "category": "people"
    };
    ":lips:": EmojiDefinition = {
        "name": "lips",
        "img": "lips.png",
        "category": "people"
    };
    ":kiss:": EmojiDefinition = {
        "name": "kiss",
        "img": "kiss.png",
        "category": "people"
    };
    ":droplet:": EmojiDefinition = {
        "name": "droplet",
        "img": "droplet.png",
        "category": "people"
    };
    ":ear:": EmojiDefinition = {
        "name": "ear",
        "img": "ear.png",
        "category": "people"
    };
    ":eyes:": EmojiDefinition = {
        "name": "eyes",
        "img": "eyes.png",
        "category": "people"
    };
    ":nose:": EmojiDefinition = {
        "name": "nose",
        "img": "nose.png",
        "category": "people"
    };
    ":tongue:": EmojiDefinition = {
        "name": "tongue",
        "img": "tongue.png",
        "category": "people"
    };
    ":love_letter:": EmojiDefinition = {
        "name": "love_letter",
        "img": "love_letter.png",
        "category": "people"
    };
    ":bust_in_silhouette:": EmojiDefinition = {
        "name": "bust_in_silhouette",
        "img": "bust_in_silhouette.png",
        "category": "people"
    };
    ":busts_in_silhouette:": EmojiDefinition = {
        "name": "busts_in_silhouette",
        "img": "busts_in_silhouette.png",
        "category": "people"
    };
    ":speech_balloon:": EmojiDefinition = {
        "name": "speech_balloon",
        "img": "speech_balloon.png",
        "category": "people"
    };
    ":thought_balloon:": EmojiDefinition = {
        "name": "thought_balloon",
        "img": "thought_balloon.png",
        "category": "people"
    };
    ":feelsgood:": EmojiDefinition = {
        "name": "feelsgood",
        "img": "feelsgood.png",
        "category": "people"
    };
    ":finnadie:": EmojiDefinition = {
        "name": "finnadie",
        "img": "finnadie.png",
        "category": "people"
    };
    ":goberserk:": EmojiDefinition = {
        "name": "goberserk",
        "img": "goberserk.png",
        "category": "people"
    };
    ":godmode:": EmojiDefinition = {
        "name": "godmode",
        "img": "godmode.png",
        "category": "people"
    };
    ":hurtrealbad:": EmojiDefinition = {
        "name": "hurtrealbad",
        "img": "hurtrealbad.png",
        "category": "people"
    };
    ":rage1:": EmojiDefinition = {
        "name": "rage1",
        "img": "rage1.png",
        "category": "people"
    };
    ":rage2:": EmojiDefinition = {
        "name": "rage2",
        "img": "rage2.png",
        "category": "people"
    };
    ":rage3:": EmojiDefinition = {
        "name": "rage3",
        "img": "rage3.png",
        "category": "people"
    };
    ":rage4:": EmojiDefinition = {
        "name": "rage4",
        "img": "rage4.png",
        "category": "people"
    };
    ":suspect:": EmojiDefinition = {
        "name": "suspect",
        "img": "suspect.png",
        "category": "people"
    };
    ":trollface:": EmojiDefinition = {
        "name": "trollface",
        "img": "trollface.png",
        "category": "people"
    }
    ":sunny:": EmojiDefinition = {
        "name": "sunny",
        "img": "sunny.png",
        "category": "nature"
    };
    ":umbrella:": EmojiDefinition = {
        "name": "umbrella",
        "img": "umbrella.png",
        "category": "nature"
    };
    ":cloud:": EmojiDefinition = {
        "name": "cloud",
        "img": "cloud.png",
        "category": "nature"
    };
    ":snowflake:": EmojiDefinition = {
        "name": "snowflake",
        "img": "snowflake.png",
        "category": "nature"
    };
    ":snowman:": EmojiDefinition = {
        "name": "snowman",
        "img": "snowman.png",
        "category": "nature"
    };
    ":zap:": EmojiDefinition = {
        "name": "zap",
        "img": "zap.png",
        "category": "nature"
    };
    ":cyclone:": EmojiDefinition = {
        "name": "cyclone",
        "img": "cyclone.png",
        "category": "nature"
    };
    ":foggy:": EmojiDefinition = {
        "name": "foggy",
        "img": "foggy.png",
        "category": "nature"
    };
    ":ocean:": EmojiDefinition = {
        "name": "ocean",
        "img": "ocean.png",
        "category": "nature"
    };
    ":cat:": EmojiDefinition = {
        "name": "cat",
        "img": "cat.png",
        "category": "nature"
    };
    ":dog:": EmojiDefinition = {
        "name": "dog",
        "img": "dog.png",
        "category": "nature"
    };
    ":mouse:": EmojiDefinition = {
        "name": "mouse",
        "img": "mouse.png",
        "category": "nature"
    };
    ":hamster:": EmojiDefinition = {
        "name": "hamster",
        "img": "hamster.png",
        "category": "nature"
    };
    ":rabbit:": EmojiDefinition = {
        "name": "rabbit",
        "img": "rabbit.png",
        "category": "nature"
    };
    ":wolf:": EmojiDefinition = {
        "name": "wolf",
        "img": "wolf.png",
        "category": "nature"
    };
    ":frog:": EmojiDefinition = {
        "name": "frog",
        "img": "frog.png",
        "category": "nature"
    };
    ":tiger:": EmojiDefinition = {
        "name": "tiger",
        "img": "tiger.png",
        "category": "nature"
    };
    ":koala:": EmojiDefinition = {
        "name": "koala",
        "img": "koala.png",
        "category": "nature"
    };
    ":bear:": EmojiDefinition = {
        "name": "bear",
        "img": "bear.png",
        "category": "nature"
    };
    ":pig:": EmojiDefinition = {
        "name": "pig",
        "img": "pig.png",
        "category": "nature"
    };
    ":pig_nose:": EmojiDefinition = {
        "name": "pig_nose",
        "img": "pig_nose.png",
        "category": "nature"
    };
    ":cow:": EmojiDefinition = {
        "name": "cow",
        "img": "cow.png",
        "category": "nature"
    };
    ":boar:": EmojiDefinition = {
        "name": "boar",
        "img": "boar.png",
        "category": "nature"
    };
    ":monkey_face:": EmojiDefinition = {
        "name": "monkey_face",
        "img": "monkey_face.png",
        "category": "nature"
    };
    ":monkey:": EmojiDefinition = {
        "name": "monkey",
        "img": "monkey.png",
        "category": "nature"
    };
    ":horse:": EmojiDefinition = {
        "name": "horse",
        "img": "horse.png",
        "category": "nature"
    };
    ":racehorse:": EmojiDefinition = {
        "name": "racehorse",
        "img": "racehorse.png",
        "category": "nature"
    };
    ":camel:": EmojiDefinition = {
        "name": "camel",
        "img": "camel.png",
        "category": "nature"
    };
    ":sheep:": EmojiDefinition = {
        "name": "sheep",
        "img": "sheep.png",
        "category": "nature"
    };
    ":elephant:": EmojiDefinition = {
        "name": "elephant",
        "img": "elephant.png",
        "category": "nature"
    };
    ":panda_face:": EmojiDefinition = {
        "name": "panda_face",
        "img": "panda_face.png",
        "category": "nature"
    };
    ":snake:": EmojiDefinition = {
        "name": "snake",
        "img": "snake.png",
        "category": "nature"
    };
    ":bird:": EmojiDefinition = {
        "name": "bird",
        "img": "bird.png",
        "category": "nature"
    };
    ":baby_chick:": EmojiDefinition = {
        "name": "baby_chick",
        "img": "baby_chick.png",
        "category": "nature"
    };
    ":hatched_chick:": EmojiDefinition = {
        "name": "hatched_chick",
        "img": "hatched_chick.png",
        "category": "nature"
    };
    ":hatching_chick:": EmojiDefinition = {
        "name": "hatching_chick",
        "img": "hatching_chick.png",
        "category": "nature"
    };
    ":chicken:": EmojiDefinition = {
        "name": "chicken",
        "img": "chicken.png",
        "category": "nature"
    };
    ":penguin:": EmojiDefinition = {
        "name": "penguin",
        "img": "penguin.png",
        "category": "nature"
    };
    ":turtle:": EmojiDefinition = {
        "name": "turtle",
        "img": "turtle.png",
        "category": "nature"
    };
    ":bug:": EmojiDefinition = {
        "name": "bug",
        "img": "bug.png",
        "category": "nature"
    };
    ":honeybee:": EmojiDefinition = {
        "name": "honeybee",
        "img": "honeybee.png",
        "category": "nature"
    };
    ":ant:": EmojiDefinition = {
        "name": "ant",
        "img": "ant.png",
        "category": "nature"
    };
    ":beetle:": EmojiDefinition = {
        "name": "beetle",
        "img": "beetle.png",
        "category": "nature"
    };
    ":snail:": EmojiDefinition = {
        "name": "snail",
        "img": "snail.png",
        "category": "nature"
    };
    ":octopus:": EmojiDefinition = {
        "name": "octopus",
        "img": "octopus.png",
        "category": "nature"
    };
    ":tropical_fish:": EmojiDefinition = {
        "name": "tropical_fish",
        "img": "tropical_fish.png",
        "category": "nature"
    };
    ":fish:": EmojiDefinition = {
        "name": "fish",
        "img": "fish.png",
        "category": "nature"
    };
    ":whale:": EmojiDefinition = {
        "name": "whale",
        "img": "whale.png",
        "category": "nature"
    };
    ":whale2:": EmojiDefinition = {
        "name": "whale2",
        "img": "whale2.png",
        "category": "nature"
    };
    ":dolphin:": EmojiDefinition = {
        "name": "dolphin",
        "img": "dolphin.png",
        "category": "nature"
    };
    ":cow2:": EmojiDefinition = {
        "name": "cow2",
        "img": "cow2.png",
        "category": "nature"
    };
    ":ram:": EmojiDefinition = {
        "name": "ram",
        "img": "ram.png",
        "category": "nature"
    };
    ":rat:": EmojiDefinition = {
        "name": "rat",
        "img": "rat.png",
        "category": "nature"
    };
    ":water_buffalo:": EmojiDefinition = {
        "name": "water_buffalo",
        "img": "water_buffalo.png",
        "category": "nature"
    };
    ":tiger2:": EmojiDefinition = {
        "name": "tiger2",
        "img": "tiger2.png",
        "category": "nature"
    };
    ":rabbit2:": EmojiDefinition = {
        "name": "rabbit2",
        "img": "rabbit2.png",
        "category": "nature"
    };
    ":dragon:": EmojiDefinition = {
        "name": "dragon",
        "img": "dragon.png",
        "category": "nature"
    };
    ":goat:": EmojiDefinition = {
        "name": "goat",
        "img": "goat.png",
        "category": "nature"
    };
    ":rooster:": EmojiDefinition = {
        "name": "rooster",
        "img": "rooster.png",
        "category": "nature"
    };
    ":dog2:": EmojiDefinition = {
        "name": "dog2",
        "img": "dog2.png",
        "category": "nature"
    };
    ":pig2:": EmojiDefinition = {
        "name": "pig2",
        "img": "pig2.png",
        "category": "nature"
    };
    ":mouse2:": EmojiDefinition = {
        "name": "mouse2",
        "img": "mouse2.png",
        "category": "nature"
    };
    ":ox:": EmojiDefinition = {
        "name": "ox",
        "img": "ox.png",
        "category": "nature"
    };
    ":dragon_face:": EmojiDefinition = {
        "name": "dragon_face",
        "img": "dragon_face.png",
        "category": "nature"
    };
    ":blowfish:": EmojiDefinition = {
        "name": "blowfish",
        "img": "blowfish.png",
        "category": "nature"
    };
    ":crocodile:": EmojiDefinition = {
        "name": "crocodile",
        "img": "crocodile.png",
        "category": "nature"
    };
    ":dromedary_camel:": EmojiDefinition = {
        "name": "dromedary_camel",
        "img": "dromedary_camel.png",
        "category": "nature"
    };
    ":leopard:": EmojiDefinition = {
        "name": "leopard",
        "img": "leopard.png",
        "category": "nature"
    };
    ":cat2:": EmojiDefinition = {
        "name": "cat2",
        "img": "cat2.png",
        "category": "nature"
    };
    ":poodle:": EmojiDefinition = {
        "name": "poodle",
        "img": "poodle.png",
        "category": "nature"
    };
    ":paw_prints:": EmojiDefinition = {
        "name": "paw_prints",
        "img": "paw_prints.png",
        "category": "nature"
    };
    ":bouquet:": EmojiDefinition = {
        "name": "bouquet",
        "img": "bouquet.png",
        "category": "nature"
    };
    ":cherry_blossom:": EmojiDefinition = {
        "name": "cherry_blossom",
        "img": "cherry_blossom.png",
        "category": "nature"
    };
    ":tulip:": EmojiDefinition = {
        "name": "tulip",
        "img": "tulip.png",
        "category": "nature"
    };
    ":four_leaf_clover:": EmojiDefinition = {
        "name": "four_leaf_clover",
        "img": "four_leaf_clover.png",
        "category": "nature"
    };
    ":rose:": EmojiDefinition = {
        "name": "rose",
        "img": "rose.png",
        "category": "nature"
    };
    ":sunflower:": EmojiDefinition = {
        "name": "sunflower",
        "img": "sunflower.png",
        "category": "nature"
    };
    ":hibiscus:": EmojiDefinition = {
        "name": "hibiscus",
        "img": "hibiscus.png",
        "category": "nature"
    };
    ":maple_leaf:": EmojiDefinition = {
        "name": "maple_leaf",
        "img": "maple_leaf.png",
        "category": "nature"
    };
    ":leaves:": EmojiDefinition = {
        "name": "leaves",
        "img": "leaves.png",
        "category": "nature"
    };
    ":fallen_leaf:": EmojiDefinition = {
        "name": "fallen_leaf",
        "img": "fallen_leaf.png",
        "category": "nature"
    };
    ":herb:": EmojiDefinition = {
        "name": "herb",
        "img": "herb.png",
        "category": "nature"
    };
    ":mushroom:": EmojiDefinition = {
        "name": "mushroom",
        "img": "mushroom.png",
        "category": "nature"
    };
    ":cactus:": EmojiDefinition = {
        "name": "cactus",
        "img": "cactus.png",
        "category": "nature"
    };
    ":palm_tree:": EmojiDefinition = {
        "name": "palm_tree",
        "img": "palm_tree.png",
        "category": "nature"
    };
    ":evergreen_tree:": EmojiDefinition = {
        "name": "evergreen_tree",
        "img": "evergreen_tree.png",
        "category": "nature"
    };
    ":deciduous_tree:": EmojiDefinition = {
        "name": "deciduous_tree",
        "img": "deciduous_tree.png",
        "category": "nature"
    };
    ":chestnut:": EmojiDefinition = {
        "name": "chestnut",
        "img": "chestnut.png",
        "category": "nature"
    };
    ":seedling:": EmojiDefinition = {
        "name": "seedling",
        "img": "seedling.png",
        "category": "nature"
    };
    ":blossom:": EmojiDefinition = {
        "name": "blossom",
        "img": "blossom.png",
        "category": "nature"
    };
    ":ear_of_rice:": EmojiDefinition = {
        "name": "ear_of_rice",
        "img": "ear_of_rice.png",
        "category": "nature"
    };
    ":shell:": EmojiDefinition = {
        "name": "shell",
        "img": "shell.png",
        "category": "nature"
    };
    ":globe_with_meridians:": EmojiDefinition = {
        "name": "globe_with_meridians",
        "img": "globe_with_meridians.png",
        "category": "nature"
    };
    ":sun_with_face:": EmojiDefinition = {
        "name": "sun_with_face",
        "img": "sun_with_face.png",
        "category": "nature"
    };
    ":full_moon_with_face:": EmojiDefinition = {
        "name": "full_moon_with_face",
        "img": "full_moon_with_face.png",
        "category": "nature"
    };
    ":new_moon_with_face:": EmojiDefinition = {
        "name": "new_moon_with_face",
        "img": "new_moon_with_face.png",
        "category": "nature"
    };
    ":new_moon:": EmojiDefinition = {
        "name": "new_moon",
        "img": "new_moon.png",
        "category": "nature"
    };
    ":waxing_crescent_moon:": EmojiDefinition = {
        "name": "waxing_crescent_moon",
        "img": "waxing_crescent_moon.png",
        "category": "nature"
    };
    ":first_quarter_moon:": EmojiDefinition = {
        "name": "first_quarter_moon",
        "img": "first_quarter_moon.png",
        "category": "nature"
    };
    ":waxing_gibbous_moon:": EmojiDefinition = {
        "name": "waxing_gibbous_moon",
        "img": "waxing_gibbous_moon.png",
        "category": "nature"
    };
    ":full_moon:": EmojiDefinition = {
        "name": "full_moon",
        "img": "full_moon.png",
        "category": "nature"
    };
    ":waning_gibbous_moon:": EmojiDefinition = {
        "name": "waning_gibbous_moon",
        "img": "waning_gibbous_moon.png",
        "category": "nature"
    };
    ":last_quarter_moon:": EmojiDefinition = {
        "name": "last_quarter_moon",
        "img": "last_quarter_moon.png",
        "category": "nature"
    };
    ":waning_crescent_moon:": EmojiDefinition = {
        "name": "waning_crescent_moon",
        "img": "waning_crescent_moon.png",
        "category": "nature"
    };
    ":last_quarter_moon_with_face:": EmojiDefinition = {
        "name": "last_quarter_moon_with_face",
        "img": "last_quarter_moon_with_face.png",
        "category": "nature"
    };
    ":first_quarter_moon_with_face:": EmojiDefinition = {
        "name": "first_quarter_moon_with_face",
        "img": "first_quarter_moon_with_face.png",
        "category": "nature"
    };
    ":crescent_moon:": EmojiDefinition = {
        "name": "crescent_moon",
        "img": "crescent_moon.png",
        "category": "nature"
    };
    ":earth_africa:": EmojiDefinition = {
        "name": "earth_africa",
        "img": "earth_africa.png",
        "category": "nature"
    };
    ":earth_americas:": EmojiDefinition = {
        "name": "earth_americas",
        "img": "earth_americas.png",
        "category": "nature"
    };
    ":earth_asia:": EmojiDefinition = {
        "name": "earth_asia",
        "img": "earth_asia.png",
        "category": "nature"
    };
    ":volcano:": EmojiDefinition = {
        "name": "volcano",
        "img": "volcano.png",
        "category": "nature"
    };
    ":milky_way:": EmojiDefinition = {
        "name": "milky_way",
        "img": "milky_way.png",
        "category": "nature"
    };
    ":partly_sunny:": EmojiDefinition = {
        "name": "partly_sunny",
        "img": "partly_sunny.png",
        "category": "nature"
    };
    ":octocat:": EmojiDefinition = {
        "name": "octocat",
        "img": "octocat.png",
        "category": "nature"
    };
    ":squirrel:": EmojiDefinition = {
        "name": "squirrel",
        "img": "squirrel.png",
        "category": "nature"
    }
    ":bamboo:": EmojiDefinition = {
        "name": "bamboo",
        "img": "bamboo.png",
        "category": "objects"
    };
    ":gift_heart:": EmojiDefinition = {
        "name": "gift_heart",
        "img": "gift_heart.png",
        "category": "objects"
    };
    ":dolls:": EmojiDefinition = {
        "name": "dolls",
        "img": "dolls.png",
        "category": "objects"
    };
    ":school_satchel:": EmojiDefinition = {
        "name": "school_satchel",
        "img": "school_satchel.png",
        "category": "objects"
    };
    ":mortar_board:": EmojiDefinition = {
        "name": "mortar_board",
        "img": "mortar_board.png",
        "category": "objects"
    };
    ":flags:": EmojiDefinition = {
        "name": "flags",
        "img": "flags.png",
        "category": "objects"
    };
    ":fireworks:": EmojiDefinition = {
        "name": "fireworks",
        "img": "fireworks.png",
        "category": "objects"
    };
    ":sparkler:": EmojiDefinition = {
        "name": "sparkler",
        "img": "sparkler.png",
        "category": "objects"
    };
    ":wind_chime:": EmojiDefinition = {
        "name": "wind_chime",
        "img": "wind_chime.png",
        "category": "objects"
    };
    ":rice_scene:": EmojiDefinition = {
        "name": "rice_scene",
        "img": "rice_scene.png",
        "category": "objects"
    };
    ":jack_o_lantern:": EmojiDefinition = {
        "name": "jack_o_lantern",
        "img": "jack_o_lantern.png",
        "category": "objects"
    };
    ":ghost:": EmojiDefinition = {
        "name": "ghost",
        "img": "ghost.png",
        "category": "objects"
    };
    ":santa:": EmojiDefinition = {
        "name": "santa",
        "img": "santa.png",
        "category": "objects"
    };
    ":christmas_tree:": EmojiDefinition = {
        "name": "christmas_tree",
        "img": "christmas_tree.png",
        "category": "objects"
    };
    ":gift:": EmojiDefinition = {
        "name": "gift",
        "img": "gift.png",
        "category": "objects"
    };
    ":bell:": EmojiDefinition = {
        "name": "bell",
        "img": "bell.png",
        "category": "objects"
    };
    ":no_bell:": EmojiDefinition = {
        "name": "no_bell",
        "img": "no_bell.png",
        "category": "objects"
    };
    ":tanabata_tree:": EmojiDefinition = {
        "name": "tanabata_tree",
        "img": "tanabata_tree.png",
        "category": "objects"
    };
    ":tada:": EmojiDefinition = {
        "name": "tada",
        "img": "tada.png",
        "category": "objects"
    };
    ":confetti_ball:": EmojiDefinition = {
        "name": "confetti_ball",
        "img": "confetti_ball.png",
        "category": "objects"
    };
    ":balloon:": EmojiDefinition = {
        "name": "balloon",
        "img": "balloon.png",
        "category": "objects"
    };
    ":crystal_ball:": EmojiDefinition = {
        "name": "crystal_ball",
        "img": "crystal_ball.png",
        "category": "objects"
    };
    ":cd:": EmojiDefinition = {
        "name": "cd",
        "img": "cd.png",
        "category": "objects"
    };
    ":dvd:": EmojiDefinition = {
        "name": "dvd",
        "img": "dvd.png",
        "category": "objects"
    };
    ":floppy_disk:": EmojiDefinition = {
        "name": "floppy_disk",
        "img": "floppy_disk.png",
        "category": "objects"
    };
    ":camera:": EmojiDefinition = {
        "name": "camera",
        "img": "camera.png",
        "category": "objects"
    };
    ":video_camera:": EmojiDefinition = {
        "name": "video_camera",
        "img": "video_camera.png",
        "category": "objects"
    };
    ":movie_camera:": EmojiDefinition = {
        "name": "movie_camera",
        "img": "movie_camera.png",
        "category": "objects"
    };
    ":computer:": EmojiDefinition = {
        "name": "computer",
        "img": "computer.png",
        "category": "objects"
    };
    ":tv:": EmojiDefinition = {
        "name": "tv",
        "img": "tv.png",
        "category": "objects"
    };
    ":iphone:": EmojiDefinition = {
        "name": "iphone",
        "img": "iphone.png",
        "category": "objects"
    };
    ":phone:": EmojiDefinition = {
        "name": "phone",
        "img": "phone.png",
        "category": "objects"
    };
    ":telephone:": EmojiDefinition = {
        "name": "telephone",
        "img": "telephone.png",
        "category": "objects"
    };
    ":telephone_receiver:": EmojiDefinition = {
        "name": "telephone_receiver",
        "img": "telephone_receiver.png",
        "category": "objects"
    };
    ":pager:": EmojiDefinition = {
        "name": "pager",
        "img": "pager.png",
        "category": "objects"
    };
    ":fax:": EmojiDefinition = {
        "name": "fax",
        "img": "fax.png",
        "category": "objects"
    };
    ":minidisc:": EmojiDefinition = {
        "name": "minidisc",
        "img": "minidisc.png",
        "category": "objects"
    };
    ":vhs:": EmojiDefinition = {
        "name": "vhs",
        "img": "vhs.png",
        "category": "objects"
    };
    ":sound:": EmojiDefinition = {
        "name": "sound",
        "img": "sound.png",
        "category": "objects"
    };
    ":speaker:": EmojiDefinition = {
        "name": "speaker",
        "img": "speaker.png",
        "category": "objects"
    };
    ":mute:": EmojiDefinition = {
        "name": "mute",
        "img": "mute.png",
        "category": "objects"
    };
    ":loudspeaker:": EmojiDefinition = {
        "name": "loudspeaker",
        "img": "loudspeaker.png",
        "category": "objects"
    };
    ":mega:": EmojiDefinition = {
        "name": "mega",
        "img": "mega.png",
        "category": "objects"
    };
    ":hourglass:": EmojiDefinition = {
        "name": "hourglass",
        "img": "hourglass.png",
        "category": "objects"
    };
    ":hourglass_flowing_sand:": EmojiDefinition = {
        "name": "hourglass_flowing_sand",
        "img": "hourglass_flowing_sand.png",
        "category": "objects"
    };
    ":alarm_clock:": EmojiDefinition = {
        "name": "alarm_clock",
        "img": "alarm_clock.png",
        "category": "objects"
    };
    ":watch:": EmojiDefinition = {
        "name": "watch",
        "img": "watch.png",
        "category": "objects"
    };
    ":radio:": EmojiDefinition = {
        "name": "radio",
        "img": "radio.png",
        "category": "objects"
    };
    ":satellite:": EmojiDefinition = {
        "name": "satellite",
        "img": "satellite.png",
        "category": "objects"
    };
    ":loop:": EmojiDefinition = {
        "name": "loop",
        "img": "loop.png",
        "category": "objects"
    };
    ":mag:": EmojiDefinition = {
        "name": "mag",
        "img": "mag.png",
        "category": "objects"
    };
    ":mag_right:": EmojiDefinition = {
        "name": "mag_right",
        "img": "mag_right.png",
        "category": "objects"
    };
    ":unlock:": EmojiDefinition = {
        "name": "unlock",
        "img": "unlock.png",
        "category": "objects"
    };
    ":lock:": EmojiDefinition = {
        "name": "lock",
        "img": "lock.png",
        "category": "objects"
    };
    ":lock_with_ink_pen:": EmojiDefinition = {
        "name": "lock_with_ink_pen",
        "img": "lock_with_ink_pen.png",
        "category": "objects"
    };
    ":closed_lock_with_key:": EmojiDefinition = {
        "name": "closed_lock_with_key",
        "img": "closed_lock_with_key.png",
        "category": "objects"
    };
    ":key:": EmojiDefinition = {
        "name": "key",
        "img": "key.png",
        "category": "objects"
    };
    ":bulb:": EmojiDefinition = {
        "name": "bulb",
        "img": "bulb.png",
        "category": "objects"
    };
    ":flashlight:": EmojiDefinition = {
        "name": "flashlight",
        "img": "flashlight.png",
        "category": "objects"
    };
    ":high_brightness:": EmojiDefinition = {
        "name": "high_brightness",
        "img": "high_brightness.png",
        "category": "objects"
    };
    ":low_brightness:": EmojiDefinition = {
        "name": "low_brightness",
        "img": "low_brightness.png",
        "category": "objects"
    };
    ":electric_plug:": EmojiDefinition = {
        "name": "electric_plug",
        "img": "electric_plug.png",
        "category": "objects"
    };
    ":battery:": EmojiDefinition = {
        "name": "battery",
        "img": "battery.png",
        "category": "objects"
    };
    ":calling:": EmojiDefinition = {
        "name": "calling",
        "img": "calling.png",
        "category": "objects"
    };
    ":email:": EmojiDefinition = {
        "name": "email",
        "img": "email.png",
        "category": "objects"
    };
    ":mailbox:": EmojiDefinition = {
        "name": "mailbox",
        "img": "mailbox.png",
        "category": "objects"
    };
    ":postbox:": EmojiDefinition = {
        "name": "postbox",
        "img": "postbox.png",
        "category": "objects"
    };
    ":bath:": EmojiDefinition = {
        "name": "bath",
        "img": "bath.png",
        "category": "objects"
    };
    ":bathtub:": EmojiDefinition = {
        "name": "bathtub",
        "img": "bathtub.png",
        "category": "objects"
    };
    ":shower:": EmojiDefinition = {
        "name": "shower",
        "img": "shower.png",
        "category": "objects"
    };
    ":toilet:": EmojiDefinition = {
        "name": "toilet",
        "img": "toilet.png",
        "category": "objects"
    };
    ":wrench:": EmojiDefinition = {
        "name": "wrench",
        "img": "wrench.png",
        "category": "objects"
    };
    ":nut_and_bolt:": EmojiDefinition = {
        "name": "nut_and_bolt",
        "img": "nut_and_bolt.png",
        "category": "objects"
    };
    ":hammer:": EmojiDefinition = {
        "name": "hammer",
        "img": "hammer.png",
        "category": "objects"
    };
    ":seat:": EmojiDefinition = {
        "name": "seat",
        "img": "seat.png",
        "category": "objects"
    };
    ":moneybag:": EmojiDefinition = {
        "name": "moneybag",
        "img": "moneybag.png",
        "category": "objects"
    };
    ":yen:": EmojiDefinition = {
        "name": "yen",
        "img": "yen.png",
        "category": "objects"
    };
    ":dollar:": EmojiDefinition = {
        "name": "dollar",
        "img": "dollar.png",
        "category": "objects"
    };
    ":pound:": EmojiDefinition = {
        "name": "pound",
        "img": "pound.png",
        "category": "objects"
    };
    ":euro:": EmojiDefinition = {
        "name": "euro",
        "img": "euro.png",
        "category": "objects"
    };
    ":credit_card:": EmojiDefinition = {
        "name": "credit_card",
        "img": "credit_card.png",
        "category": "objects"
    };
    ":money_with_wings:": EmojiDefinition = {
        "name": "money_with_wings",
        "img": "money_with_wings.png",
        "category": "objects"
    };
    ":e-mail:": EmojiDefinition = {
        "name": "e-mail",
        "img": "e-mail.png",
        "category": "objects"
    };
    ":inbox_tray:": EmojiDefinition = {
        "name": "inbox_tray",
        "img": "inbox_tray.png",
        "category": "objects"
    };
    ":outbox_tray:": EmojiDefinition = {
        "name": "outbox_tray",
        "img": "outbox_tray.png",
        "category": "objects"
    };
    ":envelope:": EmojiDefinition = {
        "name": "envelope",
        "img": "envelope.png",
        "category": "objects"
    };
    ":incoming_envelope:": EmojiDefinition = {
        "name": "incoming_envelope",
        "img": "incoming_envelope.png",
        "category": "objects"
    };
    ":postal_horn:": EmojiDefinition = {
        "name": "postal_horn",
        "img": "postal_horn.png",
        "category": "objects"
    };
    ":mailbox_closed:": EmojiDefinition = {
        "name": "mailbox_closed",
        "img": "mailbox_closed.png",
        "category": "objects"
    };
    ":mailbox_with_mail:": EmojiDefinition = {
        "name": "mailbox_with_mail",
        "img": "mailbox_with_mail.png",
        "category": "objects"
    };
    ":mailbox_with_no_mail:": EmojiDefinition = {
        "name": "mailbox_with_no_mail",
        "img": "mailbox_with_no_mail.png",
        "category": "objects"
    };
    ":package:": EmojiDefinition = {
        "name": "package",
        "img": "package.png",
        "category": "objects"
    };
    ":door:": EmojiDefinition = {
        "name": "door",
        "img": "door.png",
        "category": "objects"
    };
    ":smoking:": EmojiDefinition = {
        "name": "smoking",
        "img": "smoking.png",
        "category": "objects"
    };
    ":bomb:": EmojiDefinition = {
        "name": "bomb",
        "img": "bomb.png",
        "category": "objects"
    };
    ":gun:": EmojiDefinition = {
        "name": "gun",
        "img": "gun.png",
        "category": "objects"
    };
    ":hocho:": EmojiDefinition = {
        "name": "hocho",
        "img": "hocho.png",
        "category": "objects"
    };
    ":pill:": EmojiDefinition = {
        "name": "pill",
        "img": "pill.png",
        "category": "objects"
    };
    ":syringe:": EmojiDefinition = {
        "name": "syringe",
        "img": "syringe.png",
        "category": "objects"
    };
    ":page_facing_up:": EmojiDefinition = {
        "name": "page_facing_up",
        "img": "page_facing_up.png",
        "category": "objects"
    };
    ":page_with_curl:": EmojiDefinition = {
        "name": "page_with_curl",
        "img": "page_with_curl.png",
        "category": "objects"
    };
    ":bookmark_tabs:": EmojiDefinition = {
        "name": "bookmark_tabs",
        "img": "bookmark_tabs.png",
        "category": "objects"
    };
    ":bar_chart:": EmojiDefinition = {
        "name": "bar_chart",
        "img": "bar_chart.png",
        "category": "objects"
    };
    ":chart_with_upwards_trend:": EmojiDefinition = {
        "name": "chart_with_upwards_trend",
        "img": "chart_with_upwards_trend.png",
        "category": "objects"
    };
    ":chart_with_downwards_trend:": EmojiDefinition = {
        "name": "chart_with_downwards_trend",
        "img": "chart_with_downwards_trend.png",
        "category": "objects"
    };
    ":scroll:": EmojiDefinition = {
        "name": "scroll",
        "img": "scroll.png",
        "category": "objects"
    };
    ":clipboard:": EmojiDefinition = {
        "name": "clipboard",
        "img": "clipboard.png",
        "category": "objects"
    };
    ":calendar:": EmojiDefinition = {
        "name": "calendar",
        "img": "calendar.png",
        "category": "objects"
    };
    ":date:": EmojiDefinition = {
        "name": "date",
        "img": "date.png",
        "category": "objects"
    };
    ":card_index:": EmojiDefinition = {
        "name": "card_index",
        "img": "card_index.png",
        "category": "objects"
    };
    ":file_folder:": EmojiDefinition = {
        "name": "file_folder",
        "img": "file_folder.png",
        "category": "objects"
    };
    ":open_file_folder:": EmojiDefinition = {
        "name": "open_file_folder",
        "img": "open_file_folder.png",
        "category": "objects"
    };
    ":scissors:": EmojiDefinition = {
        "name": "scissors",
        "img": "scissors.png",
        "category": "objects"
    };
    ":pushpin:": EmojiDefinition = {
        "name": "pushpin",
        "img": "pushpin.png",
        "category": "objects"
    };
    ":paperclip:": EmojiDefinition = {
        "name": "paperclip",
        "img": "paperclip.png",
        "category": "objects"
    };
    ":black_nib:": EmojiDefinition = {
        "name": "black_nib",
        "img": "black_nib.png",
        "category": "objects"
    };
    ":pencil2:": EmojiDefinition = {
        "name": "pencil2",
        "img": "pencil2.png",
        "category": "objects"
    };
    ":straight_ruler:": EmojiDefinition = {
        "name": "straight_ruler",
        "img": "straight_ruler.png",
        "category": "objects"
    };
    ":triangular_ruler:": EmojiDefinition = {
        "name": "triangular_ruler",
        "img": "triangular_ruler.png",
        "category": "objects"
    };
    ":closed_book:": EmojiDefinition = {
        "name": "closed_book",
        "img": "closed_book.png",
        "category": "objects"
    };
    ":green_book:": EmojiDefinition = {
        "name": "green_book",
        "img": "green_book.png",
        "category": "objects"
    };
    ":blue_book:": EmojiDefinition = {
        "name": "blue_book",
        "img": "blue_book.png",
        "category": "objects"
    };
    ":orange_book:": EmojiDefinition = {
        "name": "orange_book",
        "img": "orange_book.png",
        "category": "objects"
    };
    ":notebook:": EmojiDefinition = {
        "name": "notebook",
        "img": "notebook.png",
        "category": "objects"
    };
    ":notebook_with_decorative_cover:": EmojiDefinition = {
        "name": "notebook_with_decorative_cover",
        "img": "notebook_with_decorative_cover.png",
        "category": "objects"
    };
    ":ledger:": EmojiDefinition = {
        "name": "ledger",
        "img": "ledger.png",
        "category": "objects"
    };
    ":books:": EmojiDefinition = {
        "name": "books",
        "img": "books.png",
        "category": "objects"
    };
    ":bookmark:": EmojiDefinition = {
        "name": "bookmark",
        "img": "bookmark.png",
        "category": "objects"
    };
    ":name_badge:": EmojiDefinition = {
        "name": "name_badge",
        "img": "name_badge.png",
        "category": "objects"
    };
    ":microscope:": EmojiDefinition = {
        "name": "microscope",
        "img": "microscope.png",
        "category": "objects"
    };
    ":telescope:": EmojiDefinition = {
        "name": "telescope",
        "img": "telescope.png",
        "category": "objects"
    };
    ":newspaper:": EmojiDefinition = {
        "name": "newspaper",
        "img": "newspaper.png",
        "category": "objects"
    };
    ":football:": EmojiDefinition = {
        "name": "football",
        "img": "football.png",
        "category": "objects"
    };
    ":basketball:": EmojiDefinition = {
        "name": "basketball",
        "img": "basketball.png",
        "category": "objects"
    };
    ":soccer:": EmojiDefinition = {
        "name": "soccer",
        "img": "soccer.png",
        "category": "objects"
    };
    ":baseball:": EmojiDefinition = {
        "name": "baseball",
        "img": "baseball.png",
        "category": "objects"
    };
    ":tennis:": EmojiDefinition = {
        "name": "tennis",
        "img": "tennis.png",
        "category": "objects"
    };
    ":8ball:": EmojiDefinition = {
        "name": "8ball",
        "img": "8ball.png",
        "category": "objects"
    };
    ":rugby_football:": EmojiDefinition = {
        "name": "rugby_football",
        "img": "rugby_football.png",
        "category": "objects"
    };
    ":bowling:": EmojiDefinition = {
        "name": "bowling",
        "img": "bowling.png",
        "category": "objects"
    };
    ":golf:": EmojiDefinition = {
        "name": "golf",
        "img": "golf.png",
        "category": "objects"
    };
    ":mountain_bicyclist:": EmojiDefinition = {
        "name": "mountain_bicyclist",
        "img": "mountain_bicyclist.png",
        "category": "objects"
    };
    ":bicyclist:": EmojiDefinition = {
        "name": "bicyclist",
        "img": "bicyclist.png",
        "category": "objects"
    };
    ":horse_racing:": EmojiDefinition = {
        "name": "horse_racing",
        "img": "horse_racing.png",
        "category": "objects"
    };
    ":snowboarder:": EmojiDefinition = {
        "name": "snowboarder",
        "img": "snowboarder.png",
        "category": "objects"
    };
    ":swimmer:": EmojiDefinition = {
        "name": "swimmer",
        "img": "swimmer.png",
        "category": "objects"
    };
    ":surfer:": EmojiDefinition = {
        "name": "surfer",
        "img": "surfer.png",
        "category": "objects"
    };
    ":ski:": EmojiDefinition = {
        "name": "ski",
        "img": "ski.png",
        "category": "objects"
    };
    ":spades:": EmojiDefinition = {
        "name": "spades",
        "img": "spades.png",
        "category": "objects"
    };
    ":hearts:": EmojiDefinition = {
        "name": "hearts",
        "img": "hearts.png",
        "category": "objects"
    };
    ":clubs:": EmojiDefinition = {
        "name": "clubs",
        "img": "clubs.png",
        "category": "objects"
    };
    ":diamonds:": EmojiDefinition = {
        "name": "diamonds",
        "img": "diamonds.png",
        "category": "objects"
    };
    ":gem:": EmojiDefinition = {
        "name": "gem",
        "img": "gem.png",
        "category": "objects"
    };
    ":ring:": EmojiDefinition = {
        "name": "ring",
        "img": "ring.png",
        "category": "objects"
    };
    ":trophy:": EmojiDefinition = {
        "name": "trophy",
        "img": "trophy.png",
        "category": "objects"
    };
    ":musical_score:": EmojiDefinition = {
        "name": "musical_score",
        "img": "musical_score.png",
        "category": "objects"
    };
    ":musical_keyboard:": EmojiDefinition = {
        "name": "musical_keyboard",
        "img": "musical_keyboard.png",
        "category": "objects"
    };
    ":violin:": EmojiDefinition = {
        "name": "violin",
        "img": "violin.png",
        "category": "objects"
    };
    ":space_invader:": EmojiDefinition = {
        "name": "space_invader",
        "img": "space_invader.png",
        "category": "objects"
    };
    ":video_game:": EmojiDefinition = {
        "name": "video_game",
        "img": "video_game.png",
        "category": "objects"
    };
    ":black_joker:": EmojiDefinition = {
        "name": "black_joker",
        "img": "black_joker.png",
        "category": "objects"
    };
    ":flower_playing_cards:": EmojiDefinition = {
        "name": "flower_playing_cards",
        "img": "flower_playing_cards.png",
        "category": "objects"
    };
    ":game_die:": EmojiDefinition = {
        "name": "game_die",
        "img": "game_die.png",
        "category": "objects"
    };
    ":dart:": EmojiDefinition = {
        "name": "dart",
        "img": "dart.png",
        "category": "objects"
    };
    ":mahjong:": EmojiDefinition = {
        "name": "mahjong",
        "img": "mahjong.png",
        "category": "objects"
    };
    ":clapper:": EmojiDefinition = {
        "name": "clapper",
        "img": "clapper.png",
        "category": "objects"
    };
    ":memo:": EmojiDefinition = {
        "name": "memo",
        "img": "memo.png",
        "category": "objects"
    };
    ":pencil:": EmojiDefinition = {
        "name": "pencil",
        "img": "pencil.png",
        "category": "objects"
    };
    ":book:": EmojiDefinition = {
        "name": "book",
        "img": "book.png",
        "category": "objects"
    };
    ":art:": EmojiDefinition = {
        "name": "art",
        "img": "art.png",
        "category": "objects"
    };
    ":microphone:": EmojiDefinition = {
        "name": "microphone",
        "img": "microphone.png",
        "category": "objects"
    };
    ":headphones:": EmojiDefinition = {
        "name": "headphones",
        "img": "headphones.png",
        "category": "objects"
    };
    ":trumpet:": EmojiDefinition = {
        "name": "trumpet",
        "img": "trumpet.png",
        "category": "objects"
    };
    ":saxophone:": EmojiDefinition = {
        "name": "saxophone",
        "img": "saxophone.png",
        "category": "objects"
    };
    ":guitar:": EmojiDefinition = {
        "name": "guitar",
        "img": "guitar.png",
        "category": "objects"
    };
    ":shoe:": EmojiDefinition = {
        "name": "shoe",
        "img": "shoe.png",
        "category": "objects"
    };
    ":sandal:": EmojiDefinition = {
        "name": "sandal",
        "img": "sandal.png",
        "category": "objects"
    };
    ":high_heel:": EmojiDefinition = {
        "name": "high_heel",
        "img": "high_heel.png",
        "category": "objects"
    };
    ":lipstick:": EmojiDefinition = {
        "name": "lipstick",
        "img": "lipstick.png",
        "category": "objects"
    };
    ":boot:": EmojiDefinition = {
        "name": "boot",
        "img": "boot.png",
        "category": "objects"
    };
    ":shirt:": EmojiDefinition = {
        "name": "shirt",
        "img": "shirt.png",
        "category": "objects"
    };
    ":tshirt:": EmojiDefinition = {
        "name": "tshirt",
        "img": "tshirt.png",
        "category": "objects"
    };
    ":necktie:": EmojiDefinition = {
        "name": "necktie",
        "img": "necktie.png",
        "category": "objects"
    };
    ":womans_clothes:": EmojiDefinition = {
        "name": "womans_clothes",
        "img": "womans_clothes.png",
        "category": "objects"
    };
    ":dress:": EmojiDefinition = {
        "name": "dress",
        "img": "dress.png",
        "category": "objects"
    };
    ":running_shirt_with_sash:": EmojiDefinition = {
        "name": "running_shirt_with_sash",
        "img": "running_shirt_with_sash.png",
        "category": "objects"
    };
    ":jeans:": EmojiDefinition = {
        "name": "jeans",
        "img": "jeans.png",
        "category": "objects"
    };
    ":kimono:": EmojiDefinition = {
        "name": "kimono",
        "img": "kimono.png",
        "category": "objects"
    };
    ":bikini:": EmojiDefinition = {
        "name": "bikini",
        "img": "bikini.png",
        "category": "objects"
    };
    ":ribbon:": EmojiDefinition = {
        "name": "ribbon",
        "img": "ribbon.png",
        "category": "objects"
    };
    ":tophat:": EmojiDefinition = {
        "name": "tophat",
        "img": "tophat.png",
        "category": "objects"
    };
    ":crown:": EmojiDefinition = {
        "name": "crown",
        "img": "crown.png",
        "category": "objects"
    };
    ":womans_hat:": EmojiDefinition = {
        "name": "womans_hat",
        "img": "womans_hat.png",
        "category": "objects"
    };
    ":mans_shoe:": EmojiDefinition = {
        "name": "mans_shoe",
        "img": "mans_shoe.png",
        "category": "objects"
    };
    ":closed_umbrella:": EmojiDefinition = {
        "name": "closed_umbrella",
        "img": "closed_umbrella.png",
        "category": "objects"
    };
    ":briefcase:": EmojiDefinition = {
        "name": "briefcase",
        "img": "briefcase.png",
        "category": "objects"
    };
    ":handbag:": EmojiDefinition = {
        "name": "handbag",
        "img": "handbag.png",
        "category": "objects"
    };
    ":pouch:": EmojiDefinition = {
        "name": "pouch",
        "img": "pouch.png",
        "category": "objects"
    };
    ":purse:": EmojiDefinition = {
        "name": "purse",
        "img": "purse.png",
        "category": "objects"
    };
    ":eyeglasses:": EmojiDefinition = {
        "name": "eyeglasses",
        "img": "eyeglasses.png",
        "category": "objects"
    };
    ":fishing_pole_and_fish:": EmojiDefinition = {
        "name": "fishing_pole_and_fish",
        "img": "fishing_pole_and_fish.png",
        "category": "objects"
    };
    ":coffee:": EmojiDefinition = {
        "name": "coffee",
        "img": "coffee.png",
        "category": "objects"
    };
    ":tea:": EmojiDefinition = {
        "name": "tea",
        "img": "tea.png",
        "category": "objects"
    };
    ":sake:": EmojiDefinition = {
        "name": "sake",
        "img": "sake.png",
        "category": "objects"
    };
    ":baby_bottle:": EmojiDefinition = {
        "name": "baby_bottle",
        "img": "baby_bottle.png",
        "category": "objects"
    };
    ":beer:": EmojiDefinition = {
        "name": "beer",
        "img": "beer.png",
        "category": "objects"
    };
    ":beers:": EmojiDefinition = {
        "name": "beers",
        "img": "beers.png",
        "category": "objects"
    };
    ":cocktail:": EmojiDefinition = {
        "name": "cocktail",
        "img": "cocktail.png",
        "category": "objects"
    };
    ":tropical_drink:": EmojiDefinition = {
        "name": "tropical_drink",
        "img": "tropical_drink.png",
        "category": "objects"
    };
    ":wine_glass:": EmojiDefinition = {
        "name": "wine_glass",
        "img": "wine_glass.png",
        "category": "objects"
    };
    ":fork_and_knife:": EmojiDefinition = {
        "name": "fork_and_knife",
        "img": "fork_and_knife.png",
        "category": "objects"
    };
    ":pizza:": EmojiDefinition = {
        "name": "pizza",
        "img": "pizza.png",
        "category": "objects"
    };
    ":hamburger:": EmojiDefinition = {
        "name": "hamburger",
        "img": "hamburger.png",
        "category": "objects"
    };
    ":fries:": EmojiDefinition = {
        "name": "fries",
        "img": "fries.png",
        "category": "objects"
    };
    ":poultry_leg:": EmojiDefinition = {
        "name": "poultry_leg",
        "img": "poultry_leg.png",
        "category": "objects"
    };
    ":meat_on_bone:": EmojiDefinition = {
        "name": "meat_on_bone",
        "img": "meat_on_bone.png",
        "category": "objects"
    };
    ":spaghetti:": EmojiDefinition = {
        "name": "spaghetti",
        "img": "spaghetti.png",
        "category": "objects"
    };
    ":curry:": EmojiDefinition = {
        "name": "curry",
        "img": "curry.png",
        "category": "objects"
    };
    ":fried_shrimp:": EmojiDefinition = {
        "name": "fried_shrimp",
        "img": "fried_shrimp.png",
        "category": "objects"
    };
    ":bento:": EmojiDefinition = {
        "name": "bento",
        "img": "bento.png",
        "category": "objects"
    };
    ":sushi:": EmojiDefinition = {
        "name": "sushi",
        "img": "sushi.png",
        "category": "objects"
    };
    ":fish_cake:": EmojiDefinition = {
        "name": "fish_cake",
        "img": "fish_cake.png",
        "category": "objects"
    };
    ":rice_ball:": EmojiDefinition = {
        "name": "rice_ball",
        "img": "rice_ball.png",
        "category": "objects"
    };
    ":rice_cracker:": EmojiDefinition = {
        "name": "rice_cracker",
        "img": "rice_cracker.png",
        "category": "objects"
    };
    ":rice:": EmojiDefinition = {
        "name": "rice",
        "img": "rice.png",
        "category": "objects"
    };
    ":ramen:": EmojiDefinition = {
        "name": "ramen",
        "img": "ramen.png",
        "category": "objects"
    };
    ":stew:": EmojiDefinition = {
        "name": "stew",
        "img": "stew.png",
        "category": "objects"
    };
    ":oden:": EmojiDefinition = {
        "name": "oden",
        "img": "oden.png",
        "category": "objects"
    };
    ":dango:": EmojiDefinition = {
        "name": "dango",
        "img": "dango.png",
        "category": "objects"
    };
    ":egg:": EmojiDefinition = {
        "name": "egg",
        "img": "egg.png",
        "category": "objects"
    };
    ":bread:": EmojiDefinition = {
        "name": "bread",
        "img": "bread.png",
        "category": "objects"
    };
    ":doughnut:": EmojiDefinition = {
        "name": "doughnut",
        "img": "doughnut.png",
        "category": "objects"
    };
    ":custard:": EmojiDefinition = {
        "name": "custard",
        "img": "custard.png",
        "category": "objects"
    };
    ":icecream:": EmojiDefinition = {
        "name": "icecream",
        "img": "icecream.png",
        "category": "objects"
    };
    ":ice_cream:": EmojiDefinition = {
        "name": "ice_cream",
        "img": "ice_cream.png",
        "category": "objects"
    };
    ":shaved_ice:": EmojiDefinition = {
        "name": "shaved_ice",
        "img": "shaved_ice.png",
        "category": "objects"
    };
    ":birthday:": EmojiDefinition = {
        "name": "birthday",
        "img": "birthday.png",
        "category": "objects"
    };
    ":cake:": EmojiDefinition = {
        "name": "cake",
        "img": "cake.png",
        "category": "objects"
    };
    ":cookie:": EmojiDefinition = {
        "name": "cookie",
        "img": "cookie.png",
        "category": "objects"
    };
    ":chocolate_bar:": EmojiDefinition = {
        "name": "chocolate_bar",
        "img": "chocolate_bar.png",
        "category": "objects"
    };
    ":candy:": EmojiDefinition = {
        "name": "candy",
        "img": "candy.png",
        "category": "objects"
    };
    ":lollipop:": EmojiDefinition = {
        "name": "lollipop",
        "img": "lollipop.png",
        "category": "objects"
    };
    ":honey_pot:": EmojiDefinition = {
        "name": "honey_pot",
        "img": "honey_pot.png",
        "category": "objects"
    };
    ":apple:": EmojiDefinition = {
        "name": "apple",
        "img": "apple.png",
        "category": "objects"
    };
    ":green_apple:": EmojiDefinition = {
        "name": "green_apple",
        "img": "green_apple.png",
        "category": "objects"
    };
    ":tangerine:": EmojiDefinition = {
        "name": "tangerine",
        "img": "tangerine.png",
        "category": "objects"
    };
    ":lemon:": EmojiDefinition = {
        "name": "lemon",
        "img": "lemon.png",
        "category": "objects"
    };
    ":cherries:": EmojiDefinition = {
        "name": "cherries",
        "img": "cherries.png",
        "category": "objects"
    };
    ":grapes:": EmojiDefinition = {
        "name": "grapes",
        "img": "grapes.png",
        "category": "objects"
    };
    ":watermelon:": EmojiDefinition = {
        "name": "watermelon",
        "img": "watermelon.png",
        "category": "objects"
    };
    ":strawberry:": EmojiDefinition = {
        "name": "strawberry",
        "img": "strawberry.png",
        "category": "objects"
    };
    ":peach:": EmojiDefinition = {
        "name": "peach",
        "img": "peach.png",
        "category": "objects"
    };
    ":melon:": EmojiDefinition = {
        "name": "melon",
        "img": "melon.png",
        "category": "objects"
    };
    ":banana:": EmojiDefinition = {
        "name": "banana",
        "img": "banana.png",
        "category": "objects"
    };
    ":pear:": EmojiDefinition = {
        "name": "pear",
        "img": "pear.png",
        "category": "objects"
    };
    ":pineapple:": EmojiDefinition = {
        "name": "pineapple",
        "img": "pineapple.png",
        "category": "objects"
    };
    ":sweet_potato:": EmojiDefinition = {
        "name": "sweet_potato",
        "img": "sweet_potato.png",
        "category": "objects"
    };
    ":eggplant:": EmojiDefinition = {
        "name": "eggplant",
        "img": "eggplant.png",
        "category": "objects"
    };
    ":tomato:": EmojiDefinition = {
        "name": "tomato",
        "img": "tomato.png",
        "category": "objects"
    };
    ":corn:": EmojiDefinition = {
        "name": "corn",
        "img": "corn.png",
        "category": "objects"
    };
    ":house:": EmojiDefinition = {
        "name": "house",
        "img": "house.png",
        "category": "places"
    };
    ":house_with_garden:": EmojiDefinition = {
        "name": "house_with_garden",
        "img": "house_with_garden.png",
        "category": "places"
    };
    ":school:": EmojiDefinition = {
        "name": "school",
        "img": "school.png",
        "category": "places"
    };
    ":office:": EmojiDefinition = {
        "name": "office",
        "img": "office.png",
        "category": "places"
    };
    ":post_office:": EmojiDefinition = {
        "name": "post_office",
        "img": "post_office.png",
        "category": "places"
    };
    ":hospital:": EmojiDefinition = {
        "name": "hospital",
        "img": "hospital.png",
        "category": "places"
    };
    ":bank:": EmojiDefinition = {
        "name": "bank",
        "img": "bank.png",
        "category": "places"
    };
    ":convenience_store:": EmojiDefinition = {
        "name": "convenience_store",
        "img": "convenience_store.png",
        "category": "places"
    };
    ":love_hotel:": EmojiDefinition = {
        "name": "love_hotel",
        "img": "love_hotel.png",
        "category": "places"
    };
    ":hotel:": EmojiDefinition = {
        "name": "hotel",
        "img": "hotel.png",
        "category": "places"
    };
    ":wedding:": EmojiDefinition = {
        "name": "wedding",
        "img": "wedding.png",
        "category": "places"
    };
    ":church:": EmojiDefinition = {
        "name": "church",
        "img": "church.png",
        "category": "places"
    };
    ":department_store:": EmojiDefinition = {
        "name": "department_store",
        "img": "department_store.png",
        "category": "places"
    };
    ":european_post_office:": EmojiDefinition = {
        "name": "european_post_office",
        "img": "european_post_office.png",
        "category": "places"
    };
    ":city_sunrise:": EmojiDefinition = {
        "name": "city_sunrise",
        "img": "city_sunrise.png",
        "category": "places"
    };
    ":city_sunset:": EmojiDefinition = {
        "name": "city_sunset",
        "img": "city_sunset.png",
        "category": "places"
    };
    ":japanese_castle:": EmojiDefinition = {
        "name": "japanese_castle",
        "img": "japanese_castle.png",
        "category": "places"
    };
    ":european_castle:": EmojiDefinition = {
        "name": "european_castle",
        "img": "european_castle.png",
        "category": "places"
    };
    ":tent:": EmojiDefinition = {
        "name": "tent",
        "img": "tent.png",
        "category": "places"
    };
    ":factory:": EmojiDefinition = {
        "name": "factory",
        "img": "factory.png",
        "category": "places"
    };
    ":tokyo_tower:": EmojiDefinition = {
        "name": "tokyo_tower",
        "img": "tokyo_tower.png",
        "category": "places"
    };
    ":japan:": EmojiDefinition = {
        "name": "japan",
        "img": "japan.png",
        "category": "places"
    };
    ":mount_fuji:": EmojiDefinition = {
        "name": "mount_fuji",
        "img": "mount_fuji.png",
        "category": "places"
    };
    ":sunrise_over_mountains:": EmojiDefinition = {
        "name": "sunrise_over_mountains",
        "img": "sunrise_over_mountains.png",
        "category": "places"
    };
    ":sunrise:": EmojiDefinition = {
        "name": "sunrise",
        "img": "sunrise.png",
        "category": "places"
    };
    ":stars:": EmojiDefinition = {
        "name": "stars",
        "img": "stars.png",
        "category": "places"
    };
    ":statue_of_liberty:": EmojiDefinition = {
        "name": "statue_of_liberty",
        "img": "statue_of_liberty.png",
        "category": "places"
    };
    ":bridge_at_night:": EmojiDefinition = {
        "name": "bridge_at_night",
        "img": "bridge_at_night.png",
        "category": "places"
    };
    ":carousel_horse:": EmojiDefinition = {
        "name": "carousel_horse",
        "img": "carousel_horse.png",
        "category": "places"
    };
    ":rainbow:": EmojiDefinition = {
        "name": "rainbow",
        "img": "rainbow.png",
        "category": "places"
    };
    ":ferris_wheel:": EmojiDefinition = {
        "name": "ferris_wheel",
        "img": "ferris_wheel.png",
        "category": "places"
    };
    ":fountain:": EmojiDefinition = {
        "name": "fountain",
        "img": "fountain.png",
        "category": "places"
    };
    ":roller_coaster:": EmojiDefinition = {
        "name": "roller_coaster",
        "img": "roller_coaster.png",
        "category": "places"
    };
    ":ship:": EmojiDefinition = {
        "name": "ship",
        "img": "ship.png",
        "category": "places"
    };
    ":speedboat:": EmojiDefinition = {
        "name": "speedboat",
        "img": "speedboat.png",
        "category": "places"
    };
    ":boat:": EmojiDefinition = {
        "name": "boat",
        "img": "boat.png",
        "category": "places"
    };
    ":sailboat:": EmojiDefinition = {
        "name": "sailboat",
        "img": "sailboat.png",
        "category": "places"
    };
    ":rowboat:": EmojiDefinition = {
        "name": "rowboat",
        "img": "rowboat.png",
        "category": "places"
    };
    ":anchor:": EmojiDefinition = {
        "name": "anchor",
        "img": "anchor.png",
        "category": "places"
    };
    ":rocket:": EmojiDefinition = {
        "name": "rocket",
        "img": "rocket.png",
        "category": "places"
    };
    ":airplane:": EmojiDefinition = {
        "name": "airplane",
        "img": "airplane.png",
        "category": "places"
    };
    ":helicopter:": EmojiDefinition = {
        "name": "helicopter",
        "img": "helicopter.png",
        "category": "places"
    };
    ":steam_locomotive:": EmojiDefinition = {
        "name": "steam_locomotive",
        "img": "steam_locomotive.png",
        "category": "places"
    };
    ":tram:": EmojiDefinition = {
        "name": "tram",
        "img": "tram.png",
        "category": "places"
    };
    ":mountain_railway:": EmojiDefinition = {
        "name": "mountain_railway",
        "img": "mountain_railway.png",
        "category": "places"
    };
    ":bike:": EmojiDefinition = {
        "name": "bike",
        "img": "bike.png",
        "category": "places"
    };
    ":aerial_tramway:": EmojiDefinition = {
        "name": "aerial_tramway",
        "img": "aerial_tramway.png",
        "category": "places"
    };
    ":suspension_railway:": EmojiDefinition = {
        "name": "suspension_railway",
        "img": "suspension_railway.png",
        "category": "places"
    };
    ":mountain_cableway:": EmojiDefinition = {
        "name": "mountain_cableway",
        "img": "mountain_cableway.png",
        "category": "places"
    };
    ":tractor:": EmojiDefinition = {
        "name": "tractor",
        "img": "tractor.png",
        "category": "places"
    };
    ":blue_car:": EmojiDefinition = {
        "name": "blue_car",
        "img": "blue_car.png",
        "category": "places"
    };
    ":oncoming_automobile:": EmojiDefinition = {
        "name": "oncoming_automobile",
        "img": "oncoming_automobile.png",
        "category": "places"
    };
    ":car:": EmojiDefinition = {
        "name": "car",
        "img": "car.png",
        "category": "places"
    };
    ":red_car:": EmojiDefinition = {
        "name": "red_car",
        "img": "red_car.png",
        "category": "places"
    };
    ":taxi:": EmojiDefinition = {
        "name": "taxi",
        "img": "taxi.png",
        "category": "places"
    };
    ":oncoming_taxi:": EmojiDefinition = {
        "name": "oncoming_taxi",
        "img": "oncoming_taxi.png",
        "category": "places"
    };
    ":articulated_lorry:": EmojiDefinition = {
        "name": "articulated_lorry",
        "img": "articulated_lorry.png",
        "category": "places"
    };
    ":bus:": EmojiDefinition = {
        "name": "bus",
        "img": "bus.png",
        "category": "places"
    };
    ":oncoming_bus:": EmojiDefinition = {
        "name": "oncoming_bus",
        "img": "oncoming_bus.png",
        "category": "places"
    };
    ":rotating_light:": EmojiDefinition = {
        "name": "rotating_light",
        "img": "rotating_light.png",
        "category": "places"
    };
    ":police_car:": EmojiDefinition = {
        "name": "police_car",
        "img": "police_car.png",
        "category": "places"
    };
    ":oncoming_police_car:": EmojiDefinition = {
        "name": "oncoming_police_car",
        "img": "oncoming_police_car.png",
        "category": "places"
    };
    ":fire_engine:": EmojiDefinition = {
        "name": "fire_engine",
        "img": "fire_engine.png",
        "category": "places"
    };
    ":ambulance:": EmojiDefinition = {
        "name": "ambulance",
        "img": "ambulance.png",
        "category": "places"
    };
    ":minibus:": EmojiDefinition = {
        "name": "minibus",
        "img": "minibus.png",
        "category": "places"
    };
    ":truck:": EmojiDefinition = {
        "name": "truck",
        "img": "truck.png",
        "category": "places"
    };
    ":train:": EmojiDefinition = {
        "name": "train",
        "img": "train.png",
        "category": "places"
    };
    ":station:": EmojiDefinition = {
        "name": "station",
        "img": "station.png",
        "category": "places"
    };
    ":train2:": EmojiDefinition = {
        "name": "train2",
        "img": "train2.png",
        "category": "places"
    };
    ":bullettrain_front:": EmojiDefinition = {
        "name": "bullettrain_front",
        "img": "bullettrain_front.png",
        "category": "places"
    };
    ":bullettrain_side:": EmojiDefinition = {
        "name": "bullettrain_side",
        "img": "bullettrain_side.png",
        "category": "places"
    };
    ":light_rail:": EmojiDefinition = {
        "name": "light_rail",
        "img": "light_rail.png",
        "category": "places"
    };
    ":monorail:": EmojiDefinition = {
        "name": "monorail",
        "img": "monorail.png",
        "category": "places"
    };
    ":railway_car:": EmojiDefinition = {
        "name": "railway_car",
        "img": "railway_car.png",
        "category": "places"
    };
    ":trolleybus:": EmojiDefinition = {
        "name": "trolleybus",
        "img": "trolleybus.png",
        "category": "places"
    };
    ":ticket:": EmojiDefinition = {
        "name": "ticket",
        "img": "ticket.png",
        "category": "places"
    };
    ":fuelpump:": EmojiDefinition = {
        "name": "fuelpump",
        "img": "fuelpump.png",
        "category": "places"
    };
    ":vertical_traffic_light:": EmojiDefinition = {
        "name": "vertical_traffic_light",
        "img": "vertical_traffic_light.png",
        "category": "places"
    };
    ":traffic_light:": EmojiDefinition = {
        "name": "traffic_light",
        "img": "traffic_light.png",
        "category": "places"
    };
    ":warning:": EmojiDefinition = {
        "name": "warning",
        "img": "warning.png",
        "category": "places"
    };
    ":construction:": EmojiDefinition = {
        "name": "construction",
        "img": "construction.png",
        "category": "places"
    };
    ":beginner:": EmojiDefinition = {
        "name": "beginner",
        "img": "beginner.png",
        "category": "places"
    };
    ":atm:": EmojiDefinition = {
        "name": "atm",
        "img": "atm.png",
        "category": "places"
    };
    ":slot_machine:": EmojiDefinition = {
        "name": "slot_machine",
        "img": "slot_machine.png",
        "category": "places"
    };
    ":busstop:": EmojiDefinition = {
        "name": "busstop",
        "img": "busstop.png",
        "category": "places"
    };
    ":barber:": EmojiDefinition = {
        "name": "barber",
        "img": "barber.png",
        "category": "places"
    };
    ":hotsprings:": EmojiDefinition = {
        "name": "hotsprings",
        "img": "hotsprings.png",
        "category": "places"
    };
    ":checkered_flag:": EmojiDefinition = {
        "name": "checkered_flag",
        "img": "checkered_flag.png",
        "category": "places"
    };
    ":crossed_flags:": EmojiDefinition = {
        "name": "crossed_flags",
        "img": "crossed_flags.png",
        "category": "places"
    };
    ":izakaya_lantern:": EmojiDefinition = {
        "name": "izakaya_lantern",
        "img": "izakaya_lantern.png",
        "category": "places"
    };
    ":moyai:": EmojiDefinition = {
        "name": "moyai",
        "img": "moyai.png",
        "category": "places"
    };
    ":circus_tent:": EmojiDefinition = {
        "name": "circus_tent",
        "img": "circus_tent.png",
        "category": "places"
    };
    ":performing_arts:": EmojiDefinition = {
        "name": "performing_arts",
        "img": "performing_arts.png",
        "category": "places"
    };
    ":round_pushpin:": EmojiDefinition = {
        "name": "round_pushpin",
        "img": "round_pushpin.png",
        "category": "places"
    };
    ":triangular_flag_on_post:": EmojiDefinition = {
        "name": "triangular_flag_on_post",
        "img": "triangular_flag_on_post.png",
        "category": "places"
    };
    ":jp:": EmojiDefinition = {
        "name": "jp",
        "img": "jp.png",
        "category": "places"
    };
    ":kr:": EmojiDefinition = {
        "name": "kr",
        "img": "kr.png",
        "category": "places"
    };
    ":cn:": EmojiDefinition = {
        "name": "cn",
        "img": "cn.png",
        "category": "places"
    };
    ":us:": EmojiDefinition = {
        "name": "us",
        "img": "us.png",
        "category": "places"
    };
    ":fr:": EmojiDefinition = {
        "name": "fr",
        "img": "fr.png",
        "category": "places"
    };
    ":es:": EmojiDefinition = {
        "name": "es",
        "img": "es.png",
        "category": "places"
    };
    ":it:": EmojiDefinition = {
        "name": "it",
        "img": "it.png",
        "category": "places"
    };
    ":ru:": EmojiDefinition = {
        "name": "ru",
        "img": "ru.png",
        "category": "places"
    };
    ":gb:": EmojiDefinition = {
        "name": "gb",
        "img": "gb.png",
        "category": "places"
    };
    ":uk:": EmojiDefinition = {
        "name": "uk",
        "img": "uk.png",
        "category": "places"
    };
    ":de:": EmojiDefinition = {
        "name": "de",
        "img": "de.png",
        "category": "places"
    }
    ":one:": EmojiDefinition = {
        "name": "one",
        "img": "one.png",
        "category": "symbols"
    };
    ":two:": EmojiDefinition = {
        "name": "two",
        "img": "two.png",
        "category": "symbols"
    };
    ":three:": EmojiDefinition = {
        "name": "three",
        "img": "three.png",
        "category": "symbols"
    };
    ":four:": EmojiDefinition = {
        "name": "four",
        "img": "four.png",
        "category": "symbols"
    };
    ":five:": EmojiDefinition = {
        "name": "five",
        "img": "five.png",
        "category": "symbols"
    };
    ":six:": EmojiDefinition = {
        "name": "six",
        "img": "six.png",
        "category": "symbols"
    };
    ":seven:": EmojiDefinition = {
        "name": "seven",
        "img": "seven.png",
        "category": "symbols"
    };
    ":eight:": EmojiDefinition = {
        "name": "eight",
        "img": "eight.png",
        "category": "symbols"
    };
    ":nine:": EmojiDefinition = {
        "name": "nine",
        "img": "nine.png",
        "category": "symbols"
    };
    ":keycap_ten:": EmojiDefinition = {
        "name": "keycap_ten",
        "img": "keycap_ten.png",
        "category": "symbols"
    };
    ":1234:": EmojiDefinition = {
        "name": "1234",
        "img": "1234.png",
        "category": "symbols"
    };
    ":zero:": EmojiDefinition = {
        "name": "zero",
        "img": "zero.png",
        "category": "symbols"
    };
    ":hash:": EmojiDefinition = {
        "name": "hash",
        "img": "hash.png",
        "category": "symbols"
    };
    ":symbols:": EmojiDefinition = {
        "name": "symbols",
        "img": "symbols.png",
        "category": "symbols"
    };
    ":arrow_backward:": EmojiDefinition = {
        "name": "arrow_backward",
        "img": "arrow_backward.png",
        "category": "symbols"
    };
    ":arrow_down:": EmojiDefinition = {
        "name": "arrow_down",
        "img": "arrow_down.png",
        "category": "symbols"
    };
    ":arrow_forward:": EmojiDefinition = {
        "name": "arrow_forward",
        "img": "arrow_forward.png",
        "category": "symbols"
    };
    ":arrow_left:": EmojiDefinition = {
        "name": "arrow_left",
        "img": "arrow_left.png",
        "category": "symbols"
    };
    ":capital_abcd:": EmojiDefinition = {
        "name": "capital_abcd",
        "img": "capital_abcd.png",
        "category": "symbols"
    };
    ":abcd:": EmojiDefinition = {
        "name": "abcd",
        "img": "abcd.png",
        "category": "symbols"
    };
    ":abc:": EmojiDefinition = {
        "name": "abc",
        "img": "abc.png",
        "category": "symbols"
    };
    ":arrow_lower_left:": EmojiDefinition = {
        "name": "arrow_lower_left",
        "img": "arrow_lower_left.png",
        "category": "symbols"
    };
    ":arrow_lower_right:": EmojiDefinition = {
        "name": "arrow_lower_right",
        "img": "arrow_lower_right.png",
        "category": "symbols"
    };
    ":arrow_right:": EmojiDefinition = {
        "name": "arrow_right",
        "img": "arrow_right.png",
        "category": "symbols"
    };
    ":arrow_up:": EmojiDefinition = {
        "name": "arrow_up",
        "img": "arrow_up.png",
        "category": "symbols"
    };
    ":arrow_upper_left:": EmojiDefinition = {
        "name": "arrow_upper_left",
        "img": "arrow_upper_left.png",
        "category": "symbols"
    };
    ":arrow_upper_right:": EmojiDefinition = {
        "name": "arrow_upper_right",
        "img": "arrow_upper_right.png",
        "category": "symbols"
    };
    ":arrow_double_down:": EmojiDefinition = {
        "name": "arrow_double_down",
        "img": "arrow_double_down.png",
        "category": "symbols"
    };
    ":arrow_double_up:": EmojiDefinition = {
        "name": "arrow_double_up",
        "img": "arrow_double_up.png",
        "category": "symbols"
    };
    ":arrow_down_small:": EmojiDefinition = {
        "name": "arrow_down_small",
        "img": "arrow_down_small.png",
        "category": "symbols"
    };
    ":arrow_heading_down:": EmojiDefinition = {
        "name": "arrow_heading_down",
        "img": "arrow_heading_down.png",
        "category": "symbols"
    };
    ":arrow_heading_up:": EmojiDefinition = {
        "name": "arrow_heading_up",
        "img": "arrow_heading_up.png",
        "category": "symbols"
    };
    ":leftwards_arrow_with_hook:": EmojiDefinition = {
        "name": "leftwards_arrow_with_hook",
        "img": "leftwards_arrow_with_hook.png",
        "category": "symbols"
    };
    ":arrow_right_hook:": EmojiDefinition = {
        "name": "arrow_right_hook",
        "img": "arrow_right_hook.png",
        "category": "symbols"
    };
    ":left_right_arrow:": EmojiDefinition = {
        "name": "left_right_arrow",
        "img": "left_right_arrow.png",
        "category": "symbols"
    };
    ":arrow_up_down:": EmojiDefinition = {
        "name": "arrow_up_down",
        "img": "arrow_up_down.png",
        "category": "symbols"
    };
    ":arrow_up_small:": EmojiDefinition = {
        "name": "arrow_up_small",
        "img": "arrow_up_small.png",
        "category": "symbols"
    };
    ":arrows_clockwise:": EmojiDefinition = {
        "name": "arrows_clockwise",
        "img": "arrows_clockwise.png",
        "category": "symbols"
    };
    ":arrows_counterclockwise:": EmojiDefinition = {
        "name": "arrows_counterclockwise",
        "img": "arrows_counterclockwise.png",
        "category": "symbols"
    };
    ":rewind:": EmojiDefinition = {
        "name": "rewind",
        "img": "rewind.png",
        "category": "symbols"
    };
    ":fast_forward:": EmojiDefinition = {
        "name": "fast_forward",
        "img": "fast_forward.png",
        "category": "symbols"
    };
    ":information_source:": EmojiDefinition = {
        "name": "information_source",
        "img": "information_source.png",
        "category": "symbols"
    };
    ":ok:": EmojiDefinition = {
        "name": "ok",
        "img": "ok.png",
        "category": "symbols"
    };
    ":twisted_rightwards_arrows:": EmojiDefinition = {
        "name": "twisted_rightwards_arrows",
        "img": "twisted_rightwards_arrows.png",
        "category": "symbols"
    };
    ":repeat:": EmojiDefinition = {
        "name": "repeat",
        "img": "repeat.png",
        "category": "symbols"
    };
    ":repeat_one:": EmojiDefinition = {
        "name": "repeat_one",
        "img": "repeat_one.png",
        "category": "symbols"
    };
    ":new:": EmojiDefinition = {
        "name": "new",
        "img": "new.png",
        "category": "symbols"
    };
    ":top:": EmojiDefinition = {
        "name": "top",
        "img": "top.png",
        "category": "symbols"
    };
    ":up:": EmojiDefinition = {
        "name": "up",
        "img": "up.png",
        "category": "symbols"
    };
    ":cool:": EmojiDefinition = {
        "name": "cool",
        "img": "cool.png",
        "category": "symbols"
    };
    ":free:": EmojiDefinition = {
        "name": "free",
        "img": "free.png",
        "category": "symbols"
    };
    ":ng:": EmojiDefinition = {
        "name": "ng",
        "img": "ng.png",
        "category": "symbols"
    };
    ":cinema:": EmojiDefinition = {
        "name": "cinema",
        "img": "cinema.png",
        "category": "symbols"
    };
    ":koko:": EmojiDefinition = {
        "name": "koko",
        "img": "koko.png",
        "category": "symbols"
    };
    ":signal_strength:": EmojiDefinition = {
        "name": "signal_strength",
        "img": "signal_strength.png",
        "category": "symbols"
    };
    ":u5272:": EmojiDefinition = {
        "name": "u5272",
        "img": "u5272.png",
        "category": "symbols"
    };
    ":u5408:": EmojiDefinition = {
        "name": "u5408",
        "img": "u5408.png",
        "category": "symbols"
    };
    ":u55b6:": EmojiDefinition = {
        "name": "u55b6",
        "img": "u55b6.png",
        "category": "symbols"
    };
    ":u6307:": EmojiDefinition = {
        "name": "u6307",
        "img": "u6307.png",
        "category": "symbols"
    };
    ":u6708:": EmojiDefinition = {
        "name": "u6708",
        "img": "u6708.png",
        "category": "symbols"
    };
    ":u6709:": EmojiDefinition = {
        "name": "u6709",
        "img": "u6709.png",
        "category": "symbols"
    };
    ":u6e80:": EmojiDefinition = {
        "name": "u6e80",
        "img": "u6e80.png",
        "category": "symbols"
    };
    ":u7121:": EmojiDefinition = {
        "name": "u7121",
        "img": "u7121.png",
        "category": "symbols"
    };
    ":u7533:": EmojiDefinition = {
        "name": "u7533",
        "img": "u7533.png",
        "category": "symbols"
    };
    ":u7a7a:": EmojiDefinition = {
        "name": "u7a7a",
        "img": "u7a7a.png",
        "category": "symbols"
    };
    ":u7981:": EmojiDefinition = {
        "name": "u7981",
        "img": "u7981.png",
        "category": "symbols"
    };
    ":sa:": EmojiDefinition = {
        "name": "sa",
        "img": "sa.png",
        "category": "symbols"
    };
    ":restroom:": EmojiDefinition = {
        "name": "restroom",
        "img": "restroom.png",
        "category": "symbols"
    };
    ":mens:": EmojiDefinition = {
        "name": "mens",
        "img": "mens.png",
        "category": "symbols"
    };
    ":womens:": EmojiDefinition = {
        "name": "womens",
        "img": "womens.png",
        "category": "symbols"
    };
    ":baby_symbol:": EmojiDefinition = {
        "name": "baby_symbol",
        "img": "baby_symbol.png",
        "category": "symbols"
    };
    ":no_smoking:": EmojiDefinition = {
        "name": "no_smoking",
        "img": "no_smoking.png",
        "category": "symbols"
    };
    ":parking:": EmojiDefinition = {
        "name": "parking",
        "img": "parking.png",
        "category": "symbols"
    };
    ":wheelchair:": EmojiDefinition = {
        "name": "wheelchair",
        "img": "wheelchair.png",
        "category": "symbols"
    };
    ":metro:": EmojiDefinition = {
        "name": "metro",
        "img": "metro.png",
        "category": "symbols"
    };
    ":baggage_claim:": EmojiDefinition = {
        "name": "baggage_claim",
        "img": "baggage_claim.png",
        "category": "symbols"
    };
    ":accept:": EmojiDefinition = {
        "name": "accept",
        "img": "accept.png",
        "category": "symbols"
    };
    ":wc:": EmojiDefinition = {
        "name": "wc",
        "img": "wc.png",
        "category": "symbols"
    };
    ":potable_water:": EmojiDefinition = {
        "name": "potable_water",
        "img": "potable_water.png",
        "category": "symbols"
    };
    ":put_litter_in_its_place:": EmojiDefinition = {
        "name": "put_litter_in_its_place",
        "img": "put_litter_in_its_place.png",
        "category": "symbols"
    };
    ":secret:": EmojiDefinition = {
        "name": "secret",
        "img": "secret.png",
        "category": "symbols"
    };
    ":congratulations:": EmojiDefinition = {
        "name": "congratulations",
        "img": "congratulations.png",
        "category": "symbols"
    };
    ":m:": EmojiDefinition = {
        "name": "m",
        "img": "m.png",
        "category": "symbols"
    };
    ":passport_control:": EmojiDefinition = {
        "name": "passport_control",
        "img": "passport_control.png",
        "category": "symbols"
    };
    ":left_luggage:": EmojiDefinition = {
        "name": "left_luggage",
        "img": "left_luggage.png",
        "category": "symbols"
    };
    ":customs:": EmojiDefinition = {
        "name": "customs",
        "img": "customs.png",
        "category": "symbols"
    };
    ":ideograph_advantage:": EmojiDefinition = {
        "name": "ideograph_advantage",
        "img": "ideograph_advantage.png",
        "category": "symbols"
    };
    ":cl:": EmojiDefinition = {
        "name": "cl",
        "img": "cl.png",
        "category": "symbols"
    };
    ":sos:": EmojiDefinition = {
        "name": "sos",
        "img": "sos.png",
        "category": "symbols"
    };
    ":id:": EmojiDefinition = {
        "name": "id",
        "img": "id.png",
        "category": "symbols"
    };
    ":no_entry_sign:": EmojiDefinition = {
        "name": "no_entry_sign",
        "img": "no_entry_sign.png",
        "category": "symbols"
    };
    ":underage:": EmojiDefinition = {
        "name": "underage",
        "img": "underage.png",
        "category": "symbols"
    };
    ":no_mobile_phones:": EmojiDefinition = {
        "name": "no_mobile_phones",
        "img": "no_mobile_phones.png",
        "category": "symbols"
    };
    ":do_not_litter:": EmojiDefinition = {
        "name": "do_not_litter",
        "img": "do_not_litter.png",
        "category": "symbols"
    };
    ":non-potable_water:": EmojiDefinition = {
        "name": "non-potable_water",
        "img": "non-potable_water.png",
        "category": "symbols"
    };
    ":no_bicycles:": EmojiDefinition = {
        "name": "no_bicycles",
        "img": "no_bicycles.png",
        "category": "symbols"
    };
    ":no_pedestrians:": EmojiDefinition = {
        "name": "no_pedestrians",
        "img": "no_pedestrians.png",
        "category": "symbols"
    };
    ":children_crossing:": EmojiDefinition = {
        "name": "children_crossing",
        "img": "children_crossing.png",
        "category": "symbols"
    };
    ":no_entry:": EmojiDefinition = {
        "name": "no_entry",
        "img": "no_entry.png",
        "category": "symbols"
    };
    ":eight_spoked_asterisk:": EmojiDefinition = {
        "name": "eight_spoked_asterisk",
        "img": "eight_spoked_asterisk.png",
        "category": "symbols"
    };
    ":sparkle:": EmojiDefinition = {
        "name": "sparkle",
        "img": "sparkle.png",
        "category": "symbols"
    };
    ":eight_pointed_black_star:": EmojiDefinition = {
        "name": "eight_pointed_black_star",
        "img": "eight_pointed_black_star.png",
        "category": "symbols"
    };
    ":heart_decoration:": EmojiDefinition = {
        "name": "heart_decoration",
        "img": "heart_decoration.png",
        "category": "symbols"
    };
    ":vs:": EmojiDefinition = {
        "name": "vs",
        "img": "vs.png",
        "category": "symbols"
    };
    ":vibration_mode:": EmojiDefinition = {
        "name": "vibration_mode",
        "img": "vibration_mode.png",
        "category": "symbols"
    };
    ":mobile_phone_off:": EmojiDefinition = {
        "name": "mobile_phone_off",
        "img": "mobile_phone_off.png",
        "category": "symbols"
    };
    ":chart:": EmojiDefinition = {
        "name": "chart",
        "img": "chart.png",
        "category": "symbols"
    };
    ":currency_exchange:": EmojiDefinition = {
        "name": "currency_exchange",
        "img": "currency_exchange.png",
        "category": "symbols"
    };
    ":aries:": EmojiDefinition = {
        "name": "aries",
        "img": "aries.png",
        "category": "symbols"
    };
    ":taurus:": EmojiDefinition = {
        "name": "taurus",
        "img": "taurus.png",
        "category": "symbols"
    };
    ":gemini:": EmojiDefinition = {
        "name": "gemini",
        "img": "gemini.png",
        "category": "symbols"
    };
    ":cancer:": EmojiDefinition = {
        "name": "cancer",
        "img": "cancer.png",
        "category": "symbols"
    };
    ":leo:": EmojiDefinition = {
        "name": "leo",
        "img": "leo.png",
        "category": "symbols"
    };
    ":virgo:": EmojiDefinition = {
        "name": "virgo",
        "img": "virgo.png",
        "category": "symbols"
    };
    ":libra:": EmojiDefinition = {
        "name": "libra",
        "img": "libra.png",
        "category": "symbols"
    };
    ":scorpius:": EmojiDefinition = {
        "name": "scorpius",
        "img": "scorpius.png",
        "category": "symbols"
    };
    ":sagittarius:": EmojiDefinition = {
        "name": "sagittarius",
        "img": "sagittarius.png",
        "category": "symbols"
    };
    ":capricorn:": EmojiDefinition = {
        "name": "capricorn",
        "img": "capricorn.png",
        "category": "symbols"
    };
    ":aquarius:": EmojiDefinition = {
        "name": "aquarius",
        "img": "aquarius.png",
        "category": "symbols"
    };
    ":pisces:": EmojiDefinition = {
        "name": "pisces",
        "img": "pisces.png",
        "category": "symbols"
    };
    ":ophiuchus:": EmojiDefinition = {
        "name": "ophiuchus",
        "img": "ophiuchus.png",
        "category": "symbols"
    };
    ":six_pointed_star:": EmojiDefinition = {
        "name": "six_pointed_star",
        "img": "six_pointed_star.png",
        "category": "symbols"
    };
    ":negative_squared_cross_mark:": EmojiDefinition = {
        "name": "negative_squared_cross_mark",
        "img": "negative_squared_cross_mark.png",
        "category": "symbols"
    };
    ":a:": EmojiDefinition = {
        "name": "a",
        "img": "a.png",
        "category": "symbols"
    };
    ":b:": EmojiDefinition = {
        "name": "b",
        "img": "b.png",
        "category": "symbols"
    };
    ":ab:": EmojiDefinition = {
        "name": "ab",
        "img": "ab.png",
        "category": "symbols"
    };
    ":o2:": EmojiDefinition = {
        "name": "o2",
        "img": "o2.png",
        "category": "symbols"
    };
    ":diamond_shape_with_a_dot_inside:": EmojiDefinition = {
        "name": "diamond_shape_with_a_dot_inside",
        "img": "diamond_shape_with_a_dot_inside.png",
        "category": "symbols"
    };
    ":recycle:": EmojiDefinition = {
        "name": "recycle",
        "img": "recycle.png",
        "category": "symbols"
    };
    ":end:": EmojiDefinition = {
        "name": "end",
        "img": "end.png",
        "category": "symbols"
    };
    ":back:": EmojiDefinition = {
        "name": "back",
        "img": "back.png",
        "category": "symbols"
    };
    ":on:": EmojiDefinition = {
        "name": "on",
        "img": "on.png",
        "category": "symbols"
    };
    ":soon:": EmojiDefinition = {
        "name": "soon",
        "img": "soon.png",
        "category": "symbols"
    };
    ":clock1:": EmojiDefinition = {
        "name": "clock1",
        "img": "clock1.png",
        "category": "symbols"
    };
    ":clock130:": EmojiDefinition = {
        "name": "clock130",
        "img": "clock130.png",
        "category": "symbols"
    };
    ":clock10:": EmojiDefinition = {
        "name": "clock10",
        "img": "clock10.png",
        "category": "symbols"
    };
    ":clock1030:": EmojiDefinition = {
        "name": "clock1030",
        "img": "clock1030.png",
        "category": "symbols"
    };
    ":clock11:": EmojiDefinition = {
        "name": "clock11",
        "img": "clock11.png",
        "category": "symbols"
    };
    ":clock1130:": EmojiDefinition = {
        "name": "clock1130",
        "img": "clock1130.png",
        "category": "symbols"
    };
    ":clock12:": EmojiDefinition = {
        "name": "clock12",
        "img": "clock12.png",
        "category": "symbols"
    };
    ":clock1230:": EmojiDefinition = {
        "name": "clock1230",
        "img": "clock1230.png",
        "category": "symbols"
    };
    ":clock2:": EmojiDefinition = {
        "name": "clock2",
        "img": "clock2.png",
        "category": "symbols"
    };
    ":clock230:": EmojiDefinition = {
        "name": "clock230",
        "img": "clock230.png",
        "category": "symbols"
    };
    ":clock3:": EmojiDefinition = {
        "name": "clock3",
        "img": "clock3.png",
        "category": "symbols"
    };
    ":clock330:": EmojiDefinition = {
        "name": "clock330",
        "img": "clock330.png",
        "category": "symbols"
    };
    ":clock4:": EmojiDefinition = {
        "name": "clock4",
        "img": "clock4.png",
        "category": "symbols"
    };
    ":clock430:": EmojiDefinition = {
        "name": "clock430",
        "img": "clock430.png",
        "category": "symbols"
    };
    ":clock5:": EmojiDefinition = {
        "name": "clock5",
        "img": "clock5.png",
        "category": "symbols"
    };
    ":clock530:": EmojiDefinition = {
        "name": "clock530",
        "img": "clock530.png",
        "category": "symbols"
    };
    ":clock6:": EmojiDefinition = {
        "name": "clock6",
        "img": "clock6.png",
        "category": "symbols"
    };
    ":clock630:": EmojiDefinition = {
        "name": "clock630",
        "img": "clock630.png",
        "category": "symbols"
    };
    ":clock7:": EmojiDefinition = {
        "name": "clock7",
        "img": "clock7.png",
        "category": "symbols"
    };
    ":clock730:": EmojiDefinition = {
        "name": "clock730",
        "img": "clock730.png",
        "category": "symbols"
    };
    ":clock8:": EmojiDefinition = {
        "name": "clock8",
        "img": "clock8.png",
        "category": "symbols"
    };
    ":clock830:": EmojiDefinition = {
        "name": "clock830",
        "img": "clock830.png",
        "category": "symbols"
    };
    ":clock9:": EmojiDefinition = {
        "name": "clock9",
        "img": "clock9.png",
        "category": "symbols"
    };
    ":clock930:": EmojiDefinition = {
        "name": "clock930",
        "img": "clock930.png",
        "category": "symbols"
    };
    ":heavy_dollar_sign:": EmojiDefinition = {
        "name": "heavy_dollar_sign",
        "img": "heavy_dollar_sign.png",
        "category": "symbols"
    };
    ":copyright:": EmojiDefinition = {
        "name": "copyright",
        "img": "copyright.png",
        "category": "symbols"
    };
    ":registered:": EmojiDefinition = {
        "name": "registered",
        "img": "registered.png",
        "category": "symbols"
    };
    ":tm:": EmojiDefinition = {
        "name": "tm",
        "img": "tm.png",
        "category": "symbols"
    };
    ":x:": EmojiDefinition = {
        "name": "x",
        "img": "x.png",
        "category": "symbols"
    };
    ":heavy_exclamation_mark:": EmojiDefinition = {
        "name": "heavy_exclamation_mark",
        "img": "heavy_exclamation_mark.png",
        "category": "symbols"
    };
    ":bangbang:": EmojiDefinition = {
        "name": "bangbang",
        "img": "bangbang.png",
        "category": "symbols"
    };
    ":interrobang:": EmojiDefinition = {
        "name": "interrobang",
        "img": "interrobang.png",
        "category": "symbols"
    };
    ":o:": EmojiDefinition = {
        "name": "o",
        "img": "o.png",
        "category": "symbols"
    };
    ":heavy_multiplication_x:": EmojiDefinition = {
        "name": "heavy_multiplication_x",
        "img": "heavy_multiplication_x.png",
        "category": "symbols"
    };
    ":heavy_plus_sign:": EmojiDefinition = {
        "name": "heavy_plus_sign",
        "img": "heavy_plus_sign.png",
        "category": "symbols"
    };
    ":heavy_minus_sign:": EmojiDefinition = {
        "name": "heavy_minus_sign",
        "img": "heavy_minus_sign.png",
        "category": "symbols"
    };
    ":heavy_division_sign:": EmojiDefinition = {
        "name": "heavy_division_sign",
        "img": "heavy_division_sign.png",
        "category": "symbols"
    };
    ":white_flower:": EmojiDefinition = {
        "name": "white_flower",
        "img": "white_flower.png",
        "category": "symbols"
    };
    ":100:": EmojiDefinition = {
        "name": "100",
        "img": "100.png",
        "category": "symbols"
    };
    ":heavy_check_mark:": EmojiDefinition = {
        "name": "heavy_check_mark",
        "img": "heavy_check_mark.png",
        "category": "symbols"
    };
    ":ballot_box_with_check:": EmojiDefinition = {
        "name": "ballot_box_with_check",
        "img": "ballot_box_with_check.png",
        "category": "symbols"
    };
    ":radio_button:": EmojiDefinition = {
        "name": "radio_button",
        "img": "radio_button.png",
        "category": "symbols"
    };
    ":link:": EmojiDefinition = {
        "name": "link",
        "img": "link.png",
        "category": "symbols"
    };
    ":curly_loop:": EmojiDefinition = {
        "name": "curly_loop",
        "img": "curly_loop.png",
        "category": "symbols"
    };
    ":wavy_dash:": EmojiDefinition = {
        "name": "wavy_dash",
        "img": "wavy_dash.png",
        "category": "symbols"
    };
    ":part_alternation_mark:": EmojiDefinition = {
        "name": "part_alternation_mark",
        "img": "part_alternation_mark.png",
        "category": "symbols"
    };
    ":trident:": EmojiDefinition = {
        "name": "trident",
        "img": "trident.png",
        "category": "symbols"
    };
    ":black_small_square:": EmojiDefinition = {
        "name": "black_small_square",
        "img": "black_small_square.png",
        "category": "symbols"
    };
    ":white_small_square:": EmojiDefinition = {
        "name": "white_small_square",
        "img": "white_small_square.png",
        "category": "symbols"
    };
    ":black_medium_small_square:": EmojiDefinition = {
        "name": "black_medium_small_square",
        "img": "black_medium_small_square.png",
        "category": "symbols"
    };
    ":white_medium_small_square:": EmojiDefinition = {
        "name": "white_medium_small_square",
        "img": "white_medium_small_square.png",
        "category": "symbols"
    };
    ":black_medium_square:": EmojiDefinition = {
        "name": "black_medium_square",
        "img": "black_medium_square.png",
        "category": "symbols"
    };
    ":white_medium_square:": EmojiDefinition = {
        "name": "white_medium_square",
        "img": "white_medium_square.png",
        "category": "symbols"
    };
    ":black_large_square:": EmojiDefinition = {
        "name": "black_large_square",
        "img": "black_square.png",
        "category": "symbols"
    };
    ":white_large_square:": EmojiDefinition = {
        "name": "white_large_square",
        "img": "white_large_square.png",
        "category": "symbols"
    };
    ":white_check_mark:": EmojiDefinition = {
        "name": "white_check_mark",
        "img": "white_check_mark.png",
        "category": "symbols"
    };
    ":black_square_button:": EmojiDefinition = {
        "name": "black_square_button",
        "img": "black_square_button.png",
        "category": "symbols"
    };
    ":white_square_button:": EmojiDefinition = {
        "name": "white_square_button",
        "img": "white_square_button.png",
        "category": "symbols"
    };
    ":black_circle:": EmojiDefinition = {
        "name": "black_circle",
        "img": "black_circle.png",
        "category": "symbols"
    };
    ":white_circle:": EmojiDefinition = {
        "name": "white_circle",
        "img": "white_circle.png",
        "category": "symbols"
    };
    ":red_circle:": EmojiDefinition = {
        "name": "red_circle",
        "img": "red_circle.png",
        "category": "symbols"
    };
    ":large_blue_circle:": EmojiDefinition = {
        "name": "large_blue_circle",
        "img": "large_blue_circle.png",
        "category": "symbols"
    };
    ":large_blue_diamond:": EmojiDefinition = {
        "name": "large_blue_diamond",
        "img": "large_blue_diamond.png",
        "category": "symbols"
    };
    ":large_orange_diamond:": EmojiDefinition = {
        "name": "large_orange_diamond",
        "img": "large_orange_diamond.png",
        "category": "symbols"
    };
    ":small_blue_diamond:": EmojiDefinition = {
        "name": "small_blue_diamond",
        "img": "small_blue_diamond.png",
        "category": "symbols"
    };
    ":small_orange_diamond:": EmojiDefinition = {
        "name": "small_orange_diamond",
        "img": "small_orange_diamond.png",
        "category": "symbols"
    };
    ":small_red_triangle:": EmojiDefinition = {
        "name": "small_red_triangle",
        "img": "small_red_triangle.png",
        "category": "symbols"
    };
    ":small_red_triangle_down:": EmojiDefinition = {
        "name": "small_red_triangle_down",
        "img": "small_red_triangle_down.png",
        "category": "symbols"
    };
    ":shipit:": EmojiDefinition = {
        "name": "shipit",
        "img": "shipit.png",
        "category": "symbols"
    }
}