import { Subject } from "rxjs";
import { Observable } from "rxjs/Observable";

export class MobileUtils {
    private static isMobileView: boolean;
    private static mobileViewSubject: Subject<boolean> = new Subject<boolean>();
    public static IsMobileView : Observable<boolean> = MobileUtils.mobileViewSubject.asObservable();
    public static updateIsMobileView(isMobileView: boolean) {
        MobileUtils.isMobileView = isMobileView;
        this.mobileViewSubject.next(isMobileView);
    }
    public static getIsMobileView() : boolean {
        return this.isMobileView;
    }
}