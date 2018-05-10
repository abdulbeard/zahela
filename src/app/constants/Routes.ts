export class Routes {
    public static readonly home: string = 'home';
    public static readonly account: string = 'account';
    public static readonly messagesExtended: string = 'messages/:channel';
    public static readonly messages: string = 'messages';
    public static readonly friends: string = 'friends';
    public static readonly admin: string = 'admin';
    public static readonly hukaChaka: string = 'hukaChaka';
    public static readonly login: string = 'login';
    public static readonly playlist: string = 'playlist';
    public static readonly faq: string = 'faq';
    public static readonly faqExtended: string = 'faq/:id';
    public static readonly recipe: string = 'recipe';
    public static readonly recipeDetail: string = 'recipe/:id/detail';

    //default routes
    public static readonly empty: string = '';
    public static readonly wildCard: string = '**';
}