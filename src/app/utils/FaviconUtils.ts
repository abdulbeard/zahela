export class FaviconUtils {
    private static faviconElement: HTMLLinkElement = null;
    public static toNotificationsPending() {
        this.setupFaviconElement();
        this.faviconElement.href = "/assets/favicon1.ico";
      }

    public static toNormal() {
        this.setupFaviconElement();
        this.faviconElement.href = "/assets/favicon.ico";
    }

    private static setupFaviconElement() {
        if (this.faviconElement === null) {
            this.faviconElement = <HTMLLinkElement> document.head.getElementsByClassName('favicon')[0]
        }
    }
}