import { Injectable, Type } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class ModalService {
    constructor(){
    }
    private static modalSubject: Subject<ModalConfig> = new Subject<ModalConfig>();
    public static modalObservable: Observable<ModalConfig> = ModalService.modalSubject.asObservable();

    public static showModal(data: ModalConfigBase<any>){
        this.modalSubject.next(new ModalConfig(data, true));
    }

    public static hideModal(data: ModalConfigBase<any>) {
        this.modalSubject.next(new ModalConfig(data, false));
    }
}

export class ModalConfigBase<T> {
    public data: any;
    public type: Type<T>;
    public onDismiss: (success: boolean) => boolean
    onDmyAdd: (success: boolean) => boolean
    constructor(data: any, type: Type<T>, onDismiss: (success: boolean) => boolean){
        this.data = data;
        this.type = type;
        this.onDismiss = onDismiss;
    }
}

export class ModalConfig extends ModalConfigBase<any> {
    public visible: boolean;
    constructor(base: ModalConfigBase<any>, visible: boolean = false){
        super(base.data, base.type, base.onDismiss);
        this.visible = visible;
    }
}