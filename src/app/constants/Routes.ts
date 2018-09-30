export class Routes {
    public static readonly home: string = 'home';
    public static readonly account: string = 'account';
    public static readonly accountProfile: string = 'profile'
    public static readonly accountRsvp: string = 'rsvp'
    public static readonly accountUpdates: string = 'updates'
    public static readonly accountDietaryRestrictions: string = 'dietaryRestrictions'
    public static readonly accountPolo: string = 'polo'
    public static readonly accountInvitation: string = 'invitation'
    public static readonly accountSchedule: string = 'arrival'
    public static readonly accountExtended: string = 'account/:selectedTab';
    public static readonly messagesExtended: string = 'messages/:channel';
    public static readonly messages: string = 'messages';
    public static readonly friends: string = 'friends';
    public static readonly friendsExtended: string = 'friends/:id';
    public static readonly admin: string = 'admin';
    public static readonly hukaChaka: string = 'hukaChaka';
    public static readonly login: string = 'login';
    public static readonly playlist: string = 'playlist';
    public static readonly faq: string = 'faq';
    public static readonly faqExtended: string = 'faq/:id';
    public static readonly recipe: string = 'recipe';
    public static readonly recipeDetail: string = 'recipe/:id/detail';
    public static readonly forum: string = 'forum'
    public static readonly forumDetail: string = 'forum/:topic'
    public static readonly forumDetailComment: string = 'forum/:topic/:comment'
    public static readonly comingSoon: string = 'coming-soon'
    public static readonly registry: string = 'registry'

    //default routes
    public static readonly empty: string = '';
    public static readonly wildCard: string = '**';
}